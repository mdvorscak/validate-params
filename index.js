/**
 * Created by Mike Dvorscak on 9/2/2015.
 */
var _ = require('underscore');
var LOW_VERBOSITY = 0;
var HIGH_VERBOSITY = 1;

function Validator(opts){
    opts = opts || {};
    this.verbosityLevel = opts.verbosityLevel || LOW_VERBOSITY;
    this.ErrorClass = opts.errorClass || Error;
}

//
var specialValidations = {
    'date': _.isDate,
    'array': _.isArray
};

Validator.prototype.arg = function arg(item, expectedType, argName){
    var isCorrectType;
    var actualType = typeof item;

    var specialValFn = specialValidations[expectedType];
    if(specialValFn){
        isCorrectType = specialValFn(item);
    } else {
        isCorrectType = actualType === expectedType;
    }

    argName = argName ? '"' + argName + '" to be ' : '';
    if(!isCorrectType){
        this.errors = 'Expected ' + argName + 'type "' + expectedType + '" but it was type "' + actualType + '"';
        if(this.verbosityLevel === HIGH_VERBOSITY){
            throw new this.ErrorClass(this.errors);
        }
    }
    return isCorrectType;
};

Validator.prototype.args = function args(obj, spec){

};


module.exports = {
    LOW_VERBOSITY: LOW_VERBOSITY,
    HIGH_VERBOSITY: HIGH_VERBOSITY,
    Validator: Validator,
    validate: new Validator(),
    assert: new Validator({verbosityLevel: HIGH_VERBOSITY})
};