'use strict';

const {
    TasksModel
} = require('../../models');
const {
    UpdateValidator
} = require('../../validators/tasks');

function update(taskId, task) {
    try {
        return TasksModel.findOneAndUpdate({
            _id: taskId
        }, task,
        {
            returnOriginal: false
        });
    } catch (error) {
        return error;
    }    
}

module.exports = (request, response) => {
    const { taskId } = request.params;
    const { body: task } = request;

    if (!taskId) {
        return response.status(500).json({
            staus: false,
            message: 'Task Id is required'
        });
    }

    UpdateValidator.validateAsync(task)
        .catch((error) => {
            return response.status(500).json({
                status: false,
                message: error.message
            });
        });

    return update(taskId, task)
        .then(project => {
                return response.status(200).json({
                    status: true,
                    message: task
                });
        })
        .catch((error) => {
            return response.status(500).json({
                status: false,
                message: error.message
            });
        });
};