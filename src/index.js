"use strict";

var base64 = require('base-64');
var validator = require("email-validator");

module.exports = function(fileName, acceptedExtensions) {
  var acceptedExtensions = acceptedExtensions || [];
  var decodedFileName =  decodeURIComponent(fileName.replace(/\+/g, " ")); //the object may have spaces
  var components = decodedFileName.split('.');

  if (components.length != 3) {
    throw new Error('The file name did not have 3 components.');
  }

  if (acceptedExtensions.isArray == false) {
    acceptedExtensions = [acceptedExtensions];
  }

  if (acceptedExtensions.includes(components[2]) == false) {
    throw new Error('The file name does not have an accepted extension.');
  }

  var emailEncoded = decodedFileName.split('.')[0];
  var emailDecoded = base64.decode(emailEncoded);

  if (validator.validate(emailDecoded) == false) {
    throw new Error('The decoded string is not an email.');
  }

  return { email: emailDecoded, id: components[1], extension: components[2] };
}
