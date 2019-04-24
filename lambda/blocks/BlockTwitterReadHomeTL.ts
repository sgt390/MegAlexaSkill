/*
* File: BlockTwitterRead.ts
* Version: 0.0.1
* Date: 2019-03-27
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-27   || Created file
*/

import {Block} from "./Block";
import {BlockConfig, BlockTwitterReadHTLConfig} from "../JSONconfigurations/JSONconfiguration";
import {Filterable} from "./utility/Filterable";
import {ConnectorBlockTwitterHomeTL} from "../connectors/ConnectorBlockTwitterHomeTL";

//https://www.npmjs.com/package/twitter


export class BlockTwitterReadHomeTL implements Block, Filterable {
    private connector: ConnectorBlockTwitterHomeTL;
    private _text: Promise<string> | undefined;
    private limit: number = 10;
    private filtered: boolean = false;

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