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

    const userCopy = omitAndRenameKey(user);

    const token = generateToken(user);

    const result = {
        user: userCopy,
        token: token
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

function omitAndRenameKey(user) {
    const omitUserFields = omitFields(user);

    const userConvert = renameKey(omitUserFields);
    
    return userConvert;
}

function omitFields(user) {
    const copyUser = { ...user };
    //const copyUser = Object.assign({}, user);

    return omit(copyUser._doc, ["password", "__v", "createdAt", "updatedAt"]);
}

function renameKey(userWithoutFields) {
    const userConvert = { id: userWithoutFields._id, ...userWithoutFields };
    delete userConvert._id;
    // if (userWithoutFields) {
    //     userWithoutFields.id = userWithoutFields._id;
    //     delete userWithoutFields._id;
    // }

    return userConvert;
}