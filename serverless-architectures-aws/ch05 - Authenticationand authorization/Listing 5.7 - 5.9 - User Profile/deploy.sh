

aws iam create-role --role-name yongliuGetUserProfile --assume-role-policy-document file://Policy_Trust_Lambda.json
aws iam put-role-policy --role-name yongliuGetUserProfile --policy-name yongliuGetUserProfile --policy-document file://yongliuGetUserProfile.json

aws iam get-role --role-name yongliuGetUserProfile
aws iam get-role-policy --role-name yongliuGetUserProfile --policy-name yongliuGetUserProfile


cd ./fn
zip -r yongliuGetUserProfile.zip * -x *.zip *.json *.log

aws lambda create-function --function-name yongliuGetUserProfile \
      --runtime nodejs8.10 \
      --role arn:aws:iam::015887481462:role/yongliuGetUserProfile \
      --handler index.handler \
      --zip-file fileb://yongliuGetUserProfile.zip \
      --region us-east-1

aws lambda tag-resource --resource arn:aws:lambda:us-east-1:015887481462:function:yongliuGetUserProfile  \
    --tags '{"tr:application-asset-insight-id": "501138", "tr:financial-identifier":"0661514060" }'


#=====

aws lambda update-function-code --function-name yongliuGetUserProfile --zip-file fileb://yongliuGetUserProfile.zip


curl --request GET \
      --url 'https://YOUR_AUTH0_DOMAIN/userinfo' \
      --header 'Authorization: Bearer {ACCESS_TOKEN}' \
      --header 'Content-Type: application/json'



      id_token: eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5rVTNOME14UWpkQ1FVRTVPRGxHUXpNek4wSTRNa014T0Rjd1JESkJSRUkwUmpjelFUYzBRUSJ9.eyJuaWNrbmFtZSI6ImFtLmxpdXlvbmciLCJuYW1lIjoiYW0ubGl1eW9uZ0BxcS5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvYWU3YTkwZWVjYTIyN2Y1ZmI3ZTkyYmQ2ODM1NWE3MGE_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZhbS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxOC0xMi0xN1QwNTowMzoyNS40NjlaIiwiZW1haWwiOiJhbS5saXV5b25nQHFxLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9hbWxpdXlvbmcuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVjMTFmYzQ0OGQyMWNjMzU1NGNiYWEwZiIsImF1ZCI6IllHZkhndGtWQ1lOcUsxbXIyTWlPbGhqZXpXbkhsZHpVIiwiaWF0IjoxNTQ1MDIzMDA1LCJleHAiOjE1NDUwNTkwMDUsImF0X2hhc2giOiJhOFk5eW5MQndvLXhqWDl2aHNfM2xBIiwibm9uY2UiOiJsWn4yY0xqZ2pLRDRUcnZwTGwyLkZ2eHlaSUZCY2JpMSJ9.R7LOi3Il1BRuJUsedv_HtWdZP6W7eRV58lywkxw0NeIuVQ596xQcFwm-g4BXesuyOrqTDSrsxEpiltxHAZPKFSBdI89JZCjOh2OlYKa4r9FdqeE2GkwaRKVUv9jogHwXuSEV5EarKscfAEX2NCPFrwHx2bmex8ftuUC1q8FuTcDbDMX_HdcQA4Ba4Z7_PDYQh-750L1jtpPZmgN_mSomnVRFS4t77cLo2Qd3Aci0Sm54G2Y5-wT5vUZaqvK28HhwyxlEeSEVIWT4BE5R-Btz9XdyLLEV-VnLS_acUOqNYn4XpF7xL-jWBBN2_-0sXn8Bo4_AQLpa3ry-sgKandVaFw
      app.js:156 access_token: nbzGm9blHHOEWAqkOKeqCxOX4Ad9dsOt


Headers:

Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5rVTNOME14UWpkQ1FVRTVPRGxHUXpNek4wSTRNa014T0Rjd1JESkJSRUkwUmpjelFUYzBRUSJ9.eyJuaWNrbmFtZSI6ImFtLmxpdXlvbmciLCJuYW1lIjoiYW0ubGl1eW9uZ0BxcS5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvYWU3YTkwZWVjYTIyN2Y1ZmI3ZTkyYmQ2ODM1NWE3MGE_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZhbS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxOC0xMi0xN1QwNTowMzoyNS40NjlaIiwiZW1haWwiOiJhbS5saXV5b25nQHFxLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9hbWxpdXlvbmcuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVjMTFmYzQ0OGQyMWNjMzU1NGNiYWEwZiIsImF1ZCI6IllHZkhndGtWQ1lOcUsxbXIyTWlPbGhqZXpXbkhsZHpVIiwiaWF0IjoxNTQ1MDIzMDA1LCJleHAiOjE1NDUwNTkwMDUsImF0X2hhc2giOiJhOFk5eW5MQndvLXhqWDl2aHNfM2xBIiwibm9uY2UiOiJsWn4yY0xqZ2pLRDRUcnZwTGwyLkZ2eHlaSUZCY2JpMSJ9.R7LOi3Il1BRuJUsedv_HtWdZP6W7eRV58lywkxw0NeIuVQ596xQcFwm-g4BXesuyOrqTDSrsxEpiltxHAZPKFSBdI89JZCjOh2OlYKa4r9FdqeE2GkwaRKVUv9jogHwXuSEV5EarKscfAEX2NCPFrwHx2bmex8ftuUC1q8FuTcDbDMX_HdcQA4Ba4Z7_PDYQh-750L1jtpPZmgN_mSomnVRFS4t77cLo2Qd3Aci0Sm54G2Y5-wT5vUZaqvK28HhwyxlEeSEVIWT4BE5R-Btz9XdyLLEV-VnLS_acUOqNYn4XpF7xL-jWBBN2_-0sXn8Bo4_AQLpa3ry-sgKandVaFw
access_token:nbzGm9blHHOEWAqkOKeqCxOX4Ad9dsOt

