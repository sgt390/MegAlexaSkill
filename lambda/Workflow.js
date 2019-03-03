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
    blocks.forEach(obj => {
        obj = obj.text;
        console.log(!!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function');
        //console.log()
    });
}
f();
*/