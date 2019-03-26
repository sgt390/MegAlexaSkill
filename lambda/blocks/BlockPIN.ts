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
    private correctPIN: string;
    constructor(pinConfig: BlockConfig) {
        const _pinConfig = <BlockPinConfig> pinConfig;
        this.correctPIN = _pinConfig.PIN;
        this.PIN = '';
    }

    public text(): string {
        let response = 'say your pin to continue';
        if(this.PIN != '') {
            if(this.PIN === this.correctPIN) {
                response = 'pin is correct.';
            } else {
                response = 'incorrect, please repeat';
                this.PIN = '';
            }
        }
        return response;
    }

    public check(PIN: string) {
        return PIN === this.PIN;
    }

    isElicit(): boolean {
        if(this.PIN == ''){
            return true;
        }
        else{
            return false;
        }
    }
    typeElicitSlot(): string {
        return "PIN";
    }
    setElicitSlot(slot: string): void {
        this.PIN = slot;
    }

}