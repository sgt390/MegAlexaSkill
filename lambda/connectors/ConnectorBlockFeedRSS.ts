/*
* File: ConnectorBlockFeedRSS.ts
* Version: 0.0.1
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-20   || Created file
*/
import { ConnectorBlock } from "./ConnectorBlock";
import { connectorFeedRSSResult } from "../JSONconfigurations/JSONconfiguration";
const Parser = require('rss-parser');
const parser = new Parser();

export class ConnectorBlockFeedRSS implements ConnectorBlock {

    constructor(private URL: String) {
    }

    public async connect(): Promise<String> {

        let feed = parser.parseURL(this.URL);
        return feed.then(function(result: connectorFeedRSSResult){
            return result.items
            .map(el => el.title + " " + el.content + " ")
            .reduce(((buffer, element) => buffer + element), "")
            .trim();
        }).catch(function(error: String) {
            console.log(error);
            return "there was an error with the feed rss";
        });
    }
}