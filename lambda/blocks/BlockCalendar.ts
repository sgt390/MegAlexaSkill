/*
* File: BlockCalendar.ts
* Version: 1.0.0
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                    || Date         || Description
* Matteo Depascale          || 2019-03-20   || Created file
* Matteo Depascale          || 2019-04-24   || Implemented clasd
* Stefano Zanatta           || 2019-04-25   || Verified
* Matteo Depascale          || 2019-04-30   || Approved
*/

import {Block} from "./Block";
import {BlockConfig, BlockCalendarConfig} from "./../JSONconfigurations/JSONconfiguration";
import { Filterable } from "./utility/Filterable";
import { ConnectorBlockCalendar } from "../connectors/ConnectorBlockCalendar";

export class BlockCalendar implements Block, Filterable {
    private limit: number;
    private connector: ConnectorBlockCalendar;

    constructor(blockConfig: BlockConfig){
        let config = <BlockCalendarConfig> blockConfig;
        this.connector = new ConnectorBlockCalendar(config.token, config.credentials);
        this.limit = 5;
    }

    filterBlocks(limit: number): BlockCalendar {
        this.limit = limit;
        return this;
    }

    public async text(): Promise<string> {
        return this.connector.connect(this.limit);
    }
}
