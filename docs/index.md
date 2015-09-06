## Classes
<dl>
<dt><a href="#Validator">Validator</a></dt>
<dd></dd>
</dl>
## Constants
<dl>
<dt><a href="#LOW_VERBOSITY">LOW_VERBOSITY</a> : <code>number</code></dt>
<dd></dd>
<dt><a href="#HIGH_VERBOSITY">HIGH_VERBOSITY</a> : <code>number</code></dt>
<dd></dd>
</dl>
<a name="Validator"></a>
## Validator
**Kind**: global class  

* [Validator](#Validator)
  * [new Validator([opts])](#new_Validator_new)
  * [.ErrorClass](#Validator+ErrorClass)
  * [.arg(item, expectedType, [argName])](#Validator+arg) ⇒ <code>boolean</code>
  * [.args(obj, spec)](#Validator+args) ⇒ <code>boolean</code>

<a name="new_Validator_new"></a>
### new Validator([opts])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [opts] | <code>object</code> |  | options object |
| [opts.verbosityLevel] | <code>number</code> | <code>LOW_VERBOSITY</code> | if set to [HIGH_VERBOSITY](#HIGH_VERBOSITY) validation failures will throw errors instead of returning false |
| [opts.errorClass] | <code>class</code> | <code>Error</code> | custom error class to use instead of built-in Error |

<a name="Validator+ErrorClass"></a>
### validator.ErrorClass
**Kind**: instance property of <code>[Validator](#Validator)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| ErrorClass | <code>class</code> | The error class to use when verbosity is high |

<a name="Validator+arg"></a>
### validator.arg(item, expectedType, [argName]) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Validator](#Validator)</code>  
**Returns**: <code>boolean</code> - true if the item is the correct type, false otherwise  
**Throws**:

- throws an instance of [validator.ErrorClass](validator.ErrorClass) if the validation fails in high verbosity mode


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item | <code>\*</code> |  | item to check the type of |
| expectedType | <code>string</code> |  | the expected type of the item |
| [argName] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | an alias for item, used to customize the error if the validation fails |

<a name="Validator+args"></a>
### validator.args(obj, spec) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Validator](#Validator)</code>  
**Returns**: <code>boolean</code> - true if the object matches the specification, false otherwise  
**Throws**:

- throws an instance of [validator.ErrorClass](validator.ErrorClass) if the validation fails in high verbosity mode


| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | Object to validate |
| spec | <code>Object</code> | Specification object, lists all keys and expected values |

<a name="LOW_VERBOSITY"></a>
## LOW_VERBOSITY : <code>number</code>
**Kind**: global constant  
<a name="HIGH_VERBOSITY"></a>
## HIGH_VERBOSITY : <code>number</code>
**Kind**: global constant  
