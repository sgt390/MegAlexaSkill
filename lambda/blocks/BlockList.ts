/*
* File: BlockList.ts
* Version: 0.0.1
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-20   || Created file
* Andrea Deidda         || 2019-03-21   || Update file
*/
import {Block} from "./Block";
import {BlockConfig} from "./../JSONconfigurations/JSONconfiguration"; 

export class BlockList implements Block {

    constructor(private blockConfig: BlockConfig){
        
    }
    public text(): string {
        return 'TODO';
    }

    isElicit(): boolean {
        return true;
    }

}