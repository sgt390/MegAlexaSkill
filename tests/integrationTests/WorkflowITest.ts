/*
* File: Workflow.js
* Version: 0.0.1
* Date: 2019-03-02
* Author:   Stefano Zanatta  
* License:
*
* History:
* Author                || Date         || Description
* Stefano Zanatta      || 2019-03-02   || Created file
*/

//import {expect} from 'chai';
import {Workflow} from '../../lambda/Workflow';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const expect = chai.expect;

const workflow = new Workflow(
    [
        {
            "blockType": "Filter",
            "config": {
                "limit": 2
            }
        },        
        {
            "blockType": "List",
            "config": {
                "List": ['uno','due','tre','quattro']
            }
        },
        {
            "blockType": "TextToSpeech",
            "config": {
                "TextToSpeech": 'this is an integration test'
            }
        }      
      ], 'poc',-1,'');
describe('workflow integration test', function(){
    it('workflow from configuration - positive', function(){
         const oracle = {
             'text': 'uno due; this is an integration test; ',
             'elicitSlot': false,
             'position': -1
         };
         expect(workflow.alexaResponse()).to.become(oracle);
     });
 
 });

 describe('workflow integration test', function(){
    it('workflow from configuration - negative', function(){
         const oracle = {
             'text': 'uno due tre; this is an integration test; ',
             'elicitSlot': true,
             'position': 0
         };
         expect(workflow.alexaResponse()).to.not.become(oracle);
     });
 
 });