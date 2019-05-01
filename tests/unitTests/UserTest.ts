/*
* File: filterTest.ts
* Version: 0.0.1
* Date: Date: 2019-03-22
* Author: Andrea Deidda
* License:
*
* History:
* Author            || Date         ||  description
* Andrea Deidda     || 2019-03-22   ||  Created file
* Andrea Deidda     || 2019-03-22   ||  Implemented
* Stefano Zanatta   || 2019-03-24   ||  Verified
* Stefano Zanatta   || 2019-03-24   ||  Approved
*/
import {expect} from 'chai';
import { Workflow } from '../../lambda/Workflow';
import { User } from '../../lambda/User';

let key = ['Atza|IwEBILqJERIciq9aVw71EByh','rXfwkXYGb26xMULUnYtFt9DCdIdzTCY8F5DPxatSzPy8pALjEPek','ub1RDOHgLQXsPV0vhk8_PXCYBhjAQtbhpdoVXufM_6ekZ9x5oBC_d1sOAkqJ-DzpEAWIpOtWegw4YHN3gykeMmGwDh80isHLmTMkG6n6SNm_LmLqPK2Fgvekt6HzBbk_hiVte8nbYGsdCxEd1iKcCGq4YGKx6x-7Dy4qHQEOlAub197tzAL61HcahRjuRhxRnzKqR8umq0NWCc','Tlgl_yYd41W6y25XAJuUbEibcKgSDHbbDqnQWezsmcNtj1T3srQxC1SG-4lvo4RaiospR0Tq90cmtcvdfcvU7s_--5aPuC5f2eSWnq13Mw4_emug6zkuP3qv8yNVe1XOWPhl','iVMflMIyfHCbS-3gU0f9u7hpqD0bUIxcpYPRxHIq4PhguEXmEbkXgeaTYVhNhoLZhmxAn7DY6hKK-4txnNpNvNMgXhrR_BLCP-zM2F84PQwdjW_yeAOF5vfvAjP4ru'];

describe('User', function(){
    it('user is correct', async function(){
           // expect(new User(key[0]+key[1]+key[2]+key[3]+key[4])).to.be.a("User");
    });
    it('user is not correct - exception is thrown', async function(){
        //expect(new User('123')).to.throw();
    });

});