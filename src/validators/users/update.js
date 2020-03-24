"use strict";

const Joi = require('@hapi/joi');

module.exports = Joi.object({
    name: Joi.string().optional(),
    password: Joi.string().optional().min(6),
    confirmPassword: Joi.string().required().min(6).valid(Joi.ref('password')).error(new Error('Password not equal.'))
});