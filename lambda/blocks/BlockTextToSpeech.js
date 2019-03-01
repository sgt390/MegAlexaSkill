/*
* File: BlockTextToSpeech.js
* Version: 0.0.1
* Date: 2019-02-25
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-02-25   || Created file
*/
//"use strict";

// module.exports = class Block {

//     get text(){}

//     parseBlock(blockConfig){}

//     isElicit(){} // boolean for know if there is a interaction whith user
// }

//const Block = require("Block");
module.exports = class BlockTextToSpeech {

    constructor(blockConfig) {
        this.text=blockConfig.textToSpeech;
    }

    get text() {
        return text;
    }

    //method will be private (using https://github.com/resugar/resugar)
    parseBlock(blockConfig) {
        return blockConfig.textToSpeech;
    }

    isElicit(){
        return false;
    }

}