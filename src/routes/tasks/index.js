'use strict';

const {
    Router
} = require('express');
const TaskController = require('../../controllers/tasks');
const route = Router();
const verifyJwt = require('../../middlewares/auth-jwt');

route.get('/tasks', verifyJwt, (request, response) => {
    TaskController.select(request, response);
});

route.get('/tasks/:field(user|project|task)/:fieldId', verifyJwt, (request, response) => {
    TaskController.select(request, response);
});

route.post('/tasks', verifyJwt, (request, response) => {
    TaskController.create(request, response);
});

route.put('/tasks/:taskId', verifyJwt, (request, response) => {
    TaskController.update(request, response);
});

route.delete('/tasks/:taskId', verifyJwt, (request, response) => {
    TaskController.remove(request, response);
});

module.exports = route;