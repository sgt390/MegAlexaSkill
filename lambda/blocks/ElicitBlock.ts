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

export class ElicitBlock implements Block {
    text(): string | Promise<string> {
        throw new Error("Method not implemented.");
    }
    toString(): string {
        throw new Error("Method not implemented.");
    }
    typeElicitSlot(): string{
        throw new Error("Method not implemented.");
    }
    setElicitSlot(slot:String): void{
        throw new Error("Method not implemented.");
    }
    slotRequired(): boolean {
        throw new Error("Method not implemented.");
    }
}