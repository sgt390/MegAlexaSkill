cd scripts
rm lambda.zip
cp ../index.js ../lambda/
rm -R ../lambda/node_modules
mkdir ../lambda/node_modules
mv ../node_modules/ ../lambda/node_modules
7z a -tzip lambda.zip ../lambda/*
rm ../lambda/index.js
rm -R ../lambda/node_modules
mv ../lambda/node_modules ../node_modules