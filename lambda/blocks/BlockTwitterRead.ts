/*
* File: BlockTwitter.ts
* Version: 0.0.1
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-20   || Created file
*/
import {Block} from "./Block";
import {BlockConfig} from "../JSONconfigurations/JSONconfiguration";

//N.B. this could use extends BlockFeedRSS, need some studying boy

export class BlockTwitterRead /*extends BlockFeedRSS*/ implements Block {

    public async text(): Promise<string> {
        return 'TODO';
    }

    isElicit(): boolean {
        return false;
    }

}