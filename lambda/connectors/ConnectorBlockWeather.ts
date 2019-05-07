/*
* File: ConnectorBlockWeather.ts
* Version: 1.0.0
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                    || Date         || Description
* Matteo Depascale          || 2019-03-20   || Created file
* Matteo Depascale          || 2019-03-27   || Implemented clasd
* Stefano Zanatta           || 2019-03-28   || Verified
* Matteo Depascale          || 2019-04-10   || Approved
*/
import { ConnectorBlock } from "./ConnectorBlock";
import { BlockWeatherConfig} from "../JSONconfigurations/JSONconfiguration";
import { PhrasesGenerator } from "./../blocks/utility/PhrasesGenerator";
const weather = require("openweather-apis")
 
export class ConnectorBlockweather implements ConnectorBlock {
    private coordinates: string;

    constructor(blockWeatherConfig: BlockWeatherConfig) {
        this.coordinates = "" + blockWeatherConfig.Latitude + "," + blockWeatherConfig.Longitude;
        this.setLanguage();
        weather.setCoordinate(blockWeatherConfig.Latitude, blockWeatherConfig.Longitude);
        weather.setUnits('metric');
        weather.setAPPID(blockWeatherConfig.APIKey);
    }

    public async connect(): Promise<string> {
        return new Promise((resolve, reject) => {
            weather.getAllWeather(function(err: string, data: any) {
                if(err) {
                    //reject("error while creating the weather connector: £££££££" + err);
                    resolve(Promise.resolve(PhrasesGenerator.noWeatherSentence()));
                }
                else {
                    resolve(PhrasesGenerator.randomWeatherStartSentence()+ " " + data.name + " " +  
                        PhrasesGenerator.randomWeatherGradeSentence() + " " + Math.round(data.main.temp) + " " +
                        PhrasesGenerator.randomWeatherCelsiusSentence() + " " + 
                        PhrasesGenerator.randomWeatherDetailsSentence() + " " + data.weather[0].description + ", " + 
                        PhrasesGenerator.randomWeatherLowSentence() + " " + Math.round(data.main.temp_min) + " " +
                        PhrasesGenerator.randomWeatherCelsiusSentence() + " " +
                        PhrasesGenerator.randomWeatherHighSentence() + " " + Math.round(data.main.temp_max) + " " +
                        PhrasesGenerator.randomWeatherCelsiusSentence() + ". " );
                }
            });
        });
    }

    private setLanguage() {
        if(PhrasesGenerator.getLanguage()==='en-US')
            weather.setLang('en');
        else
            weather.setLang('it');
    }
}