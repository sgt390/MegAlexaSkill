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
import { connectorTwitter } from "../JSONconfigurations/JSONconfiguration";
const Twitter = require('twitter');

//not best practice, twitter has credential of ZeroSeven, regenerete them at https://developer.twitter.com/en/apps/16179148
const twitter = new Twitter({
    consumer_key: 'omCc4IgufpfW8VUu3bq6OwPBo ',
    consumer_secret: 'Ji3e2BoAp4E58DZS8ycT0KoopG1ArPNtjoaZBxfi5jQoAEfhsb ',
    access_token_key: '1110935101561556992-eFkJvjMWNDn9UjiSCVX8IwvhM3qnp6 ',
    access_token_secret: 'df5DsEHaeshk13fi2ofbS6TWIUZqykUkx7VrGoN1KtgOb'
    /*
    {
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    }
    */
});

const params = {
    q: '@POTUS',
    count: 5 //limit from filter
}

export class ConnectorBlockTwitter implements ConnectorBlock {
    
    constructor(private params: string) {

    }

    connect(limit:number = Number.POSITIVE_INFINITY): Promise<string> {
        let tweets = twitter.getSearch('search/tweets', this.params, 
    }

}

