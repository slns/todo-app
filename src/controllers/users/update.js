'use strict';

const {
    UsersModel
} = require('../../models');
const {
    UpdateValidator
} = require('../../validators/users');
const {
    handleResponseError,
    handleResponseSuccess
} = require('../../helpers/handle-response');
const {
    STATUS_CODE_ERROR,
    STATUS_CODE_SUCCESS
} = require('../../helpers/constants');

module.exports = async (request, response) => {
    const {
        userId
    } = request.params;
    const {
        body: user
    } = request;

    if (!userId) {
        const error = new Error('User Id is required ');

        return handleResponseError({
            statusCode: STATUS_CODE_ERROR,
            error,
            response
        });
    }

    try {
        const validateUser = await UpdateValidator.validateAsync(user);

        const result = await update(userId, validateUser);

        return handleResponseSuccess({
            statusCode: STATUS_CODE_SUCCESS,
            result,
            response
        });

    } catch (error) {
        return handleResponseError({
            statusCode: STATUS_CODE_ERROR,
            error,
            response
        });
    }
};

function update(userId, user) {
    return UsersModel.findOneAndUpdate({
        _id: userId
    }, user, {
        returnOriginal: false,
        runValidators: true,
        context: 'query'
    });
}