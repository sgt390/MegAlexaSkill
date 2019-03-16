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
import {Block} from "./Block";

export class BlockTextToSpeech implements Block{

    private _text: String;

    constructor(blockConfig) {
        this._text = blockConfig.TextToSpeech;
    }
    /**
     * @TODO
     */
    public text(): String{
        return this._text;
    }

    public isElicit(): boolean{
        return false;
    }

}