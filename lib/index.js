'use strict';

var dumbPasswords = require('./config/dumbPasswords');
var RadixTree = require('./helpers/radixTree');
var CaeserCipher = require('../lib/helpers/CaeserCipher');

var passwordTree = new RadixTree(dumbPasswords);
var caeserCypher = new CaeserCipher(5);

var checkPassword = function(userPasswordInputString) {
  var userPassword = userPasswordInputString.toLowerCase();
  var userHashedPassword = caeserCypher.encryptString(userPassword);

  return passwordTree.searchForNodes(userHashedPassword);
};

exports.checkPassword = checkPassword;
exports.check = checkPassword;

exports.rateOfUsage = function(userPasswordInputString) {
  var userPassword = userPasswordInputString.toLowerCase();
  var userHashedPassword = caeserCypher.encryptString(userPassword);

  var passwordExists = passwordTree.searchForNodes(userHashedPassword);
  if (passwordExists) {
    var result = dumbPasswords.find(function(password) {
      return password.hashedPassword === userHashedPassword;
    });
    result.password = userPassword;
    // delete result.hashedPassword;
    return result;
  }

  return {
    password: userPasswordInputString,
    frequency: 0,
    message: 'The password is not part of the list'
  };
};
