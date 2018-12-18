event: {
  resource: '/videos',
  path: '/videos',
  httpMethod: 'GET',
  headers: {
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate',
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5rVTNOME14UWpkQ1FVRTVPRGxHUXpNek4wSTRNa014T0Rjd1JESkJSRUkwUmpjelFUYzBRUSJ9.eyJuaWNrbmFtZSI6ImFtLmxpdXlvbmciLCJuYW1lIjoiYW0ubGl1eW9uZ0BxcS5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvYWU3YTkwZWVjYTIyN2Y1ZmI3ZTkyYmQ2ODM1NWE3MGE_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZhbS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxOC0xMi0xN1QxMzo0MjoyNy4zNjlaIiwiZW1haWwiOiJhbS5saXV5b25nQHFxLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9hbWxpdXlvbmcuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVjMTFmYzQ0OGQyMWNjMzU1NGNiYWEwZiIsImF1ZCI6IllHZkhndGtWQ1lOcUsxbXIyTWlPbGhqZXpXbkhsZHpVIiwiaWF0IjoxNTQ1MDU0MTQ3LCJleHAiOjE1NDUwOTAxNDcsImF0X2hhc2giOiJ4TEhFR21QQjE4d0VHVlJiVHhVQVBRIiwibm9uY2UiOiJ2ODE3VUJuVnBCWXNuLmkydWRVN3dDWEZGNjA5RUNhYyJ9.kAfUpGvtJruoevj999Kbvk5_0Nahbo_qRYvNTMUfE4G7l28zatu1J3Bv-UCHa07tl57jljHkTJo5Gms6dyxocWXCVukzNZdlJPZotkesS4gGWXg6eN9NLFLz0x8oOEa76AU6_CLBBq1jNZ0COHHdJxptyHXEHRD_uSBw-3NQLlt4-Gt5eD8vDW3A3PnxO2lBbdzzE1HTGcgQUKMyaiVOhzkDrHNZMK3ThlM3S6QaJqOyg1Dk1lpXcqU2ryW9YKmUIX0Z3OhUgjK7-u_PQQSJql72sisyI9bR4Sl4hV_bFiJ-qyTbhsnS8FDJjjJBDqPzRh7CGi7kS4bh-B4V772ibg',
    Host: 'i56bou5pk9.execute-api.us-east-1.amazonaws.com',
    'User-Agent': 'HTTPie/1.0.2',
    'X-Amzn-Trace-Id': 'Root=1-5c17a873-d0e307f0d0a578d02242e9e0',
    'X-Forwarded-For': '111.199.185.187',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https'
  },
  multiValueHeaders: {
    Accept: ['*/*'],
    'Accept-Encoding': ['gzip, deflate'],
    Authorization: [
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5rVTNOME14UWpkQ1FVRTVPRGxHUXpNek4wSTRNa014T0Rjd1JESkJSRUkwUmpjelFUYzBRUSJ9.eyJuaWNrbmFtZSI6ImFtLmxpdXlvbmciLCJuYW1lIjoiYW0ubGl1eW9uZ0BxcS5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvYWU3YTkwZWVjYTIyN2Y1ZmI3ZTkyYmQ2ODM1NWE3MGE_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZhbS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxOC0xMi0xN1QxMzo0MjoyNy4zNjlaIiwiZW1haWwiOiJhbS5saXV5b25nQHFxLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9hbWxpdXlvbmcuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVjMTFmYzQ0OGQyMWNjMzU1NGNiYWEwZiIsImF1ZCI6IllHZkhndGtWQ1lOcUsxbXIyTWlPbGhqZXpXbkhsZHpVIiwiaWF0IjoxNTQ1MDU0MTQ3LCJleHAiOjE1NDUwOTAxNDcsImF0X2hhc2giOiJ4TEhFR21QQjE4d0VHVlJiVHhVQVBRIiwibm9uY2UiOiJ2ODE3VUJuVnBCWXNuLmkydWRVN3dDWEZGNjA5RUNhYyJ9.kAfUpGvtJruoevj999Kbvk5_0Nahbo_qRYvNTMUfE4G7l28zatu1J3Bv-UCHa07tl57jljHkTJo5Gms6dyxocWXCVukzNZdlJPZotkesS4gGWXg6eN9NLFLz0x8oOEa76AU6_CLBBq1jNZ0COHHdJxptyHXEHRD_uSBw-3NQLlt4-Gt5eD8vDW3A3PnxO2lBbdzzE1HTGcgQUKMyaiVOhzkDrHNZMK3ThlM3S6QaJqOyg1Dk1lpXcqU2ryW9YKmUIX0Z3OhUgjK7-u_PQQSJql72sisyI9bR4Sl4hV_bFiJ-qyTbhsnS8FDJjjJBDqPzRh7CGi7kS4bh-B4V772ibg'
    ],
    Host: ['i56bou5pk9.execute-api.us-east-1.amazonaws.com'],
    'User-Agent': ['HTTPie/1.0.2'],
    'X-Amzn-Trace-Id': ['Root=1-5c17a873-d0e307f0d0a578d02242e9e0'],
    'X-Forwarded-For': ['111.199.185.187'],
    'X-Forwarded-Port': ['443'],
    'X-Forwarded-Proto': ['https']
  },
  queryStringParameters: {
    encoding: '720p'
  },
  multiValueQueryStringParameters: {
    encoding: ['720p']
  },
  pathParameters: null,
  stageVariables: null,
  requestContext: {
    resourceId: 'km0rtj',
    authorizer: {
      principalId: 'am.liuyong@qq.com'
    },
    resourcePath: '/videos',
    httpMethod: 'GET',
    extendedRequestId: 'SDdCGGvxoAMFzdg=',
    requestTime: '17/Dec/2018:13:45:23 +0000',
    path: '/dev/videos',
    accountId: '015887481462',
    protocol: 'HTTP/1.1',
    stage: 'dev',
    domainPrefix: 'i56bou5pk9',
    requestTimeEpoch: 1545054323888,
    requestId: '00d85b68-0202-11e9-96a7-5508b0f01e3d',
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      sourceIp: '111.199.185.187',
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: 'HTTPie/1.0.2',
      user: null
    },
    domainName: 'i56bou5pk9.execute-api.us-east-1.amazonaws.com',
    apiId: 'i56bou5pk9'
  },
  body: null,
  isBase64Encoded: false
}



