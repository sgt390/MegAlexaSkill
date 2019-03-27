/*
* File: BlockTwitterRead.ts
* Version: 0.0.1
* Date: 2019-03-27
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-27   || Created file
*/
import {Block} from "./Block";
import {BlockConfig} from "../JSONconfigurations/JSONconfiguration";

//https://www.npmjs.com/package/twitter


export class BlockTwitterRead /*extends BlockFeedRSS*/ implements Block {

    public async text(): Promise<string> {
        return 'TODO';
    }

    isElicit(): boolean {
        return false;
    }

}