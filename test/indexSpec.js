/**
 * Created by Mike Dvorscak on 9/4/2015.
 */
var Validator = require('../index');

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

       });

        it('should use low verbosity', function(){

        });
    });

    describe('assert instance', function(){
        it('should be an instance of the Validator class', function(){

        });

        it('should use high verbosity', function(){

        });
    });

    describe('arg', function(){
        it('should return a string when the argument is of the wrong type and verbosity is low', function(){

        });

        it('should throw an error when the argument is of the wrong type and verbosity is high', function(){

        });

        it('should accept an optional parameter to give a name to the argument to customize the return message', function(){

        });

        it('should correctly validate strings', function(){

        });

        it('should correctly validate booleans', function(){

        });

        it('should correctly validate ints', function(){

        });

        it('should correctly validate arrays', function(){

        });

        it('should correctly validate dates', function(){

        });

        it('should correctly validate objects', function(){

        });
    });

    describe('args', function(){
        it('should return a string when the arguments are of the wrong type and verbosity is low', function(){

        });

        it('should throw an error when the arguments are of the wrong type and verbosity is high', function(){

        });

        it('should correctly validate strings', function(){

        });

        it('should correctly validate booleans', function(){

        });

        it('should correctly validate ints', function(){

        });

        it('should correctly validate arrays', function(){

        });

        it('should correctly validate dates', function(){

        });

        it('should correctly validate objects', function(){

        });
    });


});
