/*
* File: BlockPIN.ts
* Version: 1.0.0
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                    || Date         || Description
* Matteo Depascale          || 2019-03-20   || Created file
* Stefano Zanatta           || 2019-03-27   || Implemented clasd
* Stefano Zanatta           || 2019-03-28   || Verified
* Matteo Depascale          || 2019-04-10   || Approved
*/
import {BlockConfig, BlockPinConfig} from "./../JSONconfigurations/JSONconfiguration";
import { PhrasesGenerator } from "./utility/PhrasesGenerator";
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
        let response = PhrasesGenerator.randomPinBlockStartSentence();
        if(this.userPIN != '') {
            if(this.check(this.correctPIN, this.userPIN)) {
                response = PhrasesGenerator.randomCorrectPinSentence();
            } else {
                response = PhrasesGenerator.randomWrongPinSentence();
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
        this.userPIN = slot.replace(/\s/g, '');
    }

}