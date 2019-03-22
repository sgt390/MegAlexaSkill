/*
* File: Workflow.ts
* Version: 0.0.1
* Date: 2019-02-25
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-02-25   || Created file
*/
'use strict';
import {BlockTextToSpeech} from "./blocks/BlockTextToSpeech";
import {BlockFeedRSS} from './blocks/BlockFeedRSS';
import {Block} from './blocks/Block'
import { blockJSON } from "./JSONconfigurations/JSONconfiguration";

export class Workflow {

    private _blocks: Promise<Block>[];
    private name: String;
    /**
     *
     * @param workflowConfigJSON promise containing a workflow and all his blocks
     */
    constructor(workflowConfigJSON: blockJSON[], workflowName: String) {
        this.name = workflowName;
        this._blocks = workflowConfigJSON.map(function(_blockJSON: blockJSON){
                return Workflow.blockFromJSON(_blockJSON);
        });
    }

    public async block(blockPosition: number): Promise<Block> {
        return this._blocks[blockPosition];
    }

    public blocks(): Promise<Block>[]{
        return this._blocks;
    }

    private static blockFromJSON(blockConfigurationJSON: blockJSON): Promise<Block> {
        let block: Promise<Block>;
        switch(blockConfigurationJSON.blockType) {
            case 'TextToSpeech':
                block = Promise.resolve(new BlockTextToSpeech(blockConfigurationJSON.config));
            break;
            case 'FeedRSS':
                block = Promise.resolve(new BlockFeedRSS(blockConfigurationJSON.config));
            break;
            case 'Stock':
                block = Promise.resolve(new BlockFeedRSS(blockConfigurationJSON.config));
            case 'Sport':
                block = Promise.resolve(new BlockFeedRSS(blockConfigurationJSON.config));
            break;
            case 'Crypto':
                block = Promise.resolve(new BlockFeedRSS(blockConfigurationJSON.config));
            break;
            default:
                block = Promise.resolve(new BlockTextToSpeech({TextToSpeech: "error"}));
                console.log("block not found");
        }
        return block;
    }
}