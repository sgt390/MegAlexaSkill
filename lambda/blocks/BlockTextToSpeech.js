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

class BlockTextToSpeech extends Block {
    text;

    constructor(blockID) {
        this.text=TextFromDB(blockID);
    }

    text() {
        return text;
    }

    //method will be private (using https://github.com/resugar/resugar)
    get textFromDB(blockID) {
        //blockID is used to search the correct text from dynamoDB
    }

}