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
import {Block} from "./Block";
import {BlockConfig, BlockListConfig} from "./../JSONconfigurations/JSONconfiguration";
import { PhrasesGenerator } from "./utility/PhrasesGenerator";
import { Filterable } from "./utility/Filterable";
import { ElicitBlock } from "./utility/ElicitBlock";

export class BlockList implements Block, Filterable, ElicitBlock{
    
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
            text = PhrasesGenerator.randomReadListSentence()+" "+this.list.filter((el,index) => index<this.limit)
                .reduce((result,element) => result + " " + element,"")
                .trim();
        } else if (!(this.elicitSlot === 'done')) {//else call method to add or remove elements to the list in the Database)
            text =PhrasesGenerator.randomAddListSentence()+" "+ this.elicitSlot;
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