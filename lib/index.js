'use strict';

const passwordTree = require('./passwordTree');

const isStupid = (userPasswordInputString) => passwordTree
  .searchForNodes(userPasswordInputString.toLowerCase());

exports.isStupid = isStupid;
exports.isOneOfThem = isStupid;
exports.check = isStupid;

exports.rateOfUsage = (userPasswordInputString) => passwordTree
  .passwordInfo(userPasswordInputString.toLowerCase())
