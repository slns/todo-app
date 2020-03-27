'use strict';

const projects = require('./projects');
const tasks = require('./tasks');
const usersWithAuthentication = require('./usersWithAuthentication');
const usersWithoutAuthentication = require('./usersWithoutAuthentication');
const auth = require('./authentication');

const routesWithAuthentication = () => {
    return [
        usersWithAuthentication,
        projects,
        tasks
    ].map(val => val);
};

const routesWithoutAuthentication = () => {
    return [
        usersWithoutAuthentication,
        auth
    ].map(val => val);
};

module.exports = {
    routesWithAuthentication,
    routesWithoutAuthentication
};