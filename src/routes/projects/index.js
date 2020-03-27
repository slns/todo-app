'use strict';

const {
    Router
} = require('express');
//var cors = require('cors');

const ProjectsController = require('../../controllers/projects');
const route = Router();

route.get('/projects', (request, response) => {
    ProjectsController.select(request, response);
});

route.get('/projects/:projectId', (request, response) => {
    ProjectsController.select(request, response);
});

route.post('/projects', (request, response) => {
    ProjectsController.create(request, response);
});

route.put('/projects/:projectId', (request, response) => {
    ProjectsController.update(request, response);
});

route.delete('/projects/:projectId', (request, response) => {
    ProjectsController.remove(request, response);
});

module.exports = route;