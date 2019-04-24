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

export class BlockEmail implements Block {

    private connector: ConnectorBlockEmail;
    constructor(blockConfig:BlockConfig){
        let config = <BlockEmailConfig> blockConfig;
        this.connector = new ConnectorBlockEmail(config.token, config.credentials);
    }

    public async text(): Promise<string> {
        return this.connector.connect();
    }

}