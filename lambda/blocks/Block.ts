/*
* File: Block.ts
* Version: 1.0.0
* Date: 2019-02-25
* Author: Matteo Depascale
* License:
*
* History:
* Author                    || Date         || Description
* Matteo Depascale          || 2019-02-25   || Created file
* Matteo Depascale          || 2019-03-25   || Implemented clasd
* Stefano Zanatta           || 2019-03-28   || Verified
* Matteo Depascale          || 2019-04-10   || Approved
*/


import { WorkflowElement } from "./utility/WorkflowElement";

export interface Block extends WorkflowElement {

    /**
     * @description generate the text to speech
     * @returns Promise containing the text to speech or the actual string
     */
    text(): Promise<string> | string;
   
}
