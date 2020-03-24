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
    const user = await getUser(email);

    if (!user) {
        const error = new Error('User not found');

        return handleResponseError({
            statusCode: STATUS_CODE_ERROR,
            error,
            response
        });
    }

    return handleResponseSuccess({
        statusCode: STATUS_CODE_CREATE,
        result: validateUserPasswordAndGenerateToken(password, user),
        response
    });
}

function getUser(email) {
    return selectOneByEmail(email);
}

function validateUserPasswordAndGenerateToken(password, user) {
    const match = bcrypt.compare(user.password, password);

    if (!match) {
        return new Error('Wrong Credencials');
        
    }
    console.log('typeof user ', user.password)
    const userWithoutPassword = omit(user, ["password", "__v"]);

    const token = jwt.sign(
        {
            userId: user._id,
        },
        process.env.SECRET_KEY,
        {
         expiresIn: '1h'
        });
    
    
    console.log('userWithoutPassword ', userWithoutPassword.__v)
    return {
        user: userWithoutPassword,
        token
    };
}