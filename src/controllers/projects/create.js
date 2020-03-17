'use strict';

const {
    ProjectsModel
} = require('../../models');
const {
    CreateValidator
} = require('../../validators/projects');
const {
    errorResponse,
    successResponse
} = require('../../helpers/handle-response');

module.exports = async (request, response) => {
    const {
        body: project
    } = request;

    try {
        const validator = await validate(project);

        const result = await saveProject(validator);

        return response.status(201)
            .json(successResponse({
                data: result
            }));

    } catch (error) {
        console.error(error);
        return response.status(500)
            .json(errorResponse({
                error: error
            }));
    }
};

function saveProject(project) {
    try {
        return ProjectsModel.create(project);
    } catch (error) {
        return error;
    }
}

function validate(project) {
    try {
        return CreateValidator.validateAsync(project);
    } catch (error) {
        return error;
    }
}