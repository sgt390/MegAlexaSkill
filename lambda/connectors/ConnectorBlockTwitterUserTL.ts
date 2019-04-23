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
import { connectorTwitterTimelineUser, BlockTwitterReadConfig } from "../JSONconfigurations/JSONconfiguration";
import { BlockTwitterReadUserTL } from "../blocks/BlockTwitterReadUserTL";
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

    //search/user_timeline
    public async connect(limit:number = 10): Promise<string> {
        const params = {
            count: limit,
            screen_name: this.userNameTwitter,
            tweet_mode: "extended"
        };

        this.user.get('search/tweets', {q: 'node.js'}, function(error:any, tweets:any, response:any) {
            console.log(tweets);
         });

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


