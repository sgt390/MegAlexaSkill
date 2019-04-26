/*
* File: router.ts
* Version: 1.0.0
* Date: Date: 2019-04-21
* Author: Stefano Zanatta
* License:
*
* History:
* Author            || Date         || Description
* Stefano Zanatta       || 2019-04-21   || Created file
* Stefano Zanatta       || 2019-04-21   || Implemented
* Bianca Ciuche         || 2019-04-22   || Verified
* Matteo Depascale      || 2019-04-24   || added credentialsByToken method
* Matteo Depascale      || 2019-04-23   || added static methods
* Bianca Ciuche         || 2019-04-22   || Verified
* Matteo Depascale      || 2019-04-30   || Approved
*/
const axios = require("axios");
import {Workflow} from "./Workflow";
import { userJSON } from "./JSONconfigurations/JSONconfiguration";
import { PhrasesGenerator } from "./blocks/utility/PhrasesGenerator";
import { WorkflowService } from "./services/WorkflowService";

export class User {
    private userID: Promise<string>;
    private name: Promise<string>;
    private email: Promise<string>;

    constructor(accessToken: string) {
        const values = this.credentialsByAccessToken(accessToken)
        .then(function(result){
            console.log("constructorUSER: " + result.user_id + "name " + result.name + "email " + result.email)
            return [result.user_id, result.name, result.email];
        }).catch(function(error){
            throw 'error while creating the user: '+error;
        });

        this.userID = values.then(response => response[0])
        .catch(error => {
            console.log(error);
            return "";
        });
        User.setUserID(this.userID);

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

private async credentialsByAccessToken(accessToken: string): Promise<userJSON> {
    return axios.get('https://api.amazon.com/user/profile?access_token=' + accessToken)
    .then(function (result: {data:userJSON}) {
        return result.data;
    })
    .catch(function (error: string) {
        console.log(error);
        return {'error':'invalidToken'};
    });
}

public async workflow (workflowName: string, position: number = 0, elicitSlot: string = ''): Promise<Workflow> {
    User.setWorkflowName(workflowName);
    return new WorkflowService().create(this.userID, workflowName, position, elicitSlot);
}

public static language(language: string): void{
    PhrasesGenerator.setLanguage(language);
}
// useful static methods
private static userInformation = {
    "userID": "",
    "workflowName": "" 
};

public static getUserID() {
    return User.userInformation.userID;
}

public static getWorkflowName() {
    return User.userInformation.workflowName;
}
public static async setUserID(userID: Promise<string>) {
    User.userInformation.userID = await userID;
}

public static setWorkflowName(workflowName: string) {
    User.userInformation.workflowName = workflowName;
}

}

/* 

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
/*
let a = async function(){
    let user = new User("");
    let speechText = '';
    const wf = await user.workflow('poc');
    const blocks = wf.blocks();
    for (let i=0; i<4; ++i) {
        speechText += await blocks[i].then(result => result.text()).catch(error => console.log("Exception while creating the response in index.js. ££££££££ "+ error));

    }
    console.log(speechText);
    return speechText;
}

a();
*/