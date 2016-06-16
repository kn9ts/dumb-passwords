'use strict';

const stupidPasswords = require('./config/stupidPasswords');
const RadixTree = require('./helpers/radixTree');

module.exports = new RadixTree(stupidPasswords);
