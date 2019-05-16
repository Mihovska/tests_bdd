// var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var validator = require('../lib/validator');

describe('A Validator', function(){
    it('will return error.nonpositive for not strictly positive numbers', function(){
        // assert.deepEqual(validator(0), ['error.nonpositive']);
        expect(validator(0)).to.be.deep.equal(['error.nonpositive']);
    });
});