const mongoose = require('mongoose');

module.exports = (app) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const db = mongoose.connection;
        db.on('error', (err) => {
            console.error('Connection error: ', err)
            reject(err).catch((err) => { });
        })
        db.once('open', function () {
            console.log('Database ready');
            resolve();
        })
    })

}