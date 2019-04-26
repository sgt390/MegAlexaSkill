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
import { connectorWeather, BlockWeatherConfig} from "../JSONconfigurations/JSONconfiguration";
import { PhrasesGenerator } from "./../blocks/utility/PhrasesGenerator";
const weather = require("openweather-apis")

//const api key = process.env.API_KEY // Your API KEY can be hardcoded, but I recommend setting it as an env variable.
 
export class ConnectorBlockweather implements ConnectorBlock {
    private coordinates: string;

    constructor(blockWeatherConfig: BlockWeatherConfig) {
        this.coordinates = "" + blockWeatherConfig.Latitude + "," + blockWeatherConfig.Longitude;
        weather.setLang('en');
        weather.setCoordinate(blockWeatherConfig.Latitude, blockWeatherConfig.Longitude);
        weather.setUnits('metric');
        weather.setAPPID(blockWeatherConfig.APIKey);
    }

    public async connect(): Promise<string> {
        return new Promise((resolve, reject) => {
            weather.getAllWeather(function(err: string, data: any) {
                if(err) {
                    reject("error while creating the weather connector: £££££££" + err);
                }
                else {
                    resolve(PhrasesGenerator.randomWeatherStartSentence()+" "+ data.name + " " + PhrasesGenerator.randomWeatherGradeSentence()+" "+ data.main.temp + PhrasesGenerator.randomWeatherDetailsSentence()+" "+
                        data.weather[0].description + " " + PhrasesGenerator.randomWeatherLowSentence()+" "+ data.main.temp_min + " " +
                        PhrasesGenerator.randomWeatherHighSentence()+" "+ data.main.temp_max);
                }
            });
        });
        /*
        .then(function(result) {
            console.log(result);
            return result;
        })
        .catch(el => el);
        */


        /*
            .then(function (weather: connectorWeather) {
                return weather.map(function(tweet:any){
                    return tweet.user.name +' tweeted '+ tweet.text;
                });
            })
            
        */
    }
}
/*
const weatherconfig = {
    Latitude: "45.4064",
    Longitude: "11.8768"
}
const abba = new ConnectorBlockweather(weatherconfig);
abba.connect().then(el => console.log(el));
*/
/*
*   CORRETTOMA NON PROMISE
*
 return weather.getAllWeather(function(err: string, data: any) {
            if(err)
                console.log("error while creating the weather connector: £££££££" + err);
            else {
                return "Currently in " + data.name + " is " + data.main.temp + " with " +
                    data.weather[0].description + ", you can expect an hight of " + data.main.temp_min + 
                    " and a low of " + data.main.temp_max;
            }
        })
        */