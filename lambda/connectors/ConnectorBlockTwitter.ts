/*
* File: ConnectorBlockTwitter.ts
* Version: 0.0.1
* Date: 2019-03-20
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-03-27   || Created file
*/
import { ConnectorBlock } from "./ConnectorBlock";
import { connectorFeedRSSResult } from "../JSONconfigurations/JSONconfiguration";

export class ConnectorBlockTwitter implements ConnectorBlock {
    
    connect(): Promise<string> {
        throw new Error("Method not implemented.");
    }

}

