'use strict';

const chai = require('chai');
const assert = chai.assert;
const stupidPassword = require('../lib');

describe('Passwords Tests', () => {
  it('should pass for a stupid password', () => {
    assert.isTrue(stupidPassword.isStupid('password'));
  });
});
