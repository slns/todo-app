'use strict';

const { selectOneByEmail } = require('../users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const omit = require('lodash/omit');

const {
    handleResponseError,
    handleResponseSuccess
} = require('../../helpers/handle-response');
const {
    STATUS_CODE_ERROR,
    STATUS_CODE_CREATE
} = require('../../helpers/constants');

module.exports = async (request, response) => {
    const { email, password } = request.body;

    if (!email && !password) {
        const error = new Error('Email and password are required');

        return handleResponseError({
            statusCode: STATUS_CODE_ERROR,
            error,
            response
        });
    }
    const user = await selectOneByEmail(email);

    if (!user) {
        const error = new Error('User not found');

        return handleResponseError({
            statusCode: STATUS_CODE_ERROR,
            error,
            response
        });
    }

    const validateUser = await validateUserPassword(password, user);

    if (!validateUser) {
        const error = new Error('Wrong Credencials');
        return handleResponseError({
            statusCode: STATUS_CODE_ERROR,
            error,
            response
        });
    }

    const userCopy = {
        id: user._id,
        ...omit(user._doc, ["_id", "password", "__v", "createdAt", "updatedAt"])
    };

    const token = generateToken(user);

    const result = {
        user: userCopy,
        token
    };

    return handleResponseSuccess({
        statusCode: STATUS_CODE_CREATE,
        result: result,
        response
    });
};

function validateUserPassword(password, user) {
    return bcrypt.compare(password, user.password);
}

function generateToken(user) {
    return jwt.sign({
            userId: user._id,
        },
        process.env.SECRET_KEY, {
            expiresIn: '1h'
        });    
}