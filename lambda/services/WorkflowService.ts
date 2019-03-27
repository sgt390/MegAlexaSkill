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

    public async create(userID: Promise<string>, workflowName: string, position: number, slot: string): Promise<Workflow> {
        let config: Promise<blockJSON[]> = this.workflowFromDatabase(userID,workflowName);
        return config.then(result => new Workflow(result, workflowName, position, slot)).catch(function(error) {
            throw new error("error while creating the workflow: " + workflowName + ". £££ERROR: "+ error);
        });
    }
    
    /**
     * @description download a workflow from the database using a GET
     */
    private async workflowFromDatabase(userID: Promise<string>, workflowName: string): Promise<blockJSON[]> {
        let _userID: string = await userID;
        let headers = 'userID=' + _userID + '&workflowName=' + workflowName;
        const URL = 'https://m95485wij9.execute-api.us-east-1.amazonaws.com/beta/workflow?'+ headers;
        return axios.get(URL)
        .then(function(response: bigFatData){
            return response.data;
        }).catch(function(error: string){
            console.log('exception while reading the user_id from database. £££ERROR: '+ error);
            return [];
        });
    }
}

type bigFatData = {
    data: blockJSON[]
}