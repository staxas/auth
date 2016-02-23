var Jwt = require('jsonwebtoken');
var Boom = require('boom');
var Moment = require('moment');
var Mongoose = require('mongoose');

var TokenPassword = require('../tokenpass');

// Function checkIfAdmin checks if 'admin' role is found in token, and checks expiration date
module.exports.verifyRole = function(token, role, callback) {
  Jwt.verify(token, TokenPassword, function(err, decoded) {
    if (err) {
      // token not verified
      return callback(Boom.unauthorized('invalid token'), null);
    } else {
      // check if expiration date passed current date
      now = new Date();
      if (Moment(decoded.expireDate) < Moment(now)) {
        return callback(Boom.unauthorized('token expired'), null)
      }
      // if login succeeded
      if (~decoded.roles.indexOf(role)) {
        return callback(null, decoded);
      } else {
        return callback(Boom.unauthorized('wrong role'), null)
      }
    }
  });
}

module.exports.createToken = function(doc, callback) {
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Create token
  var token = Jwt.sign({
    // input for decodable token object goes HERE
    email: doc.email,
    roles: doc.roles,
    expireDate: tomorrow
  }, TokenPassword);

  // Save token to database
  var newToken = new Mongoose.models.Token({
    token: token,
    issuer: doc.email,
    expireDate: tomorrow
  });
  newToken.save(function(errTokenSave, respTokenSave) {});
  return callback(token);
}

module.exports.validate = function(token, callback) {
  Jwt.verify(token, TokenPassword, function(err, decoded) {
    if (err) {
      // token not verified
      return callback({
        validated: 'false'
      });
    } else {
      // check if expiration date passed current date
      now = new Date();
      if (Moment(decoded.expireDate) < Moment(now)) {
        return callback({
          validated: 'false'
        });
      }
      // if login succeded
      return callback({
        validated: 'true'
      });
    }
  });
}

module.exports.decode = function(token, callback) {
  Jwt.verify(token, TokenPassword, function(err, decoded) {
    if (err) {
      // token not verified
      return callback(Boom.unauthorized('invalid token'));
    } else {
      // check if expiration date passed current date
      now = new Date();
      if (Moment(decoded.expireDate) < Moment(now)) {
        return callback(Boom.unauthorized('token expired'))
      }
      // if login succeded
      return callback(decoded);
    }
  });
}
