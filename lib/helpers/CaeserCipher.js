'use strict';

function CaeserCipher(integer) {
  this.constant = integer;
}

CaeserCipher.prototype.encryptString = function(stringProvided) {
  var newEncryptedString = '';
  for (var x = 0, len = stringProvided.length; x < len; x++) {
    var letter = stringProvided[x];
    var encrypted = false;
    var characterCode = letter.charCodeAt(0);
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
};

CaeserCipher.prototype.encrypt = function(letter) {
  // if this.constant is larger than 26 do a modulus on it
  if (this.constant > 26) {
    this.constant = this.constant % 26;
  }

  // get the encryptedCharacter's position between 0 - 25
  var pos = letter.charCodeAt(0) - 97;
  var crypticPosition = (pos + this.constant) % 26;
  return 97 + crypticPosition;
};

module.exports = CaeserCipher;
