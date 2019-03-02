/*
* File: routerTest.js
* Version: 0.0.1
* Date: Date: 2019-02-28
* Author: Stefano Zanatta
* License:
*
* History:
* Author            || Date         ||  descriptor
* Stefano Zanatta   || 2019-02-28   || Created file
*/
const assert = require('chai').assert;
var Router = require('../../lambda/router/router.js');

var router = new Router("AmazonUse56765000");

const oracle = 
{
    "Item":
    {
        "email": "matteo.depascale@gmail.com",
        "name": "africa",
        "workflowList": {
            "Buongiorno": [
                {
                "blockType": "Allarmino",
                "textToSpeech": "Ciao, io suono piano"
                },
                {
                "blockType": "Sveglia",
                "textToSpeech": "Ciao, io suono"
                },
                {
                "blockType": "Allarmone",
                "textToSpeech": "Ciao, io suono"
                },
                {
                "blockType": "Feed Rss",
                "textToSpeech": "Ciao, io feeeddo"
                },
                {
                "blockType": "TextToSpeech",
                "textToSpeech": "Ciao, io suono"
                },
                {
                "blockType": "feeeed RSS",
                "textToSpeech": "Ciao, io fido"
                }
            ]
        },
        "userID": "AmazonUse56765000"
    }
};
describe('Router', function(){
    it('description', function(){
        result = router.userData();
        result.then(result => {
            console.log(JSON.stringify(result));
            console.log('/////////////////////////');
            assert.equal(JSON.stringify(result),JSON.stringify(oracle));
        })
        .catch(function(error){
            console.log(error);
        });
    });
});