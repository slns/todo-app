'use strict';

const { TasksModel } = require('../../models');
const { CreateValidator } = require('../../validators/tasks');

function saveTask(task) {
    try {
      return TasksModel.create(task);
    } catch (error) {
        console.error(error);
    }
}

module.exports = (request, response) => {
        const { body } = request;

        CreateValidator.validateAsync(body)
        .catch((error) => {
            return response.status(500).json({
               status: false,
               message: error.message
            });
        });

        return saveTask(body)
            .then(project => {
                    return response.status(200).json({
                        status: true,
                        message: project
                    });
            })
            . catch((error) => {
                return response.status(500).json({
                    status: false,
                    message: error
                });
            });
    };