"use strict";

const {
    TasksModel
} = require('../../models');

function remove(taskId) {
    try {
       return TasksModel.deleteOne({_id: taskId});
    } catch (error) {
        return error;
    }
}

module.exports = (request, response ) => {
    const { taskId } = request.params;

    if (!taskId) {
        return response.status(500).json({
            status: false,
            message: 'Task Id is required'
        });
    }

    return remove(taskId)
    .then(result => {
        return response.status(200).json({
            status: true,
            message: 'Task deleted successfully ' ,
             result
        });
    })
    .catch((error) => {
        return response.status(500).json({
            status: false,
            message: error
        });
    });
};