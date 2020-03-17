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
        console.error(error);
    }
}

function findParameter(fieldId, field) {
    let parameter = {
        '_id': fieldId
    };

    switch (field) {
        case 'user':
            parameter = {
                'userId': fieldId
            };
            break;
        case 'project':
            parameter = {
                'projectId': fieldId
            };
            break;
        case 'task':
            parameter = {
                '_id': fieldId
            };
            break;
    }
    return parameter;
}