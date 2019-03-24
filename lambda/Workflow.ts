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
import { BlockFilter } from "./blocks/BlockFilter";

export class Workflow {

    private _blocks: Promise<Block>[] = [];
    private name: string;
    /**
     *
     * @param workflowConfigJSON promise containing a workflow and all his blocks
     */
    constructor(workflowConfigJSON: blockJSON[], workflowName: string) {
        this.name = workflowName;
        /*
        this._blocks = workflowConfigJSON.map(function(blockJSON: blockJSON){
                return Workflow.blockFromJSON(blockJSON);
        });
        */
        for (let i = 0, j=0; i < workflowConfigJSON.length; ++i) {
            try {
                if ( workflowConfigJSON[i].blockType == 'Filter' ){
                    this._blocks[i] = Workflow.filteredBlockFromJSON(Workflow.blockFromJSON(workflowConfigJSON[j+1]), workflowConfigJSON[i]);
                    j = j + 2;
                }else {
                    this._blocks[i] = Workflow.blockFromJSON(workflowConfigJSON[j]);
                    j++;
                }
            }catch(error) {
                throw new Error('error while creating the workflow: ££££££££ERROR:'+ error);
            }
        }
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
                throw new Error('In class Workflow, ' + blockConfigurationJSON.blockType + ' block not found');
        }
        return block;
    }

    private static filteredBlockFromJSON(block:Promise<Block>, blockConfig:blockJSON):Promise<Block> {
        return Promise.resolve(new BlockFilter(block, blockConfig.config));        
    }
}