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
* Stefano Zanatta   || 2019-03-29   ||  Implemented
*/
import {expect} from 'chai';
import {BlockList} from "../../lambda/blocks/BlockList";

describe('BlockList', function(){
    it('block from configuration - positive', function(){
        const objectBlock = {List : ['1','2','3']};
        const blockList = new BlockList(objectBlock);
        const oracle = '1,  2,  3, Do you want to add delete or modify any element on your list?';
        expect(blockList.text()).to.be.a('string');

    });

    it('block from configuration - negative List content', function(){
        const objectBlock = {List : ['3','3']};
        const blockList = new BlockList(objectBlock);
        const oracle = ' Do you want to insert edit or remove any item on your list?';
        expect(blockList.text()).to.not.equal(oracle);
    });

    it('block from configuration - empty list', function(){
        const objectBlock = {List : []};
        const blockList = new BlockList(objectBlock);
        const oracle = ' Do you want to insert edit or remove any item on your list?';
        expect(blockList.text()).to.be.a('string');
    });
    it('block from configuration - filtered list', function(){
        const objectBlock = {List : ['1','2','3']};
        const blockList = new BlockList(objectBlock);
        expect(blockList.filterBlocks(1).text()).to.be.a('string');
    });
});
