/*
* File: ListService.ts
* Version: 0.0.1
* Date: Date: 2019-04-26
* Author: Stefano Zanatta
* License:
*
* History:
* Author            || Date         || Description
* Stefano Zanatta   || 2019-04-26   || Created file
*/
const axios = require('axios');
import { blockJSON } from "../JSONconfigurations/JSONconfiguration";
import { User } from "../User"

export class BlockService {
    /**
     * @description download a workflow from the database using a GET
     */
    public static async modifyBlock(newBlock: {}, oldBlockIndex: number): Promise<blockJSON[]> {
        const userID = User.getUserID();
        const workflowName = User.getWorkflowName();
        const body = {
            userID: userID,
            workflowName: workflowName,
            newBlock: newBlock,
            oldBlockIndex: oldBlockIndex
        }
        const URL = 'https://m95485wij9.execute-api.us-east-1.amazonaws.com/beta/block';
        return axios.put(URL, body).
            catch(function(error: string){
                throw "Error while updating a block: "+ error;
            });
    }
}
