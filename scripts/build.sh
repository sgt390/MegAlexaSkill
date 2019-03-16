cd scripts
rm lambda.zip
7z a -tzip lambda.zip ../index.js
7z a -tzip lambda.zip ../node_modules
7z a -tzip lambda.zip ../lambda/*