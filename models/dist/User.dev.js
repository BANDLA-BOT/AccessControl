"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {
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
  },
  role: {
    type: String,
    "enum": ['student', 'admin', 'instructor'],
    required: true
  }
});
module.exports = mongoose.model('User', userSchema);
//# sourceMappingURL=User.dev.js.map
