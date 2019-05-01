/*
* File: BlockTextToSpeech.ts
* Version: 1.0.0
* Date: 2019-02-25
* Author: Matteo Depascale
* License:
*
* History:
* Author                    || Date         || Description
* Matteo Depascale          || 2019-02-25   || Created file
* Matteo Depascale          || 2019-03-27   || Implemented clasd
* Stefano Zanatta           || 2019-03-28   || Verified
* Matteo Depascale          || 2019-04-10   || Approved
*/
import {Block} from './Block';
import {BlockConfig, BlockTTSConfig} from "./../JSONconfigurations/JSONconfiguration";

export class BlockTextToSpeech implements Block {

    private _text: string;

    constructor(blockConfig: BlockConfig) {
        const blockTTSConfig = <BlockTTSConfig> blockConfig;
        this._text = blockTTSConfig.TextToSpeech;
        if (this._text === undefined) {
            this._text = "error";
        }
    }
    
    public text(): string {
        return this._text;
    }

}