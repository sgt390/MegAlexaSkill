/*
* File: BlockTwitterWrite.ts
* Version: 0.0.1
* Date: 2019-04-23
* Author: Stefano Zanatta
* License:
*
* History:
* Author                || Date         || Description
* Stefano Zanatta       || 2019-04-23   || Created file
*/

import {Block} from "./Block";
import {BlockConfig, BlockTwitterReadConfig} from "../JSONconfigurations/JSONconfiguration";
import {ConnectorBlockTwitterWrite} from "../connectors/ConnectorBlockTwitterWrite";
import { ElicitBlock } from "./utility/ElicitBlock";

//https://www.npmjs.com/package/twitter


export class BlockTwitterReadUserTL implements Block, ElicitBlock {

    private connector: ConnectorBlockTwitterWrite;
    private _text: Promise<string> | undefined;
    private userTweet: string = '';

    constructor(blockConfig: BlockConfig) {
        const blockTwitterConfig: BlockTwitterReadConfig = <BlockTwitterReadConfig> blockConfig;
        this.connector = new ConnectorBlockTwitterWrite(blockTwitterConfig);
    }

    public async text(): Promise<string> {
        let response = (this.userTweet != '') ? this.userTweet: 'say your tweet';
        return response;
    }

    setElicitSlot(slot: string): void {
        this.userTweet = slot;
    }

    slotRequired(): boolean {
        if(this.userTweet == ''){
            return true;
        }
        else{
            return false;
        }
    }
    
}