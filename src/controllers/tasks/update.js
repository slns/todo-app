'use strict';

const {
	TasksModel
} = require('../../models');
const {
	UpdateValidator
} = require('../../validators/tasks');
const {
	handleResponseError,
	handleResponseSuccess
} = require('../../helpers/handle-response');
const {
	STATUS_CODE_ERROR,
	STATUS_CODE_SUCCESS,
	STATUS_CODE_BAD_REQUEST
} = require('../../helpers/constants');

module.exports = async (request, response) => {
	const {
		taskId
	} = request.params;
	const {
		body: task
	} = request;

	if (!taskId) {
		const error = new Error('Task Id is required ');

		return handleResponseError({
			statusCode: STATUS_CODE_ERROR,
			error,
			response
		});
	}

	try {
		const validateTask = await UpdateValidator.validateAsync(task);

		const taskSelect = await select(taskId);

		if (taskSelect.done) {
			const error = new Error('It is not allowed to change completed tasks');

			return handleResponseError({
				statusCode: STATUS_CODE_BAD_REQUEST,
				error,
				response
			});
		}

		const result = await update(taskId, validateTask);

		return handleResponseSuccess({
			statusCode: STATUS_CODE_SUCCESS,
			result,
			response
		});

	} catch (error) {
		return handleResponseError({
			statusCode: STATUS_CODE_ERROR,
			error,
			response
		});
	}
};

function update(taskId, task) {
	return TasksModel.findOneAndUpdate({
		_id: taskId
	}, task, {
		returnOriginal: false
	});
}

function select(taskId) {
	return TasksModel.findById(taskId);
}