/*
* File: WorkflowService.ts
* Version: 1.0.0
* Date: Date: 2019-02-21
* Author: Stefano Zanatta
* License:
*
* History:
* Author            || Date         || Description
* Stefano Zanatta       || 2019-02-21   || Created file
* Stefano Zanatta       || 2019-02-24   || Implemented
* Bianca Ciuche         || 2019-02-27   || Verified
* Matteo Depascale      || 2019-03-02   || Approved
*/
import { Workflow } from "../Workflow";
const axios = require('axios');
import { blockJSON, WorkflowData } from "../JSONconfigurations/JSONconfiguration";

export class WorkflowService {

    public async create(userID: Promise<string>, workflowName: string, position: number, slot: string): Promise<Workflow> {
        let config: Promise<blockJSON[]> = this.workflowFromDatabase(userID,workflowName);
        return config.then(result => new Workflow(result, workflowName, position, slot))
            .catch(function(error) {
                throw "error while creating the workflow: " + workflowName + ". £££ERROR: "+ error;
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
        .then(function(response: WorkflowData){
            return response.data;
        }).catch(function(error: string){
            throw 'exception while reading the user_id from database. £££ERROR: '+ error;
        });
    }
}