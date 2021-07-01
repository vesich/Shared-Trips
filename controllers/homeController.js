const { isUser } = require('../middlewares/guards');

const router = require('express').Router();

router.get('/', async (req, res) => {

    try {
        res.render('home')
    } catch (err) {
        console.log(err);
        res.redirect('/404');
    }

})

router.get('/all', async (req, res) => {
    try {
        const trips = await req.storage.getAllTrips()
        res.render('shared-trips', { trips })
    } catch (error) {
        console.log(error);
        res.redirect('/404');
    }

})

router.get('/profile', isUser(), async (req, res) => {
    try {
        //did not finish the profile page .. just not enough time
        const user = await req.storage.getUserByEmail(req.user.email)
        user.trips = user.tripsHistory.length
        console.log('profile  .......... ', user);
        res.render('profile', { user })
    } catch (err) {
        console.log(err);
        res.redirect('/404')
    }

})

module.exports = router;