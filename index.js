'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config()
const {
    ErrorHandler
} = require('./src/middlewares');
const {
    Mongo
} = require('./src/config');
const {
    Auth,
    Projects,
    Tasks,
    Users
} = require('./src/routes');

const app = express();

app.use(cors());

app.use(
    morgan('dev'),
    bodyParser.urlencoded({
        extended: false
    }),
    bodyParser.json(),
);

app.use(
    Auth(),
    Projects(),
    Tasks(),
    Users()
);

app.use(
    ErrorHandler,
);

app.listen(3000, () => {
    console.log('Server running on port 3000');
    Mongo.connect();
});