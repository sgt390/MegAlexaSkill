/*
* File: BlockList.ts
* Version: 0.0.1
* Date: Date: 2019-03-21
* Author: Andrea Deidda
* License:
*
* History:
* Author            || Date         ||  descriptior
* Andrea Deidda     || 2019-03-21   ||  Created file
*/
import {expect} from 'chai';
import {BlockList} from "../../lambda/blocks/BlockList";

describe('BlockList', function(){
    it('block from configuration - positive', function(){
        const objectBlock = {TextToSpeech : 'this is a text block'};
        const tts = new BlockList(objectBlock);
        const oracle = 'this is a text block';
        expect(tts.text()).to.equal(oracle);

    });

    it('block from configuration - negative List content', function(){
        const objectBlock = {TextToSpeech : 'this is not a text block'};
        const tts = new BlockList(objectBlock);
        const oracle = 'this is a text block';
        expect(tts.text()).to.not.equal(oracle);
    });

    it('block from configuration - List not found', function(){
        const objectBlock = {notTextToSpeech : 'this is a text block'};
        const tts = new BlockList(objectBlock);
        const oracle = 'this is a text block';
        expect(tts.text()).to.not.equal(oracle);
    });

    it('block from configuration - not elicit', function(){
        const objectBlock = {TextToSpeech : ''};
        const tts = new BlockList(objectBlock);
        expect(tts.isElicit()).to.equal(false);
    });
});