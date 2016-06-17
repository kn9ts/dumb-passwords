'use strict';

const crypto = require('crypto');
const stupidPasswords = require('./config/stupidPasswords');
const RadixTree = require('./helpers/radixTree');
const passwordTree = new RadixTree(stupidPasswords);

const isStupid = (userPasswordInputString) => {
  const userPassword = userPasswordInputString.toLowerCase();
  const userHashedPassword = crypto.createHash('sha1').update(userPassword).digest('hex');

  return passwordTree.searchForNodes(userHashedPassword);
};

exports.isStupid = isStupid;
exports.isOneOfThem = isStupid;
exports.check = isStupid;

exports.rateOfUsage = (userPasswordInputString) => {
  const userPassword = userPasswordInputString.toLowerCase();
  const userHashedPassword = crypto.createHash('sha1').update(userPassword).digest('hex');

  const passwordExists = passwordTree.searchForNodes(userHashedPassword);
  if (passwordExists) {
    const result = stupidPasswords.find(password => password.hashedPassword === userHashedPassword);
    result.password = userPassword;
    delete result.hashedPassword;
    return result;
  }

  return {
    password: userPasswordInputString,
    frequency: 0,
    message: 'The password is not part of the list'
  };
};
