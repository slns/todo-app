'use strict';

const {
    UsersModel
} = require('../../models');
const {
    CreateValidator
} = require('../../validators/users');
const {
    errorResponse,
    successResponse
} = require('../../helpers/handle-response');

module.exports = async (request, response) => {
    const {
        body: user
    } = request;

    try {
        const userValidated = await validate(user);

        const result = await saveUser(userValidated);

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

function saveUser(user) {
        return UsersModel.create(user);
}

function validate(user) {
        return CreateValidator.validateAsync(user);
}