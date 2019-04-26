/*
* File: BlockTwitterRead.ts
* Version: 0.0.1
* Date: 2019-03-27
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-27   || Created file
*/

import {Block} from "./Block";
import {BlockConfig, BlockTwitterReadConfig, BlockTwitterReadHashtagConfig} from "../JSONconfigurations/JSONconfiguration";
import { PhrasesGenerator } from "./utility/PhrasesGenerator";
import {Filterable} from "./utility/Filterable";
import {ConnectorBlockTwitterHashtag} from "../connectors/ConnectorBlockTwitterHashtag";

//https://www.npmjs.com/package/twitter


export class BlockTwitterReadHashtag implements Block, Filterable {
    private connector: ConnectorBlockTwitterHashtag;
    private _text: Promise<string> | undefined;
    private limit: number = 10;
    private filtered:boolean = false;

    constructor(blockConfig: BlockConfig) {
        const blockTwitterConfig: BlockTwitterReadHashtagConfig = <BlockTwitterReadHashtagConfig> blockConfig;
        this.connector = new ConnectorBlockTwitterHashtag(blockTwitterConfig);
    }
    
    public async text(): Promise<string> {
        return PhrasesGenerator.randomReadTwitterSentence()+" "+this.connector.connect(this.limit);
    }

    isElicit(): boolean {
        return false;
    }

    filterBlocks(limit: number): BlockTwitterReadHashtag {
        this.limit = limit;
        return this;
    }
}