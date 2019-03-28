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
import { connectorTwitterTimelineHome, BlockTwitterReadConfig } from "../JSONconfigurations/JSONconfiguration";
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

export class ConnectorBlockTwitter implements ConnectorBlock {

    private user: any;
    constructor(blockTwitterConfig: BlockTwitterReadConfig) {
        this.user = new Twitter({
            consumer_key: blockTwitterConfig.consumer_key,
            consumer_secret: blockTwitterConfig.consumer_secret,
            access_token_key: blockTwitterConfig.access_token_key,
            access_token_secret: blockTwitterConfig.access_token_secret
        });
    }


    error = function (err: any) {
        console.log('ERROR [%s]', err);
        return err;
	};
	success = function (data:any) {
        console.log('Data [%s]', data);
        return data;
	};
    //search/tweets
    public async connect(limit:number = 10): Promise<string> {
        const params = {
            count: limit
        };
        return this.user.get('statuses/home_timeline', params)
            .then(function (tweets: connectorTwitterTimelineHome) {
                return tweets.map(function(tweet:any){
                    return tweet.user.name +' tweeted '+ tweet.text;
                });
            })
            .catch(function (error:string) {
                throw 'error while creating the twitter connector: £££££££'+ error;
            });
    }

}


