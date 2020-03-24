'use strict';

const {
    Router
} = require('express');
const UsersController = require('../../controllers/users');
const verifyJwt = require('../../middlewares/auth-jwt');

const route = Router();

route.get('/users', verifyJwt, (request, response) => {
    UsersController.select(request, response);
});

route.get('/users/:userId', verifyJwt, (request, response) => {
    UsersController.select(request, response);
});

route.post('/users', verifyJwt, (request, response) => {
    UsersController.create(request, response);
});

route.put('/users/:userId', verifyJwt, (request, response) => {
    UsersController.update(request, response);
});

route.delete('/users/:userId', verifyJwt, (request, response) => {
    UsersController.remove(request, response);
});

module.exports = route;