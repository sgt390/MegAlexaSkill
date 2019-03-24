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
import {Block} from "./Block";
import {BlockConfig, BlockPinConfig} from "./../JSONconfigurations/JSONconfiguration";

export class BlockPIN implements Block {

    private pin: string;
    constructor(pinConfig: BlockConfig) {
        const _pinConfig = <BlockPinConfig> pinConfig;
        this.pin = _pinConfig.pin;
    }

    public text(): string {
        return 'say your pin to continue';
    }

    public check(pin: string) {
        return pin === this.pin;
    }

    isElicit(): boolean {
        return true;
    }

}