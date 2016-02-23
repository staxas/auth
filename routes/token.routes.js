var TokenRequests = require('../lib/token.requests');

module.exports = [{
    method: 'GET',
    path: '/api/token/validate',
    handler: TokenRequests.validate
  },

  {
    method: 'GET',
    path: '/api/token/decode',
    handler: TokenRequests.decode
  }
]
