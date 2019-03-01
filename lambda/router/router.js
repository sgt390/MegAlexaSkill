/*
* File: router.js
* Version: 0.0.1
* Date: Date: 2019-02-28
* Author: Stefano Zanatta
* License:
*
* History:
* Author            || Date         ||  descriptor
* Stefano Zanatta   || 2019-02-28   || Created file
*/
var axios = require("axios");
var authentication = {
    accessKey: 'AKIAIKPQXLQTNZZ6YVVQ',
    secretKey: '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'
  };
module.exports = class Router {
    constructor(){}
    // #TODO implement a cache system 
    userDataById(userID){
        const body = {
            userID: userID
        }

        axios.post('https://m95485wij9.execute-api.us-east-1.amazonaws.com/beta/user/read', body)
        .then(function (result) {
            console.log("fetched user from database with success.");
            console.log(result.data);
            return result.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
