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
import { ElicitBlock } from "./utility/ElicitBlock";

export class BlockPIN implements ElicitBlock {
    private correctPIN: string;
    private userPIN: string;
    constructor(pinConfig: BlockConfig) {
        const _pinConfig = <BlockPinConfig> pinConfig;
        this.correctPIN = _pinConfig.PIN;
        this.userPIN = '';
    }

    public text(): string {
        let response = 'say your pin to continue';
        if(this.userPIN != '') {
            if(this.check(this.correctPIN, this.userPIN)) {
                response = 'pin is correct.';
            } else {
                response = 'incorrect, please repeat.';
                this.setElicitSlot('');
            }
        }
        return response;
    }

    public check(PIN: string, userPIN: string) {
        return PIN === userPIN;
    }

    slotRequired(): boolean {
        if(this.userPIN == ''){
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * 
     * @param slot user's pin
     */
    setElicitSlot(slot: string): void {
        this.userPIN = slot;
    }

}