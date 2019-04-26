/*
* File: BlockTwitterReadHomeTL.ts
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
import {BlockConfig, BlockTwitterReadHTLConfig} from "../JSONconfigurations/JSONconfiguration";
import {Filterable} from "./utility/Filterable";
import {ConnectorBlockTwitterHomeTL} from "../connectors/ConnectorBlockTwitterHomeTL";

export class BlockTwitterReadHomeTL implements Block, Filterable {
    private connector: ConnectorBlockTwitterHomeTL;
    private limit: number = 10;

    constructor(blockConfig: BlockConfig) {
        const blockTwitterReadHTLConfig: BlockTwitterReadHTLConfig = <BlockTwitterReadHTLConfig> blockConfig;
        this.connector = new ConnectorBlockTwitterHomeTL(blockTwitterReadHTLConfig);
    }

    public async text(): Promise<string> {
        return this.connector.connect(this.limit);
    }

    filterBlocks(limit: number): BlockTwitterReadHomeTL {
        this.limit = limit;
        return this;
    }
}

/*
const tconf = {
    
}
let a = new ConnectorBlockTwitterHomeTL(tconf);
a.connect().then(el => console.log(el));
*/