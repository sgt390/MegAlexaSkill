/*
* File: BlockPIN.ts
* Version: 0.0.1
* Date: Date: 2019-03-21
* Author: Andrea Deidda
* License:
*
* History:
* Author            || Date         ||  description
* Andrea Deidda     || 2019-03-21   ||  Created file
*/
import {expect} from 'chai';
import {BlockPIN} from "../../lambda/blocks/BlockPIN";

describe('BlockPIN', function(){
    it('block from configuration - pin is not set', function(){
        const blockPIN = new BlockPIN({
            "PIN": "1234"
          });
        expect(blockPIN.text()).to.equal('say your pin to continue');
    });

    it('block from configuration - slot required is true', function(){
        const blockPIN = new BlockPIN({
            "PIN": "1234"
          });
        expect(blockPIN.slotRequired()).to.equal(true);
    });
    it('block from configuration - pin is set and correct', function(){
        const blockPIN = new BlockPIN({
            "PIN": "1234"
          });
          blockPIN.setElicitSlot('1234');
        expect(blockPIN.text()).to.equal('pin is correct.');
    });
    it('block from configuration - pin is set and not correct', function(){
        const blockPIN = new BlockPIN({
            "PIN": "1234"
          });
          blockPIN.setElicitSlot('0000');
        expect(blockPIN.text()).to.equal('incorrect, please repeat.');
    });
});