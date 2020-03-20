"use strict";

const {
    UsersModel
} = require('../../models');
const {
    errorResponse,
    successResponse
} = require('../../helpers/handle-response');

module.exports = async (request, response ) => {
    const { userId } = request.params;

    if (!userId) {
        return response.status(500).json({
            staus: false,
            message: 'User Id is required'
        });
    }

    try {
        const result = await remove(userId);

        return response.status(200)
            .json(successResponse({
                data: result,
                message: 'User deleted successfully '
            }));

    } catch (error) {
        return response.status(500)
            .json(errorResponse({
                error: error
            }));
    }
};

function remove(userId) {
    try {
        return UsersModel.deleteOne({
            _id: userId
        });
    } catch (error) {
        return error;
    }
}