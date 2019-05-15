# MegAlexaSkill

## Travis
[![Build Status](https://travis-ci.com/sgt390/MegAlexaSkill.svg?branch=master)](https://travis-ci.com/sgt390/MegAlexaSkill)

## npm scripts

### Install packages
This command download all the dipendences from the node package manager. This is required to publish the skill to AWS lambda, and to execute the tests. (Dipendences are not shared with github) 
```
npm install
```

### Unit tests
```
npm run unitTests
```

### Integration tests
```
npm run integrationTests
```

### Compile and create zip file for AWS Lambda
This command compiles TypeScript files into JavaScript files, and puts them into a zip file.
```
npm run build
```

### Clean JavaScript files and
Clean the folders from the files created with the build command.
```
npm run clean
```

### Publish skill to AWS Lambda
Compiles, publish and clean in one command.
```
npm run publish-lambda
```

 
