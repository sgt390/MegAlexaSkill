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
const weather = require("openweather-apis")

//obviusly not going to stay here
const API_KEY = "4b1ea0b33edc40ba538b366b98484801";
//const darksky = new DarkSky(process.env.DARK_SKY) // Your API KEY can be hardcoded, but I recommend setting it as an env variable.
 
export class ConnectorBlockweather implements ConnectorBlock {
    private coordinates: string;

    constructor(blockWeatherConfig: BlockWeatherConfig) {
        this.coordinates = "" + blockWeatherConfig.Latitude + "," + blockWeatherConfig.Longitude;
        weather.setLang('en');
        weather.setCoordinate(blockWeatherConfig.Latitude, blockWeatherConfig.Longitude);
        weather.setUnits('metric');
        weather.setAPPID(API_KEY);
    }

    public async connect(): Promise<string> {
        return weather.getAllWeather(function(err: string, data: any) {
            if(err)
                console.log("error while creating the weather connector: £££££££" + err);
            else {
                console.log(data);
                return "Currently in " + data.name + " is " + data.main.temp + " with " +
                    data.weather[0].description + ", you can expect an hight of " + data.main.temp_min + 
                    " and a low of " + data.main.temp_max;
            }
        })
        .then(function(result: string) {
            return ""
        })
        .catch(function (error: string) {
            throw 'error while creating the weather connector: £££££££'+ error;
        });

        /*
            .then(function (weather: connectorWeather) {
                return weather.map(function(tweet:any){
                    return tweet.user.name +' tweeted '+ tweet.text;
                });
            })
            
        */
    }
}

const weatherconfig = {
    Latitude: "45.4064",
    Longitude: "11.8768"
}
const abba = new ConnectorBlockweather(weatherconfig);
console.log(abba.connect());

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