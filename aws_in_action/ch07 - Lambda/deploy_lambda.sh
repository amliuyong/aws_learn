
aws cloudformation package --template-file template.yaml \
--s3-bucket yongliu-s3-bucket --output-template-file output.yaml


aws cloudformation deploy --stack-name yongliu-ec2-owner-tag \
--template-file output.yaml --capabilities CAPABILITY_IAM

aws cloudformation delete-stack --stack-name ec2-owner-tag
