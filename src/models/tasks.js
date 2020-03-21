'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const schema = new Schema({
    description: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    },
    endDate: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = Mongoose.model('Tasks', schema);