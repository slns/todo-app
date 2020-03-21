'use strict';

const {
    TasksModel
} = require('../../models');
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
        fieldId,
        field
    } = request.params;

    let parameter = null;
    if (fieldId) {
        parameter = findParameter(fieldId, field);
    }

    try {
        const result = await select(parameter);

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

function select(parameter) {
    if (parameter) {
        return TasksModel.find(parameter);
    }
    return TasksModel.find();
}

function findParameter(fieldId, field) {
    const resouce = {
        user: 'userId',
        project: 'projectId',
        task: '_id'
    };

    return {
        [resouce[field]]: fieldId
    };
}