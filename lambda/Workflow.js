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
class Workflow {
    /**
     * 
     * @param {*} workflowName 
     * @param {*} userID 
     */
    constructor(workflowName, userID) {
        this.blocks= new Database(userID).blocks(workflowName);
    }

    block(blockPosition) {
        return this.blocks[blockPosition];
    }
    
}

module.exports = Workflow;