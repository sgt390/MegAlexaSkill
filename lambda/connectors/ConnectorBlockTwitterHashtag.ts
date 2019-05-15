/*
* File: ConnectorBlockTwitter.ts
* Version: 1.0.0
* Date: 2019-02-25
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-02-25   || Created file
* Stefano Zanatta       || 2019-04-24   || Implemented
* Matteo Depascale      || 2019-04-24   || Verified
* Matteo Depascale      || 2019-04-26   || Approved
*/
import { ConnectorBlock } from "./ConnectorBlock";
import { connectorTwitterHashtag, BlockTwitterReadHashtagConfig } from "../JSONconfigurations/JSONconfiguration";
import { PhrasesGenerator } from "../blocks/utility/PhrasesGenerator";
const Twitter = require('twitter');

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
                return Promise.resolve(PhrasesGenerator.noTweetFoundTwitterSentence());
            });
    }
}


