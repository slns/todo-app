'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const {
    ErrorHandler,
    verifyJwt
} = require('./src/middlewares');
const {
    Mongo
} = require('./src/config');
const {
    routesWithoutAuthentication,
    routesWithAuthentication
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
    routesWithoutAuthentication(),
    verifyJwt,
    routesWithAuthentication()
);

app.use(
    ErrorHandler,
);

app.listen(3000, () => {
    console.log('Server running on port 3000');
    Mongo.connect();
});