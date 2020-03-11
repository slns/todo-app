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

function select(taskId) {
    try {
      return TasksModel.findById(taskId);
      
    } catch (error) {
        console.error(error);
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
    
    let taskResult;
    select(taskId)
        .then((task) => {
            console.log('tasksObject ', task);
            taskResult = task;
           return task;
        })
        .catch((error) => {
            return response.status(500).json({
                status: false,
                message: error.message
            });
        });

    console.log('taskResult ', taskResult);

    UpdateValidator.validateAsync(task)
        .then(() => {
          return update(taskId, task)
                .then(task => {
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
            })
        .catch((error) => {
            return response.status(500).json({
                status: false,
                message: error.message
            });
        });
   
};