'use strict';

const passwordTree = require('./passwordTree');

exports.isStupid = (userPasswordInputString) => passwordTree
  .searchForNodes(userPasswordInputString.toLowerCase());

exports.rateOfUsage = (userPasswordInputString) => passwordTree
  .passwordInfo(userPasswordInputString.toLowerCase())
