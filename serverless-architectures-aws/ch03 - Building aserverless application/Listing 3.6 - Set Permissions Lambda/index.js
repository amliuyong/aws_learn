/**
 * Created by Peter Sbarski
 * Serverless Architectures on AWS
 * http://book.acloud.guru/
 * Last Updated: Feb 11, 2017
 */

'use strict';

var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var acl = process.env['ACL'] || 'public-read';

exports.handler = function(event, context, callback){
    var message = JSON.parse(event.Records[0].Sns.Message);

    var sourceBucket = message.Records[0].s3.bucket.name;
    var sourceKey = decodeURIComponent(message.Records[0].s3.object.key.replace(/\+/g, ' '));
    console.log("set ACL: " + acl + " to bucket:" + sourceBucket + "/" + sourceKey);

    //aws s3api put-object-acl --acl public-read --bucket yongliu-s3-test --key  upload_video/VPC7.mp4
    var params = {
        Bucket: sourceBucket,
        Key: sourceKey,
        ACL: acl
    };

    s3.putObjectAcl(params, function(err, data){
        if (err) {
            console.log("err:" + err);
            callback(err);
        }else{
          console.log("return data:" + data);
        }
    });
};
