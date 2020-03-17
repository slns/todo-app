"use strict";

const {
    ProjectsModel
} = require('../../models');
const {
    errorResponse,
    successResponse
} = require('../../helpers/handle-response');

module.exports = async (request, response ) => {
    const { projectId } = request.params;

    if (!projectId) {
        return response.status(500).json({
            staus: false,
            message: 'Project Id is required'
        });
    }

    try {
        const result = await remove(projectId);

        return response.status(200)
            .json(successResponse({
                data: result,
                message: 'Project deleted successfully '
            }));

    } catch (error) {
        return response.status(500)
            .json(errorResponse({
                error: error
            }));
    }
};

function remove(projectId) {
    try {
        return ProjectsModel.deleteOne({
            _id: projectId
        });
    } catch (error) {
        return error;
    }
}