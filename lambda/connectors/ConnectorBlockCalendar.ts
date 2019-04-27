/*
* File: ConnectorBlockCalendar.ts
* Version: 1.0.0
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                    || Date         || Description
* Stefano Zanatta           || 2019-03-20   || Created file
* Stefano Zanatta           || 2019-04-24   || Implemented clasd
* Matteo Depascale          || 2019-04-25   || Verified
* Matteo Depascale          || 2019-04-30   || Approved
*/

import { ConnectorBlock } from "./ConnectorBlock";
import { tokenGoogleApi, credentials } from "../JSONconfigurations/JSONconfiguration";
import { PhrasesGenerator } from "./../blocks/utility/PhrasesGenerator";

const {google} = require('googleapis');
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
                    let startTimeConv = "" + startTime.substring(0, startTime.indexOf("T")) + " "+PhrasesGenerator.atTime()+" "+ startTime.substring(startTime.indexOf("T")+1, startTime.indexOf("+"));
                    let location : string = !event.location ? PhrasesGenerator.noLocation() : ","+PhrasesGenerator.location()+":" + event.location;
                    return await response + (PhrasesGenerator.dayTime()+" "+ startTimeConv + ", "+ event.summary + location +"; ").replace("@", "at").replace(/\<|\>|\/|\\|\=|\&|\*|\"|\||^|\£|\$|/g, "");
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