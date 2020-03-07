"use strict";

const {
    ProjectsModel
} = require('../../models');

function remove(projectId) {
    try {
       return ProjectsModel.deleteOne({_id: projectId});
    } catch (error) {
        return error;
    }
}

module.exports = (request, response ) => {
    const { projectId } = request.params;

    if (!projectId) {
        return response.status(500).json({
            staus: false,
            message: 'Project Id is required'
        });
    }

    return remove(projectId)
    .then(result => {
        return response.status(200).json({
            staus: true,
            message: 'Project deleted successfully ' ,
             result
        });
    })
    .catch((error) => {
        return response.status(500).json({
            status: false,
            message: error
        });
    });
};