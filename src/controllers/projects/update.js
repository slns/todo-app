'use strict';

const {
    ProjectsModel
} = require('../../models');
const {
    UpdateValidator
} = require('../../validators/projects');
const {
    errorResponse,
    successResponse
} = require('../../helpers/handle-response');

module.exports = async (request, response) => {
    const {
        projectId
    } = request.params;
    const {
        body: project
    } = request;

    if (!projectId) {
        return response.status(500).json({
            status: false,
            message: 'Project Id is required'
        });
    }

    try {
        const validateProject = await UpdateValidator.validateAsync(project);
        
        const result = await update(projectId, validateProject);
        
        return response.status(201)
            .json(successResponse({
                data: result
            }));
        
    } catch (error) {
        return response.status(500)
            .json(errorResponse({
                error: error
            }));
    }
};

function update(projectId, project) {
    try {
        return ProjectsModel.findOneAndUpdate({
            _id: projectId
        }, project, {
            returnOriginal: false
        });
    } catch (error) {
        return error;
    }
}