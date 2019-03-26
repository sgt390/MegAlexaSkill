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
     * @param workflowConfigJSON promise containing a workflow and all his blocks
     */
    constructor(workflowConfigJSON: blockJSON[], workflowName: string) {
        this.name = workflowName;
        
        this._blocks = workflowConfigJSON.map(function(blockJSON: blockJSON){
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
        return  blocks.then(async function(blocks){
            let _text: string = '';
            let foundSlotElicit: boolean = false;
            let elicitSlot: string = '';
            for(let i=0; i<blocks.length && !foundSlotElicit; ++i) {
                _text += await blocks[i].text();
                if((blocks[i] instanceof ElicitBlock)) {
                    elicitSlot = (<ElicitBlock>blocks[i]).typeElicitSlot();
                    foundSlotElicit=true;
                }
            } 
            
            return {
                text: _text,
                elicitSlot:elicitSlot
            }
        });
        
    }

    private async filter(_filterBlocks: Promise<Block | Filter>[]): Promise<Block[]> {
        let blocks: Promise<Block[]> = Promise.resolve([]);
        for (let i = 0,j = 0; i < _filterBlocks.length && j < _filterBlocks.length; ++i) {
            const block = await _filterBlocks[j];
            if(block instanceof Filter){
                (await blocks).push(<Block>((await <Filterable><unknown>_filterBlocks[j+1]).filterBlocks((<Filter> block).limit())));
                j = j + 2;
            } else {
                (await blocks).push((<Block> await _filterBlocks[j]));
                ++j;
            }
        }
        return blocks;
    }

}

const wf = new Workflow(
    [
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
      ], 'poc');
wf.alexaResponse().then(el => console.log(el.text)).catch(err => console.log('££££££'+err));
