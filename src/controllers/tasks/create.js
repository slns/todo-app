'use strict';

const {
    TasksModel
} = require('../../models');
const {
    CreateValidator
} = require('../../validators/tasks');
const {
    errorResponse,
    successResponse
} = require('../../helpers/handle-response');

module.exports = async (request, response) => {
    const {
        body: task
    } = request;

    try {
        const validator = await validate(task);

        const result = await saveTask(validator);

        return response.status(201)
            .json(successResponse({
                data: result
            }));

    } catch (error) {
        console.error(error);
        return response.status(500)
            .json(errorResponse({
                error: error
            }));
    }
};

function saveTask(task) {
    try {
        return TasksModel.create(task);
    } catch (error) {
        return error;
    }
}

function validate(task) {
    try {
        return CreateValidator.validateAsync(task);
    } catch (error) {
        return error;
    }
}