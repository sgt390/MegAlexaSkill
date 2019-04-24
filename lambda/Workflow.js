/*
* File: Workflow.ts
* Version: 0.0.1
* Date: 2019-02-25
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-02-25   || Created file
* Stefano Zanatta       || 2019-04-06   || Changed switch to commands
*/
'use strict';
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
var BlockTextToSpeech_1 = require("./blocks/BlockTextToSpeech");
var BlockFeedRSS_1 = require("./blocks/BlockFeedRSS");
var Filter_1 = require("./blocks/utility/Filter");
var BlockPIN_1 = require("./blocks/BlockPIN");
var BlockTwitterReadUserTL_1 = require("./blocks/BlockTwitterReadUserTL");
var BlockList_1 = require("./blocks/BlockList");
var BlockWeather_1 = require("./blocks/BlockWeather");
var BlockTwitterReadHashtag_1 = require("./blocks/BlockTwitterReadHashtag");
var BlockTwitterWrite_1 = require("./blocks/BlockTwitterWrite");
var BlockEmail_1 = require("./blocks/BlockEmail");
var Workflow = /** @class */ (function () {
    /**
     *
     * @param workflowConfigJSON promise containing a workflow and all its blocks
     */
    function Workflow(workflowConfigJSON, workflowName, workflowStartingPosition, elicitSlot) {
        if (elicitSlot === void 0) { elicitSlot = ''; }
        var _this = this;
        this.workflowStartingPosition = workflowStartingPosition;
        this.elicitSlot = elicitSlot;
        this._blocks = [];
        this.name = workflowName;
        /**
         * workflow starts from workflowStartingPosition
         */
        this._blocks = workflowConfigJSON.filter(function (el, index) { return index >= _this.workflowStartingPosition; }).map(function (blockJSON) {
            return Workflow.blockFromJSON(blockJSON);
        });
    }
    /**
     *
     * @param blockConfigurationJSON block in JSON format, containing its name and default/user configuration
     */
    Workflow.blockFromJSON = function (blockConfigurationJSON) {
        if (this.createBlockCommands[blockConfigurationJSON.blockType])
            return this.createBlockCommands[blockConfigurationJSON.blockType](blockConfigurationJSON.config);
        else
            return Promise.resolve(new BlockTextToSpeech_1.BlockTextToSpeech({ TextToSpeech: 'there was en error while processing the block: ' + blockConfigurationJSON.blockType }));
    };
    Workflow.prototype.alexaResponse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blocks, workflowPosition, slot;
            return __generator(this, function (_a) {
                blocks = this.filter(this._blocks);
                workflowPosition = this.workflowStartingPosition;
                slot = this.elicitSlot;
                return [2 /*return*/, blocks.then(function (blocks) {
                        return __awaiter(this, void 0, void 0, function () {
                            var _text, elicitSlot, i, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _text = '';
                                        elicitSlot = false;
                                        /**
                                         * if ElicitSlot is not empty, set the slot of the first block
                                         */
                                        if (slot != '' && blocks[0].setElicitSlot) {
                                            blocks[0].setElicitSlot(slot);
                                        }
                                        i = 0;
                                        _b.label = 1;
                                    case 1:
                                        if (!(i < blocks.length && !elicitSlot)) return [3 /*break*/, 4];
                                        _a = _text;
                                        return [4 /*yield*/, blocks[i].text()];
                                    case 2:
                                        _text = _a + ((_b.sent()) + "; ");
                                        // if block is elicit and slot is not filled yet, quit the cycle and save the workflow position
                                        if (blocks[i].slotRequired && blocks[i].slotRequired()) {
                                            elicitSlot = true;
                                            workflowPosition = workflowPosition + i;
                                        }
                                        _b.label = 3;
                                    case 3:
                                        ++i;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/, {
                                            text: _text,
                                            elicitSlot: elicitSlot,
                                            position: workflowPosition
                                        }];
                                }
                            });
                        });
                    }).catch(function (error) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                throw 'Workflow.ts: Error while creating the workflow' + error;
                            });
                        });
                    })];
            });
        });
    };
    /**
     *
     * @param _filterBlocks list of blocks & filters
     * @returns list of blocks
     * @description filters any block that comes after a filter; filters are removed in the process
     */
    Workflow.prototype.filter = function (_filterBlocks) {
        return __awaiter(this, void 0, void 0, function () {
            var blocks, i, j, filterBlock, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        blocks = Promise.resolve([]);
                        i = 0, j = 0;
                        _e.label = 1;
                    case 1:
                        if (!(i < _filterBlocks.length && j < _filterBlocks.length)) return [3 /*break*/, 10];
                        return [4 /*yield*/, _filterBlocks[j]];
                    case 2:
                        filterBlock = _e.sent();
                        if (!(filterBlock instanceof Filter_1.Filter)) return [3 /*break*/, 6];
                        return [4 /*yield*/, blocks];
                    case 3:
                        /**
                         * _filterBlocks[j+1] is the filterable block
                         */
                        (_e.sent()).push(new BlockTextToSpeech_1.BlockTextToSpeech({ TextToSpeech: '' }));
                        return [4 /*yield*/, blocks];
                    case 4:
                        _b = (_a = (_e.sent())).push;
                        return [4 /*yield*/, _filterBlocks[j + 1]];
                    case 5:
                        _b.apply(_a, [((_e.sent()).filterBlocks(filterBlock.limit()))]);
                        j = j + 2;
                        return [3 /*break*/, 9];
                    case 6: return [4 /*yield*/, blocks];
                    case 7:
                        _d = (_c = (_e.sent())).push;
                        return [4 /*yield*/, _filterBlocks[j]];
                    case 8:
                        _d.apply(_c, [_e.sent()]);
                        ++j;
                        _e.label = 9;
                    case 9:
                        ++i;
                        return [3 /*break*/, 1];
                    case 10: return [2 /*return*/, blocks];
                }
            });
        });
    };
    Workflow.createBlockCommands = {
        'Filter': function (config) { return Promise.resolve(new Filter_1.Filter(config)); },
        'TextToSpeech': function (config) { return Promise.resolve(new BlockTextToSpeech_1.BlockTextToSpeech(config)); },
        'FeedRSS': function (config) { return Promise.resolve(new BlockFeedRSS_1.BlockFeedRSS(config)); },
        'List': function (config) { return Promise.resolve(new BlockList_1.BlockList(config)); },
        'Stock': function (config) { return Promise.resolve(new BlockFeedRSS_1.BlockFeedRSS(config)); },
        'Sport': function (config) { return Promise.resolve(new BlockFeedRSS_1.BlockFeedRSS(config)); },
        'Crypto': function (config) { return Promise.resolve(new BlockFeedRSS_1.BlockFeedRSS(config)); },
        'PIN': function (config) { return Promise.resolve(new BlockPIN_1.BlockPIN(config)); },
        'TwitterUserTL': function (config) { return Promise.resolve(new BlockTwitterReadUserTL_1.BlockTwitterReadUserTL(config)); },
        'Weather': function (config) { return Promise.resolve(new BlockWeather_1.BlockWeather(config)); },
        'TwitterHashtag': function (config) { return Promise.resolve(new BlockTwitterReadHashtag_1.BlockTwitterReadHashtag(config)); },
        'TwitterWrite': function (config) { return Promise.resolve(new BlockTwitterWrite_1.BlockTwitterWrite(config)); },
        'Email': function (config) { return Promise.resolve(new BlockEmail_1.BlockEmail(config)); }
    };
    return Workflow;
}());
exports.Workflow = Workflow;
var wf = new Workflow([
    {
        "blockType": "TextToSpeech",
        "config": {
            "TextToSpeech": "This is the second block"
        }
    }
], 'test', 0);
wf.alexaResponse().then(function (el) { return console.log(el.text); }).catch(function (err) { return console.log('££££££' + err); });
