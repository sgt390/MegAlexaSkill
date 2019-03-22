/*
* File: BlockTextToSpeechService.js
* Version: 0.0.1
* Date: 2019-03-20
* Author: Stefano Zanatta
* License:
*
* History:
* Author                || Date         || Description
* Stefano Zanatta       || 2019-03-19   || Created file
* Stefano Zanatta       || 2019-03-21   || Completed
*/
import { BlockTextToSpeech } from "../blocks/BlockTextToSpeech";
import { BlockConfig } from "../JSONconfigurations/JSONconfiguration";


export class BlockTextToSpeechService {

    create(blockConfig: BlockConfig): BlockTextToSpeech {
        return new BlockTextToSpeech(blockConfig);
    }
}