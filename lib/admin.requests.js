var Jwt = require('jsonwebtoken');
var Boom = require('boom');
var Moment = require('moment');
var Mongoose = require('mongoose');

var TokenFuncs = require('./token.funcs');

// getALlTokens request handler
module.exports.getAllTokens = function(request, reply) {
  var q = request.query;
  if (typeof q.token != 'undefined' && q.token != '' && q.token != null) {
    TokenFuncs.verifyRole(q.token, 'admin', function(err, resp) {
      if (!err) {
        // find all tokens in token collection in database
        var tokens = Mongoose.models.Token.find({});
        tokens.exec(function(errGetTokens, respGetTokens) {
          if (!errGetTokens) {
            return reply(respGetTokens);
          } else {
            return reply(errGetTokens);
          }
        });
      } else {
        // if verifyRole() returns an error
        return reply(err);
      }
    })
  } else {
    // if token query field empty
    return reply(Boom.badRequest('no token given'));
  }
}

// getAllUsers request handler
module.exports.getAllUsers = function(request, reply) {
  var q = request.query;
  if (typeof q.token != 'undefined' && q.token != '' && q.token != null) {
    TokenFuncs.verifyRole(q.token, 'admin', function(err, resp) {
      if (!err) {
        // find all users in user collection in database
        var users = Mongoose.models.Users.find({});
        users.exec(function(errGetUsers, respGetUsers) {
          if (!errGetUsers) {
            return reply(respGetUsers);
          } else {
            return reply(errGetUsers);
          }
        });
      } else {
        // if verifyRole() returns an error
        return reply(err);
      }
    })
  } else {
    // if token query field empty
    return reply(Boom.badRequest('no token given'));
  }
}

// deleteUser request handler
module.exports.deleteUser = function(request, reply) {
  var par = request.params;
  var q = request.query;
  TokenFuncs.verifyRole(q.token, 'admin', function(errToken, resp) {
    if (!errToken) {
      if (typeof par.id != 'undefined' && par.id != "" && par.id != null) {
        Mongoose.models.User.find({
          email: par.id
        }).remove().exec(function(errRemove, respRemove) {
          if (!errRemove) {
            return reply(true);
          } else {
            return reply(errRemove);
          }
        });
      } else {
        return reply(Boom.badRequest('no user id given'));
      }
    } else {
      // if verifyRole() returns an error
      return reply(errToken);
    }
  })
}
