"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var google = require('googleapis').google;
var YOUR_CLIENT_ID = "1048781954504-4et458uubfu4chmgonlus6bv9c5ale1l.apps.googleusercontent.com";
var YOUR_CLIENT_SECRET = "VaZ9zKVqg4MHfslwmwXzlFVD";
var google_oauth2_node_1 = require("google-oauth2-node");
var clientId = YOUR_CLIENT_ID;
var clientSecret = YOUR_CLIENT_SECRET;
var scope = 'https://www.googleapis.com/auth/analytics.readonly';
google_oauth2_node_1.auth({ clientId: clientId, clientSecret: clientSecret, scope: scope }).then(function (res) { return console.log(res); }, function (err) { return console.error(err); });
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
