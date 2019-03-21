/*
* File: BlockTextToSpeech.ts
* Version: 0.0.1
* Date: 2019-02-25
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-02-25   || Created file
*/
import {Block} from './Block';
import {BlockConfig, BlockTTSConfig} from "./../JSONconfigurations/JSONconfiguration";

export class BlockTextToSpeech implements Block {

    private _text: String;

    constructor(blockConfig: BlockConfig) {
        const blockTTSConfig = <BlockTTSConfig> blockConfig;
        this._text = blockTTSConfig.TextToSpeech;
        if (this._text === undefined) {
            console.log("TextToSpeech value in TextToSpeech block not found");
            this._text = "error";
        }
    }
    /**
     * @TODO
     */
    public text(): String {
        return this._text;
    }

    public isElicit(): boolean {
        return false;
    }

}