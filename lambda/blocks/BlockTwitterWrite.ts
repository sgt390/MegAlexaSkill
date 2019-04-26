/*
* File: BlockTwitterWrite.ts
* Version: 1.0.0
* Date: 2019-04-23
* Author: Stefano Zanatta
* License:
*
* History:
* Author                    || Date         || Description
* Stefano Zanatta           || 2019-04-23   || Created file
* Stefano Zanatta           || 2019-04-24   || Implemented clasd
* Matteo Depascale          || 2019-04-29   || Verified
* Matteo Depascale          || 2019-04-30   || Approved
*/
import {Block} from "./Block";
import {BlockConfig, BlockTwitterReadConfig} from "../JSONconfigurations/JSONconfiguration";
import {ConnectorBlockTwitterWrite} from "../connectors/ConnectorBlockTwitterWrite";
import { PhrasesGenerator } from "./utility/PhrasesGenerator";
import { ElicitBlock } from "./utility/ElicitBlock";

export class BlockTwitterWrite implements Block, ElicitBlock {

    private connector: ConnectorBlockTwitterWrite;
    private userTweet: string = '';

    constructor(blockConfig: BlockConfig) {
        const blockTwitterConfig: BlockTwitterReadConfig = <BlockTwitterReadConfig> blockConfig;
        this.connector = new ConnectorBlockTwitterWrite(blockTwitterConfig);
    }

    public async text(): Promise<string> {
        let response: Promise<string> = Promise.resolve(PhrasesGenerator.randomWriteTwitterSentence());
        if (this.userTweet != '') {
            response = this.connector.connect(this.userTweet);
        }
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