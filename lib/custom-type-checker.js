/**
 * Created by Mike Dvorscak on 9/5/2015.
 */

/*
 * Credit for type checking functions to underscore:
 * https://github.com/jashkenas/underscore/blob/master/LICENSE
 */
var toString = Object.prototype.toString;
function isType(arg, type){
    return toString.call(arg) === '[object ' + type + ']';
}
module.exports = {
    'date': function(arg){
        return isType(arg, 'Date');
    },
    'array': Array.isArray || function(arg) { return isType(arg, 'Array');},
    'object': function isObject(arg){
        return isType(arg, 'Object');
    }
};