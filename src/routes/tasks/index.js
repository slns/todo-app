'use strict';

const {
    Router
} = require('express');
const TaskController = require('../../controllers/tasks');
const route = Router();

route.get('/tasks', (request, response) => {
    TaskController.select(request, response);
});

route.get('/tasks/:field(user|project|task)/:fieldId', (request, response) => {
    TaskController.select(request, response);
});

route.post('/tasks', (request, response) => {
    TaskController.create(request, response);
});

route.put('/tasks/:taskId', (request, response) => {
    TaskController.update(request, response);
});

route.delete('/tasks/:taskId', (request, response) => {
    TaskController.remove(request, response);
});

module.exports = route;