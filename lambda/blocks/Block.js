'use strict';
class Block {
    constructor(blockConfig){
        this.blockConfig=blockConfig;
    }
    get text(){}
    parseBlock(blockConfig){}
    isElicit(){} // boolean for know if there is a interaction whith user
}

module.exports =  Block;