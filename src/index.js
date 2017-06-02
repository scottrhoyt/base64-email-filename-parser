"use strict";

var base64 = require('base-64');
var validator = require("email-validator");

/**
 * Parses and validates a filename of the form: <base64-email>.<id>.<extension>
 *
 * If the filename cannot be parsed, decoded, or validated, the function throws
 * an error.
 *
 * @param {string} fileName - The filename to parse
 * @param {string|string[]} acceptedExtensions - The accepted file extension or an array of accepted extensions
 * @return {Object} - An object containing the `email`, `id`, and `extension` of the filename.
 */
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
