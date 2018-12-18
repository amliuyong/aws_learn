
aws iam delete-role --role-name yongLiuGetVideoList
aws iam create-role --role-name yongLiuGetVideoList --assume-role-policy-document file://Policy_Trust_Lambda.json
aws iam put-role-policy --role-name yongLiuGetVideoList --policy-name yongLiuGetVideoList --policy-document file://yongLiuGetVideoList.json

aws iam get-role --role-name yongLiuGetVideoList
aws iam get-role-policy --role-name yongLiuGetVideoList --policy-name yongLiuGetVideoList


zip -r yongLiuGetVideoList.zip * -x *.zip *.json *.log

aws lambda create-function --function-name yongLiuGetVideoList \
      --runtime nodejs8.10 \
      --role arn:aws:iam::015887481462:role/yongLiuGetVideoList \
      --handler index.handler \
      --zip-file fileb://yongLiuGetVideoList.zip \
      --region us-east-1

aws lambda tag-resource --resource arn:aws:lambda:us-east-1:015887481462:function:yongLiuGetVideoList  \
    --tags '{"tr:application-asset-insight-id": "501138", "tr:financial-identifier":"0661514060" }'


#=====

aws lambda update-function-code --function-name yongLiuGetVideoList --zip-file fileb://yongLiuGetVideoList.zip


aws lambda invoke --function-name yongLiuGetVideoList output.txt
