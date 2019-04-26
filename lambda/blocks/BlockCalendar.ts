/*
* File: BlockCalendar.ts
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
import {BlockConfig, BlockCalendarConfig} from "./../JSONconfigurations/JSONconfiguration"; 
import { PhrasesGenerator } from "./utility/PhrasesGenerator";
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
        return PhrasesGenerator.randomCalendarSentence()+" "+this.connector.connect(this.limit);
    }
}

/*
const conf = {
    'token': token,
    'credentials': credentials
}

let a = new BlockCalendar(conf);

a.text().then(el => console.log(el));*/