
cd /Users/yongliu/Desktop/snapshot

aws s3 cp data_tables.jpg s3://yongliu-s3-bucket/images/ \
> --metadata '{"title":"data_table", "author":"yongliu", "width":"100", "height":"100"}'
