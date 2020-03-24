"use strict";

const jwt = require('jsonwebtoken');
const {
    handleResponseError,
} = require('../helpers/handle-response');
const {
    STATUS_CODE_ERROR,
    STATUS_CODE_BAD_UNAUTHORIZED
} = require('../helpers/constants');

const verifyJwt = (request, response, next) => {

    //const token = request.headers['x-access-token'];
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return handleResponseError({
            statusCode: STATUS_CODE_BAD_UNAUTHORIZED,
            error: new Error('No token provided.'),
            response
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, function (error, decoded) {
        if (error) {
            return handleResponseError({
                statusCode: STATUS_CODE_ERROR,
                error: error,
                response
            });
        }

        request.userId = decoded.id;
        next();
    });
};

module.exports = verifyJwt;