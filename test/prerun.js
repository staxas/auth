var inspect = require('eyespect').inspector();
var request = require('request')

var config = require('../config');

// Delete test user if exists
// console.log('Deleting possible test user...');

var postData = {
  email: 'test@test.com'
}

var url = 'http://' + config.server.host + ':' + config.server.port + "/api/user/delete";
var options = {
  method: 'delete',
  body: postData,
  json: true,
  url: url
}
request(options, function (err, res, body) {
  if (err) {
    inspect(err, 'error posting json')
    return
  }
  // var headers = res.headers
  // var statusCode = res.statusCode
  // inspect(headers, 'headers')
  // inspect(statusCode, 'statusCode')
  // inspect(body, 'body')
})
// user deleted if all is well


// // // //
// var postData = {
//   email: 'test@test.com',
//   password: 'pass123'
// }
//
// var url = 'http://' + config.server.host + ':' + config.server.port + "/api/user/register";
// var options = {
//   method: 'post',
//   body: postData,
//   json: true,
//   url: url
// }
// request(options, function (err, res, body) {
//   if (err) {
//     inspect(err, 'error posting json')
//     return
//   }
//   var headers = res.headers
//   var statusCode = res.statusCode
//   inspect(headers, 'headers')
//   inspect(statusCode, 'statusCode')
//   inspect(body, 'body')
// })
