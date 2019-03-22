cd scripts
sh build.sh
echo 'releasing to AWS Lambda...'
aws lambda update-function-code --function-name megalexa --zip-file fileb://lambda.zip
sh clean.sh