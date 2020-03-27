'use strict';

const {
    Router
} = require('express');
const UsersController = require('../../controllers/users');

const route = Router();

route.get('/users', (request, response) => {
    UsersController.select(request, response);
});

route.get('/users/:userId', (request, response) => {
    UsersController.select(request, response);
});

route.put('/users/:userId', (request, response) => {
    UsersController.update(request, response);
});

route.delete('/users/:userId', (request, response) => {
    UsersController.remove(request, response);
});

module.exports = route;