"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* File: BlockTestToSpeechTest.ts
* Version: 0.0.1
* Date: Date: 2019-02-26
* Author: Stefano Zanatta
* License:
*
* History:
* Author            || Date         ||  descriptior
* Stefano Zanatta   || 2019-02-26   || Created file
* Stefano Zanatta   || 2019-03-21   || Completed
*/
var chai_1 = require("chai");
var BlockTextToSpeech_1 = require("../../lambda/blocks/BlockTextToSpeech");
describe('BlockTextToSpeech', function () {
    it('block from configuration - positive', function () {
        var objectBlock = { TextToSpeech: 'this is a text block' };
        var tts = new BlockTextToSpeech_1.BlockTextToSpeech(objectBlock);
        var oracle = 'this is a text block';
        chai_1.expect(tts.text()).to.equal(oracle);
    });
    it('block from configuration - negative TextToSpeech content', function () {
        var objectBlock = { TextToSpeech: 'this is not a text block' };
        var tts = new BlockTextToSpeech_1.BlockTextToSpeech(objectBlock);
        var oracle = 'this is a text block';
        chai_1.expect(tts.text()).to.not.equal(oracle);
    });
    it('block from configuration - TextToSpeech not found', function () {
        var objectBlock = { notTextToSpeech: 'this is a text block' };
        var tts = new BlockTextToSpeech_1.BlockTextToSpeech(objectBlock);
        var oracle = 'this is a text block';
        chai_1.expect(tts.text()).to.not.equal(oracle);
    });
    it('block from configuration - not elicit', function () {
        var objectBlock = { TextToSpeech: '' };
        var tts = new BlockTextToSpeech_1.BlockTextToSpeech(objectBlock);
        chai_1.expect(tts.isElicit()).to.equal(false);
    });
});
