/*
* File: BlockTwitterUserTLTest.ts
* Version: 0.0.1
* Date: Date: 2019-04-10
* Author: Stefano Zanatta
* License:
*
* History:
* Author            || Date         ||  description
* Stefano Zanatta   || 2019-04-10   ||  Created file
* Stefano Zanatta   || 2019-04-12   ||  Implemented
* Matteo Depascale  || 2019-04-13   ||  Verified
* Stefano Zanatta   || 2019-04-14   ||  Approved
*/
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { User } from "../../lambda/User";
chai.use(chaiAsPromised);
const expect = chai.expect;

let key = ['Atza|IwEBILqJERIciq9aVw71EByh','rXfwkXYGb26xMULUnYtFt9DCdIdzTCY8F5DPxatSzPy8pALjEPek','ub1RDOHgLQXsPV0vhk8_PXCYBhjAQtbhpdoVXufM_6ekZ9x5oBC_d1sOAkqJ-DzpEAWIpOtWegw4YHN3gykeMmGwDh80isHLmTMkG6n6SNm_LmLqPK2Fgvekt6HzBbk_hiVte8nbYGsdCxEd1iKcCGq4YGKx6x-7Dy4qHQEOlAub197tzAL61HcahRjuRhxRnzKqR8umq0NWCc','Tlgl_yYd41W6y25XAJuUbEibcKgSDHbbDqnQWezsmcNtj1T3srQxC1SG-4lvo4RaiospR0Tq90cmtcvdfcvU7s_--5aPuC5f2eSWnq13Mw4_emug6zkuP3qv8yNVe1XOWPhl','iVMflMIyfHCbS-3gU0f9u7hpqD0bUIxcpYPRxHIq4PhguEXmEbkXgeaTYVhNhoLZhmxAn7DY6hKK-4txnNpNvNMgXhrR_BLCP-zM2F84PQwdjW_yeAOF5vfvAjP4ru'];
const user = new User(key.reduce((buf, el) => buf +=el, ""));
const workflow = user.workflow("timeline");

describe.skip('twitter timeline', function(){
    it('not an elicit slot', async function(){
            expect((await (await workflow).alexaResponse()).elicitSlot).to.equal(false);
    });
    it('not an elicit slot', async function(){
        let a = (await (await workflow).alexaResponse()).text;
        expect(a).to.be.a('string');
    });

});