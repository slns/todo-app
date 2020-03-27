'use strict';

const {
    STATUS_CODE_SUCCESS,
    STATUS_CODE_CREATE,
    STATUS_CODE_BAD_REQUEST,
    STATUS_CODE_BAD_UNAUTHORIZED,
    STATUS_CODE_ERROR
} = require('./constants');
const {
    errorResponse,
    successResponse,
    handleResponseError,
    handleResponseSuccess
} = require('./handle-response');

module.exports = {
    errorResponse,
    successResponse,
    handleResponseError,
    handleResponseSuccess,
    STATUS_CODE_SUCCESS,
    STATUS_CODE_CREATE,
    STATUS_CODE_BAD_REQUEST,
    STATUS_CODE_BAD_UNAUTHORIZED,
    STATUS_CODE_ERROR
};