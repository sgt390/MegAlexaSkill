"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlockTextToSpeech = /** @class */ (function () {
    function BlockTextToSpeech(blockConfig) {
        var blockTTSConfig = blockConfig;
        this._text = blockTTSConfig.TextToSpeech;
        if (this._text === undefined) {
            console.log("TextToSpeech value in TextToSpeech block not found");
            this._text = "error";
        }
    }
    /**
     * @TODO
     */
    BlockTextToSpeech.prototype.text = function () {
        return this._text;
    };
    BlockTextToSpeech.prototype.isElicit = function () {
        return false;
    };
    return BlockTextToSpeech;
}());
exports.BlockTextToSpeech = BlockTextToSpeech;
