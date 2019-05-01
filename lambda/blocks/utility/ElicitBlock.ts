/*
* File: ElicitBlock.ts
* Version: 1.0.0
* Date: 2019-03-26
* Author: Bianca Andreea Ciuche
* License:
*
* History:
* Author                    || Date         || Description
* Bianca Andreea Ciuche     || 2019-03-26   || Created file
* Matteo Depascale          || 2019-03-27   || Implemented clasd
* Stefano Zanatta           || 2019-03-28   || Verified
* Matteo Depascale          || 2019-04-10   || Approved
*/
import {Block} from "../Block";

export class ElicitBlock implements Block {

    text(): string | Promise<string> {
        throw "Method not implemented.";
    }

    setElicitSlot(slot:string): void{
        throw "Method not implemented.";
    }
    
    slotRequired(): boolean {
        throw "Method not implemented.";
    }
}