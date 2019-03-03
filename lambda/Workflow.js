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
const BlockFeedRss = require("./blocks/BlockFeedRSS")
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
                        block = new BlockFeedRss(result.config);
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
        console.log(element.text);
    }); 
}
d();
*/