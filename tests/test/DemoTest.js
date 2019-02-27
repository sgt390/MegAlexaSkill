/*
* File: DemoTest.js
* Version: 0.0.1
* Date: Date: 2019-02-26
* Author: Stefano Zanatta
* License:
*
* History:
* Author            || Date         ||  descriptor
* Stefano Zanatta   || 2019-02-26   || Created file
*/
var assert = require('chai').assert;
//const myTestingBlock = require(..);

describe('DemoTest', function(){
    it('passing test', function(){
        assert.equal('hel' + 'lo', 'hello');
    });
    it('not passing test', function(){
      assert.equal('hel' + 'ol', 'hello');
  });
});
