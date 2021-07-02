const { isUser } = require('../middlewares/guards');

const router = require('express').Router();

router.get('/', async (req, res) => {

    try {
        res.render('home', { title: 'Home' })
    } catch (err) {
        console.log(err);
        res.redirect('/404');
    }

})

router.get('/all', async (req, res) => {
    try {
        const trips = await req.storage.getAllTrips()
        trips.forEach(one => {
            one.date = one.date.toISOString().split("T")[0]
        })
        const title = "All trips"
        res.render('shared-trips', { trips, title })
    } catch (error) {
        console.log(error);
        res.redirect('/404');
    }

})

router.get('/profile', isUser(), async (req, res) => {
    try {

        const user = await req.storage.getUserByEmail(req.user.email)
        const title = 'Profile';
        user.trips = user.tripsHistory.length
        user.tripsHistory.forEach(one => {
            one.date = one.date.toISOString().split("T")[0]
        })
        res.render('profile', { user, title })
    } catch (err) {
        console.log(err);
        res.redirect('/404')
    }

})

module.exports = router;