var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var tokenSchema = new Schema({
  token: String,
  expireDate: Date,
  issuer: String,
  blacklistDate: Date
});

var Token = Mongoose.model('Token', tokenSchema);

module.exports = Token;
