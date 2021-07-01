const mongoose = require('mongoose');

module.exports = async () => {
    try {
        const conn = await mongoose.connect(process.env.CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`Mongo DB connected: ${conn.connection.host} `);
    } catch (error) {
        console.log(`Error with DB connection: ${error.message}`);
        process.exit(1);
    }

    // return new Promise((resolve, reject) => {
    //     mongoose.connect(process.env.CONNECTION_URI, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true
    //     });

    //     const db = mongoose.connection;
    //     db.on('error', (err) => {
    //         console.error('Connection error: ', err)
    //         reject(err).catch((err) => { });
    //     })
    //     db.once('open', function () {
    //         console.log('Database ready');
    //         resolve();
    //     })
    // })

}