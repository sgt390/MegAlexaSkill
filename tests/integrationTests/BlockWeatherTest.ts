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
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { ElicitBlock } from '../../lambda/utility/ElicitBlock';
chai.use(chaiAsPromised);
const expect = chai.expect;

const BlockWeatherConfig = [
    {
        "blockType": "Weather",
        "config": {
            "Latitude": "45.4080",
            "Longitude": "11.8859"
        }
    }
];

describe('BlockWeather', function(){  
    it('block from configuration - positive BlockWeather', function() {
        const objectBlock = {Latitude: "45.4080",
        Longitude: "11.8859"};
        const weather = new BlockWeather(objectBlock);
        const oracle = 'Currently in Padova is 16.32 with clear sky, you can expect an hight of 14.44 and a low of 19.44';
        expect(weather.text()).to.become(oracle);
    })

    it('block from configuration - negative BlockWeather content', function(){
        const objectBlock = {Latitude: "45.4080",
        Longitude: "11.8859"};
        const weather = new BlockWeather(objectBlock);
        const oracle = "Currently in PLACE is MAIN.TEMP with WEATHER.DESCRIPTION, " +
        "you can expect an hight of TEMP_MIN and a low of TEMP_MAX";
        expect(weather.text()).to.not.become(oracle);
    });

    it('block from configuration - BlockWeather not found', function(){
        const objectBlock = {Lat: "45.4080",
        Long: "11.8859"};
        const weather = new BlockWeather(objectBlock);
        const oracle = 'params inside objectBlock not corrects';
        expect(weather.text()).to.not.equal(oracle);
    });

    it('block from configuration - not elicit', function(){
        const objectBlock = {Latitude: "",
        Longitude: ""};
        const weather = new BlockWeather(objectBlock);
        expect(weather).to.not.satisfy(function(s:BlockWeather){
            return s instanceof ElicitBlock;
        });
        
    });
    
});