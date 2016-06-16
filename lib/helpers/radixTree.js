'use strict';

class RadixTree {
  constructor(stupidPasswords) {
    this.nodes = {};
    this.stupidPasswords = stupidPasswords;
    this.stupidPasswords.forEach(password => {
      this.addNode(password.password);
    });
  }

  addNode(word) {
    this.splitWordToArrayOfLetters(word).reduce((node, character, i, a) => {
      if (!node[character]) {
        node[character] = {};
      }
      if (i === a.length - 1) {
        node[character].isword = true;
      }
      return node[character];
    }, this.nodes);
    return this;
  }

  searchForNodes(word) {
    const iterObject = (nodes, initialValue) => {
      return Object.keys(nodes).reduce((r, key) => {
        if (key === 'isword' && r === word) {
          found = true;
        }
        typeof nodes[key] === 'object' && iterObject(nodes[key], r + key);
        return r;
      }, initialValue);
    }

    let found = false;
    iterObject(this.nodes, '');
    return found;
  }

  splitWordToArrayOfLetters(word) {
    return word.toLowerCase().split('');
  }

  passwordInfo(userPasswordInputString) {
    userPasswordInputString = userPasswordInputString.toLowerCase();
    const exists = this.searchForNodes(userPasswordInputString);

    if (exists) {
      return this.stupidPasswords[userPasswordInputString];
    }
  }

}

module.exports = RadixTree;
