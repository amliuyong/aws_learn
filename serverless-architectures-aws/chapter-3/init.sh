
pipelineId=arn:aws:elastictranscoder:us-east-1:015887481462:pipeline/1544579526101-6is2g9

cd /Users/yongliu/Documents/github/github2/aws/serverless-architectures-aws/chapter-3

# yongliuTranscodeVideo
cd iam/
aws iam create-role --role-name yongliuTranscodeVideo --assume-role-policy-document file://Policy_Trust_Lambda.json
# aws iam update-assume-role-policy --role-name yongliuTranscodeVideo --policy-document file://Policy_Trust_Lambda.json
aws iam put-role-policy --role-name yongliuTranscodeVideo --policy-name yongliuTranscodeVideo --policy-document file://yongliuTranscodeVideo.json

aws iam get-role --role-name yongliuTranscodeVideo
aws iam get-role-policy --role-name yongliuTranscodeVideo --policy-name yongliuTranscodeVideo


cd ../"Listing 3.1 - 3.4 - Transcode Video Lambda"

zip -r yongliuTranscodeVideo.zip * -x *.zip *.json *.log

aws lambda create-function --function-name yongliuTranscodeVideo \
      --runtime nodejs8.10 \
      --role arn:aws:iam::015887481462:role/yongliuTranscodeVideo \
      --handler index.handler \
      --zip-file fileb://yongliuTranscodeVideo.zip \
      --region us-east-1


aws lambda tag-resource --resource arn:aws:lambda:us-east-1:015887481462:function:yongliuTranscodeVideo  \
    --tags '{"tr:application-asset-insight-id": "501138", "tr:financial-identifier":"0661514060" }'

aws lambda update-function-configuration --function-name yongliuTranscodeVideo \
--timeout 180  --memory-size 1024


#-------------------------#
aws lambda update-function-code --function-name yongliuTranscodeVideo \
      --zip-file fileb://yongliuTranscodeVideo.zip \
      --region us-east-1

rm yongliuTranscodeVideo.zip

# Test
cd /Users/yongliu/Documents/test_video

aws s3 rm s3://yongliu-s3-bucket/upload_video --recursive
aws s3 rm s3://yongliu-s3-test/upload_video --recursive

aws s3 cp VPC.mp4  s3://yongliu-s3-bucket/upload_video/

aws s3 cp VPC.mp4  s3://yongliu-s3-test/upload_video/VPC9.mp4


# yongliuSetVideoPermissions

cd iam/
aws iam create-role --role-name yongliuSetVideoPermissions --assume-role-policy-document file://Policy_Trust_Lambda.json
aws iam put-role-policy --role-name yongliuSetVideoPermissions --policy-name yongliuSetVideoPermissions --policy-document file://yongliuSetVideoPermissions.json

aws iam get-role --role-name yongliuSetVideoPermissions
aws iam get-role-policy --role-name yongliuSetVideoPermissions --policy-name yongliuSetVideoPermissions

cd 'Listing 3.6 - Set Permissions Lambda'



zip -r yongliuSetVideoPermissions.zip * -x *.zip *.json *.log

aws lambda create-function --function-name yongliuSetVideoPermissions \
      --runtime nodejs8.10 \
      --role arn:aws:iam::015887481462:role/yongliuSetVideoPermissions \
      --handler index.handler \
      --zip-file fileb://yongliuSetVideoPermissions.zip \
      --region us-east-1


aws lambda tag-resource --resource arn:aws:lambda:us-east-1:015887481462:function:yongliuSetVideoPermissions  \
    --tags '{"tr:application-asset-insight-id": "501138", "tr:financial-identifier":"0661514060" }'


# yongliuExtractVideoMetadata



cd iam/
aws iam create-role --role-name yongliuExtractVideoMetadata --assume-role-policy-document file://Policy_Trust_Lambda.json
aws iam put-role-policy --role-name yongliuExtractVideoMetadata --policy-name yongliuExtractVideoMetadata --policy-document file://yongliuExtractVideoMetadata.json

aws iam get-role --role-name yongliuExtractVideoMetadata
aws iam get-role-policy --role-name yongliuExtractVideoMetadata --policy-name yongliuExtractVideoMetadata

cd ..

cd 'Listing 3.7 - Extract Metadata Lambda'

rm *zip
zip -r yongliuExtractVideoMetadata.zip * -x *.zip *.json *.log

aws s3 cp yongliuExtractVideoMetadata.zip s3://yongliu-s3-bucket/fn_code/

aws lambda update-function-code --function-name yongliuExtractVideoMetadata  \
--s3-bucket yongliu-s3-bucket \
--s3-key fn_code/yongliuExtractVideoMetadata.zip \
--region us-east-1

aws s3 cp VPC.mp4  s3://yongliu-s3-test/upload_video/VPC15.mp4


aws lambda create-function --function-name yongliuExtractVideoMetadata \
      --runtime nodejs8.10 \
      --role arn:aws:iam::015887481462:role/yongliuExtractVideoMetadata \
      --handler index.handler \
      --code  S3Bucket=yongliu-s3-bucket,S3Key=fn_code/yongliuExtractVideoMetadata.zip \
      --region us-east-1


aws lambda update-function-configuration --function-name yongliuExtractVideoMetadata \
      --timeout 180  --memory-size 1024


aws lambda tag-resource --resource arn:aws:lambda:us-east-1:015887481462:function:yongliuExtractVideoMetadata  \
    --tags '{"tr:application-asset-insight-id": "501138", "tr:financial-identifier":"0661514060" }'
