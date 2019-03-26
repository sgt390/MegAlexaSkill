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
    pin: string;
}

export type BlockTTSConfig = {
    TextToSpeech: string;
}

export type BlockFeedRSSConfig = {
    URL: string;
}

export type BlockListConfig = {
    list: []
}

export type connectorFeedRSSResult = {
    items: [
        {
        title: string,
        content: string
        }
    ]
}

export type userJSON = {
    user_id: string,
    name: string,
    email: string,
    error: string
}

export type blockJSON = {
    blockType: string,
    config: BlockConfig
}

export type connectorResult = {}

export type BlockFilterableConfig = {
    limit:number
}

export type  AlexaResponse = {
    text: string,
    elicitSlot: string
}