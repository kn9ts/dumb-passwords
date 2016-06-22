'use strict';

function RadixTree(dumpPasswords) {
  var thisClass = this;
  thisClass.nodes = {};
  thisClass.dumpPasswords = dumpPasswords;
  thisClass.dumpPasswords.forEach(function(password) {
    thisClass.addNode(password.hashedPassword);
  });
}

RadixTree.prototype.addNode = function(word) {
  this.splitWordToArrayOfLetters(word)
    .reduce(function(node, character, i, a) {
      if (!node[character]) {
        node[character] = {};
      }
      if (i === a.length - 1) {
        node[character].isword = true;
      }
      return node[character];
    }, this.nodes);
  return this;
};

RadixTree.prototype.searchForNodes = function(word) {
  var found = false;
  var iterObject = function(nodes, initialValue) {
    return Object.keys(nodes).reduce(function(previousKey, key) {
      if (key === 'isword' && previousKey === word) {
        found = true;
      }
      typeof nodes[key] === 'object' && iterObject(nodes[key], previousKey + key);
      return previousKey;
    }, initialValue);
  };
  iterObject(this.nodes, '');
  return found;
};

RadixTree.prototype.splitWordToArrayOfLetters = function(word) {
  return word.toLowerCase().split('');
};

module.exports = RadixTree;
