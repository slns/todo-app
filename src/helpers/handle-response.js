'use strict';

const successResponse = ({
    data,
    message
}) => {
    return {
        status: true,
        data,
        message
    };
};

const errorResponse = ({
    data,
    error
}) => {
    return {
        status: false,
        data,
        message: error.message
    };
};

const handleResponseError = ({
    statusCode,
    error,
    message,
    response
}) => {
    return response.status(statusCode)
        .json(errorResponse({
            error: error,
            message
        }));
};

const handleResponseSuccess = ({
    statusCode,
    result,
    message,
    response
}) => {
    return response.status(statusCode)
        .json(successResponse({
            data: result,
            message
        }));
};

module.exports = {
    errorResponse: errorResponse,
    successResponse: successResponse,
    handleResponseError: handleResponseError,
    handleResponseSuccess: handleResponseSuccess
};