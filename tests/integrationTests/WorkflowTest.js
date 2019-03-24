"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var workflowConfigJSON = [
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
describe('Workflow.block(position)', function () {
});
