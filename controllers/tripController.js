const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util/parsers');

const router = require('express').Router()

//CREATE GET & POST

router.get('/create', isUser(), (req, res) => {
    res.render('trip/create')
})

router.post('/create', isUser(), async (req, res) => {
    try {
        const tripData = {
            startPoint: req.body.startPoint,
            endPoint: req.body.endPoint,
            date: req.body.date,
            time: req.body.time,
            carImage: req.body.carImage,
            carBrand: req.body.carBrand,
            seats: req.body.seats,
            price: req.body.price,
            description: req.body.description,
            author: req.user._id
        }

        await req.storage.createTrip(tripData);

        res.redirect('/')

    } catch (error) {

        const ctx = {
            errors: parseError(error),
            tripData: {
                startPoint: req.body.startPoint,
                endPoint: req.body.endPoint,
                date: req.body.date,
                time: req.body.time,
                carImage: req.body.carImage,
                carBrand: req.body.carBrand,
                seats: req.body.seats,
                price: req.body.price,
                description: req.body.description,
            }
        }
        res.render('trip/create', ctx)
    }

})

//DETAILS GET 

router.get('/details/:id', async (req, res) => {
    try {
        const trip = await req.storage.getTripById(req.params.id);
        trip.hasUser = Boolean(req.user);
        trip.isAuthor = req.user && req.user._id == trip.author._id
        trip.isJoined = Boolean(req.user && trip.buddies.find(u => u._id == req.user._id))
console.log('DETAILS PAGE TRIPPPPP ',trip);
        res.render('trip/details', { trip })
    } catch (error) {
        console.log(error);
        res.redirect('/404')
    }
})

// EDIT GET & POST 

router.get('/edit/:id', isUser(), async (req, res) => {
    try {
        const trip = await req.storage.getTripById(req.params.id);

        // if (trip.author._id != req.user._id) {
        //     throw new Error('Cannot edit trip you have not created')
        // }
        res.render('trip/edit', { trip })
    } catch (error) {
        res.redirect('/trip/details/' + req.params.id)
    }
})

router.post('/edit/:id', isUser(), async (req, res) => {
    try {
        const trip = await req.storage.getTripById(req.params.id);

        if (trip.author._id != req.user._id) {
            throw new Error('Cannot edit trip you have not created')
        }
        await req.storage.editTrip(req.params.id, req.body);

        res.redirect('/trip/details/' + req.params.id)

    } catch (error) {
        const ctx = {
            errors: parseError(error),
            trip: {
                _id: req.params.id,
                startPoint: req.body.startPoint,
                endPoint: req.body.endPoint,
                date: req.body.date,
                time: req.body.time,
                carImage: req.body.carImage,
                carBrand: req.body.carBrand,
                seats: req.body.seats,
                price: req.body.price,
                description: req.body.description,
            }
        }

        res.render('trip/edit', ctx)
    }
})

// DELETE GET

router.get('/delete/:id', isUser(), async (req, res) => {
    try {
        const trip = await req.storage.getTripById(req.params.id);

        if (trip.author._id != req.user._id) {
            throw new Error('Cannot delete a trip you have not created')
        }

        await req.storage.deleteTrip(req.params.id);
        res.redirect('/all');
    } catch (error) {
        console.log(error.message);
        res.redirect('/404')
    }
})

// JOIN GET

router.get('/join/:id', isUser(), async (req, res) => {
    try {
        const trip = await req.storage.getTripById(req.params.id);

        console.log('join page ', trip.author._id);

        if (trip.author._id == req.user._id) {
            throw new Error('Cannot join to  your own trip')
        }

         await req.storage.join(req.params.id, req.user._id);
        res.redirect('/trip/details/' + req.params.id);
    } catch (error) {
        console.log(error.message);
        res.redirect('/404')
    }
})

module.exports = router;