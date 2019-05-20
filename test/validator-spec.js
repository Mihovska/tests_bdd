var chai = require('chai');
var expect = chai.expect;
var validator_with = require('../lib/validator');
var non_positive_validation_rule = require('../lib/validator/rules/non_positive');
var non_divisible_validation_rule = require('../lib/validator/rules/non_divisible');


describe('A Validator', function(){
    var validator;
    beforeEach(function(){
        validator = validator_with([
            non_positive_validation_rule,
            non_divisible_validation_rule(3, 'error.three'),
            non_divisible_validation_rule(5, 'error.five')
        ]);
    });
    it('will return no errors for valid numbers', function(){
        expect(validator(7)).to.be.empty;
    });

    describe('will include error.nonpositive for not strictly positive numbers: ', function(){
        it('like 0', function(){
            expect(validator(0)).to.include('error.nonpositive');
        });

        it('like -2', function(){
            expect(validator(-2)).to.include('error.nonpositive');
        });
    });

    describe('will include error.three for divisible by 3 numbers: ', function(){
        it('like 3', function(){
            expect(validator(3)).to.include('error.three');
        });

        it('like 15', function(){
            expect(validator(15)).to.include('error.three');
        });
    });

    describe('will include error.five for divisible by 5 numbers: ', function(){
        it('like 5', function(){
            expect(validator(5)).to.include('error.five');
        });

        it('like 15', function(){
            expect(validator(15)).to.include('error.five');
        });
    });
});

