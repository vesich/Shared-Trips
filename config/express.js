const cookieParser = require('cookie-parser');
const express = require('express');
const hbs = require('express-handlebars');

const authMiddleware = require('../middlewares/auth');
const storageMiddleware = require('../middlewares/storage')


module.exports = (app) => {

    app.engine('hbs', hbs({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(authMiddleware());

    app.use((req, res, next) => {
        if (!req.url.includes('favicon')) {
            console.log('METHOD & REQUEST URL >>>>> ', req.method, req.url);
            if (req.user) {
                console.log('Known User >>>>> ', req.user.email);
            }
        }
        next()
    })

   app.use(storageMiddleware())
}