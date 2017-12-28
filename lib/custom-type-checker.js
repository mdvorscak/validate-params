/**
 * Created by Mike Dvorscak on 9/5/2015.
 */

/*
 * Credit for type checking functions to underscore:
 * https://github.com/jashkenas/underscore/blob/master/LICENSE
 */
var toString = Object.prototype.toString;
function getObjectsType(arg){
    return toString.call(arg).slice(8, -1).toLowerCase();
}
module.exports = {
    getObjectsType: getObjectsType
};