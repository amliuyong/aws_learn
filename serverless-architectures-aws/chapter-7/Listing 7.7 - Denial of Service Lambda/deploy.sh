

aws iam create-role --role-name yongLiuDenialofServiceLambda --assume-role-policy-document file://Policy_Trust_Lambda.json
aws iam put-role-policy --role-name yongLiuDenialofServiceLambda --policy-name yongLiuDenialofServiceLambda --policy-document file://yongLiuDenialofServiceLambda.json

aws iam get-role --role-name yongLiuDenialofServiceLambda
aws iam get-role-policy --role-name yongLiuDenialofServiceLambda --policy-name yongLiuDenialofServiceLambda


zip -r yongLiuDenialofServiceLambda.zip * -x *.zip *.json *.log

aws lambda create-function --function-name yongLiuDenialofServiceLambda \
      --runtime nodejs8.10 \
      --role arn:aws:iam::015887481462:role/yongLiuDenialofServiceLambda \
      --handler index.handler \
      --zip-file fileb://yongLiuDenialofServiceLambda.zip \
      --region us-east-1

aws lambda tag-resource --resource arn:aws:lambda:us-east-1:015887481462:function:yongLiuDenialofServiceLambda  \
    --tags '{"tr:application-asset-insight-id": "501138", "tr:financial-identifier":"0661514060" }'


#=====
rm *zip
zip -r yongLiuDenialofServiceLambda.zip * -x *.zip *.json *.log

aws lambda update-function-code --function-name yongLiuDenialofServiceLambda --zip-file fileb://yongLiuDenialofServiceLambda.zip



# test

aws lambda invoke --function-name yongLiuDenialofServiceLambda \
--payload   '{ "options": "https://i56bou5pk9.execute-api.us-east-1.amazonaws.com/dev/videos"}' \
output.txt
