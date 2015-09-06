# validate-params
**A small parameter validation library**

The purpose of this library is to easily check that the contract of your functions is not violated; and if it is, to allow
you to gracefully handle the situation (provide useful error messages).

[![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url]

# Basic examples
```js
var Validator = require('validate-params');

// validating a single argument
function simpleWrapper(callback){
    Validator.assert.arg(callback, 'function');
    //Then do something with the callback later, at this point we can be sure that callback is a function
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

```

# Documentation
To learn more checkout the [documentation page] (docs/index.md)

# License
MIT - [view the full license here] (LICENSE)

[travis-url]: https://travis-ci.org/mdvorscak/validate-params
[travis-image]: https://travis-ci.org/mdvorscak/validate-params.svg?branch=master

[coveralls-url]: https://coveralls.io/r/mdvorscak/validate-params?branch=master
[coveralls-image]: https://coveralls.io/repos/mdvorscak/validate-params/badge.svg?branch=master