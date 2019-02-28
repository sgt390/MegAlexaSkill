cd scripts
rm lambda.zip
cp ../index.js ../lambda/
rm -R ../lambda/node_modules
mkdir ../lambda/node_modules
mv ../node_modules/ask-sdk-core ../lambda/node_modules/ask-sdk-core
mv ../node_modules/ask-sdk-model ../lambda/node_modules/ask-sdk-model
mv ../node_modules/ask-sdk-runtime ../lambda/node_modules/ask-sdk-runtime
mv ../lambda/node_modules/ask-sdk-core ../node_modules/ask-sdk-core
mv ../lambda/node_modules/ask-sdk-model ../node_modules/ask-sdk-model
mv ../lambda/node_modules/ask-sdk-runtime ../node_modules/ask-sdk-runtime
7z a -tzip lambda.zip ../lambda/*
rm ../lambda/index.js
rm -R ../lambda/node_modules