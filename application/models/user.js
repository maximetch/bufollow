var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
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
  dateCreate: {
    type: Date
  }
});

module.exports = mongoose.model('User', schema);