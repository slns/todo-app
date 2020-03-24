'use strict';

const create = require('./create');
const {
    select,
    selectOneByEmail
} = require('./select');
const update = require('./update');
const remove = require('./delete');

module.exports = {
    create,
    select,
    update,
    remove,         
    selectOneByEmail
};