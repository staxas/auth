var UserRoutes = require('./user.routes');
var TokenRoutes = require('./token.routes');
var AdminRoutes = require('./admin.routes');

module.exports = [].concat(UserRoutes, TokenRoutes, AdminRoutes);
