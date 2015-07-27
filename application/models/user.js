var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  email: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  dateCreated: {
    type: Date
  }
});

module.exports = mongoose.model('User', schema);