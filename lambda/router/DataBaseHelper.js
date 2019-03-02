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