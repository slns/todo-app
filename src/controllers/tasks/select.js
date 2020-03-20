'use strict';

const { TasksModel } = require('../../models');
const {
    errorResponse,
    successResponse
} = require('../../helpers/handle-response');

module.exports = async (request, response) => {
    const { fieldId, field } = request.params;

    let parameter = null;
    if (fieldId) {
       parameter = findParameter(fieldId, field);
    }

    try {
        const result = await select(parameter);

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

function select(parameter) {
    try {
        if (parameter) {
            return TasksModel.find(parameter);
        }
        return TasksModel.find();
    } catch (error) {
        return error;
    }
}

function findParameter(fieldId, field) {
    const resouce = {
        user:    'userId',
        project: 'projectId',
        task:    '_id'
    };

    return {
        [resouce[field]]: fieldId
    };
}