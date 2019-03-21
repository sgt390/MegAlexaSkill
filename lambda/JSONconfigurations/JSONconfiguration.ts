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

export type BlockTTSConfig = {
    TextToSpeech: String;
}

export type BlockFeedRSSConfig = {
    URL: String;
}

export type BlockListConfig = {
    list: []
}

export type feedRssJSON = {
    items: [
        {
        title: String,
        content: String
        }
    ]
}

export type userJSON = {
    user_id: String,
    name: String,
    email: String,
    error: String
}

export type blockJSON = {
    blockType: String,
    config: BlockConfig
}