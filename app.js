var Hapi = require('hapi');
var Mongoose = require('mongoose');

var Config = require('./config');

var TokenRequests = require('./lib/token.requests');
var UserRequests = require('./lib/user.requests');

var User = require('./models/user.model');
var Token = require('./models/token.model');

Mongoose.connect('mongodb://' + Config.database.host + '/' + Config.database.db);

var Server = new Hapi.Server();

Server.connection({
  host: Config.server.host,
  port: Config.server.port,
  routes: {
    cors: true
  }
});

Server.route({
  method: 'GET',
  path: '/api/token/validate',
  handler: TokenRequests.validate
})

Server.route({
  method: 'GET',
  path: '/api/token/decode',
  handler: TokenRequests.decode
})

Server.route({
  method: 'POST',
  path: '/api/user/register',
  handler: UserRequests.register
})

Server.route({
  method: 'POST',
  path: '/api/user/login',
  handler: UserRequests.login
})

Server.route({
  method: 'DELETE',
  path: '/api/user/delete',
  handler: UserRequests.delete
})

// Start the server
Server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', Server.info.uri);
});

exports.server = Server
