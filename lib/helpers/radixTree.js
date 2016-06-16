'use strict';

class RadixTree {
  constructor(stupidPasswords) {
    this.stupidPasswords = stupidPasswords
    this.stupidPasswords.forEach(password => {
      this.addNode(password.password);
    });
  }

  addNode(word) {
    this.stringToNodes(word).reduce((node, character, i, a) => {
      if (!node[character]) {
        node[character] = {};
      }
      if (i === a.length - 1) {
        node[character].isword = true;
      }
      return node[character];
    }, this);
    return this;
  }

  searchForNodes(word) {
    const iterObject = (o, r) => {
      return Object.keys(o).reduce((r, key) => {
        if (key === 'isword' && r === word) {
          found = true;
        }
        typeof o[key] === 'object' && iterObject(o[key], r + key);
        return r;
      }, r);
    }

    let found = false;
    iterObject(this, '');
    return found;
  }

  stringToNodes(word) {
    return word.toLowerCase().split('');
  }

  retrieveAllNodes() {
    const iterObject = (o, r) => {
      return Object.keys(o).reduce((r, key) => {
        key === 'isword' && wordList.push(r);
        typeof o[key] === 'object' && iterObject(o[key], r + key);
        return r;
      }, r);
    }

    const wordList = [];
    iterObject(this, '');
    return wordList;
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
