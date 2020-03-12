'use strict';

const { TasksModel } = require('../../models');

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
    let parameter = {'_id': fieldId};

        switch (field) {
            case 'user':
                parameter = {'userId': fieldId}; 
                break;
            case 'project':
                parameter = {'projectId': fieldId}; 
                break;           
            case 'task':
                parameter = {'_id': fieldId};
                break; 
        }
    return parameter;
}

module.exports = (request, response) => {
    const { fieldId, field } = request.params;

    let parameter = null;
    if (fieldId) {
       parameter = findParameter(fieldId, field);
    }
    
    return select(parameter)
    .then((tasks) => {
        return response.status(201).json({
            status: true,
            message: tasks
        });
    })
    .catch((error) => {
        return response.status(500).json({
            status: false,
            message: error
        });
    });
};