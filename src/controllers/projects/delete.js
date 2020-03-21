"use strict";

const {
    ProjectsModel
} = require('../../models');
const {
    handleResponseError,
    handleResponseSuccess
} = require('../../helpers/handle-response');
const {
    STATUS_CODE_ERROR,
    STATUS_CODE_SUCCESS,
} = require('../../helpers/constants');

module.exports = async (request, response) => {
    const {
        projectId
    } = request.params;

    if (!projectId) {
        const error = new Error('Project Id is required ');

        return handleResponseError({
            statusCode: STATUS_CODE_ERROR,
            error,
            response
        });
    }

    try {
        const result = await remove(projectId);

        let message = 'Project deleted successfully ';

        if (!result.deletedCount) {
            message = 'Project not existe ';
        }

        return handleResponseSuccess({
            statusCode: STATUS_CODE_SUCCESS,
            result,
            message,
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

function remove(projectId) {
    return ProjectsModel.deleteOne({
        _id: projectId
    });
}