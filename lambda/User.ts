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
import { WorkflowService } from "./services/WorkflowService";

export class User {
    private userID: Promise<String>;
    private name: Promise<String>;
    private email: Promise<String>;

    constructor(accessToken: String) {
        /*
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
        */


    /////////////////////  DA RIMUOVERE E SCOMMENTARE QUELLO CHE C'E' SOPRA TODO ///////////////////////////////////////////////////
    this.userID = Promise.resolve('amzn1.account.AGC777NBGNIAWSP6EBO33ULF7XMQ');
    this.name = Promise.resolve('Africa');
    this.email = Promise.resolve('abc@123.com');
    //////////////////////////////////////////////////////////////////////////////////////////
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

public async workflow (workflowName: String): Promise<Workflow> {
    return new WorkflowService().create(this.userID, workflowName);
}

}



////////////////////////////// FOREACH DON'T WORK WITH PROMISE ORDER!.!.!.!!!!.!!!!!!!!!11!!!.
/* 
let user = new User("amzn1.account.AGC777NBGNIAWSP6EBO33ULF7XMQ");
user.workflow('poc').then(async function(result){
       let el= result.blocks().map((el,index) => el.then(result => result.text()).catch(er => console.log(er)));
    console.log(await el[4].then(el => el).then(er=>er));
    console.log(await el[1].then(el => el).then(er=>er));
    console.log(await el[2].then(el => el).then(er=>er));
    let i =0;
    while(i < 5){
        console.log(await el[i]);
        ++i;
    }
}).catch(function(error){
    console.log('error in test');
});
*/