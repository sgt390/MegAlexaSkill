"use strict";
/*
* File: ConnectorBlockEmail.ts
* Version: 0.0.1
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-20   || Created file
*/
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
var google = require('googleapis').google;
//////////////////////////////////////////////////////////////////////////////////////
/**
 * Retrieve Messages in user's mailbox matching query.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} query String used to filter the Messages listed.
 * @param  {Function} callback Function to call when the request is complete.
 */
var ConnectorBlockEmail = /** @class */ (function () {
    /////////////////////// CREATE CREDENTIALS TYPE! ///////////////////////////
    function ConnectorBlockEmail(token, credentials) {
        this.oAuth2Client = this.authorize(token, credentials);
    }
    ConnectorBlockEmail.prototype.authorize = function (token, credentials) {
        var _a = credentials.installed, client_secret = _a.client_secret, client_id = _a.client_id, redirect_uris = _a.redirect_uris;
        var oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        oAuth2Client.setCredentials(token);
        return oAuth2Client;
    };
    ConnectorBlockEmail.prototype.connect = function (limit) {
        if (limit === void 0) { limit = 5; }
        return this.listMessages(this.oAuth2Client, 'label:unread', function (el) { return console.log(el); }, limit);
    };
    ConnectorBlockEmail.prototype.listMessages = function (auth, query, callback, limit) {
        var gmail = google.gmail({ version: 'v1', auth: auth });
        return gmail.users.messages.list({
            'userId': 'me',
            'q': query,
            'maxResults': limit
        }).then(function (res) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, res.data.messages.reduce(function (response, messageInfo) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var msg, email_content, sender, subject;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, gmail.users.messages.get({
                                                    'userId': 'me',
                                                    'id': messageInfo.id
                                                })];
                                            case 1:
                                                msg = _a.sent();
                                                email_content = Buffer.from(msg.data.payload.parts[0].body.data, 'Base64').toString('ascii');
                                                sender = msg.data.payload.headers.filter(function (el) { return el.name === 'From'; })[0].value.replace("@", " at ");
                                                subject = msg.data.payload.headers.filter(function (el) { return el.name === 'Subject'; })[0].value;
                                                return [4 /*yield*/, response];
                                            case 2: return [2 /*return*/, (_a.sent()) + ("sender: " + sender + ", subject: " + subject + ", email: " + email_content + "; ").replace("@", " at ").replace(/\<|\>|\/|\\|\=|\&|\*|\"|\||^|\£|\$|/g, "")];
                                        }
                                    });
                                });
                            }, '')];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        }).catch(function (err) { throw err; });
    };
    return ConnectorBlockEmail;
}());
exports.ConnectorBlockEmail = ConnectorBlockEmail;
