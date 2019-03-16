/*
* File: router.js
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
import {Workflow} from "../Workflow";

export class User {
    private user_id: Promise<String>;
    private name: Promise<String>;
    private email: Promise<String>;
    private workflows: Promise<Workflow[]>;

constructor(accessToken: String) {
    const values = this.loginByAccessToken(accessToken).then(function(result){
        return [result.user_id, result.name, result.email];
    }).catch(function(error){
        console.log("error in User constructor: "+ error);
        return[];
    });
    
    this.user_id = values.then(response => response[0])
    .catch(error => console.log(error));

    this.name = values.then(response => response[1])
    .catch(error => console.log(error));

    this.email = values.then(response => response[2])
    .catch(error => console.log(error));

}

private loginByAccessToken(accessToken: String): Promise<userJSON> {
    return axios.get('api.amazon.com/user/profile?access_token=' + accessToken)
    .then(function (result) {
        console.log("logged to amazon with success.");
        return result;
    })
    .catch(function (error) {
        console.log(error);
        return {'error':'invalidToken'};
    });
}

/**
 * download workflows from database and put them in workflows array
 * @TODO
 */
private downloadWorkflows(user_id): Promise<Workflow[]>{
    return Promise.resolve([]);
}
}

type userJSON = {
    user_id: String,
    name: String,
    email: String
}
