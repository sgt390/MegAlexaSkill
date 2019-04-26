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
                throw 'error while creating the twitter connector: £££££££'+ error;
            });
    }
}


