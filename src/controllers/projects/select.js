'use strict';

const {
    ProjectsModel
} = require('../../models');
const {
    errorResponse,
    successResponse
} = require('../../helpers/handle-response');

module.exports = async (request, response) => {
    const {
        projectId
    } = request.params;

    try {
        const result = await select(projectId);

        return response.status(200)
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

function select(projectId) {
    try {
        if (projectId) {
            return ProjectsModel.findOne({
                _id: projectId
            });
        }
        return ProjectsModel.find();
    } catch (error) {
        console.error(error);
    }
}