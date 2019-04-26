/*
* File: BlockList.ts
* Version: 1.0.0
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                    || Date         || Description
* Matteo Depascale          || 2019-03-20   || Created file
* Andrea Deidda             || 2019-03-21   || Implemented class
* Bianca Andreea Ciuche     || 2019-03-27   || Update 
* Matteo Depascale          || 2019-03-28   || Verified
* Stefano Zanatta           || 2019-04-27   || Update
* Matteo Depascale          || 2019-04-28   || Verified
* Matteo Depascale          || 2019-04-30   || Approved
*/
import {BlockConfig, BlockListConfig, blockListJSON} from "./../JSONconfigurations/JSONconfiguration";
import { Filterable } from "./utility/Filterable";
import { ElicitBlock } from "./utility/ElicitBlock";
import { PhrasesGenerator } from "./utility/PhrasesGenerator";
import { BlockService } from "../services/BlockService";
import { Workflow } from "../Workflow";

export class BlockList implements Filterable, ElicitBlock{
    
    private limit: number = Number.POSITIVE_INFINITY;
    private list : string[];
    private elicitSlot: string;

    constructor(blockConfig: BlockConfig) {
        const blockListConfig: BlockListConfig = <BlockListConfig> blockConfig;
        this.list = blockListConfig.List;
        this.elicitSlot = '';
    }

    public text(): string {
        
        let add = ["add", "insert", "aggiungi", "inserisci"];
        let remove = ['delete', 'remove', 'elimina', 'rimuovi']; 
        let text = '';

        if (this.elicitSlot === '') {
            text = this.list.filter((el,index) => index<this.limit)
                .reduce((result,element) => result + " " + element,"")
                .trim();
        } else if (add.some(el => this.elicitSlot.includes(el))) {
            let newElement = this.elicitSlot.replace(/add\s|insert\s|inserisci\s|aggiungi\s/,'');
            BlockService.modifyBlock(this.createNewBlockListAdd(this.list, newElement),Workflow.getWorkflowPosition());
            text = newElement + " " + PhrasesGenerator.randomAddListSentence();
        } else if(remove.some(el => this.elicitSlot.includes(el))) {
            let newElement = this.elicitSlot.replace(/delete\s|remove\s|elimina\s|rimuovi\s/,'');
            BlockService.modifyBlock(this.createNewBlockListDelete(this.list,newElement),Workflow.getWorkflowPosition());
            text = newElement + " " + PhrasesGenerator.randomDeleteListSentence();
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
        return this.elicitSlot === 'done' || this.elicitSlot === 'fatto'? false: true;
    }

    private createNewBlockListAdd(userList:string[], newElement: string): blockListJSON {

        userList.push(newElement);

        let newBlockList =  {
            "blockType": "List",
            "config": {
              "List": userList
            }
        };
        return newBlockList;
    }

    private createNewBlockListDelete(userList:string[], newElement: string): blockListJSON {

        userList = userList.filter((element) => !(element === newElement));

        let newBlockList =  {
            "blockType": "List",
            "config": {
              "List": userList
            }
        };
        return newBlockList;
    }

}
