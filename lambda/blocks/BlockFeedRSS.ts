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

export class BlockFeedRSS implements Block {

    private connector: ConnectorBlockFeedRSS;

    constructor(blockConfig: BlockConfig) {
        const blockFeedRSSConfig: BlockFeedRSSConfig = <BlockFeedRSSConfig> blockConfig;
        let URL: string = blockFeedRSSConfig.URL.toString();
        this.connector = new ConnectorBlockFeedRSS(URL);

    }

    public async text(): Promise<string> {
        return this.connector.connect();
    }

    public isElicit(): boolean {
        return false;
    }
    
}
