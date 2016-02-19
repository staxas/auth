var Jwt = require('jsonwebtoken');
var Mongoose = require('mongoose');
var Bcrypt = require('bcryptjs');
var Boom = require('boom');

var tokenPassword = require('../tokenpass');

module.exports.register = function(request, reply) {
  var p = request.payload;
  var userExist = Mongoose.models.User.find({
    email: p.email
  });

  userExist.exec(function(err, docs) {
    if (!docs.length) {
      Bcrypt.genSalt(10, function(err, salt) {
        Bcrypt.hash(p.password, salt, function(err, hash) {
          // save hash as password
          var newUser = new Mongoose.models.User({
            email: p.email,
            password: hash,
            role: 'user'
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
      // console.log('user exists');
    }
  })

}

module.exports.login = function(request, reply) {
  var p = request.payload;
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
          var tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          var token = Jwt.sign({
            // input for decodable token object goes HERE
            expireDate: tomorrow
          }, tokenPassword);

          // Save token to database
          var newToken = new Mongoose.models.Token({
            token: token,
            issuer: p.email,
            expireDate: tomorrow
          });
          newToken.save(function(errTokenSave, respTokenSave){
          });
          // Reply with token
          return reply({token: token});
        }
      });
    } else if (!doc) {
      return reply(Boom.notFound('user not found'));
    } else {
      return reply(err);
    }
  })
}

module.exports.delete = function(request, reply) {
  var pay = request.payload;
  if (typeof pay.email != 'undefined' && pay.email != "" && pay.email != null) {
    Mongoose.models.User.find({
      email: pay.email
    }).remove().exec(function(err, resp) {
      if (!err) {
        return reply(resp);
      } else {
        return reply(err);
      }
    });
  } else {
    return reply(Boom.badRequest('no user id given'));
  }
}
