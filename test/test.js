var assert = require('assert');
var emailExtractor = require('../src/lib/emailExtractor');

describe('emailExtractor', () => {
  it('should decode an email properly', () => {
    var encoded = 'am9obi5kb2VAZW1haWwuY29t';
    var expected = 'john.doe@email.com';
    assert.equal(expected, emailExtractor(encoded));
  });

  it('should decode an email as the first part of a fileName properly', () => {
    var encoded = 'am9obi5kb2VAZW1haWwuY29t.1.txt';
    var expected = 'john.doe@email.com';
    assert.equal(expected, emailExtractor(encoded));
  });

  it('should throw an error if the string cannot be decoded', () => {
    var encoded = 'am9obi5kb2VAZW1haWwuY29*(';
    assert.throws(()=>emailExtractor(encoded));
  });

  it('should throw an error if the decoded string is not an email', () => {
    var encoded = 'dGhpc2lzbm90YW5lbWFpbA==';
    assert.throws(()=>emailExtractor(encoded));
  });

  it('should throw an error if passed an empty string', () => {
    var encoded = '';
    assert.throws(()=>emailExtractor(encoded));
  });

  it('should throw an error if passed null', () => {
    var encoded = null;
    assert.throws(()=>emailExtractor(encoded));
  });

  it('should throw an error if passed undefined', () => {
    var encoded = undefined;
    assert.throws(()=>emailExtractor(encoded));
  });
});
