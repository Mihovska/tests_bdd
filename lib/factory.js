var validator_with = require('./validator');
var non_positive_validation_rule = require('./validator/rules/non_positive');
var non_divisible_validation_rule = require('./validator/rules/non_divisible');

module.exports = function(find_configuration) {
    return function(){
        find_configuration('default');
        return validator_with([
            non_positive_validation_rule,
            non_divisible_validation_rule(3, 'error.three'),
            non_divisible_validation_rule(5, 'error.five')
        ]);
    }
}