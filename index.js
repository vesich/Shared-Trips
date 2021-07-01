const express = require('express');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');
const dotenv = require('dotenv');

dotenv.config();


start();

async function start() {
    const app = express();

    await databaseConfig();


    expressConfig(app);
    routesConfig(app);

    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
        console.log(`Application started at port: ${PORT}`)
    });
}
