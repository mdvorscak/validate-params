/*
 * Created by Mike Dvorscak on 9/2/2015.
 */

var typeChecker = require('./lib/custom-type-checker');
/** @constant {number} */
var LOW_VERBOSITY = 0;
/** @constant {number} */
var HIGH_VERBOSITY = 1;

/**
 *
 * @param [opts] {object} - options object
 * @param [opts.verbosityLevel=LOW_VERBOSITY] {number} - if set to {@link HIGH_VERBOSITY} validation failures
 * will throw errors instead of returning false
 * @param [opts.errorClass=Error] {class} - custom error class to use instead of built-in Error
 * @constructor
 */
function Validator(opts){
    opts = opts || {};
    this.verbosityLevel = opts.verbosityLevel || LOW_VERBOSITY;
    /**
     * @property {class} ErrorClass - The error class to use when verbosity is high
     */
    this.ErrorClass = opts.errorClass || Error;
    /** @private {array} _errorArray - contains the current error messages, gets reset after every call */
    this._errorArray = [];
}

/**
 * @private
 * @param item {*} - item to check the type of
 * @param expectedType {string} - the expected type of the item
 * @param [argName=''] {string} - an alias for item, used to customize the error if the validation fails
 * @throws throws an instance of {@link validator.ErrorClass} if the validation fails in high verbosity mode
 * @returns {boolean} true if the item is the correct type, false otherwise
 */
function internalValidation(item, expectedType, argName){
    var isCorrectType;
    var actualType = typeof item;
    //Make sure it's really an object
    if(actualType === 'object'){
        actualType = typeChecker.getObjectsType(item);
    }

    isCorrectType = actualType === expectedType;
    argName = argName ? '"' + argName + '" to be ' : '';
    if(!isCorrectType){
        this._errorArray.push('Expected ' + argName + 'type "' + expectedType + '" but it was type "' + actualType + '"');
    }
    return isCorrectType;
}

/**
 * @private
 * @summary - throws errors if there are errors stored in the internal error array;
 */
function throwErrors(){
    this.errors = this._errorArray.join(', ');
    //reset the error object
    this._errorArray = [];
    if(this.verbosityLevel === HIGH_VERBOSITY && this.errors.length > 0){
        throw new this.ErrorClass(this.errors);
    }
}

/**
 *
 * @param item {*} - item to check the type of
 * @param expectedType {string} - the expected type of the item
 * @param [argName=''] {string} - an alias for item, used to customize the error if the validation fails
 * @throws throws an instance of {@link validator.ErrorClass} if the validation fails in high verbosity mode
 * @returns {boolean} true if the item is the correct type, false otherwise
 */
Validator.prototype.arg = function arg(item, expectedType, argName){
    var isValid = internalValidation.call(this, item, expectedType, argName);
    throwErrors.call(this);
    return isValid;
};

/**
 * @private
 * @param obj {Object} - Object to validate
 * @param spec {Object} - Specification object, lists all keys and expected values
 * @param recursiveCall {boolean} - used to determine the top level of validation
 * @throws throws an instance of {@link validator.ErrorClass} if the validation fails in high verbosity mode
 * @returns {boolean} true if the object matches the specification, false otherwise
 */
function internalArgs(obj, spec, recursiveCall){
    var isValid, expectedType, isCurrentKeyValid, currentItem;
    var self = this;
    function localIV(){
        return internalValidation.apply(self, Array.prototype.slice.call(arguments));
    }
    isValid = localIV(obj, 'object') && localIV(spec, 'object');

    if(isValid){
        for(var key in spec){
            if(spec.hasOwnProperty(key)){
                expectedType = spec[key];
                currentItem = obj[key];
                if(typeof expectedType === 'object'){
                    //the parameter is optional
                    if(expectedType.optional){
                        isCurrentKeyValid = typeof currentItem === 'undefined' ||
                            localIV(currentItem, expectedType.type, key);
                    }
                    // the parameter is nested
                    else {
                        isCurrentKeyValid = internalArgs.call(this, currentItem, expectedType, true);
                    }
                }
                // just normal validation
                else {
                    isCurrentKeyValid = localIV(currentItem, expectedType, key);
                }
                // If one item fails, the whole thing fails
                if(!isCurrentKeyValid){
                    isValid = false;
                }
            }
        }
    }
    if(!recursiveCall){
        throwErrors.call(this);
    }

    return isValid;
}

/**
 * @param obj {Object} - Object to validate
 * @param spec {Object} - Specification object, lists all keys and expected values
 * @throws throws an instance of {@link validator.ErrorClass} if the validation fails in high verbosity mode
 * @returns {boolean} true if the object matches the specification, false otherwise
 */
Validator.prototype.args = function args(obj, spec){
    return internalArgs.call(this, obj, spec, false);
};


module.exports = {
    LOW_VERBOSITY: LOW_VERBOSITY,
    HIGH_VERBOSITY: HIGH_VERBOSITY,
    Validator: Validator,
    validate: new Validator(),
    assert: new Validator({verbosityLevel: HIGH_VERBOSITY})
};