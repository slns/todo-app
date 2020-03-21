'use strict';

const {
    ProjectsModel
} = require('../../models');
const {
    CreateValidator
} = require('../../validators/projects');
const {
    handleResponseError,
    handleResponseSuccess
} = require('../../helpers/handle-response');
const {
    STATUS_CODE_ERROR,
    STATUS_CODE_CREATE
} = require('../../helpers/constants');

module.exports = async (request, response) => {
    const {
        body: project
    } = request;

    try {
        const validator = await validate(project);

        const result = await saveProject(validator);

        return handleResponseSuccess({
            statusCode: STATUS_CODE_CREATE,
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

function saveProject(project) {
    return ProjectsModel.create(project);
}

function validate(project) {
    return CreateValidator.validateAsync(project);
}