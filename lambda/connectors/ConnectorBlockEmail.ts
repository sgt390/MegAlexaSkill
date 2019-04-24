/*
* File: ConnectorBlockEmail.ts
* Version: 0.0.1
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-20   || Created file
*/

import { ConnectorBlock } from "./ConnectorBlock";
import { connectorTwitterHashtag, BlockTwitterReadHashtagConfig } from "../JSONconfigurations/JSONconfiguration";
import { BlockEmail } from "../blocks/BlockEmail";

const {google} = require('googleapis');

const YOUR_CLIENT_ID = ""
const YOUR_CLIENT_SECRET = ""

import { auth } from 'google-oauth2-node';
 
const clientId = YOUR_CLIENT_ID;
const clientSecret = YOUR_CLIENT_SECRET;
const scope = 'https://www.googleapis.com/auth/analytics.readonly';
 
auth({ clientId, clientSecret, scope }).then(res => console.log(res), err => console.error(err));

/*
export class ConnectorBlockEmail implements ConnectorBlock {

    private user: any;
    
    constructor(blockTwitterConfig: BlockTwitterReadHashtagConfig) {
    }

    //search/user_timeline
    public async connect(limit:number = 10): Promise<string> {

        return this.user.get('????', "?")
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
*/
