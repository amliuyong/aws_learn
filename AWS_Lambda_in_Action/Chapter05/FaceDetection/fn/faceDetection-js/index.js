'use strict';

const cv = require('opencv');
const util = require('util');
const request = require('request').defaults({encoding: null});

const uuid = require('node-uuid');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const dstBucket = 'yongliu-s3-bucket';
const dstPrefix = 'faces/';
const outputDomain = 'yongliu-s3-bucket.s3.amazonaws.com';

function getFormattedDate() {
  const now = new Date().toISOString(); // YYYY-MM-DDTHH:mm:ss.sssZ
  const formattedNow = `${now.substr(0, 4)}${now.substr(5, 2)}${now.substr(8, 2)}${now.substr(11, 2)}${now.substr(14, 2)}${now.substr(17, 2)}`;
  return formattedNow;
}

exports.handler = async event => {
  console.log('Reading options from event:\n', util.inspect(event, {depth: 5}));

  const {imageUrl} = event;

  const body = await new Promise((resolve, reject) => {
    request.get(imageUrl, (error, _, body) => error ? reject(error) : resolve(body));
  });

  const image = await new Promise((resolve, reject) => {
    cv.readImage(body, (error, image) => error ? reject(error) : resolve(image));
  });

  if (image.width() < 1 || image.height() < 1) {
    throw new Error('Image has no size');
  }

  const faces = await new Promise((resolve, reject) => {
    image.detectObject('node_modules/opencv/data/haarcascade_frontalface_alt.xml', {}, (error, faces) => {
      return error ? reject(error) : resolve(faces);
    });
  });

  if (faces.length === 0) {
    return {
      faces: 0,
      outputURL: imageUrl,
    };
  }

  for (const face of faces) {
    image.rectangle([face.x, face.y], [face.width, face.height], [255, 255, 255], 2);
  }

  const dstKey = dstPrefix + getFormattedDate() + '-' + uuid.v4() + '.jpg';
  const contentType = 'image/jpeg';

  await s3.putObject({
    Bucket: dstBucket,
    Key: dstKey,
    Body: image.toBuffer(),
    ContentType: contentType,
  }).promise();

  return {
    faces: faces.length,
    outputURL: `https://${outputDomain}/${dstKey}`,
  };
};
