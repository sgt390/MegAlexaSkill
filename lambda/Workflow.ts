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
import { blockJSON, AlexaResponse } from "./JSONconfigurations/JSONconfiguration";
import { Filter } from "./blocks/Filter";
import { Filterable } from "./blocks/Filterable";
import { ElicitBlock } from "./blocks/ElicitBlock";
import { BlockPIN } from "./blocks/BlockPIN";

export class Workflow {

    private _blocks: Promise<Block | Filter>[] = [];
    private name: string;
    /**
     *
     * @param workflowConfigJSON promise containing a workflow and all its blocks
     */
    constructor(workflowConfigJSON: blockJSON[], workflowName: string, workflowStartingPosition: number, private elicitSlot:string = '') {
        this.name = workflowName;
        /**
         * workflow starts from workflowStartingPosition
         */
        this._blocks = workflowConfigJSON.filter((el,index) => index >= workflowStartingPosition).map(function(blockJSON: blockJSON) {
            return Workflow.blockFromJSON(blockJSON);
        });
    }

    private static blockFromJSON(blockConfigurationJSON: blockJSON): Promise<Block> | Promise<Filter> {
        let block: Promise<Block> | Promise<Filter>;
        switch(blockConfigurationJSON.blockType) {
            case 'Filter':
                block = Promise.resolve(new Filter(blockConfigurationJSON.config));
            break;
            case 'TextToSpeech':
                block = Promise.resolve(new BlockTextToSpeech(blockConfigurationJSON.config));
            break;
            case 'FeedRSS':
                block = Promise.resolve(new BlockFeedRSS(blockConfigurationJSON.config));
            break;
            case 'Stock':
                block = Promise.resolve(new BlockFeedRSS(blockConfigurationJSON.config));
            break;
            case 'Sport':
                block = Promise.resolve(new BlockFeedRSS(blockConfigurationJSON.config));
            break;
            case 'Crypto':
                block = Promise.resolve(new BlockFeedRSS(blockConfigurationJSON.config));
            break;
            case 'PIN':
                block = Promise.resolve(new BlockPIN(blockConfigurationJSON.config));
            break;
            default:
                throw new Error('In class Workflow, ' + blockConfigurationJSON.blockType + ' block not found');
        }
        return block;
    }

    public async alexaResponse(): Promise<AlexaResponse> {

        const blocks = this.filter(this._blocks);
        const slot = this.elicitSlot;
        return  blocks.then(async function(blocks) {
            let _text: string = '';
            let elicitSlot: boolean = false;
            let workflowPosition = -1;

            /**
             * if ElicitSlot is not empty, set the slot of the first block 
             */
            if (slot != '' &&(<ElicitBlock>blocks[0]).setElicitSlot){
                (<ElicitBlock>blocks[0]).setElicitSlot(slot);
            }
            // cycle until there are no more blocks or an elicit block is found
            for(let i=0; i<blocks.length && !elicitSlot; ++i) {
                _text += await blocks[i].text();
                // if block is elicit and slot is not filled yet, quit the cycle and save the workflow position
                if((<ElicitBlock>blocks[i]).slotRequired && (<ElicitBlock>blocks[i]).slotRequired()) {
                    elicitSlot = true;
                    workflowPosition = i;
                }
            }
            return {
                text: _text,
                elicitSlot:elicitSlot,
                position: workflowPosition
            }
        });
    }

    /**
     * 
     * @param _filterBlocks list of blocks & filters
     * @returns list of blocks
     * @description filters any block that comes after a filter; filters are removed in the process
     */
    private async filter(_filterBlocks: Promise<Block | Filter>[]): Promise<Block[]> {

        let blocks: Promise<Block[]> = Promise.resolve([]);

        for (let i = 0,j = 0; i < _filterBlocks.length && j < _filterBlocks.length; ++i) {
            const filterBlock = await _filterBlocks[j];
            if(filterBlock instanceof Filter) {
                /**
                 * _filterBlocks[j+1] is the filterable block
                 */
                (await blocks).push(<Block>((await <Filterable><unknown>_filterBlocks[j+1]).filterBlocks((<Filter> filterBlock).limit())));
                j = j + 2;
            } else {
                (await blocks).push((<Block> await _filterBlocks[j]));
                ++j;
            }
        }
        return blocks;
    }

}
/*
const wf = new Workflow(
    [
        {
            "blockType": "TextToSpeech",
            "config": {
                "TextToSpeech": 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
            }
        },        
        {
            "blockType": "PIN",
            "config": {
                "PIN": '1234'
            }
        },
        {
            "blockType": "Filter",
            "config": {
                "limit": 2
            }
        },
        {
            "blockType": "FeedRSS",
            "config": {
              "URL": "https://www.ansa.it/sito/notizie/tecnologia/tecnologia_rss.xml"
            }
        }       
      ], 'poc',1,'1234');
wf.alexaResponse().then(el => console.log(el.text)).catch(err => console.log('££££££'+err));
*/