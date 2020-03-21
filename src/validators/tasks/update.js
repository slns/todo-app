"use strict";

const Joi = require('@hapi/joi');

module.exports = Joi.object({
    description: Joi.string().optional(),
    done: Joi.boolean().optional()
});