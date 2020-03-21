"use strict";

const {
    TasksModel
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
        taskId
    } = request.params;

    if (!taskId) {
        const error = new Error('Task Id is required ');

        return handleResponseError({
            statusCode: STATUS_CODE_ERROR,
            error,
            response
        });
    }

    try {
        const result = await remove(taskId);

        let message = 'Task deleted successfully ';

        if (!result.deletedCount) {
            message = 'Task not existe ';
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

function remove(taskId) {
    return TasksModel.deleteOne({
        _id: taskId
    });
}