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
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    }
});

module.exports = Mongoose.model('Project', schema);