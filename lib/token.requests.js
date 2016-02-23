var Boom = require('boom');

var TokenFuncs = require('./token.funcs');
var tokenPassword = require('../tokenpass');

module.exports.validate = function(request, reply) {
  var q = request.query;
  if (typeof q.token != 'undefined' && q.token != '' && q.token != null) {
    TokenFuncs.validate(q.token, function(resp) {
      return reply(resp);
    })
  } else {
    // if token query field empty
    return reply(Boom.badRequest('no token given'));
  }
}

module.exports.decode = function(request, reply) {
  var q = request.query;
  if (typeof q.token != 'undefined' && q.token != '' && q.token != null) {
    TokenFuncs.decode(q.token, function(resp) {
      return reply(resp);
    })
  } else {
    // if token query field empty
    return reply(Boom.badRequest('no token given'));
  }
}
