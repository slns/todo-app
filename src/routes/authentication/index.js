'use strict';

const { Router } = require('express');
const Authentication = require('../../controllers/authentication');

const route = Router();

route.post('/login', (request, response) => {
    return Authentication.login(request, response);
});

module.exports = route;

