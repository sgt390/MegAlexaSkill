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
import {BlockConfig} from './Block';

export class BlockTextToSpeech implements Block{

    private _text: String;

    constructor(blockConfig: BlockConfig) {
        const blockTTSConfig = <blockConfig> blockConfig;
        this._text = blockTTSConfig.TextToSpeech;
    }
    /**
     * @TODO
     */
    public async text(): Promise<String> {
        return this._text;
    }

    public isElicit(): boolean {
        return false;
    }

}

type blockConfig = {
    TextToSpeech: String
}