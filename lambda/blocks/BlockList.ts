/*
* File: BlockList.ts
* Version: 0.0.1
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-20   || Created file
* Andrea Deidda         || 2019-03-21   || Update file
* Bianca Andreea Ciuche || 2019-03-27   || Update file
*/
import {Block} from "./Block";
import {BlockConfig, BlockListConfig} from "./../JSONconfigurations/JSONconfiguration";
import { Filterable } from "../utility/Filterable";

export class BlockList implements Block, Filterable{
    private limit: number = Number.POSITIVE_INFINITY;
    private list :[];

    constructor(private blockConfig: BlockConfig){
        const blockListConfig: BlockListConfig = <BlockListConfig> blockConfig;
        this.list = blockListConfig.List;
    }

    public text(): string {
        return this.list.filter((el,index) => index<this.limit)
               .reduce((result,element) => result + " " + element,"");
    }

    filterBlocks(limit: number): BlockList{
        this.limit = limit;
        return this;
    }

    toString(): string {
        throw new Error("Method not implemented.");
    }

    

}