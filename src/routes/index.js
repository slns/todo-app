'use strict';

const projects = require('./projects');
const tasks = require('./tasks');

module.exports = { 
    Projects: () => projects,
    Tasks: () => tasks
};