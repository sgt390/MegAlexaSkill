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

class Workflow {
    blocksID=[];

    constructor(name, userID) {
        this.blocksID=blocksIDFromDB(name, userID);
    }

    get blocksIDFromDB(name, userID) {
        //get array blockID from DB
    }

    get block(position) {
        //return block === blockID
        return new Block(blockID[position]); //check new keyword if it's bestpractice
    }
}