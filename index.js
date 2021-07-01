const express = require('express');
const port = process.env.PORT || 3000;
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');
const dotenv = require('dotenv');

dotenv.config();

start();

async function start() {
    const app = express();
    // await databaseConfig(app);

    expressConfig(app);
    routesConfig(app);

    app.listen(port, () => {
        console.log(`Application started at http://localhost:${port}`)
    });
}
