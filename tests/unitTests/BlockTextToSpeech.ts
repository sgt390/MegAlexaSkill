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
import {expect} from 'chai';
import { BlockTextToSpeech } from '../../lambda/blocks/BlockTextToSpeech';

describe('BlockTextToSpeech', function(){
    it('block from configuration - positive', function(){
        const objectBlock = {TextToSpeech : 'this is a text block'};
        const tts = new BlockTextToSpeech(objectBlock);
        const oracle = 'this is a text block';
        expect(tts.text()).to.equal(oracle);

    });

    it('block from configuration - negative TextToSpeech content', function(){
        const objectBlock = {TextToSpeech : 'this is not a text block'};
        const tts = new BlockTextToSpeech(objectBlock);
        const oracle = 'this is a text block';
        expect(tts.text()).to.not.equal(oracle);
    });

    it('block from configuration - TextToSpeech not found', function(){
        const objectBlock = {notTextToSpeech : 'this is a text block'};
        const tts = new BlockTextToSpeech(objectBlock);
        const oracle = 'this is a text block';
        expect(tts.text()).to.not.equal(oracle);
    });

    it('block from configuration - not elicit', function(){
        const objectBlock = {TextToSpeech : ''};
        const tts = new BlockTextToSpeech(objectBlock);
        expect(tts.isElicit()).to.equal(false);
    });
});

