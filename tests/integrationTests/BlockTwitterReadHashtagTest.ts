/*
* File: BlockTwitterHashtagTest.ts
* Version: 0.0.1
* Date: Date: 2019-04-10
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
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { WorkflowService } from '../../lambda/services/WorkflowService';
chai.use(chaiAsPromised);
const expect = chai.expect;

let key = [''];

describe.skip('twitter hashtag', function(){
    const workflow = new WorkflowService().create(Promise.resolve(key[0]),'twitterusertl',0,'');
    it('not an elicit slot', async function(){
            expect((await (await workflow).alexaResponse()).elicitSlot).to.equal(false);
    });
    it('text is correct', async function(){
        expect((await (await workflow).alexaResponse()).text).to.be.a('string');
    });

});