/*
* File: ConnectorBlock.ts
* Version: 1.0.0
* Date: 2019-03-21
* Author: Stefano Zanatta
* License:
*
* History:
* Author                || Date         || Description
* Stefano Zanatta       || 2019-02-25   || Created file
* Matteo Depascale      || 2019-02-25   || Verified
* Matteo Depascale      || 2019-03-25   || Approved
*/
import { connectorResult } from "../JSONconfigurations/JSONconfiguration";

export interface ConnectorBlock {

    connect(): Promise<string>;
}