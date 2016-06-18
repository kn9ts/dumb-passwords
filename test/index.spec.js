'use strict';

const chai = require('chai');
const assert = chai.assert;
const stupidPassword = require('../lib');
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);

describe('stupidPassword.isStupid()', () => {
  it('should pass for a stupid password', () => {
    assert.isTrue(stupidPassword.isStupid('password'));
    assert.isTrue(stupidPassword.isStupid('12345678'));
  });

  it('should pass for a stupid password regardless of case', () => {
    assert.isTrue(stupidPassword.isStupid('PASSWORD'));
    assert.isTrue(stupidPassword.isStupid('XxXxXx'));
  });

  it('should pass for a stupid password using isOneOfThem method', () => {
    assert.isTrue(stupidPassword.isOneOfThem('password'));
    assert.isTrue(stupidPassword.isOneOfThem('12345678'));
  });

  it('should pass for a stupid password using check method', () => {
    assert.isTrue(stupidPassword.check('password'));
    assert.isTrue(stupidPassword.check('superman'));
  });

  it('should not pass for a non stupid password', () => {
    assert.isFalse(stupidPassword.isStupid('Pass990ver'));
    assert.isFalse(stupidPassword.isStupid('sTraigh8#@u'));
  });

  it('should not pass for a non stupid password using isOneOfThem method', () => {
    assert.isFalse(stupidPassword.isOneOfThem('Pass990ver'));
    assert.isFalse(stupidPassword.isOneOfThem('ummoinnerEmbassava33'));
  });

  it('should not pass for a non stupid password using check method', () => {
    assert.isFalse(stupidPassword.check('Pass990ver'));
    assert.isFalse(stupidPassword.check('ummoinnerEmbassava33'));
  });

  it("should call the String toLowerCase method", function () {
    const lower = sinon.spy(String.prototype, 'toLowerCase');
    stupidPassword.isStupid('password');
    lower.restore();
    sinon.assert.calledOnce(lower);
    sinon.assert.calledOn(lower, 'password');
  });
});

describe('stupidPassword.rateOfUsage()', () => {
  it('should return the rate of usage of a stupid password', () => {
    assert.deepEqual(stupidPassword.rateOfUsage('baseball'), {
      frequency: 3739,
      hashedPassword: "6261736562616c6c",
      password: 'baseball'
    });
    assert.isObject(stupidPassword.rateOfUsage('PrInCeSs'));
  });

  it('should return correct response of usage for a non stupid password', () => {
    assert.deepEqual(stupidPassword.rateOfUsage('Wanderlust!*3000'), {
      frequency: 0,
      password: 'Wanderlust!*3000',
      message: "The password is not part of the list"
    });
    assert.isObject(stupidPassword.rateOfUsage('SpaceOdessey2001Clarke'));
  });

  it("should call the String toLowerCase method", function () {
    const lower = sinon.spy(String.prototype, 'toLowerCase');
    stupidPassword.isStupid('football');
    lower.restore();
    sinon.assert.calledOnce(lower);
    sinon.assert.calledOn(lower, 'football');
  });
});
