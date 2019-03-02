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
class BlockFeedRSS extends Block {
    feedRSS;

    constructor(blockID) {
        this.feedRSS=FeedRSSFromDB(blockID);
    }

    text() {
        //logic here

        /*  HOW TO:
            feedRSS = new BlockFeedRSS; //URL
            jsonRSS = getjson() //

            return parseJson(jsonRSS);
        */
    }

    get feedRSSFromDB(blockID) {
        //blockID is used to search the correct text from dynamoDB
    }

    get json() {
        //get .json using url feed rss
        //asynch call, be careful dude
    }

    parseJson() {
        //parse element return from getJson()
    }
}

