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
    List: string[]
}

export type BlockTwitterReadConfig = {
    //careful here, probably going to change
    consumer_key: string,
    consumer_secret: string,
    access_token_key: string,
    access_token_secret: string,
    screenName: string
}

export type BlockTwitterWriteConfig = {
    consumer_key: string,
    consumer_secret: string,
    access_token_key: string,
    access_token_secret: string
}

export type BlockTwitterReadHashtagConfig = {
    //careful here, probably going to change
    consumer_key: string,
    consumer_secret: string,
    access_token_key: string,
    access_token_secret: string,
    hashtag: string
}

export type BlockTwitterReadHTLConfig = {
    //careful here, probably going to change
    consumer_key: string,
    consumer_secret: string,
    access_token_key: string,
    access_token_secret: string
}

export type BlockWeatherConfig = {
    Latitude: string,
    Longitude: string,
    APIKey: string
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

export type blockListJSON = {
    blockType: string,
    config: BlockListConfig
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

export type connectorTwitterTimelineUser =[{
    text: string, 
    user: {
        name: string
    }
}];

export type connectorTwitterHashtag ={
    statuses: [
            {
            text: string, 
            user: {
                name: string
            }
        }
    ]
};

export type WorkflowData = {
    data: blockJSON[]
}

export type tokenGoogleApi = {
    access_token: string,
    refresh_token: string,
    scope: string,
    token_type: string,
    expiry_date: number
}

export type credentials = {
    installed: {
        auth_provider_x509_cert_url: string,
        auth_uri: string,
        client_id: string,
        client_secret: string,
        project_id: string,
        redirect_uris: string[],
        token_uri: string
    }
}

export type BlockEmailConfig = {
    credentials: credentials,
    token: tokenGoogleApi
}

export type BlockCalendarConfig = {
    credentials: credentials,
    token: tokenGoogleApi
}