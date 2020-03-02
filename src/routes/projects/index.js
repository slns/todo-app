const {
    Router
} = require('express')
const route = Router();

route.get('/projects', (request, response, next) => {
    return response.status(200).json({
        status: true,
        message: 'GET executado com sucesso!'
    });
});

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