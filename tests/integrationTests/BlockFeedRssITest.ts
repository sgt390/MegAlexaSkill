/*
* File: BlockFeedRSS.ts
* Version: 0.0.1
* Date: Date: 2019-03-29
* Author: Stefano Zanatta
* License:
*
* History:
* Author            || Date         ||  description
* Stefano Zanatta   || 2019-03-29   ||  Created file
* Stefano Zanatta   || 2019-03-29   ||  Implemented
*/
import {BlockFeedRSS} from "../../lambda/blocks/BlockFeedRSS";
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('BlockFeedRSS', function(){
   it('block from configuration - positive', function(){
        const objectBlock = {URL : 'www.feedrsstest.rss'};
        const blockFeedRSS = new BlockFeedRSS(objectBlock);
        const oracle = {
            items: 
                [
                    {title:'titleTest',content:'contentTest'}
                ]
        };
        expect(blockFeedRSS.text()).to.equal(oracle);
    });

});