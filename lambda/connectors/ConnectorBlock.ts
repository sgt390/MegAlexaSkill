/*
* File: ConnectorBlock.ts
* Version: 0.0.1
* Date: 2019-03-21
* Author: Stefano Zanatta
* License:
*
* History:
* Author                || Date         || Description
* Stefano Zanatta       || 2019-03-21   || Created file
*/
import { connectorResult } from "../JSONconfigurations/JSONconfiguration";

export interface ConnectorBlock {

    connect(): Promise<string>;
}