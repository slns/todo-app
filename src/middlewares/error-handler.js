/*jslint node: true */
"use strict";

module.exports = (request, response, next) => {
    response.status(404).json({
        status: false,
        message: 'Not found'
    });
    next();
};