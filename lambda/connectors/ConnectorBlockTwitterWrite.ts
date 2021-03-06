/*
* File: ConnectorBlockTwitterWrite.ts
* Version: 1.0.0
* Date: 2019-03-27
* Author: Stefano Zanatta
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-27   || Created file
* Stefano Zanatta       || 2019-04-24   || Implemented clasd
* Matteo Depascale      || 2019-04-29   || Verified
* Matteo Depascale      || 2019-04-30   || Approved
*/
import { ConnectorBlock } from "./ConnectorBlock";
import { BlockTwitterWriteConfig } from "../JSONconfigurations/JSONconfiguration";
import { PhrasesGenerator } from "./../blocks/utility/PhrasesGenerator";
const Twitter = require('twitter');

export class ConnectorBlockTwitterWrite implements ConnectorBlock {

    private user: any;
    
    constructor(blockTwitterConfig: BlockTwitterWriteConfig) {
        this.user = new Twitter({
            consumer_key: blockTwitterConfig.consumer_key,
            consumer_secret: blockTwitterConfig.consumer_secret,
            access_token_key: blockTwitterConfig.access_token_key,
            access_token_secret: blockTwitterConfig.access_token_secret
        });
    }

    //search/user_timeline
    public async connect(tweet:string = ''): Promise<string> {
        const params = {
            status: tweet
        };

        return this.user.post('statuses/update', params)
            .then(function () {
                return PhrasesGenerator.randomSuccessTwitterSentence();
            })
            .catch(function (error:string) {
                return Promise.resolve(PhrasesGenerator.noWriteTwitterSentence());
            });
    }
}


