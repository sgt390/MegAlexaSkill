/*
* File: router.ts
* Version: 0.0.1
* Date: Date: 2019-03-21
* Author: Stefano Zanatta
* License:
*
* History:
* Author            || Date         || Description
* Stefano Zanatta   || 2019-03-21   || Created file
*/
import { Workflow } from "../Workflow";
import axios from 'axios';

export class WorkflowService {

    constructor(private userID: String, private workflowName: String) {
    }

    public create() {
        
    }
    /**
     * @description download a workflow from the database using a GET
     */
    public async workflowFromDatabase(): Promise<{}> {
        
        let headers = 'userID=' + this.userID + '&workflowName=' + this.workflowName;
        const URL = 'https://m95485wij9.execute-api.us-east-1.amazonaws.com/beta/workflow?'+ headers;
        return axios.get(URL)
        .then(function(response: {}){
            return response;
        }).catch(function(error: String){
            console.log('exception while reading the user_id from database. £££ERROR: '+ error);
            return 1;
        });
    }
}