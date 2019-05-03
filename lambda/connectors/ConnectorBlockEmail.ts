/*
* File: ConnectorBlockEmail.ts
* Version: 1.0.0
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Stefano Zanatta       || 2019-03-20   || Created file
* Stefano Zanatta       || 2019-04-24   || Implemented clasd
* Matteo Depascale      || 2019-04-25   || Verified
* Matteo Depascale      || 2019-04-30   || Approved
*/

import { ConnectorBlock } from "./ConnectorBlock";
import { tokenGoogleApi, credentials } from "../JSONconfigurations/JSONconfiguration";
import { PhrasesGenerator } from "./../blocks/utility/PhrasesGenerator";

const {google} = require('googleapis');

//////////////////////////////////////////////////////////////////////////////////////

/**
 * Retrieve Messages in user's mailbox matching query.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} query String used to filter the Messages listed.
 * @param  {Function} callback Function to call when the request is complete.
 */

export class ConnectorBlockEmail implements ConnectorBlock {

    private oAuth2Client:any;
    constructor(token: tokenGoogleApi, credentials: credentials){
        this.oAuth2Client = this.authorize(token, credentials);
    }

    private authorize(token: tokenGoogleApi, credentials:any): any {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    
        oAuth2Client.setCredentials(token);
        return oAuth2Client;
        
    }

    public connect(limit:number=5): Promise<string>{
        return this.listMessages(this.oAuth2Client, 'label:unread', limit);
    }
    
    private listMessages(auth:any, query:string, limit:number): Promise<string> {
        const gmail = google.gmail({version: 'v1', auth});
        return gmail.users.messages.list({
            'userId': 'me',
            'q': query,
            'maxResults': limit
            }).then(async function(res:any){
                return await res.data.messages.reduce(async function(response:string, messageInfo:any){
                    let msg = await gmail.users.messages.get({
                        'userId': 'me',
                        'id': messageInfo.id
                    });
                    const email_content = Buffer.from(msg.data.payload.parts[0].body.data,'Base64').toString('ascii');
                    //const email_content = msg.data.snippet;
                    const sender = msg.data.payload.headers.filter((el:any) => el.name === 'From')[0].value.replace("@", " at ");
                    const subject = msg.data.payload.headers.filter((el:any) => el.name === 'Subject')[0].value;
                    return await response + (PhrasesGenerator.senderEmail()+" "+ sender + ","+" "+PhrasesGenerator.subjectEmail()+":"+ subject+ ", email: " + email_content +"; ").replace("@", " at ").replace(/\<|\>|\/|\\|\=|\&|\*|\"|\||^|\£|\$|/g, "");
                }, '');
            }).catch(function (error:string) {
                return Promise.resolve(PhrasesGenerator.noEmailFoundSentence());
            });
    }
}
