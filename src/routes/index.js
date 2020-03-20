'use strict';

const projects = require('./projects');
const tasks    = require('./tasks');
const users    = require('./users');

module.exports = { 
    Projects: () => projects,
    Users:    () => users,
    Tasks:    () => tasks
};