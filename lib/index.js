'use strict';

const stupidPasswords = require('./config/stupidPasswords');
const RadixTree = require('./helpers/radixTree');
const passwordTree = new RadixTree(stupidPasswords);

const isStupid = (userPasswordInputString) => passwordTree
  .searchForNodes(userPasswordInputString.toLowerCase());

exports.isStupid = isStupid;
exports.isOneOfThem = isStupid;
exports.check = isStupid;

exports.rateOfUsage = (userPasswordInputString) => {
  const exists = passwordTree.searchForNodes(userPasswordInputString.toLowerCase());
  if (exists) {
    return stupidPasswords.find(password => password.password === userPasswordInputString.toLowerCase());
  }
  return {
    password: userPasswordInputString,
    frequency: 0,
    message: 'The password is not part of the list'
  };
}
