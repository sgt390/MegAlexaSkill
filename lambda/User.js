"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var axios = require("axios");
var WorkflowService_1 = require("./services/WorkflowService");
var User = /** @class */ (function () {
    function User(accessToken) {
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
    User.prototype.credentialsByAccessToken = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, axios.get('api.amazon.com/user/profile?access_token=' + accessToken)
                        .then(function (result) {
                        console.log("logged to amazon with success.");
                        return result;
                    })
                        .catch(function (error) {
                        console.log(error);
                        return { 'error': 'invalidToken' };
                    })];
            });
        });
    };
    User.prototype.workflow = function (workflowName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new WorkflowService_1.WorkflowService().create(this.userID, workflowName)];
            });
        });
    };
    return User;
}());
exports.User = User;
////////////////////////////// FOREACH DON'T WORK WITH PROMISE ORDER!.!.!.!!!!.!!!!!!!!!11!!!.
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
