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
const axios = require('axios');
import { blockJSON } from "../JSONconfigurations/JSONconfiguration";

export class WorkflowService {

    public async create(userID: Promise<String>, workflowName: String): Promise<Workflow> {
        let config: Promise<blockJSON[]> = this.workflowFromDatabase(userID,workflowName);
        return config.then(result => new Workflow(result, workflowName)).catch(function(error) {
            console.log("error while creating the workflow: " + workflowName + ". £££ERROR: "+ error);
            return new Workflow([], workflowName);
        });
    }
    
    /**
     * @description download a workflow from the database using a GET
     */
    private async workflowFromDatabase(userID: Promise<String>, workflowName: String): Promise<blockJSON[]> {
        
        let _userID: String = await userID;
        let headers = 'userID=' + _userID + '&workflowName=' + workflowName;
        const URL = 'https://m95485wij9.execute-api.us-east-1.amazonaws.com/beta/workflow?'+ headers;
        return axios.get(URL)
        .then(function(response: bigFatData){
            return response.data;
        }).catch(function(error: String){
            console.log('exception while reading the user_id from database. £££ERROR: '+ error);
            return [];
        });
    }
}

type bigFatData = {
    data: blockJSON[]
}