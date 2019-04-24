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
import { connectorTwitterHashtag, BlockTwitterReadHashtagConfig, tokenGoogleApi } from "../JSONconfigurations/JSONconfiguration";
import { BlockEmail } from "../blocks/BlockEmail";

const {google} = require('googleapis');
import { auth } from 'google-oauth2-node';

 



//////////////////////////////////////////////////////////////////////////////////////

/**
 * Retrieve Messages in user's mailbox matching query.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} query String used to filter the Messages listed.
 * @param  {Function} callback Function to call when the request is complete.
 */

export class ConnectorBlockEmail {

    private oAuth2Client:any;
    private limit: number = 10;

    /////////////////////// CREATE CREDENTIALS TYPE! ///////////////////////////
    constructor(token: tokenGoogleApi, credentials:any){
        this.oAuth2Client = this.authorize(token, credentials);
    }

    private authorize(token: tokenGoogleApi, credentials:any): any {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
      
        oAuth2Client.setCredentials(token);
        return oAuth2Client;
        
    }

    public connect(): Promise<string>{
        return this.listMessages(this.oAuth2Client, 'label:unread', (el:any) => console.log(el));
    }
    
    private listMessages(auth:any, query:string, callback:any): Promise<string> {
        const gmail = google.gmail({version: 'v1', auth});
        return gmail.users.messages.list({
            'userId': 'me',
            'q': query
            }).then(async function(res:any){
                return await res.data.messages.reduce(async function(buffer:string, messageInfo:any){
                    let msg = await gmail.users.messages.get({
                        'userId': 'me',
                        'id': messageInfo.id
                    });
                    return buffer + Buffer.from(msg.data.payload.parts[0].body.data,'ascii');
                }, '');
            }).catch((err:string) => {throw err});
    }
}


