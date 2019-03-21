/*
* File: JSONConfiguration.ts
* Version: 0.0.1
* Date: 2019-03-21
* Author: Stefano Zanatta
* License:
*
* History:
* Author                || Date         || Description
* Stefano Zanatta       || 2019-03-21   || Created file
*/
export type BlockConfig = {}

export type BlockPinConfig = {
    pin: String;
}

export type BlockTTSConfigConfig = {
    TextToSpeech: String;
}

export type BlockFeedRSSConfig = {
    URL: String;
}

export type BlockListConfig = {
    list: []
}
