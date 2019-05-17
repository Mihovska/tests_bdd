// var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var validator = require('../lib/validator');

function expected_to_include_error_when_invalid(number, error){
    it('like ' + number, function(){
        expect(validator(number)).to.include(error);
    });
}

describe('A Validator', function(){
    it('will return no errors for valid numbers', function(){
        expect(validator(7)).to.be.empty;
    });

    describe('will include error.nonpositive for not strictly positive numbers: ', function(){
        expected_to_include_error_when_invalid(0, 'error.nonpositive');
        expected_to_include_error_when_invalid(-2, 'error.nonpositive');
    
        
    });

    describe('will include error.three for divisible by 3 numbers: ', function(){
        expected_to_include_error_when_invalid(3, 'error.three');
        expected_to_include_error_when_invalid(15, 'error.three');
    });

    describe('will include error.five for divisible by 5 numbers: ', function(){
        expected_to_include_error_when_invalid(5, 'error.five');
        expected_to_include_error_when_invalid(15, 'error.five');
    });
});

