'use strict';

module.exports = class CaeserCipher {
  constructor(integer) {
    this.constant = integer;
  }

  encryptString(stringProvided) {
    let newEncryptedString = '';
    for (let letter of stringProvided) {
      let encrypted = false;
      const characterCode = letter.charCodeAt(0);
      // only encrypt the alphabetical characters, not the spaces
      if (characterCode >= 65 && characterCode <= 122) {
        // where the magic happens
        letter = this.encrypt(letter);
        encrypted = true;
      }

      if (encrypted) {
        newEncryptedString += String.fromCharCode(letter);
        continue;
      }

      newEncryptedString += letter;
    }
    return newEncryptedString;
  }

  encrypt(letter) {
    // if this.constant is larger than 26 do a modulus on it
    if (this.constant > 26) {
      this.constant = this.constant % 26;
    }

    // get the encryptedCharacter's position between 0 - 25
    const pos = letter.charCodeAt(0) - 97;
    const crypticPosition = (pos + this.constant) % 26;
    return 97 + crypticPosition;
  }
};
