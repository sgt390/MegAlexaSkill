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

    constructor(blockTwitterConfig:BlockTwitterReadConfig) {

    }

    user = new Twitter({
        consumer_key: 'omCc4IgufpfW8VUu3bq6OwPBo',
        consumer_secret: 'Ji3e2BoAp4E58DZS8ycT0KoopG1ArPNtjoaZBxfi5jQoAEfhsb',
        access_token_key: '1110935101561556992-EKUSSnBFOSDZ51dlGg3Bw2wXbir722',
        access_token_secret: '0AdNyO3f9aTdIJ7CmExVRLXWB49pYF6Wv0HegUpkr6lG8'
    });

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
                throw error;
            });
    }

}

let d = {'consumer_key': 'omCc4IgufpfW8VUu3bq6OwPBo',
'consumer_secret': 'Ji3e2BoAp4E58DZS8ycT0KoopG1ArPNtjoaZBxfi5jQoAEfhsb'};
let c = new ConnectorBlockTwitter(d);
c.connect().then(a => console.log(a)).catch(a => console.log('123'));
