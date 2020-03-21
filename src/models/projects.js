'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = Mongoose.model('Project', schema);