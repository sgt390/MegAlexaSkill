/*
* File: Filter.ts
* Version: 0.0.1
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-20   || Created file
* Stefano Zanatta       || 2019-03-24   || Completed Class
*/
import { BlockConfig, BlockFilterableConfig } from "../JSONconfigurations/JSONconfiguration";

export class Filter {

    private _limit: number;

    public constructor(config: BlockConfig){
        this._limit = (<BlockFilterableConfig> config).limit;
    }

    public limit() {
        return this._limit;
    }
}
