const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('404', { title: 'Page not found' })
})

module.exports = router;