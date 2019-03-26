/*
* File: ElicitBlock.ts
* Version: 0.0.1
* Date: 2019-03-26
* Author: Bianca Andreea Ciuche
* License:
*
* History:
* Author                || Date         || Description
* Bianca Andreea Ciuche     || 2019-03-26   || Created file
*/
import {Block} from "./Block";

export interface ElicitBlock extends Block {
    isElicit(): boolean;
    typeElicitSlot(): string;
}