"use strict";


module.exports = (request, response, next) => {
    response.status(404).json({
        status: false,
        message: new Error('Not found')
    });
    next();
};