"use strict";

const {
    TasksModel
} = require('../../models');
const {
    errorResponse,
    successResponse
} = require('../../helpers/handle-response');

module.exports = async (request, response ) => {
    const { taskId } = request.params;

    if (!taskId) {
        return response.status(500).json({
            status: false,
            message: 'Task Id is required'
        });
    }

    try {
        const result = await remove(taskId);

        return response.status(200)
            .json(successResponse({
                data: result,
                message: 'Task deleted successfully '
            }));
        
    } catch (error) {
        return response.status(500)
            .json(errorResponse({
                error: error
            }));
    }
};

function remove(taskId) {
    try {
        return TasksModel.deleteOne({
            _id: taskId
        });
    } catch (error) {
        return error;
    }
}