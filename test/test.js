var assert = require('assert');
var emailExtractor = require('../src/lib/emailExtractor');

// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal(-1, [1,2,3].indexOf(4));
//     });
//   });
// });

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
});
