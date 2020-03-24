'use strict';

const {
    Router
} = require('express');
//var cors = require('cors');

const ProjectsController = require('../../controllers/projects');
const route = Router();
const verifyJwt = require('../../middlewares/auth-jwt');

route.get('/projects', verifyJwt, (request, response) => {
    ProjectsController.select(request, response);
});

route.get('/projects/:projectId', verifyJwt, (request, response) => {
    ProjectsController.select(request, response);
});

route.post('/projects', verifyJwt, (request, response) => {
    ProjectsController.create(request, response);
});

route.put('/projects/:projectId', verifyJwt, (request, response) => {
    ProjectsController.update(request, response);
});

route.delete('/projects/:projectId', verifyJwt, (request, response) => {
    ProjectsController.remove(request, response);
});

module.exports = route;