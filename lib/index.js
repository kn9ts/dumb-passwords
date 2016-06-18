'use strict';

const stupidPasswords = require('./config/stupidPasswords');
const RadixTree = require('./helpers/radixTree');
const passwordTree = new RadixTree(stupidPasswords);

const isStupid = (userPasswordInputString) => {
  const userPassword = userPasswordInputString.toLowerCase();
  const userHashedPassword = new Buffer(userPassword).toString('hex');

  return passwordTree.searchForNodes(userHashedPassword);
};

exports.isStupid = isStupid;
exports.isOneOfThem = isStupid;
exports.check = isStupid;

exports.rateOfUsage = (userPasswordInputString) => {
  const userPassword = userPasswordInputString.toLowerCase();
  const userHashedPassword = new Buffer(userPassword).toString('hex');

  const passwordExists = passwordTree.searchForNodes(userHashedPassword);
  if (passwordExists) {
    const result = stupidPasswords.find(password => password.hashedPassword === userHashedPassword);
    result.password = userPassword;
    // delete result.hashedPassword;
    return result;
  }

  return {
    password: userPasswordInputString,
    frequency: 0,
    message: 'The password is not part of the list',
  };
};
