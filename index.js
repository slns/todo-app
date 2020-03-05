'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { Mongo } = require('./src/config');
const { Projects } = require('./src/routes');

const app = express();

app.use(
    morgan('dev'),
    bodyParser.urlencoded({
        extended: false
    }),
    bodyParser.json(),
);

app.use(
    Projects()
);

app.listen(3000, () => {
    console.log('Server running on port 3000');
    Mongo.connect();
});