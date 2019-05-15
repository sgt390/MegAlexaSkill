/*
* File: ConnectorBlockTwitter.ts
* Version: 1.0.0
* Date: 2019-03-27
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-27   || Created file
* Matteo Depascale      || 2019-04-13   || Implemented
* Bianca Ciuche         || 2019-04-16   || Verified
* Matteo Depascale      || 2019-04-26   || Approved
*/
import { ConnectorBlock } from "./ConnectorBlock";
import { connectorTwitterTimelineUser, BlockTwitterReadConfig } from "../JSONconfigurations/JSONconfiguration";
import { PhrasesGenerator } from "./../blocks/utility/PhrasesGenerator";
const Twitter = require('twitter');

export class ConnectorBlockTwitterUserTL implements ConnectorBlock {

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

    public async connect(limit:number = 10): Promise<string> {
        const params = {
            count: limit,
            screen_name: this.userNameTwitter,
            tweet_mode: "extended",
            lang: "en"
        };

        return this.user.get('statuses/user_timeline', params)
            .then(function (tweets: connectorTwitterTimelineUser) {
                //console.log(tweets)
                return tweets.map(function(tweet:any) {
                    return tweet.user.name +" "+PhrasesGenerator.tweetedTwitterSentence()+" "+ (tweet.full_text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')).trim();
                });
            })
            .catch(function (error:string) {
                return Promise.resolve(PhrasesGenerator.noTweetFoundTwitterSentence());
            });
    }
}