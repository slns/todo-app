'use strict';

const {
    UsersModel
} = require('../../models');
const {
    UpdateValidator
} = require('../../validators/users');
const {
    errorResponse,
    successResponse
} = require('../../helpers/handle-response');

module.exports = async (request, response) => {
    const {
        userId
    } = request.params;
    const {
        body: user
    } = request;

    if (!userId) {
        return response.status(500).json({
            status: false,
            message: 'User Id is required'
        });
    }

    try {
        const validateUser = await UpdateValidator.validateAsync(user);
        
        const result = await update(userId, validateUser);
        
        return response.status(201)
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

function update(userId, user) {
    try {
        return UsersModel.findOneAndUpdate({
            _id: userId
        }, user, {
                returnOriginal: false,
                runValidators: true,
                context: 'query'
        });
    } catch (error) {
        return error;
    }
}