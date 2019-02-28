/*
* File: routerTest.js
* Version: 0.0.1
* Date: Date: 2019-02-28
* Author: Stefano Zanatta
* License:
*
* History:
* Author            || Date         ||  descriptor
* Stefano Zanatta   || 2019-02-28   || Created file
*/
const assert = require('chai').assert;
var Router = require('../../lambda/router/router.js');

var router = new Router();

describe('Router', function(){
    it('description', function(){
        result = router.userDataById("AmazonUse56765000");
        oracle = JSON.stringify({ Item:
            { email: 'matteo.depascale@gmail.com',
              name: 'africa',
              workflowList: { Buongiorno: [Array] },
              userID: 'AmazonUse56765000' } });
        assert.equal(result,oracle);
    });
});
