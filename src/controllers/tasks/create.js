'use strict';

const {
    TasksModel
} = require('../../models');
const {
    CreateValidator
} = require('../../validators/tasks');
const {
    handleResponseError,
    handleResponseSuccess
} = require('../../helpers/handle-response');
const {
    STATUS_CODE_ERROR,
    STATUS_CODE_CREATE
} = require('../../helpers/constants');

module.exports = async (request, response) => {
    const {
        body: task
    } = request;

    try {
        const validator = await validate(task);

        const result = await saveTask(validator);

        return handleResponseSuccess({
            statusCode: STATUS_CODE_CREATE,
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

function saveTask(task) {
    return TasksModel.create(task);
}

function validate(task) {
    return CreateValidator.validateAsync(task);
}