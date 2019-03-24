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

export class BlockFilterable implements Block {

    /**
     * 
     * @param filterableBlock block that has to be filtrated.
     * @param limit number of elements that have to be read
     */
    public constructor(private filterableBlock: Filterable, private limit: number){}
    public async text(): Promise<string> {
        return this.filterableBlock.listRappresentation().filter((element,index) => index < this.limit).reduce(async function(buffer,element){
            return await buffer + await element;
        });
    }

    isElicit(): boolean {
        return false;
    }

}