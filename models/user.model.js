var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password: String,
  roles: [String],
  deleteDate: Date
});

var User = Mongoose.model('User', userSchema);

module.exports = User;
