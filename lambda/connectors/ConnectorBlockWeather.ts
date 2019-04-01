/*
* File: ConnectorBlockWeather.ts
* Version: 0.0.1
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-20   || Created file
*/
import { ConnectorBlock } from "./ConnectorBlock";
import { connectorWeather, BlockWeatherConfig } from "../JSONconfigurations/JSONconfiguration";
const DarkSky = require('dark-sky');
const https = require('https');

//obviusly not going to stay here
const API_KEY = "";
//const darksky = new DarkSky(process.env.DARK_SKY) // Your API KEY can be hardcoded, but I recommend setting it as an env variable.
 
export class ConnectorBlockweather implements ConnectorBlock {
    private coordinates: string;

    constructor(blockWeatherConfig: BlockWeatherConfig) {
        this.coordinates = "" + blockWeatherConfig.Latitude + "," + blockWeatherConfig.Longitude;
    }

    public async connect(): Promise<string> {

        var request = https.get("https://api.darksky.net/forecast/"+API_KEY+"/"+this.coordinates);
        
        /*
        let feed = parser.parseURL(this.URL);
        return feed.then(function(result: connectorFeedRSSResult) {
            return result.items
            .splice(0,limit)
            .map(el => el.title + " " + el.content + " ")
            .reduce(((buffer, element) => buffer + element), "")
            .trim();
            
        }).catch(function(error: string) {
            console.log('there was an error with the feed rss connector: £££££'+ error);
            return "there was an error with the feed rss";
        });
        */
       return this.connect();
    }
}