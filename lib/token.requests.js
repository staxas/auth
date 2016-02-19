var Jwt = require('jsonwebtoken');
var Boom = require('boom');
var Moment = require('moment');

var tokenPassword = require('../tokenpass');

module.exports.validate = function(request, reply) {
  var q = request.query;
  if (typeof q.token != 'undefined' && q.token != '' && q.token != null) {
    Jwt.verify(q.token, tokenPassword, function(err, decoded) {
      if (err) {
        // token not verified
        return reply({validated: 'false'});
      } else {
        // check if expiration date passed current date
        now = new Date();
        if (Moment(decoded.expireDate) < Moment(now)) {
          return reply({validated: 'false'});
        }
        // if login succeded
        return reply({validated: 'true'});
      }
    });
  } else {
    // if token query field empty
    return reply(Boom.badRequest('no token given'));
  }
}

module.exports.decode = function(request, reply) {
  var q = request.query;
  if (typeof q.token != 'undefined' && q.token != '' && q.token != null) {
    Jwt.verify(q.token, tokenPassword, function(err, decoded) {
      if (err) {
        // token not verified
        return reply(Boom.unauthorized('invalid token'), null);
      } else {
        // check if expiration date passed current date
        now = new Date();
        if (Moment(decoded.expireDate) < Moment(now)) {
          return reply(Boom.unauthorized('token expired'), null)
        }
        // if login succeded
        return reply({decoded: decoded});
      }
    });
  } else {
    // if token query field empty
    return reply(Boom.badRequest('no token given'));
  }
}
