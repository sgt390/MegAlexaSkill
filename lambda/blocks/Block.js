'use strict';
class Block {
    constructor(blockConfig){
        this.blockConfiguration=blockConfig;
    }
    get text(){}
    parseBlock(blockConfig){}
    isElicit(){} // boolean for know if there is a interaction whith user
    get blockConfig(){
        return this.blockConfiguration
    }
}

module.exports =  Block;