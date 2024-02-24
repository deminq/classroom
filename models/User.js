const { Schema, model } = require('mongoose');

const { userRolesEnum } = require('../constants');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    trim: true,
    select: false
  },
  role: {
    type: String,
    enum: Object.values(userRolesEnum),
    default: userRolesEnum.STUDENT
  }

});


module.exports = model(user.STUDENT, userSchema);