/*
* File: BlockFeedRSS.ts
* Version: 1.0.0
* Date: 2019-02-25
* Author: Matteo Depascale
* License:
*
* History:
* Author                    || Date         || Description
* Matteo Depascale          || 2019-02-25   || Created file
* Stefano Zanatta           || 2019-03-25   || Implemented clasd
* Matteo Depascale          || 2019-03-28   || Verified
* Matteo Depascale          || 2019-04-10   || Approved
*/
import {Block} from "./Block";
import {BlockConfig, BlockFeedRSSConfig} from "./../JSONconfigurations/JSONconfiguration";
import {ConnectorBlockFeedRSS} from './../connectors/ConnectorBlockFeedRSS'
import { Filterable } from "./utility/Filterable";

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

    filterBlocks(limit: number): BlockFeedRSS{
        this.limit = limit;
        return this;
    }
}