data: {
  IsTruncated: false,
  Marker: '',
  Contents: [{
    Key: 'upload_video/VPC-1080p.json',
    LastModified: 2018 - 12 - 12 T10: 57: 29.000 Z,
    ETag: '"efab788691217510dbcb4f6439af5c25"',
    Size: 219,
    StorageClass: 'STANDARD'
  }, {
    Key: 'upload_video/VPC-1080p.mp4',
    LastModified: 2018 - 12 - 12 T10: 57: 28.000 Z,
    ETag: '"ef5ba2a61042854e2046832d74d9c962"',
    Size: 9603808,
    StorageClass: 'REDUCED_REDUNDANCY'
  }, {
    Key: 'upload_video/VPC-720p.json',
    LastModified: 2018 - 12 - 12 T10: 57: 30.000 Z,
    ETag: '"38f6c2a64386d0864b85397b64cbdbde"',
    Size: 217,
    StorageClass: 'STANDARD'
  }, {
    Key: 'upload_video/VPC-720p.mp4',
    LastModified: 2018 - 12 - 12 T10: 57: 28.000 Z,
    ETag: '"bcadaa1ab8853acd4e068af9cc04e2e2"',
    Size: 8107010,
    StorageClass: 'REDUCED_REDUNDANCY'
  }, {
    Key: 'upload_video/VPC-web-720p.json',
    LastModified: 2018 - 12 - 12 T10: 57: 31.000 Z,
    ETag: '"c8d96a8822301951a0e379ec6bad78d6"',
    Size: 225,
    StorageClass: 'STANDARD'
  }, {
    Key: 'upload_video/VPC-web-720p.mp4',
    LastModified: 2018 - 12 - 12 T10: 57: 30.000 Z,
    ETag: '"9696e37cba23ca4729b371b6b2b3ac60"',
    Size: 6924742,
    StorageClass: 'REDUCED_REDUNDANCY'
  }],
  Name: 'yongliu-s3-test',
  Prefix: 'upload_video/',
  MaxKeys: 1000,
  CommonPrefixes: []
}
