'use strict';

const create = require('./create');
const select = require('./select');
const update = require('./update');
const remove = require('./delete');

module.exports = {
    create,
    select,
    update,
    remove
};