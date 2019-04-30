/*
* File: BlockTwitterReadHashtagTest.ts
* Version: 0.0.1
* Date: Date: 2019-03-29
* Author: Stefano Zanatta
* License:
*
* History:
* Author            || Date         ||  description
* Stefano Zanatta   || 2019-04-10   ||  Created file
* Stefano Zanatta   || 2019-04-12   ||  Implemented
* Matteo Depascale  || 2019-04-13   ||  Verified
* Stefano Zanatta   || 2019-04-14   ||  Approved
*/
import {BlockFeedRSS} from "../../lambda/blocks/BlockFeedRSS";
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { User } from "../../lambda/User";
chai.use(chaiAsPromised);
const expect = chai.expect;

const user = new User('amzn1.account.AHLGM57UWXVIIJPTTRDCPM4PUYVQ');
const workflow = user.workflow("workflowName");

describe('twitter hashtag', function(){
   it('block from configuration - positive', function(){
        const config = {
            "URL": "https://www.feedforall.com/sample.xml"
          };
        const blockFeedRSS = new BlockFeedRSS(config);
        expect(blockFeedRSS.text()).to.become(oracle);
    });

});