/*
* File: BlockPIN.ts
* Version: 0.0.1
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-20   || Created file
* Stefano Zanatta       || 2019-03-21   || Updated
*/
import {BlockConfig, BlockPinConfig} from "./../JSONconfigurations/JSONconfiguration";
import { ElicitBlock } from "./ElicitBlock";

export class BlockPIN implements ElicitBlock {

    private PIN: string;
    constructor(pinConfig: BlockConfig) {
        const _pinConfig = <BlockPinConfig> pinConfig;
        this.PIN = _pinConfig.PIN;
    }

    public text(): string {
        return 'say your pin to continue';
    }

    public check(PIN: string) {
        return PIN === this.PIN;
    }

    isElicit(): boolean {
        return true;
    }
    typeElicitSlot(): string{
        return "PIN";
    }

}