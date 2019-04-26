/*
* File: BlockWeather.ts
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
import {Block} from "./Block";
import {BlockConfig, BlockWeatherConfig} from "./../JSONconfigurations/JSONconfiguration";
import { ConnectorBlockweather } from "../connectors/ConnectorBlockWeather";

export class BlockWeather implements Block {
    private connector: ConnectorBlockweather;

    constructor(blockConfig: BlockConfig) {
        const blockWeatherConfig: BlockWeatherConfig = <BlockWeatherConfig> blockConfig;
        this.connector = new ConnectorBlockweather(blockWeatherConfig);
    }

    public async text(): Promise<string> {
        return this.connector.connect();
    }
}