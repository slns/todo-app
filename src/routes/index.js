'use strict';

const projects = require('./projects');
const tasks = require('./tasks');
const usersWithAuthentication = require('./usersWithAuthentication');
const usersWithoutAuthentication = require('./usersWithoutAuthentication');
const auth = require('./authentication');

module.exports = {
    Auth: () => auth,
    Projects: () => projects,
    UsersWithAuthentication: () => usersWithAuthentication,
    UsersWithoutAuthentication: () => usersWithoutAuthentication,
    Tasks: () => tasks
};