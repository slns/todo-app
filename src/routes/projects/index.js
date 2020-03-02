const { Router } = require('express');
const ProjectsController = require('../../controllers/projects');
const route = Router();


// select
route.get('/projects', (request, response, next) => {
    return response.status(200).json({
        status: true,
        message: 'GET executado com sucesso!'
    });
});


// create
route.post('/projects', (request, response) => {
    const {
        body
    } = request;
    return response.status(201).json({
        status: true,
        message: 'POST executado com sucesso!',
        data: body
    });
});

module.exports = route;