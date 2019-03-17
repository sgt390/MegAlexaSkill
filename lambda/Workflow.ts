/*
* File: Workflow.js
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
import {BlockConfig} from './blocks/Block'

export class Workflow {

    private _blocks: Block[];
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

    block(blockPosition: number) {
        return this._blocks[blockPosition];
    }

    blocks(): Block[]{
        return this._blocks;
    }

    private static blockFromJSON(blockConfigurationJSON: blockJSON): Block {
        let block: Block;
        switch(blockConfigurationJSON.blockType){
            case 'TextToSpeech':
                block = new BlockTextToSpeech(blockConfigurationJSON.config);
            break;
            case 'FeedRSS':
                block = new BlockFeedRSS(blockConfigurationJSON.config);
            break;
            default:
                console.log("block not found");
        }
        return block;
    }
     
}

type blockJSON = {
    blockType: String,
    config: BlockConfig
}


/*
let db = new Workflow("buongiorno","AmazonUse56765000");
let s = db.blocks.then(function(result){
    return result;
}).catch(function(err){
});
*/
/*
let wf = new Workflow("buongiorno","AmazonUse56765000");
async function d (){
    let blocks = await wf.blocks;
    let speechText = "";
    //speechText = blocks.reduce((speechText, block) => speechText + block.text + ". ");
    //console.log(speechText);
    blocks.forEach(element => {
        console.log(typeof element.text);
    }); 
}
d();
*/
/*
async function f(){
    var w = new Workflow("buongiorno","AmazonUse56765000");
    var blocks = await w.blocks;
    blocks.forEach(async function(obj) {
        obj = await obj.text;
        console.log(!!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function');
        console.log(obj);
    });
}
f();
*/
/*
async function f(){
    var w = new Workflow("buongiorno","AmazonUse56765000");
    var blocks = await w.blocks;
    /*var result = blocks.reduce(async function(buffer,block) {
        var b = await block.text;
        console.log(b);
        return buffer + block.text;
        //console.log(!!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function');
    },"").catch(function(error){
        console.log(error);
    });
   var a =await blocks[0].text;
    console.log(a);
}*/
//f();
/*
var w = new Workflow("firstworkflow","amzn1.account.AGC777NBGNIAWSP6EBO33ULF7XMQ");
async function a() {
    
   var blocks = await w.blocks;
    var b =await blocks.reduce(async function(buffer,block) {
        return await buffer +" "+ await block.text+ ";";
        
    },"").catch(function(error){
        console.log(error);
    });
   console.log(b);
}

a();
*/
//console.log(!!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function');