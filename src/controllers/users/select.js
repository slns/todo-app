'use strict';

const {
    UsersModel
} = require('../../models');
const {
    handleResponseError,
    handleResponseSuccess
} = require('../../helpers/handle-response');
const {
    STATUS_CODE_ERROR,
    STATUS_CODE_SUCCESS
} = require('../../helpers/constants');

const select = async (request, response) => {
    const {
        userId
    } = request.params;

    try {
        const result = await selectById(userId);
        
        return handleResponseSuccess({
            statusCode: STATUS_CODE_SUCCESS,
            result,
            response
        });

    } catch (error) {    
        console.log('result', error);
        return handleResponseError({
            statusCode: STATUS_CODE_ERROR,
            error,
            response
        });
    }
};

function selectById(userId) {
    if (userId) {
        return UsersModel.findOne({
            _id: userId
        });
    }
    return UsersModel.find();
}

function selectOneByEmail(email) {
    return UsersModel.findOne({email});
}

module.exports = {
    selectOneByEmail,
    select
}