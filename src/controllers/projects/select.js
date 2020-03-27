'use strict';

const omit = require('lodash/omit');
const {
    ProjectsModel
} = require('../../models');
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
        userId
    } = request.body;

    try {
        const project = await select(projectId, userId);

        let result = {
            id: project._id,
            ...omit(project._doc, ["_id", "__v", "createdAt", "updatedAt"])
        };

        if (project.length > 1) {
            result = project.map((project) => {
                return {
                    id: project._id,
                    ...omit(project._doc, ["_id", "__v", "createdAt", "updatedAt"])
                };
            });
        }

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

function select(projectId, userId) {
    if (projectId) {
        return ProjectsModel.findOne({
            _id: projectId,
            userId
        });
    }
    return ProjectsModel.find({
        userId
    });
}