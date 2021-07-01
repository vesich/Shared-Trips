const tripService = require('../services/trip');
const userService = require('../services/user');

module.exports = () => (req, res, next) => {
    //todo import and decorate services
    req.storage = {
       ...tripService,
       ...userService
    };

    next();
}