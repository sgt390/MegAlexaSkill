/*
* File: Filterable.ts
* Version: 1.0.0
* Date: 2019-03-24
* Author: Stefano Zanatta
* License:
*
* History:
* Author                    || Date         || Description
* Stefano Zanatta           || 2019-03-24   || Created file
* Matteo Depascale          || 2019-03-25   || Implemented clasd
* Stefano Zanatta           || 2019-03-28   || Verified
* Matteo Depascale          || 2019-04-10   || Approved
*/
import { Block } from "../Block";

export interface Filterable {
    
    /**
     * @returns text() in format of a list of Strings
     */
    filterBlocks(limit:number): Block;
}