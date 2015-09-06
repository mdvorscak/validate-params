/**
 * Created by Mike Dvorscak on 9/4/2015.
 */
var Validator = require('../index');
var validate = Validator.validate;
var assert = Validator.assert;

describe('validate-params', function(){

    describe('constants', function(){
        it('should have a constant for low verbosity', function(){
            expect(Validator.LOW_VERBOSITY).not.toBe(undefined);
        });

        it('should have a constant for high verbosity', function(){
            expect(Validator.HIGH_VERBOSITY).not.toBe(undefined);
        });
    });

    describe('construction', function(){
        it('should accept a verbosity level', function(){
            var val = new Validator.Validator({verbosityLevel: 1});
            expect(val.verbosityLevel).toBe(1);
        });

        it('should default the verbosity level to low', function(){
            var val = new Validator.Validator();
            expect(val.verbosityLevel).toBe(Validator.LOW_VERBOSITY);
        });

        it('should accept a custom error object to use instead of Error', function(){
            function DummyClass(){}
            var val = new Validator.Validator({errorClass: DummyClass});
            expect(val.ErrorClass).toBe(DummyClass);
        });

        it('should default the ErrorClass to be Error', function(){
            var val = new Validator.Validator();
            expect(val.ErrorClass).toBe(Error);
        });
    });

    describe('validate instance', function(){
       it('should be an instance of the Validator class', function(){
            expect(validate instanceof Validator.Validator).toBe(true);
       });

        it('should use low verbosity', function(){
            expect(validate.verbosityLevel).toBe(Validator.LOW_VERBOSITY);
        });
    });

    describe('assert instance', function(){
        it('should be an instance of the Validator class', function(){
            expect(assert instanceof Validator.Validator).toBe(true);
        });

        it('should use high verbosity', function(){
            expect(assert.verbosityLevel).toBe(Validator.HIGH_VERBOSITY);
        });
    });

    describe('arg', function(){
        it('should return true when the argument is of the correct type', function(){
            expect(validate.arg('test', 'string')).toBe(true);
        });

        it('should return false when the argument is not of the correct type', function(){
            expect(validate.arg({}, 'string')).toBe(false);
        });

        it('should throw an error when the argument is of the wrong type and verbosity is high', function(){
            expect(function(){
                assert.arg({}, 'string');
            }).toThrow(Error('Expected type "string" but it was type "object"'));
        });

        it('should return true when the argument is of the right type and verbosity is high', function(){
            expect(assert.arg('test', 'string')).toBe(true);
        });

        it('should accept an optional parameter to give a name to the argument to customize the return message', function(){
            expect(function(){
                assert.arg({}, 'string', 'test');
            }).toThrow(Error('Expected "test" to be type "string" but it was type "object"'));
        });

        it('should correctly validate strings', function(){
            expect(validate.arg('test', 'string')).toBe(true);
        });

        it('should correctly validate booleans', function(){
            expect(validate.arg(true, 'boolean')).toBe(true);
        });

        it('should correctly validate numbers', function(){
            expect(validate.arg(42, 'number')).toBe(true);
        });

        it('should correctly validate arrays', function(){
            expect(validate.arg([], 'array')).toBe(true);
        });

        it('should correctly not validate arrays as objects', function(){
            expect(validate.arg([], 'object')).toBe(false);
        });

        it('should correctly validate dates', function(){
            expect(validate.arg(new Date(2000, 1, 1), 'date')).toBe(true);
        });

        it('should correctly not validate dates as objects', function(){
            expect(validate.arg(new Date(2000, 1, 1), 'object')).toBe(false);
        });

        it('should correctly validate objects', function(){
            expect(validate.arg({}, 'object')).toBe(true);
        });
    });

    describe('errors', function(){
        it('should return the error string for a single argument and verbosity is low', function(){
            validate.arg({}, 'string');
            expect(validate.errors).toBe('Expected type "string" but it was type "object"');
        });

        it('should return the previous error message when the verbosity is high', function(){
            try{
                assert.arg({}, 'string');
            } catch(e){
                expect(assert.errors).toBe(e.message);
            }
        });
    });

    describe('args', function(){
        it('should fail when the provided object is not an object', function(){
            expect(validate.args(undefined, {key: 'string'})).toBe(false);
            expect(validate.args(42, {key: 'string'})).toBe(false);
            expect(validate.args('nope, just Chuck Testa', {key: 'string'})).toBe(false);
            expect(validate.args([], {key: 'string'})).toBe(false);
        });

        it('should fail when the provided spec is not an object', function(){
            expect(validate.args({key: 'string'}, undefined)).toBe(false);
            expect(validate.args({key: 'string'}, 42)).toBe(false);
            expect(validate.args({key: 'string'}, 'nope, just Chuck Testa')).toBe(false);
            expect(validate.args({key: 'string'}, [])).toBe(false);
        });

        it('should return true when the argument is of the correct type and verbosity is low', function(){
            expect(validate.args({key: 'test'}, {key: 'string'})).toBe(true);
        });

        it('should return false when the argument is not of the correct type and verbosity is low', function(){
            expect(validate.args({key: 42}, {key: 'string'})).toBe(false);
        });

        it('should throw an error when the argument is of the wrong type and verbosity is high', function(){
            expect(function(){
                assert.args({key: 42}, {key: 'string'});
            }).toThrow(Error('Expected "key" to be type "string" but it was type "number"'));
        });

        it('should correctly validate still return a positive validation for optional parameters', function(){
            expect(validate.args({}, {key: {
                type: 'string',
                optional: true
            }})).toBe(true);
        });

        it('should correctly validate nested objects when they are valid', function(){
            expect(validate.args({key: 42, nest: {test: 'test'}}, {key: 'number', nest: {
                test: 'string'
            }})).toBe(true);
        });

        it('should correctly validate nested objects when they are invalid', function(){
            expect(validate.args({key: 42, nest: {test: 'test'}}, {key: 'number', nest: {
                test: 'number'
            }})).toBe(false);
        });
    });
});
