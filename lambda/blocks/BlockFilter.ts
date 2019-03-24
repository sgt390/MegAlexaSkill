/*
* File: BlockFilterable.ts
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
import {Block} from "./Block";
import { blockJSON, BlockConfig, BlockFilterableConfig } from "../JSONconfigurations/JSONconfiguration";

export class BlockFilter implements Block {

    private limit: number;
    private filterableBlock: Promise<Filterable>;
    /**
     * 
     * @param filterableBlock block that has to be filtrated.
     * @param limit number of elements that have to be read
     */
    public constructor(block: Promise<Block>, config: BlockConfig){
        this.limit = (<BlockFilterableConfig> config).limit;
        this.filterableBlock = block
            .then(result => <Filterable> <unknown>result)
            .catch(function(error){
                console.log(error);
                throw new Error('passed block is not filterable');
            });
    }
    public async text(): Promise<string> {
        return (await this.filterableBlock).listRappresentation()
            .filter((element,index) => index < this.limit)
            .reduce(async function(buffer,element){
                return await buffer + await element;
            });
    }

    isElicit(): boolean {
        return false;
    }

}