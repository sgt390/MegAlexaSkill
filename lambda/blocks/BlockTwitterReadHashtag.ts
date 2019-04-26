/*
* File: BlockTwitterReadHashtag.ts
* Version: 1.0.0
* Date: 2019-03-27
* Author: Matteo Depascale
* License:
*
* History:
* Author                    || Date         || Description
* Matteo Depascale          || 2019-03-27   || Created file
* Matteo Depascale          || 2019-03-27   || Implemented clasd
* Stefano Zanatta           || 2019-03-28   || Verified
* Matteo Depascale          || 2019-04-10   || Approved
*/
import {Block} from "./Block";
import {BlockConfig, BlockTwitterReadHashtagConfig} from "../JSONconfigurations/JSONconfiguration";
import {Filterable} from "./utility/Filterable";
import {ConnectorBlockTwitterHashtag} from "../connectors/ConnectorBlockTwitterHashtag";

export class BlockTwitterReadHashtag implements Block, Filterable {
    private connector: ConnectorBlockTwitterHashtag;
    private limit: number = 10;

    constructor(blockConfig: BlockConfig) {
        const blockTwitterConfig: BlockTwitterReadHashtagConfig = <BlockTwitterReadHashtagConfig> blockConfig;
        this.connector = new ConnectorBlockTwitterHashtag(blockTwitterConfig);
    }
    
    public async text(): Promise<string> {
        return this.connector.connect(this.limit);
    }

    filterBlocks(limit: number): BlockTwitterReadHashtag {
        this.limit = limit;
        return this;
    }
}