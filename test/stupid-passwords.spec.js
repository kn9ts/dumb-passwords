const expect = require('chai').expect;
const isStupid = require('../lib').isStupid;

describe('Passwords Tests', () => {
  it('should pass for a stupid password', () => {
    expect(isStupid('password')).to.be.true;
  });
});
