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
var Filter_1 = require("./blocks/Filter");
var Workflow = /** @class */ (function () {
    /**
     *
     * @param workflowConfigJSON promise containing a workflow and all his blocks
     */
    function Workflow(workflowConfigJSON, workflowName) {
        this._blocks = [];
        this.name = workflowName;
        this._blocks = workflowConfigJSON.map(function (blockJSON) {
            return Workflow.blockFromJSON(blockJSON);
        });
    }
    Workflow.blockFromJSON = function (blockConfigurationJSON) {
        var block;
        switch (blockConfigurationJSON.blockType) {
            case 'Filter':
                block = Promise.resolve(new Filter_1.Filter(blockConfigurationJSON.config));
                break;
            case 'TextToSpeech':
                block = Promise.resolve(new BlockTextToSpeech_1.BlockTextToSpeech(blockConfigurationJSON.config));
                break;
            case 'FeedRSS':
                block = Promise.resolve(new BlockFeedRSS_1.BlockFeedRSS(blockConfigurationJSON.config));
                break;
            case 'Stock':
                block = Promise.resolve(new BlockFeedRSS_1.BlockFeedRSS(blockConfigurationJSON.config));
            case 'Sport':
                block = Promise.resolve(new BlockFeedRSS_1.BlockFeedRSS(blockConfigurationJSON.config));
                break;
            case 'Crypto':
                block = Promise.resolve(new BlockFeedRSS_1.BlockFeedRSS(blockConfigurationJSON.config));
                break;
            default:
                throw new Error('In class Workflow, ' + blockConfigurationJSON.blockType + ' block not found');
        }
        return block;
    };
    Workflow.prototype.text = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blocks;
            return __generator(this, function (_a) {
                blocks = this.filter(this._blocks);
                return [2 /*return*/, blocks.then(function (blocks) {
                        var text = '';
                        for (var i = 0; i < blocks.length; ++i) {
                            text += (blocks[i]).text();
                        }
                        return text;
                    })];
            });
        });
    };
    Workflow.prototype.filter = function (filterBlocks) {
        return __awaiter(this, void 0, void 0, function () {
            var blocks, i, j, _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        blocks = Promise.resolve([]);
                        i = 0, j = 0;
                        _g.label = 1;
                    case 1:
                        if (!(i < filterBlocks.length && j < filterBlocks.length)) return [3 /*break*/, 8];
                        if (!(filterBlocks[j] instanceof Filter_1.Filter)) return [3 /*break*/, 4];
                        return [4 /*yield*/, blocks];
                    case 2:
                        _b = (_a = (_g.sent())).push;
                        _d = (_c = filterBlocks[j + 1]).filterBlocks;
                        return [4 /*yield*/, filterBlocks[j]];
                    case 3:
                        _b.apply(_a, [_d.apply(_c, [(_g.sent()).limit()])]);
                        j = j + 2;
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, blocks];
                    case 5:
                        _f = (_e = (_g.sent())).push;
                        return [4 /*yield*/, filterBlocks[j]];
                    case 6:
                        _f.apply(_e, [_g.sent()]);
                        ++j;
                        _g.label = 7;
                    case 7:
                        ++i;
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/, blocks];
                }
            });
        });
    };
    return Workflow;
}());
exports.Workflow = Workflow;
