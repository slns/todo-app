/*jslint node: true */
'use strict';

const {
    ProjectsModel
} = require('../../models');
const {
    UpdateValidator
} = require('../../validators/projects');

function update(projectId, project) {
    try {
        return ProjectsModel.findOneAndUpdate({
            _id: projectId
        }, project,
        {
            returnOriginal: false
        });
    } catch (error) {
        return error;
    }    
}

module.exports = (request, response) => {
    const { projectId } = request.params;
    const { body: project } = request;

    if (!projectId) {
        return response.status(500).json({
            staus: false,
            message: 'Project Id is required'
        });
    }

    UpdateValidator.validateAsync(project)
        .catch((error) => {
            return response.status(500).json({
                status: false,
                message: error.message
            });
        });

    return update(projectId, project)
        .then(project => {
                return response.status(200).json({
                    status: true,
                    message: project
                });
        })
        .catch((error) => {
            return response.status(500).json({
                status: false,
                message: error.message
            });
        });
};