"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlockList = /** @class */ (function () {
    function BlockList(blockConfig) {
        this.blockConfig = blockConfig;
    }
    BlockList.prototype.text = function () {
        return 'TODO';
    };
    BlockList.prototype.isElicit = function () {
        return true;
    };
    return BlockList;
}());
exports.BlockList = BlockList;
