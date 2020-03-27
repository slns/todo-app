'use strict';

const {
    Router
} = require('express');
const UsersController = require('../../controllers/users');

const route = Router();

route.post('/users', (request, response) => {
    UsersController.create(request, response);
});

module.exports = route;