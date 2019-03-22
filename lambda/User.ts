/*
* File: router.ts
* Version: 0.0.1
* Date: Date: 2019-02-28
* Author: Stefano Zanatta
* License:
*
* History:
* Author            || Date         || Description
* Stefano Zanatta   || 2019-02-28   || Created file
*/
const axios = require("axios");
import {Workflow} from "./Workflow";
import { userJSON } from "./JSONconfigurations/JSONconfiguration";

export class User {
    private userID: Promise<String>;
    private name: Promise<String>;
    private email: Promise<String>;

constructor(accessToken: String) {
    const values = this.credentialsByAccessToken(accessToken)
    .then(function(result){
        return [result.user_id, result.name, result.email];
    }).catch(function(error){
        console.log("error in User constructor: "+ error);
        return[];
    });
    
    this.userID = values.then(response => response[0])
    .catch(error => {
        console.log(error);
        return "";
    });

    this.name = values.then(response => response[1])
    .catch(error => {
        console.log(error);
        return "";
    });

    this.email = values.then(response => response[2])
    .catch(error => {
        console.log(error);
        return "";
    });

}

private async credentialsByAccessToken(accessToken: String): Promise<userJSON> {
    return axios.get('api.amazon.com/user/profile?access_token=' + accessToken)
    .then(function (result: userJSON) {
        console.log("logged to amazon with success.");
        return result;
    })
    .catch(function (error: String) {
        console.log(error);
        return {'error':'invalidToken'};
    });
}

/**
 * @description download workflows from database and put them in workflows array
 */
public async workflowFromDatabase(workflowName: String): Promise<Workflow> {
    const body = {
        userID: this.userID,
        workflowName: workflowName
    };
    const URL = 'https://m95485wij9.execute-api.us-east-1.amazonaws.com/beta/workflow/read';
    return axios.post(URL, body)
    .then(function(response: {}){
        return response;
    }).catch(function(error: String){
        console.log('exception while reading the user_id from database. £££ERROR: '+ error);
        return 1;
    });
}

}
