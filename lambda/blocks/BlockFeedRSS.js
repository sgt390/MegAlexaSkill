/*
* File: BlockFeedRSS.js
* Version: 0.0.1
* Date: 2019-02-25
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-02-25   || Created file
*/

//keep an eye on https://github.com/alexa/skill-sample-nodejs-feed/blob/master/lambda/custom
'use strict';
const Block = require("./Block");
let Parser = require('rss-parser');
let parser = new Parser();

class BlockFeedRSS extends Block {

    constructor(blockConfig) {
        super(blockConfig);
    }

    get text() {
        let feed = parser.parseURL('http://www.meteoam.it/situazione.xml');
        return feed.then(function(result){
            return result.items.map(el => el.title + ". " + el.description + ". ");
        }).catch(function(error) {
            console.log(error);
        });
    }



    isElicit(){
        return false;
    }

}


let b = new BlockFeedRSS({});
async function a() {
    let c = await b.text;
    console.log(c);
}
a();