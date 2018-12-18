

aws iam create-role --role-name yongLiuGetUploadPolicy --assume-role-policy-document file://Policy_Trust_Lambda.json
aws iam put-role-policy --role-name yongLiuGetUploadPolicy --policy-name yongLiuGetUploadPolicy --policy-document file://yongLiuGetUploadPolicy.json

aws iam get-role --role-name yongLiuGetUploadPolicy
aws iam get-role-policy --role-name yongLiuGetUploadPolicy --policy-name yongLiuGetUploadPolicy

rm *zip
zip -r yongLiuGetUploadPolicy.zip * -x *.zip *.json *.log

aws lambda create-function --function-name yongLiuGetUploadPolicy \
      --runtime nodejs8.10 \
      --role arn:aws:iam::015887481462:role/yongLiuGetUploadPolicy \
      --handler index.handler \
      --zip-file fileb://yongLiuGetUploadPolicy.zip \
      --region us-east-1

aws lambda tag-resource --resource arn:aws:lambda:us-east-1:015887481462:function:yongLiuGetUploadPolicy  \
    --tags '{"tr:application-asset-insight-id": "501138", "tr:financial-identifier":"0661514060" }'

aws lambda  update-function-configuration --function-name yongLiuGetUploadPolicy --region us-east-1 \
    --environment 'Variables={UPLOAD_URI=https://s3.amazonaws.com,UPLOAD_BUCKET=yongliu-s3-bucket,ACCESS_KEY=ASIAQHMXXXJ3HYZG7K2I,SECRET_ACCESS_KEY=8hkO/GH4VsZpaulIiiuTV+p1mwd66/DAfhAdIml6}'

aws lambda  update-function-configuration --function-name yongLiuGetUploadPolicy --region us-east-1 \
--role arn:aws:iam::015887481462:role/yongLiuGetUploadPolicy

#=====
rm *zip
zip -r yongLiuGetUploadPolicy.zip * -x *.zip *.json *.log

aws lambda update-function-code --function-name yongLiuGetUploadPolicy --zip-file fileb://yongLiuGetUploadPolicy.zip




 + '/' + process.env.UPLOAD_BUCKET

# test

aws lambda invoke --function-name yongLiuDenialofServiceLambda \
--payload   '{"queryStringParameters":{ "filename": "myVideo1008.mp4"}}' \
output.txt
