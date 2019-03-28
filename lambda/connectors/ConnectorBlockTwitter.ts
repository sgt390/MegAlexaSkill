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
const Twitter = require('twitter');

//not best practice, twitter has credential of ZeroSeven, regenerete them at https://developer.twitter.com/en/apps/16179148
const user = new Twitter({
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


    error = function (err: any) {
        console.log('ERROR [%s]', err);
        return err;
	};
	success = function (data:any) {
        console.log('Data [%s]', data);
        return data;
	};
    
    connect(limit:number = Number.POSITIVE_INFINITY): Promise<string> {
        return user.get('search/tweets', function(error: any, tweets: any, response:any) {
            //if(error) throw error;
            console.log(tweets);  // The favorites.
            //console.log(response);  // Raw response object.
          });
    }

}

let c = new ConnectorBlockTwitter();
c.connect(); //.then(a => console.log(a)).catch(a => console.log('123'));