API mapping:

      {
      "id_token": "$input.params('Authorization')",
      "access_token": "$input.params('access_token')"
      }



curl --request GET \
      --url 'https://i56bou5pk9.execute-api.us-east-1.amazonaws.com/dev/userProfile' \
      --header 'Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5rVTNOME14UWpkQ1FVRTVPRGxHUXpNek4wSTRNa014T0Rjd1JESkJSRUkwUmpjelFUYzBRUSJ9.eyJuaWNrbmFtZSI6ImFtLmxpdXlvbmciLCJuYW1lIjoiYW0ubGl1eW9uZ0BxcS5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvYWU3YTkwZWVjYTIyN2Y1ZmI3ZTkyYmQ2ODM1NWE3MGE_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZhbS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxOC0xMi0xN1QwNTowMzoyNS40NjlaIiwiZW1haWwiOiJhbS5saXV5b25nQHFxLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9hbWxpdXlvbmcuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVjMTFmYzQ0OGQyMWNjMzU1NGNiYWEwZiIsImF1ZCI6IllHZkhndGtWQ1lOcUsxbXIyTWlPbGhqZXpXbkhsZHpVIiwiaWF0IjoxNTQ1MDIzMDA1LCJleHAiOjE1NDUwNTkwMDUsImF0X2hhc2giOiJhOFk5eW5MQndvLXhqWDl2aHNfM2xBIiwibm9uY2UiOiJsWn4yY0xqZ2pLRDRUcnZwTGwyLkZ2eHlaSUZCY2JpMSJ9.R7LOi3Il1BRuJUsedv_HtWdZP6W7eRV58lywkxw0NeIuVQ596xQcFwm-g4BXesuyOrqTDSrsxEpiltxHAZPKFSBdI89JZCjOh2OlYKa4r9FdqeE2GkwaRKVUv9jogHwXuSEV5EarKscfAEX2NCPFrwHx2bmex8ftuUC1q8FuTcDbDMX_HdcQA4Ba4Z7_PDYQh-750L1jtpPZmgN_mSomnVRFS4t77cLo2Qd3Aci0Sm54G2Y5-wT5vUZaqvK28HhwyxlEeSEVIWT4BE5R-Btz9XdyLLEV-VnLS_acUOqNYn4XpF7xL-jWBBN2_-0sXn8Bo4_AQLpa3ry-sgKandVaFw'  \
      --header 'access_token:nbzGm9blHHOEWAqkOKeqCxOX4Ad9dsOt'

#Doc https://httpie.org/doc#http-headers

http https://i56bou5pk9.execute-api.us-east-1.amazonaws.com/dev/userProfile \
Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5rVTNOME14UWpkQ1FVRTVPRGxHUXpNek4wSTRNa014T0Rjd1JESkJSRUkwUmpjelFUYzBRUSJ9.eyJuaWNrbmFtZSI6ImFtLmxpdXlvbmciLCJuYW1lIjoiYW0ubGl1eW9uZ0BxcS5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvYWU3YTkwZWVjYTIyN2Y1ZmI3ZTkyYmQ2ODM1NWE3MGE_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZhbS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxOC0xMi0xN1QwNTowMzoyNS40NjlaIiwiZW1haWwiOiJhbS5saXV5b25nQHFxLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9hbWxpdXlvbmcuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVjMTFmYzQ0OGQyMWNjMzU1NGNiYWEwZiIsImF1ZCI6IllHZkhndGtWQ1lOcUsxbXIyTWlPbGhqZXpXbkhsZHpVIiwiaWF0IjoxNTQ1MDIzMDA1LCJleHAiOjE1NDUwNTkwMDUsImF0X2hhc2giOiJhOFk5eW5MQndvLXhqWDl2aHNfM2xBIiwibm9uY2UiOiJsWn4yY0xqZ2pLRDRUcnZwTGwyLkZ2eHlaSUZCY2JpMSJ9.R7LOi3Il1BRuJUsedv_HtWdZP6W7eRV58lywkxw0NeIuVQ596xQcFwm-g4BXesuyOrqTDSrsxEpiltxHAZPKFSBdI89JZCjOh2OlYKa4r9FdqeE2GkwaRKVUv9jogHwXuSEV5EarKscfAEX2NCPFrwHx2bmex8ftuUC1q8FuTcDbDMX_HdcQA4Ba4Z7_PDYQh-750L1jtpPZmgN_mSomnVRFS4t77cLo2Qd3Aci0Sm54G2Y5-wT5vUZaqvK28HhwyxlEeSEVIWT4BE5R-Btz9XdyLLEV-VnLS_acUOqNYn4XpF7xL-jWBBN2_-0sXn8Bo4_AQLpa3ry-sgKandVaFw' \
access_token:nbzGm9blHHOEWAqkOKeqCxOX4Ad9dsOt \
--pretty=all
