cd scripts
sh build.sh
sh _clean1.sh
echo 'releasing to AWS Lambda...'
aws lambda update-function-code --function-name megalexa --zip-file fileb://lambda.zip
sh _clean2.sh