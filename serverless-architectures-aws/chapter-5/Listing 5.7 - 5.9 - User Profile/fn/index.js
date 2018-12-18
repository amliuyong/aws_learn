/**
 * Created by Peter Sbarski
 * Serverless Architectures on AWS
 * http://book.acloud.guru/
 * Last Updated: Feb 11, 2017
 */

'use strict';

var jwt = require('jsonwebtoken');
var request = require('request');
var fs = require('fs');
var util = require('util');

exports.handler = function(event, context, callback) {
  console.log("event:" + util.inspect(event));
  console.log("context:" + util.inspect(context));

  if (!event.id_token) {
    callback('Could not find authToken');
    return;
  }

  var token = event.id_token.split(' ')[1];
  var access_token = event.access_token;
  //console.log("verify jwt token:" + token);

  var cert = fs.readFileSync('amliuyong.pem');

  jwt.verify(token, cert, function(err, decoded) {
    if (err) {
      console.log('Failed jwt verification: ', err, 'auth: ', event.authToken);
      callback('Authorization Failed');
    } else {

      console.log("Token verified");

      var body = {
        'id_token': token
      };

      // GET https://YOUR_AUTH0_DOMAIN/userinfo
      // Authorization: 'Bearer {ACCESS_TOKEN}'

      var options = {
        url: 'https://' + process.env.DOMAIN + '/userinfo',
        method: 'GET',
        'auth': {
          'bearer': access_token
        }
      };

      console.log("request options:" + util.inspect(options));

      request(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          callback(null, body);
        } else {
          if (response.statusCode !== 200) {
            console.log(
              `statusCode: ${response.statusCode}  ${response.statusCode}`
            );
          }
          callback(error);
        }
      });
    }
  })
};
