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
"use strict";

const Block = require("./Block");
class BlockTextToSpeech extends Block{

    constructor(blockConfig) {
        super();
        this.text=blockConfig.textToSpeech;
    }

    getText() {
        console.log(this.text);
        return this.text;
    }

    //method will be private (using https://github.com/resugar/resugar)
    parseBlock(blockConfig) {
        return blockConfig.textToSpeech;
    }

    isElicit(){
        return false;
    }

}

module.exports = BlockTextToSpeech;