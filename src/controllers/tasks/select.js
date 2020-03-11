'use strict';

const { TasksModel } = require('../../models');

function select(taskId) {
    try {
        if (taskId) {
          return TasksModel.findOne({_id: taskId});
        }
        return TasksModel.find();
    } catch (error) {
        console.error(error);
    }
}

module.exports = (request, response) => {
    const { taskId } = request.params;

    return select(taskId)
    .then((tasks) => {
        return response.status(201).json({
            status: true,
            message: tasks
        });
    })
    .catch((error) => {
        return response.status(500).json({
            status: false,
            message: error
        });
    });
};