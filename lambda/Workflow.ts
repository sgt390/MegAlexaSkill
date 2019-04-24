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
* Stefano Zanatta       || 2019-04-06   || Changed switch to commands
*/
'use strict';
import {BlockTextToSpeech} from "./blocks/BlockTextToSpeech";
import {BlockFeedRSS} from './blocks/BlockFeedRSS';
import {Block} from './blocks/Block'
import { blockJSON, AlexaResponse, BlockConfig } from "./JSONconfigurations/JSONconfiguration";
import { Filter } from "./blocks/utility/Filter";
import { Filterable } from "./blocks/utility/Filterable";
import { ElicitBlock } from "./blocks/utility/ElicitBlock";
import { BlockPIN } from "./blocks/BlockPIN";
import { BlockTwitterReadUserTL } from "./blocks/BlockTwitterReadUserTL";
import { BlockList } from "./blocks/BlockList";
import { BlockWeather } from "./blocks/BlockWeather";
import { WorkflowElement } from "./blocks/utility/WorkflowElement";
import { BlockTwitterReadHashtag } from "./blocks/BlockTwitterReadHashtag";
import { BlockTwitterWrite } from "./blocks/BlockTwitterWrite";

export class Workflow {

    private _blocks: Promise<WorkflowElement>[] = [];
    private name: string;

    private static createBlockCommands: any = {
        'Filter': (config: BlockConfig): Promise<Filter> => Promise.resolve(new Filter(config)),
        'TextToSpeech': (config: BlockConfig): Promise<Block> => Promise.resolve(new BlockTextToSpeech(config)),
        'FeedRSS': (config: BlockConfig): Promise<Block> => Promise.resolve(new BlockFeedRSS(config)),
        'List': (config: BlockConfig): Promise<Block> => Promise.resolve(new BlockList(config)),
        'Stock': (config: BlockConfig): Promise<Block> => Promise.resolve(new BlockFeedRSS(config)),
        'Sport': (config: BlockConfig): Promise<Block> => Promise.resolve(new BlockFeedRSS(config)),
        'Crypto': (config: BlockConfig): Promise<Block> => Promise.resolve(new BlockFeedRSS(config)),
        'PIN': (config: BlockConfig): Promise<Block> => Promise.resolve(new BlockPIN(config)),
        'TwitterUserTL': (config: BlockConfig): Promise<Block>  => Promise.resolve(new BlockTwitterReadUserTL(config)),
        'Weather': (config: BlockConfig): Promise<Block> => Promise.resolve(new BlockWeather(config)),
        'TwitterHashtag': (config: BlockConfig): Promise<Block> => Promise.resolve(new BlockTwitterReadHashtag(config)),
        'TwitterWrite': (config: BlockConfig): Promise<Block> => Promise.resolve(new BlockTwitterWrite(config))

    };

    /**
     *
     * @param workflowConfigJSON promise containing a workflow and all its blocks
     */
    constructor(workflowConfigJSON: blockJSON[], workflowName: string,private workflowStartingPosition: number, private elicitSlot:string = '') {
        this.name = workflowName;
        /**
         * workflow starts from workflowStartingPosition
         */
        this._blocks = workflowConfigJSON.filter((el,index) => index >= this.workflowStartingPosition).map(function(blockJSON: blockJSON) {
            return Workflow.blockFromJSON(blockJSON);
        });
    }

    /**
     * 
     * @param blockConfigurationJSON block in JSON format, containing its name and default/user configuration 
     */
    private static blockFromJSON(blockConfigurationJSON: blockJSON): Promise<WorkflowElement> {
        if ( this.createBlockCommands[blockConfigurationJSON.blockType])
            return this.createBlockCommands[blockConfigurationJSON.blockType](blockConfigurationJSON.config);
        else
            return Promise.resolve(new BlockTextToSpeech({TextToSpeech:'there was en error while processing the block: '+blockConfigurationJSON.blockType}));
    }

    public async alexaResponse(): Promise<AlexaResponse> {

        const blocks = this.filter(this._blocks);
        let workflowPosition:number = this.workflowStartingPosition;
        const slot = this.elicitSlot;

        return  blocks.then(async function(blocks) {
            let _text: string = '';
            let elicitSlot: boolean = false;
            /**
             * if ElicitSlot is not empty, set the slot of the first block 
             */
            if (slot != '' && (<ElicitBlock>blocks[0]).setElicitSlot){
                (<ElicitBlock>blocks[0]).setElicitSlot(slot);
            }
            // cycle until there are no more blocks or an elicit block is found
            for(let i=0; i<blocks.length && !elicitSlot; ++i) {
                _text += await blocks[i].text() + "; ";

                // if block is elicit and slot is not filled yet, quit the cycle and save the workflow position
                if((<ElicitBlock>blocks[i]).slotRequired && (<ElicitBlock>blocks[i]).slotRequired()) {
                    elicitSlot = true;
                    workflowPosition = workflowPosition + i;
                }
            }
            return {
                text: _text,
                elicitSlot:elicitSlot,
                position: workflowPosition
            };
        }).catch(async function(error){
            throw 'Workflow.ts: Error while creating the workflow';
        });
    }

    /**
     * 
     * @param _filterBlocks list of blocks & filters
     * @returns list of blocks
     * @description filters any block that comes after a filter; filters are removed in the process
     */
    private async filter(_filterBlocks: Promise<WorkflowElement>[]): Promise<Block[]> {

        let blocks: Promise<Block[]> = Promise.resolve([]);
        for (let i = 0, j = 0; i < _filterBlocks.length && j < _filterBlocks.length; ++i) {

            const filterBlock = await _filterBlocks[j];
            if(filterBlock instanceof Filter) {
                /**
                 * _filterBlocks[j+1] is the filterable block
                 */
                (await blocks).push(new BlockTextToSpeech({TextToSpeech:''}));
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
            "TextToSpeech": "This is the second block"
          }
        },
        {
          "blockType": "Filter",
          "config": {
            "limit": 2
          }
        },
        {
          "blockType": "TwitterHashtag",
          "config": {
            "access_token_key": "",
            "access_token_secret": "",
            "consumer_key": "",
            "consumer_secret": "",
            "hashtag": "#trump"
          }
        }
      ], 'test',0);

wf.alexaResponse().then(el => console.log(el.text)).catch(err => console.log('££££££'+err));
*/