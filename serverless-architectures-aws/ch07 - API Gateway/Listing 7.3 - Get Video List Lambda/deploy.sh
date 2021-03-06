
aws iam delete-role --role-name yongLiuGetVideoListV2

aws iam create-role --role-name yongLiuGetVideoListV2 --assume-role-policy-document file://Policy_Trust_Lambda.json
aws iam put-role-policy --role-name yongLiuGetVideoListV2 --policy-name yongLiuGetVideoListV2 --policy-document file://yongLiuGetVideoList.json

aws iam get-role --role-name yongLiuGetVideoListV2
aws iam get-role-policy --role-name yongLiuGetVideoListV2 --policy-name yongLiuGetVideoListV2


zip -r yongLiuGetVideoListV2.zip * -x *.zip *.json *.log

aws lambda create-function --function-name yongLiuGetVideoListV2 \
      --runtime nodejs8.10 \
      --role arn:aws:iam::015887481462:role/yongLiuGetVideoListV2 \
      --handler index.handler \
      --zip-file fileb://yongLiuGetVideoListV2.zip \
      --region us-east-1

aws lambda tag-resource --resource arn:aws:lambda:us-east-1:015887481462:function:yongLiuGetVideoListV2  \
    --tags '{"tr:application-asset-insight-id": "501138", "tr:financial-identifier":"0661514060" }'


#=====
rm *zip
zip -r yongLiuGetVideoListV2.zip * -x *.zip *.json *.log

aws lambda update-function-code --function-name yongLiuGetVideoListV2 --zip-file fileb://yongLiuGetVideoListV2.zip


aws lambda invoke --function-name yongLiuGetVideoListV2 output.txt

# test

http https://i56bou5pk9.execute-api.us-east-1.amazonaws.com/dev/videos
     https://i56bou5pk9.execute-api.us-east-1.amazonaws.com/dev/videos?encoding=720p

http https://i56bou5pk9.execute-api.us-east-1.amazonaws.com/dev/videos?encoding=720p \
Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5rVTNOME14UWpkQ1FVRTVPRGxHUXpNek4wSTRNa014T0Rjd1JESkJSRUkwUmpjelFUYzBRUSJ9.eyJuaWNrbmFtZSI6ImFtLmxpdXlvbmciLCJuYW1lIjoiYW0ubGl1eW9uZ0BxcS5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvYWU3YTkwZWVjYTIyN2Y1ZmI3ZTkyYmQ2ODM1NWE3MGE_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZhbS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxOC0xMi0xN1QxNDoyMjo0OC42MTZaIiwiZW1haWwiOiJhbS5saXV5b25nQHFxLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9hbWxpdXlvbmcuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVjMTFmYzQ0OGQyMWNjMzU1NGNiYWEwZiIsImF1ZCI6IllHZkhndGtWQ1lOcUsxbXIyTWlPbGhqZXpXbkhsZHpVIiwiaWF0IjoxNTQ1MDU2NTY4LCJleHAiOjE1NDUwOTI1NjgsImF0X2hhc2giOiJwQ2hUT21WN0toS05GZGROUVM3ZTBnIiwibm9uY2UiOiJWN3hSQUthQkhadUk4ZXRDZUNpNmdtSGZJaDJlNkhsaiJ9.QanfXf0mclTPSqpeg1OJkLV1tH18X65Il7-vpTSLDnOYdEMO5Usltq4TFgjnBOIkiKmS8_rLPF9kk2kcGDoU-90jkNXNUrBKsa3m_fUjChjgyWWwkCeI1dVH2yau5jeU1JaODJzHjT7cr-n_66kRhHGnVSrIXcQZS2GgSXx5MEQwC9wwqr5lZCkDXfo8ry_6dDh0kkal4JCaFcbSF4Nw_ZNNrFqFGF0UIHeJ83dNoybZZrnve7_7iHL2XbQBZ20zLME8BHrw73sfMsxuRjACoMHrVocAk1h5dbXsYZjy0kkTUFAYOYlskME_gLALQcolZi3GnYAEmosEetBWcgp_FA'
