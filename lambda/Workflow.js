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
const database = require("./router/DataBaseHelper");
class Workflow {
    
    constructor(workflowName, userID) {
        this.blocks=database.blocks(workflowName, userID);
    }

    block(blockPosition) {
        return this.blocks[blockPosition];
    }
    
}
