'use strict';

const passwordTree = require('./passwordTree');

exports.isItAStupidPassword = (userPasswordInputString) => passwordTree
  .searchForNodes(userPasswordInputString.toLowerCase());

exports.frequencyPerTenThousand = (userPasswordInputString) => passwordTree
  .passwordInfo(userPasswordInputString.toLowerCase())
