'use strict';
const { ProjectsModel } = require('../../models');
const { CreateValidator } = require('../../validators/projects');

function saveProject(project) {
    try {
      return ProjectsModel.create(project);
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

        return saveProject(body)
            .then(project => {
                if (project) {
                    return response.status(201).json({
                        status: true,
                        message: project
                    });
                }
                
            })
            . catch((error) => {
                return response.status(500).json({
                    status: false,
                    message: error
                });
            });
    };