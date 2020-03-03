const { Router } = require('express');
const ProjectsController = require('../../controllers/projects');
const route = Router();


// select
route.get('/projects', (request, response, next) => {
    ProjectsController.select(request, response);
});


// create
route.post('/projects', (request, response) => {
    ProjectsController.create(request, response);
});

module.exports = route;