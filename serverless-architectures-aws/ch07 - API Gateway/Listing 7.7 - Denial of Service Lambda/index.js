/**
 * Created by Peter Sbarski (from an AWS Lambda Blueprint)
 * Serverless Architectures on AWS
 * http://book.acloud.guru/
 * Last Updated: Feb 12, 2017
 */

'use strict';

let https = require('https');
let async = require('async');

function makeRequests(event, iteration, callback) {

  const req = https.request(event.options, (res) => {
    let body = '';
    console.log('Task:' + iteration + ', Status:' + res.statusCode);
    callback(null, "Task:" + iteration + ", Status: " + res.statusCode);
    res.setEncoding('utf8');
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      console.log('Successfully processed HTTPS response, iteration: ',
        iteration);

      if (res.headers['content-type'] === 'application/json') {
        console.log(JSON.parse(body));
      }
    });
  });

  return req;
}

exports.handler = (event, context, callback) => {
  var tasks = [];
  for (var i = 0; i < 200; i++) {
    let n = i;
    tasks.push(function(cb) {
      var req = makeRequests(event, n, cb);
      req.end();
    });
  }

  async.parallel(tasks, function(err, results) {
    console.log("results:" + JSON.stringify(results));
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });

};
