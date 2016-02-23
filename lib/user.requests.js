var Jwt = require('jsonwebtoken');
var Mongoose = require('mongoose');
var Bcrypt = require('bcryptjs');
var Boom = require('boom');
var Joi = require('joi');

var RegisterSchema = require('../validate/user.schema').registerSchema;
var TokenFuncs = require('./token.funcs');
var tokenPassword = require('../tokenpass');

module.exports.register = function(request, reply) {
  var p = request.payload;
  Joi.validate({
    email: p.email,
    password: p.password
  }, RegisterSchema, function(errValid, value) {
    if (!errValid) {
      var userExist = Mongoose.models.User.find({
        email: p.email
      });

      userExist.exec(function(err, docs) {
        if (!docs.length) {
          Bcrypt.genSalt(10, function(err, salt) {
            Bcrypt.hash(p.password, salt, function(err, hash) {
              // save hash as password
              var roles = ['user'];
              var newUser = new Mongoose.models.User({
                email: p.email,
                password: hash,
                roles: roles
              });

              newUser.save(function(err, resp) {
                if (!err) {
                  return reply(resp._id);
                } else {
                  return reply(err);
                }
              })
            });
          });
        } else {
          return reply(Boom.badRequest('user exists'));
        }
      })
    } else {
      return reply(errValid)
    }
  });
}

module.exports.login = function(request, reply) {
  // request data shortcuts
  var p = request.payload;
  Joi.validate({
    email: p.email,
    password: p.password
  }, RegisterSchema, function(errValid, value) {
    if (!errValid) {
      var user = Mongoose.models.User.findOne({
        email: p.email
      });

      user.exec(function(err, doc) {
        // console.log( err || doc);
        if (!err && doc) {
          Bcrypt.compare(p.password, doc.password, function(err, res) {
            if (err || res == false) {
              return reply(Boom.unauthorized('invalid password'));
            } else {
              // right password so generate a new TOKEN or whatever login system
              TokenFuncs.createToken(doc, function (token) {
                // Reply with token
                return reply({ token: token})
              })
            }
          });
        } else if (!doc) {
          return reply(Boom.notFound('user not found'));
        } else {
          return reply(err);
        }
      })
    } else {
      return reply(errValid);
    }
  });
}

module.exports.delete = function(request, reply) {
  var q = request.query;
  TokenFuncs.verifyRole(q.token, 'user', function(errToken, resp) {
    if (!errToken) {
      Mongoose.models.User.find({
        email: resp.email
      }).remove().exec(function(errRemove, respRemove) {
        if (!errRemove) {
          return reply(respRemove);
        } else {
          return reply(errRemove);
        }
      });
    } else {
      return reply(errToken);
    }
  })
}
