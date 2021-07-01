const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const tripController = require('../controllers/tripController');
const errorController = require('../controllers/errorController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/trip', tripController);
    app.use('/404', errorController);
}