"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlockPIN = /** @class */ (function () {
    function BlockPIN(pinConfig) {
        var _pinConfig = pinConfig;
        this.pin = _pinConfig.pin;
    }
    BlockPIN.prototype.text = function () {
        return 'say your pin to continue';
    };
    BlockPIN.prototype.check = function (pin) {
        return pin === this.pin;
    };
    BlockPIN.prototype.isElicit = function () {
        return true;
    };
    return BlockPIN;
}());
exports.BlockPIN = BlockPIN;
