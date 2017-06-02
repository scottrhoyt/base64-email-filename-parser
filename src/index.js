"use strict";

var base64 = require('base-64');
var validator = require("email-validator");

module.exports = function(fileName) {
  var decodedFileName =  decodeURIComponent(fileName.replace(/\+/g, " ")); //the object may have spaces
  var emailEncoded = decodedFileName.split('.')[0];
  var emailDecoded = base64.decode(emailEncoded);

  if (validator.validate(emailDecoded) == false) {
    throw new Error('The decoded string is not an email.');
  }

  return emailDecoded;
}
