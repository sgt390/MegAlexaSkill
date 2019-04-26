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
        
        let text = '';
        if (this.elicitSlot === '') {
            text = this.list.filter((el,index) => index<this.limit)
                .reduce((result,element) => result + " " + element,"")
                .trim();
        } else if (this.elicitSlot.includes('add' || 'insert' || "aggiungi" || 'inserisci')) {
            let newElement = this.elicitSlot.replace('add ','');
            newElement = this.elicitSlot.replace('inserisci ','');
            newElement = this.elicitSlot.replace('insert ','');
            newElement = this.elicitSlot.replace('aggiungi ','');
            BlockService.modifyBlock(this.createNewBlockListAdd(this.list,newElement),Workflow.getWorkflowPosition());
            text = this.elicitSlot + " " + PhrasesGenerator.randomAddListSentence();
        } else if(this.elicitSlot.includes('delete' || 'remove' || 'elimina' || 'rimuovi')) {
            let newElement = this.elicitSlot.replace('delete ','');
            newElement = this.elicitSlot.replace('remove ','');
            newElement = this.elicitSlot.replace('elimina ','');
            newElement = this.elicitSlot.replace('rimuovi ','');
            BlockService.modifyBlock(this.createNewBlockListDelete(this.list,newElement),Workflow.getWorkflowPosition());
            text = this.elicitSlot + " " + PhrasesGenerator.randomDeleteListSentence();
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

    public createNewBlockListDelete(userList:string[], newElement: string): blockListJSON {

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
