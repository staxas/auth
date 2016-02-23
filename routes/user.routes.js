var UserRequests = require('../lib/user.requests');

module.exports = [{
    method: 'POST',
    path: '/api/user/register',
    handler: UserRequests.register
  },

  {
    method: 'POST',
    path: '/api/user/login',
    handler: UserRequests.login
  },

  {
    method: 'DELETE',
    path: '/api/user',
    handler: UserRequests.delete
  }
]
