var non_positive_validation_rule = require('./validator/rules/non_positive');
var non_divisible_validation_rule = require('./validator/rules/non_divisible')

var validation_rules = [
    non_positive_validation_rule,
    non_divisible_validation_rule(3, 'error.three'),
    non_divisible_validation_rule(5, 'error.five')
];

module.exports = function(validation_rules){
    return function(n){
        return validation_rules.reduce(function(result, rule){
            rule(n, result);
            return result;
        }, []);
    }
}