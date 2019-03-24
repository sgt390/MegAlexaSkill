/*
* File: Filterable.ts
* Version: 0.0.1
* Date: 2019-03-24
* Author: Stefano Zanatta
* License:
*
* History:
* Author                || Date         || Description
* Stefano Zanatta       || 2019-03-24   || Created file
*/
import { Block } from "./Block";
export interface Filterable {
    
    /**
     * @returns text() in format of a list of Strings
     */
    filterBlocks(limit:number): Block;
}