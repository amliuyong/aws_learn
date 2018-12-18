

aws iam create-role --role-name yongliuCustomeAuthorizer --assume-role-policy-document file://Policy_Trust_Lambda.json
aws iam put-role-policy --role-name yongliuCustomeAuthorizer --policy-name yongliuCustomeAuthorizer --policy-document file://yongliuCustomeAuthorizer.json

aws iam get-role --role-name yongliuCustomeAuthorizer
aws iam get-role-policy --role-name yongliuCustomeAuthorizer --policy-name yongliuCustomeAuthorizer


zip -r yongliuCustomeAuthorizer.zip * -x *.zip *.json *.log

aws lambda create-function --function-name yongliuCustomeAuthorizer \
      --runtime nodejs8.10 \
      --role arn:aws:iam::015887481462:role/yongliuCustomeAuthorizer \
      --handler index.handler \
      --zip-file fileb://yongliuCustomeAuthorizer.zip \
      --region us-east-1

aws lambda tag-resource --resource arn:aws:lambda:us-east-1:015887481462:function:yongliuCustomeAuthorizer  \
    --tags '{"tr:application-asset-insight-id": "501138", "tr:financial-identifier":"0661514060" }'


#=====

aws lambda update-function-code --function-name yongliuCustomeAuthorizer --zip-file fileb://yongliuCustomeAuthorizer.zip



{
    "principalId": "am.liuyong@qq.com",
    "policyDocument": {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Action": "execute-api:Invoke",
                "Effect": "allow",
                "Resource": "arn:aws:execute-api:us-east-1:015887481462:i56bou5pk9/dev/GET/userProfile"
            }
        ]
    }
}
