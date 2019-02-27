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
