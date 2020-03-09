"use strict";

const Joi = require('@hapi/joi');
module.exports = Joi.object({
    description:    Joi.string().required(),
    projectId:      Joi.string().required(),
    userId:         Joi.string().required()
});