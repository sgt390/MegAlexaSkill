/*
* File: DataBaseHelper.js
* Version: 0.0.1
* Date: Date: 2019-03-02
* Author: Stefano Zanatta
* License:
*
* History:
* Author            || Date         ||  descriptor
* Stefano Zanatta   || 2019-03-02   || Created file
*/
const Router = require("./router");
class DataBaseHelper {

    constructor(userID){
        this.router = new Router(userId); 
    }
    /**
     * @returns array of objects rappresenting blocks
     */
    blocks(workflow,userID){

    }

    workflows(userID){}

}

module.exports = DataBaseHelper;