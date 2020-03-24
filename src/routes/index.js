'use strict';

const projects = require('./projects');
const tasks = require('./tasks');
const users = require('./users');
const auth = require('./authentication');

module.exports = {
    Auth: () => auth,
    Projects: () => projects,
    Users: () => users,
    Tasks: () => tasks
};