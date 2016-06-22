'use strict';

const chai = require('chai');
const assert = chai.assert;
const dumbPassword = require('../lib');

describe('dumbPassword.check()', () => {
  it('should pass for a stupid password', () => {
    assert.isTrue(dumbPassword.check('password'));
    assert.isTrue(dumbPassword.check('12345678'));
  });

  it('should pass for a stupid password regardless of case', () => {
    assert.isTrue(dumbPassword.check('PASSWORD'));
    assert.isTrue(dumbPassword.check('XxXxXx'));
  });

  it('should pass for a stupid password using check method', () => {
    assert.isTrue(dumbPassword.check('password'));
    assert.isTrue(dumbPassword.check('superman'));
  });

  it('should not pass for a non stupid password', () => {
    assert.isFalse(dumbPassword.check('Pass990ver'));
    assert.isFalse(dumbPassword.check('sTraigh8#@u'));
  });

  it('should not pass for a non stupid password using checkPassword method', () => {
    assert.isFalse(dumbPassword.checkPassword('Pass990ver'));
    assert.isFalse(dumbPassword.checkPassword('ummoinnerEmbassava33'));
  });

  it('should not pass for a non stupid password using check method', () => {
    assert.isFalse(dumbPassword.check('Pass990ver'));
    assert.isFalse(dumbPassword.check('ummoinnerEmbassava33'));
  });
});

describe('dumbPassword.rateOfUsage()', () => {
  it('should return the rate of usage of a stupid password', () => {
    assert.deepEqual(dumbPassword.rateOfUsage('baseball'), {
      frequency: 3739,
      hashedPassword: 'gfxjgfqq',
      password: 'baseball'
    });
    assert.isObject(dumbPassword.rateOfUsage('PrInCeSs'));
  });

  it('should return correct response of usage for a non stupid password', () => {
    assert.deepEqual(dumbPassword.rateOfUsage('Wanderlust!*3000'), {
      frequency: 0,
      password: 'Wanderlust!*3000',
      message: 'The password is not part of the list'
    });
    assert.isObject(dumbPassword.rateOfUsage('SpaceOdessey2001Clarke'));
  });
});
