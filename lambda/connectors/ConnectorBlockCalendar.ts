/*
* File: ConnectorBlockCalendar.ts
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
import { tokenGoogleApi, credentials } from "../JSONconfigurations/JSONconfiguration";
import { BlockCalendar } from "../blocks/BlockCalendar";

const {google} = require('googleapis');
import { auth } from 'google-oauth2-node';
import { start } from "repl";

//////////////////////////////////////////////////////////////////////////////////////

/**
 * Retrieve Messages in user's mailbox matching query.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} query String used to filter the Messages listed.
 * @param  {Function} callback Function to call when the request is complete.
 */

export class ConnectorBlockCalendar implements ConnectorBlock {

    private oAuth2Client:any;

    /////////////////////// CREATE CREDENTIALS TYPE! ///////////////////////////
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
        return this.listEvents(this.oAuth2Client, 'label:unread', (el:any) => console.log(el),limit);
    }
    
    private listEvents(auth:any, query:string, callback:any,limit:number): Promise<string> {
        const calendar = google.calendar({version: 'v3', auth});
        return calendar.events.list({
            'calendarId': 'primary',
            'singleEvents': true,
            'orderBy': 'startTime',
            'timeMin': (new Date()).toISOString(),
            'maxResults': limit
            }).then(async function(res:any){
                return await res.data.items.reduce(async function(response:string, event:any) {
                    let startTime = event.start.dateTime;
                    let startTimeConv = "" + startTime.substring(0, startTime.indexOf("T")) + " at " + startTime.substring(startTime.indexOf("T")+1, startTime.indexOf("+"));
                    let location : string = !event.location ? " there is no location specified" : ", location: " + event.location;
                    return await response + ("On " + startTimeConv + ", "+ event.summary + location +"; ").replace("@", " at ").replace(/\<|\>|\/|\\|\=|\&|\*|\"|\||^|\£|\$|/g, "");
                }, '');
            }).catch((err:string) => {throw err});
    }
}

/*
const conf = {
    'token': token,
    'credentials': credentials
}

let a = new ConnectorBlockCalendar(token, credentials);

a.connect().then(el => console.log(el));
*/