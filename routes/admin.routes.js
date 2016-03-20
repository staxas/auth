var AdminRequests = require('../lib/admin.requests');

module.exports = [{
    method: 'GET',
    path: '/api/tokens',
    handler: AdminRequests.getAllTokens
  },

  {
    method: 'GET',
    path: '/api/user',
    handler: AdminRequests.getAllUsers
  },

  {
    method: 'DELETE',
    path: '/api/user/{id}',
    handler: AdminRequests.deleteUser
  }];
