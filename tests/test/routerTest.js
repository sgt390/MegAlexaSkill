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
        "userID": "AmazonUse56765000",
        "workflowList": {
            "Buongiorno": [
            {
                "blockType": "TextToSpeech",
                "config": {
                "TextToSpeech": "First block goes here"
                }
            },
            {
                "blockType": "FeedRSS",
                "config": {
                "URL": "https://www.ansa.it/sito/ansait_rss.xml"
                }
            },
            {
                "blockType": "TextToSpeech",
                "config": {
                "TextToSpeech": "Third block goes here"
                }
            },
            {
                "blockType": "Weather",
                "config": {
                "latitude": "45.40797",
                "longitude": "11.88586"
                }
            },
            {
                "blockType": "TextToSpeech",
                "config": {
                "TextToSpeech": "Fifth block goes here"
                }
            }
            ]
        }
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