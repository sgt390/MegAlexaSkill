/*
* File: BlockFeedRSS.ts
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

import {Block} from "./Block";
import {BlockConfig, BlockFeedRSSConfig, feedRssJSON} from "./../JSONconfigurations/JSONconfiguration"; 
const Parser = require('rss-parser');
const parser = new Parser();

export class BlockFeedRSS implements Block {

    private URL: String;
    constructor(blockConfig: BlockConfig) {
        const blockFeedRSSConfig = <BlockFeedRSSConfig> blockConfig;
        this.URL = blockFeedRSSConfig.URL.toString();
    }

    public async text(): Promise<String> {
        let feed = parser.parseURL(this.URL);
        return feed.then(function(result: feedRssJSON){
            return result.items
            .map(el => el.title + " " + el.content + " ")
            .reduce(((buffer, element) => buffer + element), "")
            .trim();
        }).catch(function(error: String) {
            console.log(error);
            return "there was an error with the feed rss";
        });
    }

    public isElicit(): boolean{
        return false;
    }
    
}
