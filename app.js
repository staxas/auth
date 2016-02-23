var Hapi = require('hapi');
var Mongoose = require('mongoose');

var Config = require('./config');

var Routes = require('./routes/routes.js');

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

Server.route(Routes);

// Start the server
Server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', Server.info.uri);
});

exports.server = Server;
