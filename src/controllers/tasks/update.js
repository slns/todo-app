'use strict';

const {
	TasksModel
} = require('../../models');
const {
	UpdateValidator
} = require('../../validators/tasks');
const {
	errorResponse,
	successResponse
} = require('../../helpers/handle-response');

module.exports = async (request, response) => {
	const {
		taskId
	} = request.params;
	const {
		body: task
	} = request;

	if (!taskId) {
		return response.status(500).json({
			status: false,
			message: 'Task Id is required'
		});
	}

	try {
		const validateTask = await UpdateValidator.validateAsync(task);

		const taskSelect = await select(taskId);

		if (taskSelect.done) {
			return response.status(400)
				.json(errorResponse({
					error: {
						message: 'It is not allowed to change completed tasks'
					}
				}));
		}

		const result = await update(taskId, validateTask);

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

function update(taskId, task) {
	try {
		return TasksModel.findOneAndUpdate({
			_id: taskId
		}, task, {
			returnOriginal: false
		});
	} catch (error) {
		return error;
	}
}

function select(taskId) {
	try {
		return TasksModel.findById(taskId);
	} catch (error) {
		return error;
	}
}