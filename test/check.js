

let expect    = require('chai').expect;

let scheduler = require('../index.js');
let test = scheduler.test;

describe('initial test passes', function() {
  it('should return value given', function() {
    let testString = 'testing';
    let testFunction = test(testString);
    expect(testFunction).to.equal(testString);
  });
})
