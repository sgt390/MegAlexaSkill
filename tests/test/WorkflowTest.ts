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
import {Workflow} from './../../lambda/Workflow';
import {BlockTextToSpeech} from '../../lambda/blocks/BlockTextToSpeech';
import { Block } from '../../lambda/blocks/Block';
import {expect} from 'chai';

const workflowConfigJSON = [
    {
        "blockType": "TextToSpeech",
        "config": {
        "TextToSpeech": "This is the first block"
        }
    },
    {
        "blockType": "TextToSpeech",
        "config": {
        "TextToSpeech": "This is the second block"
        }
    },
    {
        "blockType": "FeedRSS",
        "config": {
        "URL": "http://feeds.bbci.co.uk/news/video_and_audio/technology/rss.xml"
        }
    }
];

describe('Workflow.block(position)', function(){
    it('positive', async function(){
        const workflow = new Workflow(workflowConfigJSON, "poc");
        let block: Block = await workflow.block(0);
        expect(await block.text()).to.be.equal(workflowConfigJSON[0].config.TextToSpeech);
    });
    it('negative', async function(){
        const workflow = new Workflow(workflowConfigJSON, "poc");
        let block: Block = await workflow.block(1);
        expect(await block.text()).to.be.not.equal(workflowConfigJSON[0].config.TextToSpeech);
    });
    
});

describe('Workflow.blocks()', function(){
    it('positive', async function(){
        const workflow = new Workflow(workflowConfigJSON, "poc");
        let blocks: Promise<Block>[] = workflow.blocks();
        //// foreach...
    });
    it('negative', async function(){
        const workflow = new Workflow(workflowConfigJSON, "poc");
        let block: Block = await workflow.block(1);
        expect(await block.text()).to.be.not.equal(workflowConfigJSON[0].config.TextToSpeech);
    });
    
});