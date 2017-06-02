var assert = require('assert');
var emailExtractor = require('../src/index');

describe('emailExtractor', () => {
  it('should decode an email as the first part of a fileName properly with one accepted extension', () => {
    var encoded = 'am9obi5kb2VAZW1haWwuY29t.1.txt';
    var expected = {
      fileName: 'am9obi5kb2VAZW1haWwuY29t.1.txt',
      email: 'john.doe@email.com',
      id: '1',
      extension: 'txt'
    };
    assert.deepEqual(expected, emailExtractor(encoded, 'txt'));
  });

  it('should decode an email as the first part of a fileName properly with an array of accepted extensions', () => {
    var encoded = 'am9obi5kb2VAZW1haWwuY29t.1.txt';
    var expected = {
      fileName: 'am9obi5kb2VAZW1haWwuY29t.1.txt',
      email: 'john.doe@email.com',
      id: '1',
      extension: 'txt'
    };
    assert.deepEqual(expected, emailExtractor(encoded, ['txt', 'dat']));
  });

  it('should decode an email as the first part of a fileName properly with any extension', () => {
    var encoded = 'am9obi5kb2VAZW1haWwuY29t.1.txt';
    var expected = {
      fileName: 'am9obi5kb2VAZW1haWwuY29t.1.txt',
      email: 'john.doe@email.com',
      id: '1',
      extension: 'txt'
    };
    assert.deepEqual(expected, emailExtractor(encoded, '*'));
  });

  it('should decode an email as the first part of a fileName properly when is has escapes', () => {
    var encoded = 'c2NvdHQuaG95dEBkd3MubGE%3D.1.txt';
    var expected = {
      fileName: 'c2NvdHQuaG95dEBkd3MubGE=.1.txt',
      email: 'scott.hoyt@dws.la',
      id: '1',
      extension: 'txt'
    };
    assert.deepEqual(expected, emailExtractor(encoded, '*'));
  });

  it('should throw an error if the string cannot be decoded', () => {
    var encoded = 'am9obi5kb2VAZW1haWwuY29*(.1.txt';
    assert.throws(()=>emailExtractor(encoded, 'txt'));
  });

  it('should throw an error if the decoded string is not an email', () => {
    var encoded = 'dGhpc2lzbm90YW5lbWFpbA==.1.txt';
    assert.throws(()=>emailExtractor(encoded, 'txt'));
  });

  it('should throw an error if passed an empty string', () => {
    var encoded = '';
    assert.throws(()=>emailExtractor(encoded, 'txt'));
  });

  it('should throw an error if passed null', () => {
    var encoded = null;
    assert.throws(()=>emailExtractor(encoded, 'txt'));
  });

  it('should throw an error if passed undefined', () => {
    var encoded = undefined;
    assert.throws(()=>emailExtractor(encoded, 'txt'));
  });

  it('should throw an error if the filename does not have three components', () => {
    var encoded = 'am9obi5kb2VAZW1haWwuY29t.txt';
    assert.throws(()=>emailExtractor(encoded, 'txt'));
  });

  it('should throw an error if the filename does not have an accepted extension', () => {
    var encoded = 'am9obi5kb2VAZW1haWwuY29t.dat';
    assert.throws(()=>emailExtractor(encoded, 'txt'));
  });
});
