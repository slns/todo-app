"use strict";

const {
    UsersModel
} = require('../../models');
const {
    handleResponseError,
    handleResponseSuccess
} = require('../../helpers/handle-response');
const {
    STATUS_CODE_ERROR,
    STATUS_CODE_SUCCESS,
} = require('../../helpers/constants');

module.exports = async (request, response) => {
    const {
        userId
    } = request.params;

    if (!userId) {
        const error = new Error('User Id is required ');

        return handleResponseError({
            statusCode: STATUS_CODE_ERROR,
            error,
            response
        });
    }

    try {
        const result = await remove(userId);

        let message = 'User deleted successfully ';

        if (!result.deletedCount) {
            message = 'User not existe ';
        }

        return handleResponseSuccess({
            statusCode: STATUS_CODE_SUCCESS,
            result,
            message,
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

function remove(userId) {
    return UsersModel.deleteOne({
        _id: userId
    });
}