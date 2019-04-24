/*
* File: ConnectorBlockTwitter.ts
* Version: 0.0.1
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-27   || Created file
*/
import { ConnectorBlock } from "./ConnectorBlock";
import { BlockTwitterReadHTLConfig, connectorTwitterTimelineUser } from "../JSONconfigurations/JSONconfiguration";
const Twitter = require('twitter');

export class ConnectorBlockTwitterHomeTL implements ConnectorBlock {

    private user: any;
    
    constructor(blockTwitterConfig: BlockTwitterReadHTLConfig) {
        this.user = new Twitter({
            consumer_key: blockTwitterConfig.consumer_key,
            consumer_secret: blockTwitterConfig.consumer_secret,
            access_token_key: blockTwitterConfig.access_token_key,
            access_token_secret: blockTwitterConfig.access_token_secret
        });
    }

    public async connect(limit:number = 10): Promise<string> {
        const params = {
            count: limit,
            tweet_mode: "extended",
            lang: "en"
        };

        return this.user.get('statuses/home_timeline', params)
            .then(function (tweets: connectorTwitterTimelineUser) {
                return tweets.map(function(tweet:any) {
                    return tweet.user.name +' tweeted '+ (tweet.full_text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')).trim();
                });
            })
            .catch(function (error:string) {
                throw 'error while creating the twitter connector: £££££££'+ error;
            });
    }
}
