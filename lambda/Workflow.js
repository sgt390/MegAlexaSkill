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
const Database = require("./router/DataBaseHelper");
const BlockTextToSpeech = require("./blocks/BlockTextToSpeech");
const BlockFeedRSS = require("./blocks/BlockFeedRSS")

class Workflow {
    /**
     * 
     * @param {*} workflowName 
     * @param {*} userID 
     */
    constructor(workflowName, userID) {
        this.userWorkflow = new Database(userID).workflowByName(workflowName);
    }

    block(blockPosition) {
        return this.userWorkflow[blockPosition];
    }
    get blocks(){
        let workflow = this.userWorkflow;
        return workflow.then(function(result){
            return result.map(function(result){
                let block;
                switch(result.blockType){
                    case 'TextToSpeech':
                        block = new BlockTextToSpeech(result.config);
                    break;
                    case 'FeedRSS':
                        block = new BlockFeedRSS(result.config);
                    break;
                    default:
                        console.log("block not found");
                }
                return block;
            });
        }).catch(function(error){
            console.log(error)
        });
    }
     
}
module.exports = Workflow;
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

var w = new Workflow("firstworkflow","amzn1.account.AGC777NBGNIAWSP6EBO33ULF7XMQ");
async function a() {
    
   var blocks = await w.blocks;
    var text = "";
    var b =await blocks.reduce(async function(buffer,block) {
        //var c = await block.text;
        //console.log(buffer);
        return await buffer + await block.text;
        
    },"").catch(function(error){
        console.log(error);
    });
   console.log(b);
}
a();
//console.log(!!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function');