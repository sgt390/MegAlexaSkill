/*
* File: ConnectorBlockFeedRSS.ts
* Version: 1.0.0
* Date: 2019-02-25
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-02-25   || Created file
* Stefano Zanatta       || 2019-03-22   || Implemented
* Matteo Depascale      || 2019-03-24   || Verified
* Matteo Depascale      || 2019-04-26   || Approved
*/
import { ConnectorBlock } from "./ConnectorBlock";
import { connectorFeedRSSResult } from "../JSONconfigurations/JSONconfiguration";
import { PhrasesGenerator } from "./../blocks/utility/PhrasesGenerator";
const Parser = require('rss-parser');
const parser = new Parser();

export class ConnectorBlockFeedRSS implements ConnectorBlock {

    constructor(private URL: string) {
    }

    public async connect(limit:number = Number.POSITIVE_INFINITY): Promise<string> {

        let feed = parser.parseURL(this.URL);
        return feed.then(function(result: connectorFeedRSSResult) {
            return result.items
            .splice(0,limit)
            .map(el => el.title + " " + el.content + " ")
            .reduce(((buffer, element) => buffer + element), "")
            .trim();
            
        }).catch(function(error: string) {
            console.log('there was an error with the feed rss connector: £££££'+ error);
            return "there was an error with the feed rss";
        });
    }
}