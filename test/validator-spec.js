var chai = require('chai');
var expect = chai.expect;
var validator_with = require('../lib/validator');
var non_positive_validation_rule = require('../lib/validator/rules/non_positive');
var non_divisible_validation_rule = require('../lib/validator/rules/non_divisible');
var factory_with_configuration = require('../lib/factory');

describe('A Validator', function(){
    var validator, configuration;
    beforeEach(function(){
        configuration = function(){
            configuration.callCount++;
            configuration.args = Array.prototype.slice.call(arguments);
            return [
                {type: 'nonPositive'},
                {type: 'nonDivisible', options: {divisor: 11, error: 'error.eleven'}}
            ];
        }
        configuration.callCount = 0;
        var new_validator = factory_with_configuration(configuration);
        validator = new_validator('alternative');
    });

    it('will access the configuration to get the validation rules', function(){
        expect(configuration.callCount).to.be.equal(1);
        expect(configuration.args).to.be.deep.equal(['default']);
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

