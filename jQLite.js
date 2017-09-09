/**
 * Modern jQuery Lite Framework
 * */
(($window, window$, undefined) => {
    'use strict';

// Variables:
var moduleName = 'Modern jQuery Lite',
    jQuery, $;

// Quick reference variables:
var objProto = Object.prototype,
    arrayProto = Array.prototype,
    // methods:
    toString = objProto.toString(),
    push = arrayProto.push,
    forEach = arrayProto.forEach,
    isArray = Array.isArray;


((_helper) => {
((_proto_, _initModule) => {

    // JQuery Namespace:
    const JQuery = {
        jQueryExists,
        defineJQuery,
        addHelperMethodsTojQuery,
        jQueryPrototype,
        exposeToWindow
    };

// Step : Initialize module
_initModule(JQuery);


// Step : Checking if jQuery is already defined:
function jQueryExists() {
    return (!!$window.jQuery) ?
        _helper.errorHandler('jQueryExists', 'jQuery is already defined') : this;
}

// Step : defining jQuery:
function defineJQuery() {
    /**
     * Name: errorHandler
     * @param {string || array} selector, a string or array of elements
     * Description: this is the main constructor function
     * */
    jQuery = function(selector) {
        // A 1. Making sure this function is called as a constructor function:
        if (this instanceof jQuery) {
            let elements;

            // TODO: add selector optimization (instead of always using querySelectorAll):
            elements = _helper.typeofFnc(selector, 'string') ?
                document.querySelectorAll(selector) :
                _helper.isArrayLike(selector) ?
                    document.querySelectorAll(selector) : null;

            // For each found element will become a property for this constructor function
            push.apply(this, elements);

            // another, easier to understand, way of writing: `push.apply(this, elements)` is:
            // for (var i = 0; i < elements.length; i++) {
            //     ((el, i) => {
            //         this[i] = el;
            //     })(elements[i], i);
            // }
        }
        // A 2. Calling the jQuery function with the `new`:
        else {
            return new jQuery(selector);
        }
    };
    // Making a alias using $. (Only if window.$ is not defined)
    $ = window$ || jQuery;

    return this;
}

// Step : Adding the helper methods to jQuery:
function addHelperMethodsTojQuery() {
    _helper.extend(jQuery, _helper);

    return this;
}

// Step : Defining the prototype
function jQueryPrototype() {
    _helper.extend(jQuery.prototype, _proto_);

    return this;
}

// Step : Exposing jQuery to global:
function exposeToWindow() {
    $window.jQuery = jQuery;
    return this;
}
})(
    // _proto_
(() => {

    return {
        html
    };

/**
 * Name: html
 * @param {get} from, where the error is coming from.
 * @param {set} message, why the error occurred.
 * Description: gets or sets the elements innerHTML.
 * */
function html(get, set) {

    if (set){
        // TODO continue here...
    }

    else {
        var innerHTML = {};

        _helper.each(this, (el, index) => {
            innerHTML[index] = el.innerHTML;
    });

        return innerHTML;
    }
}

})(),

    // Initialize module
    (JQuerySteps) => {
    function init(steps) {
        try {
            steps
                .jQueryExists()
                .defineJQuery()
                .addHelperMethodsTojQuery()
                .jQueryPrototype()
                .exposeToWindow();
        } catch(e) {
            throw new Error(e);
        }
    }
    init(JQuerySteps);
});

})(
    // Helper methods:
(() => {
    return {
        errorHandler,
        typeofFnc,
        isArrayLike,
        extend,
        each,
        forEach: each // Alias
    };

/**
 * Name: errorHandler
 * @param {string} from, where the error is coming from.
 * @param {string} message, why the error occurred.
 * Description: Global error handler function
 * */
function errorHandler(from, message) {
    throw new Error(`${moduleName}, error in ${from}: ${message}`);
}

/**
 * Name: typeofFnc
 * Description: Global error typeofFnc function
 * */
function typeofFnc(data, dataType) {
    switch (dataType){
        case 'string':
            return (typeof data === dataType);
        case 'array':
            return isArray(dataType);
        case 'object':
            return (!!data && typeof data === 'object');
    }
}

/**
 * Name: isArrayLike
 * @param: {object || array} objData, the object or array or array like.
 * Description: checks if the param is a array like structure (used for html array like)
 * returns: boolean
 * */
function isArrayLike(objData) {
    // Error handling:
    !objData && errorHandler('isArrayLike', 'invalid query');

    return typeofFnc(objData, 'array') ?
        objData :
        (typeofFnc(objData, 'object') && 'length' in objData);
}

/**
 * Name: extend
 * @param: {object} target, the main object to be extended.
 * @param: {object} object, the rest param of object to be added to the main object.
 * Description: extends a object with other objects.
 * returns: the extended object (the first parameter).
 * */
function extend(target, object) {
    for (var prop in object) {
        (object.hasOwnProperty(prop)) && (target[prop] = object[prop]);
    }
    return target;
}

/**
 * Name: extend
 * @param: {array || arraylike || object} target, the main object to be extended.
 * @param: {function} object, the rest param of object to be added to the main object.
 * Description: iterates for a collection while invoking callback with context.
 * returns: the collection (the first parameter).
 * */
function each(collection, callback) {
    // If array or array like:
    if (typeofFnc(collection, 'array') || isArrayLike(collection)) {
        for (var i = 0; i < collection.length; i++){
            callback.call(this, collection[i], i, collection);
        }
    }
    // If object
    else if (typeofFnc(collection, 'object')) {
        for (var key in collection) {
            if (collection.hasOwnProperty(key)){
                callback.call(this, collection[key], key, collection);
            }
        }
    }

    return collection;
}


})()
);

})(window, window.$, undefined);

var h1 = jQuery('h1');

var ttt = h1.html();

debugger;

