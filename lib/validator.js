function non_positive_validation_rule(n, result){
    if (n <= 0){
        result.push('error.nonpositive');
    }
}

function make_non_divisible_validation_rule(divisor, error){
    return function(n, result){
        if (n % divisor === 0){
            result.push(error);
        }
    }
}

var validation_rules = [
    non_positive_validation_rule,
    make_non_divisible_validation_rule(3, 'error.three'),
    make_non_divisible_validation_rule(5, 'error.five')
];

module.exports = function(n){
    return validation_rules.reduce(function(result, rule){
        rule(n, result);
        return result;
    }, []);
}