'use strict';

const {
    ProjectsModel
} = require('../../models');
const {
    UpdateValidator
} = require('../../validators/projects');
const {
    handleResponseError,
    handleResponseSuccess
} = require('../../helpers/handle-response');
const {
    STATUS_CODE_ERROR,
    STATUS_CODE_SUCCESS
} = require('../../helpers/constants');

module.exports = async (request, response) => {
    const {
        projectId
    } = request.params;
    const {
        body: project
    } = request;

    if (!projectId) {
        const error = new Error('Project Id is required ');

        return handleResponseError({
            statusCode: STATUS_CODE_ERROR,
            error,
            response
        });
    }

    try {
        const validateProject = await UpdateValidator.validateAsync(project);

        const result = await update(projectId, validateProject);

        return handleResponseSuccess({
            statusCode: STATUS_CODE_SUCCESS,
            result,
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

function update(projectId, project) {
    return ProjectsModel.findOneAndUpdate({
        _id: projectId
    }, project, {
        returnOriginal: false
    });

}