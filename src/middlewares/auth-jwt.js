'use strict';

const {
    Router
} = require('express');
const jwt = require('jsonwebtoken');
const {
    handleResponseError,
    STATUS_CODE_BAD_UNAUTHORIZED
} = require('../helpers');

const route = Router();

route.use((request, response, next) => {

    const token = request.headers.authorization;

    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            return handleResponseError({
                statusCode: STATUS_CODE_BAD_UNAUTHORIZED,
                error: new Error('Unauthorized'),
                response
            });
        }

        request.body.userId = decoded.userId;
        next();
    });
});

module.exports = route;