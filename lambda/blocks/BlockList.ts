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
        
        const add = ["add", "insert", "aggiungi", "inserisci"];
        const remove = ['delete', 'remove', 'elimina', 'rimuovi'];
        const edit = ["edit", "modify", "modifica", "cambia"];
        let text = ""; //TODO

        if (this.elicitSlot === '') {
            text = this.list.filter((el,index) => index<this.limit)
                .reduce((result,element) => result + " " + element + ", ","")
                .trim();
            text += " do you like our effort to do list?" //TODO
        } else if (add.some(el => this.elicitSlot.includes(el))) {
            const newElement = this.elicitSlot.replace(/add\s|insert\s|inserisci\s|aggiungi\s/,'');
            BlockService.modifyBlock(this.createNewBlockListAdd(this.list, newElement), Workflow.getWorkflowPosition());
            text = newElement + " " + PhrasesGenerator.randomAddListSentence();
        } else if(remove.some(el => this.elicitSlot.includes(el))) {
            const removeElement = this.elicitSlot.replace(/delete\s|remove\s|elimina\s|rimuovi\s/,'');
            const newList = this.createNewBlockListDelete(this.list, removeElement);
            BlockService.modifyBlock(newList.blockListJSON, Workflow.getWorkflowPosition());

            text = !newList.empty ? removeElement + " " + PhrasesGenerator.randomDeleteListSentence() : removeElement + " is not present";

        } else if(edit.some(el => this.elicitSlot.includes(el))) {
            const editElement = this.elicitSlot.replace(/edit\s|modify\s|modifica\s|cambia\s/,'');
            const newList = this.createNewBlockListEdit(this.list, editElement);
            BlockService.modifyBlock(newList, Workflow.getWorkflowPosition());
            
            text = !newList.empty ? newList.oldElement + " " + "edited with " + newList.newElement : newList.oldElement  + " is not present"; //TODO
            
        }
        
        else if(this.slotRequired()) {
            text = "please repeat"; 
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

    private createNewBlockListDelete(userList:string[], removeElement: string): {"empty": number, "blockListJSON": blockListJSON} {

        let empty = userList.filter(element => element === removeElement).length;
        userList = userList.filter(element => !(element === removeElement));

        let newBlockList =  {
            "blockType": "List",
            "config": {
              "List": userList
            }
        };      

        const JSONreturn = {
            empty: empty,
            blockListJSON: newBlockList
        }

        return JSONreturn;
    }

    private createNewBlockListEdit(userList:string[], modifyElement: string): {"empty": number, "blockListJSON": blockListJSON, "oldElement": string, "newElement": string} {
        const withEdit = ["with", "con"];

        let empty = userList.filter(element => element === modifyElement).length;
        const oldElement = withEdit.map(el => modifyElement.substring(0, modifyElement.indexOf(el)))[0];
        let newElement : string = "";

        if(!empty) {
            newElement = withEdit.map(el => modifyElement.substring(modifyElement.indexOf(el)+el.length+1))[0];
            userList = userList.filter(element => !(element === oldElement));
            userList.push(newElement);
        }

        let newBlockList =  {
            "blockType": "List",
            "config": {
              "List": userList
            }
        };      

        const JSONreturn = {
            empty: empty,
            blockListJSON: newBlockList,
            oldElement: oldElement,
            newElement: newElement
        }

        return JSONreturn;
    }
}
