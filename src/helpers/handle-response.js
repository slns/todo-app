'use strict';

module.exports.successResponse = ({data, message}) => {
    return {
        status: true,
        data,
        message
        };
};

module.exports.errorResponse = ({ data, error }) => {
    return {
        status: false,
        data,
        message: error.message
        };
};