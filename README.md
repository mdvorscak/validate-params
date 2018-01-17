# validate-params
**A small parameter validation library**

The purpose of this library is to easily check that the contract of your functions are not violated; and if they are,
to allow you to gracefully handle the situation (provide useful error messages).

[![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Code Climate][cc-image]][cc-url] [![license][license-image]][license-url]

# Basic examples
```js
var Validator = require('validate-params');

// validating a single argument
function simpleWrapper(callback){
    Validator.assert.arg(callback, 'function');
    //Then do something with the callback later
    //At this point we can be sure that callback is a function
}

simpleWrapper(42); //throws Error('Expected type "function" but it was type "number"')

// validating an argument object
function myCoolFunction(opts){
    Validator.assert.arg(opts,
    {name: 'string',
    //handles optional parameters
     phoneNum: {
        type: 'string',
        optional: true
     },
     //handles nested objects
     location: {
        city: 'string',
        longitude: 'number',
        latitude: 'number'
     }
    });
    //...
}

myCoolFunction({name: 'Jenny',
                phoneNum: '876-5309',
                location: {
                   city: 'Chicago',
                   longitude: 87.6847,
                   latitude: 41.8369
                }
               });

//There is also a less invasive variant of the validator
function maybeCallback(callback){
    var isCallbackAFunction = Validator.validate.arg(callback, 'function');
    if(isCallbackAFunction){
        //do some cool callback stuff
    }
}

maybeCallback(5); //No error is thrown
```

# Installation
    npm install --save-dev validate-params

# Documentation
To learn more checkout the [documentation page](docs/index.md)

[travis-url]: https://travis-ci.org/mdvorscak/validate-params
[travis-image]: https://img.shields.io/travis/mdvorscak/validate-params/master.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/mdvorscak/validate-params?branch=master
[coveralls-image]: https://img.shields.io/coveralls/github/mdvorscak/validate-params/master.svg?style=flat-square

[cc-url]: https://codeclimate.com/github/mdvorscak/validate-params
[cc-image]: https://img.shields.io/codeclimate/maintainability/mdvorscak/validate-params.svg?style=flat-square

[license-url]: LICENSE
[license-image]: https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square