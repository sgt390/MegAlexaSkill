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
    PIN: string;
}

export type BlockTTSConfig = {
    TextToSpeech: string;
}

export type BlockFeedRSSConfig = {
    URL: string;
}

export type BlockListConfig = {
    List: []
}

export type BlockTwitterReadConfig = {
    //careful here, probably going to change
    consumer_key: string,
    consumer_secret: string,
    access_token_key: string,
    access_token_secret: string
}

export type BlockWeatherConfig = {
    Latitude: string,
    Longitude: string
}

export type connectorWeather = {
    summary: string,
    temperatureHigh: string,
    temperatureLow: string
}

export type connectorWeatherResult = {
    name: string,
    main: {
        temp: string,
        temp_min: string,
        temp_max: string
    }
    weather: [
        {
            description: string
        }
    ]

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

export type AlexaResponse = {
    text: string,
    elicitSlot: boolean,
    position: number
}

export type connectorTwitterTimelineHome =[{
    text:string, 
    user:{
        name:string
    }
}];

export type WorkflowData = {
    data: blockJSON[]
}