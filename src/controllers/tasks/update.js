'use strict';

const { TasksModel } = require('../../models');
const { UpdateValidator } = require('../../validators/tasks');

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

async function taskById(taskId) {
    try {
        return await TasksModel.findById(taskId);
    } catch (error) {
        console.error(error);
    }
}

module.exports = (request, response) => {
    const { taskId } = request.params;
    const { body: task } = request;

    if (!taskId) {
        return response.status(500).json({
            status: false,
            message: 'Task Id is required'
        });
    }

    const taskObject = taskById(taskId);
console.log(taskObject)
    if (taskObject.done) {
        return response.status(500).json({
            status: false,
            message: 'Task Id is required 44444444444444444444444'
        });
    }

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

   // const taskObject = taskById(taskId);
  //  console.log('taskObject ', taskObject);

  //  if (taskObject.done) {;
   //     return response.status(412).json({
   //         status: false,
    //        message: 'It is only allowed to change unfinished tasks';
    //    });
   // };
};