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
import { connectorTwitterHashtag, BlockTwitterReadHashtagConfig } from "../JSONconfigurations/JSONconfiguration";
import { BlockTwitterReadHashtag } from "../blocks/BlockTwitterReadHashtag";
const Twitter = require('twitter');

//not best practice, twitter has credential of ZeroSeven, regenerete them at https://developer.twitter.com/en/apps/16179148

    /*
    {
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    }
    */


//q: '#roma'     tweet_mode: 'extended',    "truncated": false

//const consumer = oauth.Consumer(user.consumer_key, user.consumer_secret);
//const access_token = oauth.Token(user.access_token, user.access_token_secret);
//const client = oauth.Client(consumer, access_token);

export class ConnectorBlockTwitterHashtag implements ConnectorBlock {

    private user: any;
    private hashtagTwitter: string;
    
    constructor(blockTwitterConfig: BlockTwitterReadHashtagConfig) {
        this.user = new Twitter({
            consumer_key: blockTwitterConfig.consumer_key,
            consumer_secret: blockTwitterConfig.consumer_secret,
            access_token_key: blockTwitterConfig.access_token_key,
            access_token_secret: blockTwitterConfig.access_token_secret
        });
        this.hashtagTwitter = blockTwitterConfig.hashtag;
    }

    //search/user_timeline
    public async connect(limit:number = 10): Promise<string> {
        const params = {
            count: limit,
            q: this.hashtagTwitter,
            tweet_mode: "extended",
            lang: "en"
        };

        return this.user.get('search/tweets', params)
            .then(function (tweets: connectorTwitterHashtag) {
                return tweets.statuses.map(function(tweet:any) {
                    return tweet.full_text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '').trim();
                });
            })
            .catch(function (error:string) {
                throw 'error while creating the twitter connector: £££££££'+ error;
            });
    }
}


