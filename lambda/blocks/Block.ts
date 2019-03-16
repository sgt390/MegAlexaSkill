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

    text(): String;
    isElicit(): boolean; // boolean for know if there is a interaction whith user
}
