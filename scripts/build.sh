cd scripts
rm lambda.zip
cp ../index.js ../lambda/
7z a -tzip lambda.zip ../lambda/*
rm ../lambda/index.js