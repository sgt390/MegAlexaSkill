/*
* File: BlockEmail.ts
* Version: 0.0.1
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-20   || Created file
*/
import {Block} from "./Block";
import {BlockConfig, BlockEmailConfig} from "./../JSONconfigurations/JSONconfiguration";
import { ConnectorBlockEmail } from "../connectors/ConnectorBlockEmail";
import { PhrasesGenerator } from "./utility/PhrasesGenerator";
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
        return PhrasesGenerator.randomReadEmailSentence()+" "+this.connector.connect(this.limit);
    }
}
