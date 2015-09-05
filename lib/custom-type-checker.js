/**
 * Created by Mike Dvorscak on 9/5/2015.
 */

var _ = require('underscore');

module.exports = {
    'date': _.isDate,
    'array': _.isArray,
    'object': function isObject(arg){
        return typeof arg !== 'undefined' && arg.toString() === '[object Object]';
    }
};