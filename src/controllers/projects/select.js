/*jslint node: true */
'use strict';

const { ProjectsModel } = require('../../models');

function select(projectId) {
    try {
        if (projectId) {
          return ProjectsModel.findOne({_id: projectId});
        }
        return ProjectsModel.find();
    } catch (error) {
        console.error(error);
    }
}

module.exports = (request, response) => {
    const { projectId } = request.params;

    return select(projectId)
    .then((projects) => {
        return response.status(201).json({
            status: true,
            message: projects
        });
    })
    .catch((error) => {
        return response.status(500).json({
            status: false,
            message: error
        });
    });
};