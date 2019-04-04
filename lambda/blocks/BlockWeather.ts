/*
* File: BlockWeather.ts
* Version: 0.0.1
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-20   || Created file
*/
import {Block} from "./Block";
import {BlockConfig, BlockWeatherConfig} from "./../JSONconfigurations/JSONconfiguration";
import { ConnectorBlockweather } from "../connectors/ConnectorBlockWeather";

export class BlockWeather implements Block {
    private connector: ConnectorBlockweather;
    private _text: Promise<string> | undefined;

    constructor(blockConfig: BlockConfig) {
        const blockWeatherConfig: BlockWeatherConfig = <BlockWeatherConfig> blockConfig;
        this.connector = new ConnectorBlockweather(blockWeatherConfig);
    }

    public async text(): Promise<string> {
        return this.connector.connect();
    }
}