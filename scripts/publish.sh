cd scripts
sh build.sh
aws lambda update-function-code --function-name megalexa --zip-file fileb://lambda.zip
sh clean.sh