'use strict';

const create = require('./create');
const update = require('./update');
const select = require('./select');
const remove = require('./delete');

module.exports = {
    create,
    update,
    select,
    remove
};