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
import {BlockConfig} from "./../JSONconfigurations/JSONconfiguration";

export class BlockWeather implements Block {

    constructor(private state: String, private region: String) {

    }
    public async text(): Promise<String> {
        return '';
    }

    isElicit(): boolean {
        return false;
    }

}