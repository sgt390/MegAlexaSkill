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
* Stefano Zanatta       || 2019-03-21   || Update
*/

//keep an eye on https://github.com/alexa/skill-sample-nodejs-feed/blob/master/lambda/custom

import {Block} from "./Block";
import {BlockConfig, BlockFeedRSSConfig} from "./../JSONconfigurations/JSONconfiguration";
import {ConnectorBlockFeedRSS} from './../connectors/ConnectorBlockFeedRSS'
import { Filterable } from "./Filterable";

export class BlockFeedRSS implements Block, Filterable {
    private connector: ConnectorBlockFeedRSS;
    private _text: Promise<string> | undefined;
    private limit: number = Number.POSITIVE_INFINITY;
    constructor(blockConfig: BlockConfig) {
        const blockFeedRSSConfig: BlockFeedRSSConfig = <BlockFeedRSSConfig> blockConfig;
        let URL: string = blockFeedRSSConfig.URL.toString();
        this.connector = new ConnectorBlockFeedRSS(URL);

    }

    public async text(): Promise<string> {
        /**
         * Simple cache system
         */
        if(!this._text){
            this._text = this.connector.connect(this.limit);
        }
        return this._text;
    }

    public isElicit(): boolean {
        return false;
    }

    filterBlocks(limit: number): BlockFeedRSS{
        this.limit = limit;
        return this;
    }

    toString(): string {
        throw new Error("Method not implemented.");
    }
}
