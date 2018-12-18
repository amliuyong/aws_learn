//https: //aws.amazon.com/articles/browser-uploads-to-s3-using-html-post-forms/

  policy: {
    expiration: '2018-12-19T06:30:28.651Z',
    conditions: [{
        key: 'upload_video/458935c786466fe7af7198b30d1af4ca62005574/myVideo_1008.mp4'
      }, {
        bucket: 'yongliu-s3-bucket'
      }, {
        acl: 'private'
      },
      ['starts-with', '$Content-Type', '']
    ]
  }


policy: {
  "expiration": "2009-01-01T00:00:00Z",
  "conditions": [{
      "bucket": "s3-bucket"
    },
    ["starts-with", "$key", "uploads/"], {
      "acl": "private"
    }, {
      "success_action_redirect": "http://localhost/"
    },
    ["starts-with", "$Content-Type", ""],
    ["content-length-range", 0, 1048576]
  ]
}


result: {
  signature: 'r+XgA8OcwqRXFgMrx3EnKdeor1w=',
  encoded_policy: 'eyJleHBpcmF0aW9uIjoiMjAxOC0xMi0xOVQwNjozMDoyOC42NTFaIiwiY29uZGl0aW9ucyI6W3sia2V5IjoidXBsb2FkX3ZpZGVvLzQ1ODkzNWM3ODY0NjZmZTdhZjcxOThiMzBkMWFmNGNhNjIwMDU1NzQvbXlWaWRlb18xMDA4Lm1wNCJ9LHsiYnVja2V0IjoieW9uZ2xpdS1zMy1idWNrZXQifSx7ImFjbCI6InByaXZhdGUifSxbInN0YXJ0cy13aXRoIiwiJENvbnRlbnQtVHlwZSIsIiJdXX0=',
  access_key: 'ASIAQHMXXXJ3ELO7QEAV',
  upload_url: 'https://s3.amazonaws.com/yongliu-s3-bucket',
  key: 'upload_video/458935c786466fe7af7198b30d1af4ca62005574/myVideo_1008.mp4'
}
