/*
* File: BlockWeatherTest.js
* Version: 0.0.1
* Date: 2019-03-29
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-29   || Created file
*/

//import {expect} from 'chai';
import {BlockWeather} from '../../lambda/blocks/BlockWeather';
import { Block } from '../../lambda/blocks/Block';
import {expect} from 'chai';

const BlockWeatherConfig = [
    {
        "blockType": "Weather",
        "config": {
            "Latitude": "45.4080",
            "Longitude": "11.8859"
        }
    }
];

//hold up, i'm gonna implement this one first
//best practice will never catch me

/**
 * SKIPPED TEST
 */
describe.skip('', function(){  
    it('block from configuration - positive', function() {
        const objectBlock = {Latitude: "45.4080",
        Longitude: "11.8859"};
        const tts = new BlockWeather(objectBlock.Latitude, objectBlock.Longitude);
        const oracle = '[Place] currently is [°C]';
        expect(tts.text()).to.equal(oracle);
    })

    it('block from configuration - negative TextToSpeech content', function(){
        const objectBlock = {Latitude: "45.4080",
        Longitude: "11.8859"};
        const tts = new BlockWeather(objectBlock.Latitude, objectBlock.Longitude);
        const oracle = 'error';
        expect(tts.text()).to.not.equal(oracle);
    });

    it('block from configuration - TextToSpeech not found', function(){
        const objectBlock = {Latitude: "45.4080",
        Longitude: "11.8859"};
        const tts = new BlockWeather(objectBlock.Latitude, objectBlock.Longitude);
        const oracle = 'this is a text block';
        expect(tts.text()).to.not.equal(oracle);
    });

    it('block from configuration - not elicit', function(){
        const objectBlock = {Latitude: "45.4080",
        Longitude: "11.8859"};
        const tts = new BlockWeather(objectBlock.Latitude, objectBlock.Longitude);
        
    });
    
});