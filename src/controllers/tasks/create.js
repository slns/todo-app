'use strict';

const omit = require('lodash/omit');
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

        const taskSaved = await saveTask(validator);

        let result = {
            id: taskSaved._id,
            ...omit(taskSaved._doc, ["_id", "__v", "createdAt", "updatedAt"])
        };

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