"use strict";

const Joi = require('@hapi/joi');

module.exports = Joi.object({
    name: Joi.string().optional(),
    password: Joi.string().optional().min(6)
});