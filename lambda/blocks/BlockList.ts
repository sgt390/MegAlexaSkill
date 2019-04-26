/*
* File: BlockList.ts
* Version: 0.0.1
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-20   || Created file
* Andrea Deidda         || 2019-03-21   || Update file
* Bianca Andreea Ciuche || 2019-03-27   || Update file
*/
import {BlockConfig, BlockListConfig} from "./../JSONconfigurations/JSONconfiguration";
import { Filterable } from "./utility/Filterable";
import { ElicitBlock } from "./utility/ElicitBlock";
import { BlockService } from "../services/BlockService";

export class BlockList implements Filterable, ElicitBlock{
    
    private limit: number = Number.POSITIVE_INFINITY;
    private list :[];
    private elicitSlot: string;

    constructor(private blockConfig: BlockConfig) {
        const blockListConfig: BlockListConfig = <BlockListConfig> blockConfig;
        this.list = blockListConfig.List;
        this.elicitSlot = '';
    }

    public text(): string {
        
        let text = '';
        if (this.elicitSlot === '') {
            text = this.list.filter((el,index) => index<this.limit)
                .reduce((result,element) => result + " " + element,"")
                .trim();
        } else if (!(this.elicitSlot === 'done' || this.elicitSlot === 'fatto')) {//else call method to add or remove elements to the list in the Database)
            ////////////////////// 
            const a =  {
                "blockType": "TextToSpeech",
                "config": {
                  "TextToSpeech": "devo modificarmi"
                }
            };
            ////////////////////////

            BlockService.modifyBlock(a,3);
            text = 'added ' + this.elicitSlot;
        }
        return text;
    }

    filterBlocks(limit: number): BlockList{
        this.limit = limit;
        return this;
    }

    setElicitSlot(slot: string): void {
        this.elicitSlot = slot;
    }

    slotRequired(): boolean {
        return this.elicitSlot === 'done'? false: true;
    }

}