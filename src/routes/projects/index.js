'use strict';

const { Router } = require('express');
const ProjectsController = require('../../controllers/projects');
const route = Router();


// select
route.get('/projects', (request, response, next) => {
    ProjectsController.select(request, response);
});

// select :id
route.get('/projects/:projectId', (request, response, next) => {
    ProjectsController.select(request, response);
});


// create
route.post('/projects', (request, response) => {
    ProjectsController.create(request, response);
});

// update
route.put('/projects/:projectId', (request, response) => {
    ProjectsController.update(request, response);
});

// delet
route.delete('/projects/:projectId', (request, response) => {
    ProjectsController.remove(request, response);
});

//route.all('/projects/');

module.exports = route;