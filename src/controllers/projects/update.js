'use strict';

const omit = require('lodash/omit');
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
        body: projectBody
    } = request;

    const project = omit(projectBody, ["userId"]);

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

        const projectUpdated = await update(projectId, validateProject, projectBody.userId);

        const result = {
            id: projectUpdated._id,
            ...omit(projectUpdated._doc, ["_id", "__v", "createdAt", "updatedAt"])
        };

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

function update(projectId, project, userId) {
    return ProjectsModel.findOneAndUpdate({
        _id: projectId,
        userId
    }, project, {
        returnOriginal: false
    });

}