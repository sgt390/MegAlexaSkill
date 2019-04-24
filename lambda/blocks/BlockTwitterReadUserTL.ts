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
import {BlockConfig, BlockTwitterReadConfig} from "../JSONconfigurations/JSONconfiguration";
import {Filterable} from "./utility/Filterable";
import {ConnectorBlockTwitterUserTL} from "../connectors/ConnectorBlockTwitterUserTL";

//https://www.npmjs.com/package/twitter


export class BlockTwitterReadUserTL implements Block, Filterable {
    private connector: ConnectorBlockTwitterUserTL;
    private _text: Promise<string> | undefined;
    private limit: number = 10;
    private filtered: boolean = false;

    constructor(blockConfig: BlockConfig) {
        const blockTwitterConfig: BlockTwitterReadConfig = <BlockTwitterReadConfig> blockConfig;
        this.connector = new ConnectorBlockTwitterUserTL(blockTwitterConfig);
    }

    public async text(): Promise<string> {
        return this.connector.connect(this.limit);
    }

    isElicit(): boolean {
        return false;
    }

    filterBlocks(limit: number): BlockTwitterReadUserTL {
        this.limit = limit;
        return this;
    }
}