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
class BlockFeedRSS extends Block {

    constructor(blockConfig) {
        super();
        this.feedRSS=blockConfig;
        console.log(this.feedRSS);
    }

    text() {
        //logic here

        //   return parseJson(jsonRSS);
    }

    parseJson() {
        //parse element return from getJson()
    }
    isElicit(){
        return false;
    }

}
const newblockfeedrss = require("./sample.xml");
new BlockFeedRSS("newblockfeedrss"); 

