'use strict';

const {
    UsersModel
} = require('../../models');
const {
    errorResponse,
    successResponse
} = require('../../helpers/handle-response');

module.exports = async (request, response) => {
    const {
        userId
    } = request.params;

    try {
        const result = await select(userId);

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

function select(userId) {
    try {
        if (userId) {
            return UsersModel.findOne({
                _id: userId
            });
        }
        return UsersModel.find();
    } catch (error) {
        console.error(error);
    }
}