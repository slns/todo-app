/*jslint node: true */
"use strict";

const Joi = require('@hapi/joi');
module.exports = Joi.object({
    name: Joi.string().required()
});