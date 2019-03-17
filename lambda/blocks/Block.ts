/*
* File: Block.ts
* Version: 0.0.1
* Date: 2019-02-25
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-02-25   || Created file
*/

export interface Block {

    /**
     * @description generate the text to speech
     * @returns Promise containing the text to speech
     */
    text(): Promise<String>;
    /**
     * @description evaluates if the block needs one or more parameters from the user to execute
     */
    isElicit(): boolean; 
    toString(): String;
}

export type BlockConfig = {}