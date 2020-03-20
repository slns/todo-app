'use strict';

const Mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const Schema = Mongoose.Schema;
const saltRounds = 10;

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

User.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator'
});

User.pre('save', function(next) {
    this.password = incryptPassword(this.password);
    next();
});

User.pre('findOneAndUpdate', async function (next) {
    const passwordToUpdate = this.getUpdate().password;
  if (passwordToUpdate) {
      this.update({}, {
          password: incryptPassword(passwordToUpdate)
      });
  }      
        next();
});
    
function incryptPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
}

module.exports = Mongoose.model('Users', User);