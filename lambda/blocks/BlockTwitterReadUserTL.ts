/*
* File: BlockTwitterReadUserTL.ts
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
import {BlockConfig, BlockTwitterReadConfig} from "../JSONconfigurations/JSONconfiguration";
import {Filterable} from "./utility/Filterable";
import {ConnectorBlockTwitterUserTL} from "../connectors/ConnectorBlockTwitterUserTL";

export class BlockTwitterReadUserTL implements Block, Filterable {
    private connector: ConnectorBlockTwitterUserTL;
    private limit: number = 10;

    constructor(blockConfig: BlockConfig) {
        const blockTwitterConfig: BlockTwitterReadConfig = <BlockTwitterReadConfig> blockConfig;
        this.connector = new ConnectorBlockTwitterUserTL(blockTwitterConfig);
    }

    public async text(): Promise<string> {
        return this.connector.connect(this.limit);
    }

    filterBlocks(limit: number): BlockTwitterReadUserTL {
        this.limit = limit;
        return this;
    }
}