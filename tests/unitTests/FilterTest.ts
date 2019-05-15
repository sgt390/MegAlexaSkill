/*
* File: filterTest.ts
* Version: 0.0.1
* Date: Date: 2019-03-22
* Author: Andrea Deidda
* License:
*
* History:
* Author            || Date         ||  description
* Andrea Deidda     || 2019-03-22   ||  Created file
* Andrea Deidda     || 2019-03-22   ||  Implemented
* Stefano Zanatta   || 2019-03-24   ||  Verified
* Stefano Zanatta   || 2019-03-24   ||  Approved
*/
import {expect} from 'chai';
import { Workflow } from '../../lambda/Workflow';

const workflow = new Workflow(
    [
        {
            "blockType": "Filter",
            "config": {
              "limit": 1
            }
        },
        {
            "blockType": "List",
            "config": {
                "List":["2","3","4"]
            }
        }   
      ], 'test',-1,''
);

describe('Filter', function(){
    it('type is correct', async function(){
            expect((await (await workflow).alexaResponse()).text).to.be.a('string');
    });
    it('not correct', async function(){
        expect((await (await workflow).alexaResponse()).text).to.not.equal('0');
    });

});