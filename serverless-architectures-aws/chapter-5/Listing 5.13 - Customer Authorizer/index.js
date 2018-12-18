/**
 * Created by Peter Sbarski
 * Serverless Architectures on AWS
 * http://book.acloud.guru/
 * Last Updated: Feb 11, 2017
 */

'use strict';

var jwt = require('jsonwebtoken');
var fs = require('fs');
var util = require('util');

/*
{
    "principalId": "am.liuyong@qq.com",
    "policyDocument": {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Action": "execute-api:Invoke",
                "Effect": "allow",
                "Resource": "arn:aws:execute-api:us-east-1:015887481462:i56bou5pk9/dev/GET/userProfile"
            }
        ]
    }
}
*/
var generatePolicy = function(principalId, effect, resource) {
  var authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    var policyDocument = {};
    policyDocument.Version = '2012-10-17'; // default version
    policyDocument.Statement = [];
    var statementOne = {};
    statementOne.Action = 'execute-api:Invoke'; // default action
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  console.log("resource: " + resource);
  console.log("authResponse: " + JSON.stringify(authResponse));

  return authResponse;
}

exports.handler = function(event, context, callback) {
  if (!event.authorizationToken) {
    callback('Could not find authToken');
    return;
  }
  console.log("event:" + util.inspect(event));

  var id_token = event.authorizationToken.split(' ')[1];
  console.log("id_token:" + id_token);
  var cert = fs.readFileSync('amliuyong.pem');
  jwt.verify(id_token, cert, function(err, decoded) {
    if (err) {
      console.log('Failed jwt verification: ', err, 'auth: ', event.authorizationToken);
      callback('Authorization Failed');
    } else {
      console.log("Login Successful");
      console.log("decoded:" + util.inspect(decoded));
      var {name, email, sub } = decoded;
      callback(null, generatePolicy(email, 'allow', event.methodArn));
    }
  })
};
