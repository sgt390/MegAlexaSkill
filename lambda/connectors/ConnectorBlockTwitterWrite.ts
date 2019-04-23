/*
* File: ConnectorBlockTwitterWrite.ts
* Version: 0.0.1
* Date: 2019-04-23
* Author: Stefano Zanatta
* License:
*
* History:
* Author                || Date         || Description
* Stefano Zanatta       || 2019-04-23   || Created file
*/
import { ConnectorBlock } from "./ConnectorBlock";
import { connectorTwitterWrite,connectorTwitterTimelineUser, BlockTwitterReadConfig, connectorTwitterHashtag } from "../JSONconfigurations/JSONconfiguration";
const Twitter = require('twitter');

export class ConnectorBlockTwitterWrite implements ConnectorBlock {

    private user: any;
    private userNameTwitter: string;
    
    constructor(blockTwitterConfig: BlockTwitterReadConfig) {
        this.user = new Twitter({
            consumer_key: blockTwitterConfig.consumer_key,
            consumer_secret: blockTwitterConfig.consumer_secret,
            access_token_key: blockTwitterConfig.access_token_key,
            access_token_secret: blockTwitterConfig.access_token_secret
        });
        this.userNameTwitter = blockTwitterConfig.screenName;
    }

    //search/user_timeline
    public async connect(limit:number = 10): Promise<string> {
        const params = {
            count: limit,
            screen_name: this.userNameTwitter,
            tweet_mode: "extended",
            lang: "en"
        };

        // WRITE THE TWEET. TODO!!!
        return this.user.get('statuses/user_timeline', params)
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


