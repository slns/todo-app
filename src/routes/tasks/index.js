'use strict';

const { Router } = require('express');
const TaskController = require('../../controllers/tasks');
const route = Router();

route.post('/tasks', (request, response) => {
    TaskController.create(request, response);
});

route.put('/tasks/:taskId', (request, response) => {
    TaskController.update(request, response);
});

module.exports = route;