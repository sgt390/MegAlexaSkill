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
        this.userInfo = new Router(userID).userData(); 
    }
    /**
     * @returns array of objects rappresenting blocks
     */
    blocks(workflowName){
        var result=this.userInfo;
        result.then(result => {
            console.log(result.Item.workflowList[workflowName]);
        })
        .catch(function(error){
            console.log(error);
        });
        //return this.userInfo.workflowList[workflowName];
        return;
    }

    workflows(userID){}

}

module.exports = DataBaseHelper;