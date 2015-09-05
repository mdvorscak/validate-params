/**
 * Created by Mike Dvorscak on 9/2/2015.
 */
var typeChecker = require('./lib/custom-type-checker');
/** @constant {number} */
var LOW_VERBOSITY = 0;
/** @constant {number} */
var HIGH_VERBOSITY = 1;

/**
 *
 * @param [opts={}] {object}
 * @param [opts.verbosityLevel={@link LOW_VERBOSITY}] {number} - if set to {@link HIGH_VERBOSITY} validation failures
 * will throw errors instead of returning false
 * @param [opts.errorClass=Error] {class} - custom error class to use instead of built-in Error
 * @constructor
 */
function Validator(opts){
    opts = opts || {};
    this.verbosityLevel = opts.verbosityLevel || LOW_VERBOSITY;
    this.ErrorClass = opts.errorClass || Error;
}

/**
 *
 * @param item {object|array|string|number|date} - item to check the type of
 * @param expectedType - the expected type of the item
 * @param [argName=''] - an alias for item, used to customize the error if the validation fails
 * @throws - throws an instance of {@link Validator.ErrorClass} if the validation fails in high verbosity mode
 * @returns {boolean} - true if the item is the correct type, false otherwise.
 */
Validator.prototype.arg = function arg(item, expectedType, argName){
    var isCorrectType;
    var actualType = typeof item;

    var specialValFn = typeChecker[expectedType];
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
    var isValid, expectedType, isCurrentKeyValid;
    isValid = this.arg(obj, 'object') && this.arg(spec, 'object');

    if(isValid){
        for(var key in spec){
            if(spec.hasOwnProperty(key)){
                expectedType = spec[key];
                if(typeof expectedType === 'object'){
                    //either the parameter is optional or nested
                }
                // just normal validation
                else {
                    isCurrentKeyValid = this.arg(obj[key], expectedType, key);
                }
                // If one item fails, the whole thing fails
                if(!isCurrentKeyValid){
                    isValid = false;
                }
            }
        }
    }

    return isValid;
};


module.exports = {
    LOW_VERBOSITY: LOW_VERBOSITY,
    HIGH_VERBOSITY: HIGH_VERBOSITY,
    Validator: Validator,
    validate: new Validator(),
    assert: new Validator({verbosityLevel: HIGH_VERBOSITY})
};