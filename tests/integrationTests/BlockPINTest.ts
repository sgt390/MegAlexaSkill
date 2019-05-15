/*
* File: BlockPINTest.ts
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
import { Workflow } from '../../lambda/Workflow';
chai.use(chaiAsPromised);
const expect = chai.expect;

const workflow = new Workflow(
    [
        {
            "blockType": "PIN",
            "config": {
                "PIN": 1234
            }
        }   
      ], 'test',-1,''
);

describe('PIN', function(){
    it('correct', async function(){
            expect((await (await workflow).alexaResponse()).text).to.be.a('string');
    });
    it('not correct', async function(){
        expect((await (await workflow).alexaResponse()).position).to.not.equal('0');
    });

});