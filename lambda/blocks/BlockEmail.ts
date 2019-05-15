/*
* File: BlockEmail.ts
* Version: 1.0.0
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                    || Date         || Description
* Matteo Depascale          || 2019-03-20   || Created file
* Matteo Depascale          || 2019-04-24   || Implemented clasd
* Stefano Zanatta           || 2019-04-25   || Verified
* Matteo Depascale          || 2019-04-30   || Approved
*/
import {Block} from "./Block";
import {BlockConfig, BlockEmailConfig} from "./../JSONconfigurations/JSONconfiguration";
import { ConnectorBlockEmail } from "../connectors/ConnectorBlockEmail";
import { Filterable } from "./utility/Filterable";

export class BlockEmail implements Block, Filterable {
    private limit: number;
    private connector: ConnectorBlockEmail;

    constructor(blockConfig: BlockConfig){
        let config = <BlockEmailConfig> blockConfig;
        this.connector = new ConnectorBlockEmail(config.token, config.credentials);
        this.limit = 5;
    }

    filterBlocks(limit: number): BlockEmail {
        this.limit = limit;
        return this;
    }

    public async text(): Promise<string> {
        return this.connector.connect(this.limit);
    }
}
