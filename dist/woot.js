(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.wootJs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//  Ramda v0.17.1
//  https://github.com/ramda/ramda
//  (c) 2013-2015 Scott Sauyet, Michael Hurley, and David Chambers
//  Ramda may be freely distributed under the MIT license.

;(function() {

  'use strict';

  /**
     * A special placeholder value used to specify "gaps" within curried functions,
     * allowing partial application of any combination of arguments,
     * regardless of their positions.
     *
     * If `g` is a curried ternary function and `_` is `R.__`, the following are equivalent:
     *
     *   - `g(1, 2, 3)`
     *   - `g(_, 2, 3)(1)`
     *   - `g(_, _, 3)(1)(2)`
     *   - `g(_, _, 3)(1, 2)`
     *   - `g(_, 2, _)(1, 3)`
     *   - `g(_, 2)(1)(3)`
     *   - `g(_, 2)(1, 3)`
     *   - `g(_, 2)(_, 3)(1)`
     *
     * @constant
     * @memberOf R
     * @category Function
     * @example
     *
     *      var greet = R.replace('{name}', R.__, 'Hello, {name}!');
     *      greet('Alice'); //=> 'Hello, Alice!'
     */
    var __ = { '@@functional/placeholder': true };

    // jshint unused:vars
    var _arity = function _arity(n, fn) {
        // jshint unused:vars
        switch (n) {
        case 0:
            return function () {
                return fn.apply(this, arguments);
            };
        case 1:
            return function (a0) {
                return fn.apply(this, arguments);
            };
        case 2:
            return function (a0, a1) {
                return fn.apply(this, arguments);
            };
        case 3:
            return function (a0, a1, a2) {
                return fn.apply(this, arguments);
            };
        case 4:
            return function (a0, a1, a2, a3) {
                return fn.apply(this, arguments);
            };
        case 5:
            return function (a0, a1, a2, a3, a4) {
                return fn.apply(this, arguments);
            };
        case 6:
            return function (a0, a1, a2, a3, a4, a5) {
                return fn.apply(this, arguments);
            };
        case 7:
            return function (a0, a1, a2, a3, a4, a5, a6) {
                return fn.apply(this, arguments);
            };
        case 8:
            return function (a0, a1, a2, a3, a4, a5, a6, a7) {
                return fn.apply(this, arguments);
            };
        case 9:
            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
                return fn.apply(this, arguments);
            };
        case 10:
            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                return fn.apply(this, arguments);
            };
        default:
            throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
        }
    };

    var _cloneRegExp = function _cloneRegExp(pattern) {
        return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
    };

    var _complement = function _complement(f) {
        return function () {
            return !f.apply(this, arguments);
        };
    };

    /**
     * Private `concat` function to merge two array-like objects.
     *
     * @private
     * @param {Array|Arguments} [set1=[]] An array-like object.
     * @param {Array|Arguments} [set2=[]] An array-like object.
     * @return {Array} A new, merged array.
     * @example
     *
     *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
     */
    var _concat = function _concat(set1, set2) {
        set1 = set1 || [];
        set2 = set2 || [];
        var idx;
        var len1 = set1.length;
        var len2 = set2.length;
        var result = [];
        idx = 0;
        while (idx < len1) {
            result[result.length] = set1[idx];
            idx += 1;
        }
        idx = 0;
        while (idx < len2) {
            result[result.length] = set2[idx];
            idx += 1;
        }
        return result;
    };

    var _containsWith = function _containsWith(pred, x, list) {
        var idx = 0, len = list.length;
        while (idx < len) {
            if (pred(x, list[idx])) {
                return true;
            }
            idx += 1;
        }
        return false;
    };

    /**
     * Optimized internal two-arity curry function.
     *
     * @private
     * @category Function
     * @param {Function} fn The function to curry.
     * @return {Function} The curried function.
     */
    var _curry1 = function _curry1(fn) {
        return function f1(a) {
            if (arguments.length === 0) {
                return f1;
            } else if (a != null && a['@@functional/placeholder'] === true) {
                return f1;
            } else {
                return fn.apply(this, arguments);
            }
        };
    };

    /**
     * Optimized internal two-arity curry function.
     *
     * @private
     * @category Function
     * @param {Function} fn The function to curry.
     * @return {Function} The curried function.
     */
    var _curry2 = function _curry2(fn) {
        return function f2(a, b) {
            var n = arguments.length;
            if (n === 0) {
                return f2;
            } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
                return f2;
            } else if (n === 1) {
                return _curry1(function (b) {
                    return fn(a, b);
                });
            } else if (n === 2 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true) {
                return f2;
            } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
                return _curry1(function (a) {
                    return fn(a, b);
                });
            } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
                return _curry1(function (b) {
                    return fn(a, b);
                });
            } else {
                return fn(a, b);
            }
        };
    };

    /**
     * Optimized internal three-arity curry function.
     *
     * @private
     * @category Function
     * @param {Function} fn The function to curry.
     * @return {Function} The curried function.
     */
    var _curry3 = function _curry3(fn) {
        return function f3(a, b, c) {
            var n = arguments.length;
            if (n === 0) {
                return f3;
            } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
                return f3;
            } else if (n === 1) {
                return _curry2(function (b, c) {
                    return fn(a, b, c);
                });
            } else if (n === 2 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true) {
                return f3;
            } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
                return _curry2(function (a, c) {
                    return fn(a, b, c);
                });
            } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
                return _curry2(function (b, c) {
                    return fn(a, b, c);
                });
            } else if (n === 2) {
                return _curry1(function (c) {
                    return fn(a, b, c);
                });
            } else if (n === 3 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true && c != null && c['@@functional/placeholder'] === true) {
                return f3;
            } else if (n === 3 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true) {
                return _curry2(function (a, b) {
                    return fn(a, b, c);
                });
            } else if (n === 3 && a != null && a['@@functional/placeholder'] === true && c != null && c['@@functional/placeholder'] === true) {
                return _curry2(function (a, c) {
                    return fn(a, b, c);
                });
            } else if (n === 3 && b != null && b['@@functional/placeholder'] === true && c != null && c['@@functional/placeholder'] === true) {
                return _curry2(function (b, c) {
                    return fn(a, b, c);
                });
            } else if (n === 3 && a != null && a['@@functional/placeholder'] === true) {
                return _curry1(function (a) {
                    return fn(a, b, c);
                });
            } else if (n === 3 && b != null && b['@@functional/placeholder'] === true) {
                return _curry1(function (b) {
                    return fn(a, b, c);
                });
            } else if (n === 3 && c != null && c['@@functional/placeholder'] === true) {
                return _curry1(function (c) {
                    return fn(a, b, c);
                });
            } else {
                return fn(a, b, c);
            }
        };
    };

    /**
     * Internal curryN function.
     *
     * @private
     * @category Function
     * @param {Number} length The arity of the curried function.
     * @return {array} An array of arguments received thus far.
     * @param {Function} fn The function to curry.
     */
    var _curryN = function _curryN(length, received, fn) {
        return function () {
            var combined = [];
            var argsIdx = 0;
            var left = length;
            var combinedIdx = 0;
            while (combinedIdx < received.length || argsIdx < arguments.length) {
                var result;
                if (combinedIdx < received.length && (received[combinedIdx] == null || received[combinedIdx]['@@functional/placeholder'] !== true || argsIdx >= arguments.length)) {
                    result = received[combinedIdx];
                } else {
                    result = arguments[argsIdx];
                    argsIdx += 1;
                }
                combined[combinedIdx] = result;
                if (result == null || result['@@functional/placeholder'] !== true) {
                    left -= 1;
                }
                combinedIdx += 1;
            }
            return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
        };
    };

    var _filter = function _filter(fn, list) {
        var idx = 0, len = list.length, result = [];
        while (idx < len) {
            if (fn(list[idx])) {
                result[result.length] = list[idx];
            }
            idx += 1;
        }
        return result;
    };

    var _forceReduced = function _forceReduced(x) {
        return {
            '@@transducer/value': x,
            '@@transducer/reduced': true
        };
    };

    /**
     * @private
     * @param {Function} fn The strategy for extracting function names from an object
     * @return {Function} A function that takes an object and returns an array of function names.
     */
    var _functionsWith = function _functionsWith(fn) {
        return function (obj) {
            return _filter(function (key) {
                return typeof obj[key] === 'function';
            }, fn(obj));
        };
    };

    var _has = function _has(prop, obj) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    };

    var _identity = function _identity(x) {
        return x;
    };

    /**
     * Tests whether or not an object is an array.
     *
     * @private
     * @param {*} val The object to test.
     * @return {Boolean} `true` if `val` is an array, `false` otherwise.
     * @example
     *
     *      _isArray([]); //=> true
     *      _isArray(null); //=> false
     *      _isArray({}); //=> false
     */
    var _isArray = Array.isArray || function _isArray(val) {
        return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
    };

    /**
     * Determine if the passed argument is an integer.
     *
     * @private
     * @param {*} n
     * @category Type
     * @return {Boolean}
     */
    var _isInteger = Number.isInteger || function _isInteger(n) {
        return n << 0 === n;
    };

    var _isNumber = function _isNumber(x) {
        return Object.prototype.toString.call(x) === '[object Number]';
    };

    var _isString = function _isString(x) {
        return Object.prototype.toString.call(x) === '[object String]';
    };

    var _isTransformer = function _isTransformer(obj) {
        return typeof obj['@@transducer/step'] === 'function';
    };

    var _map = function _map(fn, list) {
        var idx = 0, len = list.length, result = Array(len);
        while (idx < len) {
            result[idx] = fn(list[idx]);
            idx += 1;
        }
        return result;
    };

    var _pipe = function _pipe(f, g) {
        return function () {
            return g.call(this, f.apply(this, arguments));
        };
    };

    var _pipeP = function _pipeP(f, g) {
        return function () {
            var ctx = this;
            return f.apply(ctx, arguments).then(function (x) {
                return g.call(ctx, x);
            });
        };
    };

    var _quote = function _quote(s) {
        return '"' + s.replace(/"/g, '\\"') + '"';
    };

    var _reduced = function _reduced(x) {
        return x && x['@@transducer/reduced'] ? x : {
            '@@transducer/value': x,
            '@@transducer/reduced': true
        };
    };

    /**
     * An optimized, private array `slice` implementation.
     *
     * @private
     * @param {Arguments|Array} args The array or arguments object to consider.
     * @param {Number} [from=0] The array index to slice from, inclusive.
     * @param {Number} [to=args.length] The array index to slice to, exclusive.
     * @return {Array} A new, sliced array.
     * @example
     *
     *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
     *
     *      var firstThreeArgs = function(a, b, c, d) {
     *        return _slice(arguments, 0, 3);
     *      };
     *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
     */
    var _slice = function _slice(args, from, to) {
        switch (arguments.length) {
        case 1:
            return _slice(args, 0, args.length);
        case 2:
            return _slice(args, from, args.length);
        default:
            var list = [];
            var idx = 0;
            var len = Math.max(0, Math.min(args.length, to) - from);
            while (idx < len) {
                list[idx] = args[from + idx];
                idx += 1;
            }
            return list;
        }
    };

    /**
     * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
     */
    var _toISOString = function () {
        var pad = function pad(n) {
            return (n < 10 ? '0' : '') + n;
        };
        return typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
            return d.toISOString();
        } : function _toISOString(d) {
            return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
        };
    }();

    var _xdropRepeatsWith = function () {
        function XDropRepeatsWith(pred, xf) {
            this.xf = xf;
            this.pred = pred;
            this.lastValue = undefined;
            this.seenFirstValue = false;
        }
        XDropRepeatsWith.prototype['@@transducer/init'] = function () {
            return this.xf['@@transducer/init']();
        };
        XDropRepeatsWith.prototype['@@transducer/result'] = function (result) {
            return this.xf['@@transducer/result'](result);
        };
        XDropRepeatsWith.prototype['@@transducer/step'] = function (result, input) {
            var sameAsLast = false;
            if (!this.seenFirstValue) {
                this.seenFirstValue = true;
            } else if (this.pred(this.lastValue, input)) {
                sameAsLast = true;
            }
            this.lastValue = input;
            return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
        };
        return _curry2(function _xdropRepeatsWith(pred, xf) {
            return new XDropRepeatsWith(pred, xf);
        });
    }();

    var _xfBase = {
        init: function () {
            return this.xf['@@transducer/init']();
        },
        result: function (result) {
            return this.xf['@@transducer/result'](result);
        }
    };

    var _xfilter = function () {
        function XFilter(f, xf) {
            this.xf = xf;
            this.f = f;
        }
        XFilter.prototype['@@transducer/init'] = _xfBase.init;
        XFilter.prototype['@@transducer/result'] = _xfBase.result;
        XFilter.prototype['@@transducer/step'] = function (result, input) {
            return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
        };
        return _curry2(function _xfilter(f, xf) {
            return new XFilter(f, xf);
        });
    }();

    var _xfind = function () {
        function XFind(f, xf) {
            this.xf = xf;
            this.f = f;
            this.found = false;
        }
        XFind.prototype['@@transducer/init'] = _xfBase.init;
        XFind.prototype['@@transducer/result'] = function (result) {
            if (!this.found) {
                result = this.xf['@@transducer/step'](result, void 0);
            }
            return this.xf['@@transducer/result'](result);
        };
        XFind.prototype['@@transducer/step'] = function (result, input) {
            if (this.f(input)) {
                this.found = true;
                result = _reduced(this.xf['@@transducer/step'](result, input));
            }
            return result;
        };
        return _curry2(function _xfind(f, xf) {
            return new XFind(f, xf);
        });
    }();

    var _xfindIndex = function () {
        function XFindIndex(f, xf) {
            this.xf = xf;
            this.f = f;
            this.idx = -1;
            this.found = false;
        }
        XFindIndex.prototype['@@transducer/init'] = _xfBase.init;
        XFindIndex.prototype['@@transducer/result'] = function (result) {
            if (!this.found) {
                result = this.xf['@@transducer/step'](result, -1);
            }
            return this.xf['@@transducer/result'](result);
        };
        XFindIndex.prototype['@@transducer/step'] = function (result, input) {
            this.idx += 1;
            if (this.f(input)) {
                this.found = true;
                result = _reduced(this.xf['@@transducer/step'](result, this.idx));
            }
            return result;
        };
        return _curry2(function _xfindIndex(f, xf) {
            return new XFindIndex(f, xf);
        });
    }();

    var _xfindLast = function () {
        function XFindLast(f, xf) {
            this.xf = xf;
            this.f = f;
        }
        XFindLast.prototype['@@transducer/init'] = _xfBase.init;
        XFindLast.prototype['@@transducer/result'] = function (result) {
            return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
        };
        XFindLast.prototype['@@transducer/step'] = function (result, input) {
            if (this.f(input)) {
                this.last = input;
            }
            return result;
        };
        return _curry2(function _xfindLast(f, xf) {
            return new XFindLast(f, xf);
        });
    }();

    var _xfindLastIndex = function () {
        function XFindLastIndex(f, xf) {
            this.xf = xf;
            this.f = f;
            this.idx = -1;
            this.lastIdx = -1;
        }
        XFindLastIndex.prototype['@@transducer/init'] = _xfBase.init;
        XFindLastIndex.prototype['@@transducer/result'] = function (result) {
            return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
        };
        XFindLastIndex.prototype['@@transducer/step'] = function (result, input) {
            this.idx += 1;
            if (this.f(input)) {
                this.lastIdx = this.idx;
            }
            return result;
        };
        return _curry2(function _xfindLastIndex(f, xf) {
            return new XFindLastIndex(f, xf);
        });
    }();

    var _xmap = function () {
        function XMap(f, xf) {
            this.xf = xf;
            this.f = f;
        }
        XMap.prototype['@@transducer/init'] = _xfBase.init;
        XMap.prototype['@@transducer/result'] = _xfBase.result;
        XMap.prototype['@@transducer/step'] = function (result, input) {
            return this.xf['@@transducer/step'](result, this.f(input));
        };
        return _curry2(function _xmap(f, xf) {
            return new XMap(f, xf);
        });
    }();

    var _xtake = function () {
        function XTake(n, xf) {
            this.xf = xf;
            this.n = n;
        }
        XTake.prototype['@@transducer/init'] = _xfBase.init;
        XTake.prototype['@@transducer/result'] = _xfBase.result;
        XTake.prototype['@@transducer/step'] = function (result, input) {
            if (this.n === 0) {
                return _reduced(result);
            } else {
                this.n -= 1;
                return this.xf['@@transducer/step'](result, input);
            }
        };
        return _curry2(function _xtake(n, xf) {
            return new XTake(n, xf);
        });
    }();

    var _xtakeWhile = function () {
        function XTakeWhile(f, xf) {
            this.xf = xf;
            this.f = f;
        }
        XTakeWhile.prototype['@@transducer/init'] = _xfBase.init;
        XTakeWhile.prototype['@@transducer/result'] = _xfBase.result;
        XTakeWhile.prototype['@@transducer/step'] = function (result, input) {
            return this.f(input) ? this.xf['@@transducer/step'](result, input) : _reduced(result);
        };
        return _curry2(function _xtakeWhile(f, xf) {
            return new XTakeWhile(f, xf);
        });
    }();

    var _xwrap = function () {
        function XWrap(fn) {
            this.f = fn;
        }
        XWrap.prototype['@@transducer/init'] = function () {
            throw new Error('init not implemented on XWrap');
        };
        XWrap.prototype['@@transducer/result'] = function (acc) {
            return acc;
        };
        XWrap.prototype['@@transducer/step'] = function (acc, x) {
            return this.f(acc, x);
        };
        return function _xwrap(fn) {
            return new XWrap(fn);
        };
    }();

    /**
     * Adds two numbers. Equivalent to `a + b` but curried.
     *
     * @func
     * @memberOf R
     * @category Math
     * @sig Number -> Number -> Number
     * @param {Number} a
     * @param {Number} b
     * @return {Number}
     * @see R.subtract
     * @example
     *
     *      R.add(2, 3);       //=>  5
     *      R.add(7)(10);      //=> 17
     */
    var add = _curry2(function add(a, b) {
        return a + b;
    });

    /**
     * Applies a function to the value at the given index of an array,
     * returning a new copy of the array with the element at the given
     * index replaced with the result of the function application.
     * @see R.update
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> a) -> Number -> [a] -> [a]
     * @param {Function} fn The function to apply.
     * @param {Number} idx The index.
     * @param {Array|Arguments} list An array-like object whose value
     *        at the supplied index will be replaced.
     * @return {Array} A copy of the supplied array-like object with
     *         the element at index `idx` replaced with the value
     *         returned by applying `fn` to the existing element.
     * @example
     *
     *      R.adjust(R.add(10), 1, [0, 1, 2]);     //=> [0, 11, 2]
     *      R.adjust(R.add(10))(1)([0, 1, 2]);     //=> [0, 11, 2]
     */
    var adjust = _curry3(function adjust(fn, idx, list) {
        if (idx >= list.length || idx < -list.length) {
            return list;
        }
        var start = idx < 0 ? list.length : 0;
        var _idx = start + idx;
        var _list = _concat(list);
        _list[_idx] = fn(list[_idx]);
        return _list;
    });

    /**
     * Returns a function that always returns the given value. Note that for
     * non-primitives the value returned is a reference to the original value.
     *
     * This function is known as `const`, `constant`, or `K` (for K combinator)
     * in other languages and libraries.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig a -> (* -> a)
     * @param {*} val The value to wrap in a function
     * @return {Function} A Function :: * -> val.
     * @example
     *
     *      var t = R.always('Tee');
     *      t(); //=> 'Tee'
     */
    var always = _curry1(function always(val) {
        return function () {
            return val;
        };
    });

    /**
     * Returns a new list, composed of n-tuples of consecutive elements
     * If `n` is greater than the length of the list, an empty list is returned.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig Number -> [a] -> [[a]]
     * @param {Number} n The size of the tuples to create
     * @param {Array} list The list to split into `n`-tuples
     * @return {Array} The new list.
     * @example
     *
     *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
     *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
     *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []
     */
    var aperture = _curry2(function aperture(n, list) {
        var idx = 0;
        var limit = list.length - (n - 1);
        var acc = new Array(limit >= 0 ? limit : 0);
        while (idx < limit) {
            acc[idx] = _slice(list, idx, idx + n);
            idx += 1;
        }
        return acc;
    });

    /**
     * Returns a new list containing the contents of the given list, followed by the given
     * element.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig a -> [a] -> [a]
     * @param {*} el The element to add to the end of the new list.
     * @param {Array} list The list whose contents will be added to the beginning of the output
     *        list.
     * @return {Array} A new list containing the contents of the old list followed by `el`.
     * @see R.prepend
     * @example
     *
     *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
     *      R.append('tests', []); //=> ['tests']
     *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
     */
    var append = _curry2(function append(el, list) {
        return _concat(list, [el]);
    });

    /**
     * Applies function `fn` to the argument list `args`. This is useful for
     * creating a fixed-arity function from a variadic function. `fn` should
     * be a bound function if context is significant.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig (*... -> a) -> [*] -> a
     * @param {Function} fn
     * @param {Array} args
     * @return {*}
     * @see R.call, R.unapply
     * @example
     *
     *      var nums = [1, 2, 3, -99, 42, 6, 7];
     *      R.apply(Math.max, nums); //=> 42
     */
    var apply = _curry2(function apply(fn, args) {
        return fn.apply(this, args);
    });

    /**
     * Makes a shallow clone of an object, setting or overriding the specified
     * property with the given value.  Note that this copies and flattens
     * prototype properties onto the new object as well.  All non-primitive
     * properties are copied by reference.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig String -> a -> {k: v} -> {k: v}
     * @param {String} prop the property name to set
     * @param {*} val the new value
     * @param {Object} obj the object to clone
     * @return {Object} a new object similar to the original except for the specified property.
     * @see R.dissoc
     * @example
     *
     *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
     */
    var assoc = _curry3(function assoc(prop, val, obj) {
        var result = {};
        for (var p in obj) {
            result[p] = obj[p];
        }
        result[prop] = val;
        return result;
    });

    /**
     * Makes a shallow clone of an object, setting or overriding the nodes
     * required to create the given path, and placing the specific value at the
     * tail end of that path.  Note that this copies and flattens prototype
     * properties onto the new object as well.  All non-primitive properties
     * are copied by reference.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig [String] -> a -> {k: v} -> {k: v}
     * @param {Array} path the path to set
     * @param {*} val the new value
     * @param {Object} obj the object to clone
     * @return {Object} a new object similar to the original except along the specified path.
     * @see R.dissocPath
     * @example
     *
     *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
     */
    var assocPath = _curry3(function assocPath(path, val, obj) {
        switch (path.length) {
        case 0:
            return obj;
        case 1:
            return assoc(path[0], val, obj);
        default:
            return assoc(path[0], assocPath(_slice(path, 1), val, Object(obj[path[0]])), obj);
        }
    });

    /**
     * Creates a function that is bound to a context.
     * Note: `R.bind` does not provide the additional argument-binding capabilities of
     * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
     *
     * @func
     * @memberOf R
     * @category Function
     * @category Object
     * @see R.partial
     * @sig (* -> *) -> {*} -> (* -> *)
     * @param {Function} fn The function to bind to context
     * @param {Object} thisObj The context to bind `fn` to
     * @return {Function} A function that will execute in the context of `thisObj`.
     */
    var bind = _curry2(function bind(fn, thisObj) {
        return _arity(fn.length, function () {
            return fn.apply(thisObj, arguments);
        });
    });

    /**
     * A function wrapping calls to the two functions in an `&&` operation, returning the result of the first
     * function if it is false-y and the result of the second function otherwise.  Note that this is
     * short-circuited, meaning that the second function will not be invoked if the first returns a false-y
     * value.
     *
     * @func
     * @memberOf R
     * @category Logic
     * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
     * @param {Function} f a predicate
     * @param {Function} g another predicate
     * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
     * @see R.and
     * @example
     *
     *      var gt10 = function(x) { return x > 10; };
     *      var even = function(x) { return x % 2 === 0 };
     *      var f = R.both(gt10, even);
     *      f(100); //=> true
     *      f(101); //=> false
     */
    var both = _curry2(function both(f, g) {
        return function _both() {
            return f.apply(this, arguments) && g.apply(this, arguments);
        };
    });

    /**
     * Makes a comparator function out of a function that reports whether the first element is less than the second.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig (a, b -> Boolean) -> (a, b -> Number)
     * @param {Function} pred A predicate function of arity two.
     * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`.
     * @example
     *
     *      var cmp = R.comparator(function(a, b) {
     *        return a.age < b.age;
     *      });
     *      var people = [
     *        // ...
     *      ];
     *      R.sort(cmp, people);
     */
    var comparator = _curry1(function comparator(pred) {
        return function (a, b) {
            return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
        };
    });

    /**
     * Takes a function `f` and returns a function `g` such that:
     *
     *   - applying `g` to zero or more arguments will give __true__ if applying
     *     the same arguments to `f` gives a logical __false__ value; and
     *
     *   - applying `g` to zero or more arguments will give __false__ if applying
     *     the same arguments to `f` gives a logical __true__ value.
     *
     * @func
     * @memberOf R
     * @category Logic
     * @sig (*... -> *) -> (*... -> Boolean)
     * @param {Function} f
     * @return {Function}
     * @see R.not
     * @example
     *
     *      var isEven = function(n) { return n % 2 === 0; };
     *      var isOdd = R.complement(isEven);
     *      isOdd(21); //=> true
     *      isOdd(42); //=> false
     */
    var complement = _curry1(_complement);

    /**
     * Returns a function, `fn`, which encapsulates if/else-if/else logic.
     * `R.cond` takes a list of [predicate, transform] pairs. All of the
     * arguments to `fn` are applied to each of the predicates in turn
     * until one returns a "truthy" value, at which point `fn` returns the
     * result of applying its arguments to the corresponding transformer.
     * If none of the predicates matches, `fn` returns undefined.
     *
     * @func
     * @memberOf R
     * @category Logic
     * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
     * @param {Array} pairs
     * @return {Function}
     * @example
     *
     *      var fn = R.cond([
     *        [R.equals(0),   R.always('water freezes at 0°C')],
     *        [R.equals(100), R.always('water boils at 100°C')],
     *        [R.T,           function(temp) { return 'nothing special happens at ' + temp + '°C'; }]
     *      ]);
     *      fn(0); //=> 'water freezes at 0°C'
     *      fn(50); //=> 'nothing special happens at 50°C'
     *      fn(100); //=> 'water boils at 100°C'
     */
    var cond = _curry1(function cond(pairs) {
        return function () {
            var idx = 0;
            while (idx < pairs.length) {
                if (pairs[idx][0].apply(this, arguments)) {
                    return pairs[idx][1].apply(this, arguments);
                }
                idx += 1;
            }
        };
    });

    /**
     * Returns `true` if the `x` is found in the `list`, using `pred` as an
     * equality predicate for `x`.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a, a -> Boolean) -> a -> [a] -> Boolean
     * @param {Function} pred A predicate used to test whether two items are equal.
     * @param {*} x The item to find
     * @param {Array} list The list to iterate over
     * @return {Boolean} `true` if `x` is in `list`, else `false`.
     * @example
     *
     *      var xs = [{x: 12}, {x: 11}, {x: 10}];
     *      R.containsWith(function(a, b) { return a.x === b.x; }, {x: 10}, xs); //=> true
     *      R.containsWith(function(a, b) { return a.x === b.x; }, {x: 1}, xs); //=> false
     */
    var containsWith = _curry3(_containsWith);

    /**
     * Counts the elements of a list according to how many match each value
     * of a key generated by the supplied function. Returns an object
     * mapping the keys produced by `fn` to the number of occurrences in
     * the list. Note that all keys are coerced to strings because of how
     * JavaScript objects work.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig (a -> String) -> [a] -> {*}
     * @param {Function} fn The function used to map values to keys.
     * @param {Array} list The list to count elements from.
     * @return {Object} An object mapping keys to number of occurrences in the list.
     * @example
     *
     *      var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
     *      var letters = R.split('', 'abcABCaaaBBc');
     *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
     *      R.countBy(R.toLower)(letters);   //=> {'a': 5, 'b': 4, 'c': 3}
     */
    var countBy = _curry2(function countBy(fn, list) {
        var counts = {};
        var len = list.length;
        var idx = 0;
        while (idx < len) {
            var key = fn(list[idx]);
            counts[key] = (_has(key, counts) ? counts[key] : 0) + 1;
            idx += 1;
        }
        return counts;
    });

    /**
     * Creates an object containing a single key:value pair.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig String -> a -> {String:a}
     * @param {String} key
     * @param {*} val
     * @return {Object}
     * @example
     *
     *      var matchPhrases = R.compose(
     *        R.createMapEntry('must'),
     *        R.map(R.createMapEntry('match_phrase'))
     *      );
     *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
     */
    var createMapEntry = _curry2(function createMapEntry(key, val) {
        var obj = {};
        obj[key] = val;
        return obj;
    });

    /**
     * Returns a curried equivalent of the provided function, with the
     * specified arity. The curried function has two unusual capabilities.
     * First, its arguments needn't be provided one at a time. If `g` is
     * `R.curryN(3, f)`, the following are equivalent:
     *
     *   - `g(1)(2)(3)`
     *   - `g(1)(2, 3)`
     *   - `g(1, 2)(3)`
     *   - `g(1, 2, 3)`
     *
     * Secondly, the special placeholder value `R.__` may be used to specify
     * "gaps", allowing partial application of any combination of arguments,
     * regardless of their positions. If `g` is as above and `_` is `R.__`,
     * the following are equivalent:
     *
     *   - `g(1, 2, 3)`
     *   - `g(_, 2, 3)(1)`
     *   - `g(_, _, 3)(1)(2)`
     *   - `g(_, _, 3)(1, 2)`
     *   - `g(_, 2)(1)(3)`
     *   - `g(_, 2)(1, 3)`
     *   - `g(_, 2)(_, 3)(1)`
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig Number -> (* -> a) -> (* -> a)
     * @param {Number} length The arity for the returned function.
     * @param {Function} fn The function to curry.
     * @return {Function} A new, curried function.
     * @see R.curry
     * @example
     *
     *      var addFourNumbers = function() {
     *        return R.sum([].slice.call(arguments, 0, 4));
     *      };
     *
     *      var curriedAddFourNumbers = R.curryN(4, addFourNumbers);
     *      var f = curriedAddFourNumbers(1, 2);
     *      var g = f(3);
     *      g(4); //=> 10
     */
    var curryN = _curry2(function curryN(length, fn) {
        if (length === 1) {
            return _curry1(fn);
        }
        return _arity(length, _curryN(length, [], fn));
    });

    /**
     * Decrements its argument.
     *
     * @func
     * @memberOf R
     * @category Math
     * @sig Number -> Number
     * @param {Number} n
     * @return {Number}
     * @see R.inc
     * @example
     *
     *      R.dec(42); //=> 41
     */
    var dec = add(-1);

    /**
     * Returns the second argument if it is not null or undefined. If it is null
     * or undefined, the first (default) argument is returned.
     *
     * @func
     * @memberOf R
     * @category Logic
     * @sig a -> b -> a | b
     * @param {a} val The default value.
     * @param {b} val The value to return if it is not null or undefined
     * @return {*} The the second value or the default value
     * @example
     *
     *      var defaultTo42 = defaultTo(42);
     *
     *      defaultTo42(null);  //=> 42
     *      defaultTo42(undefined);  //=> 42
     *      defaultTo42('Ramda');  //=> 'Ramda'
     */
    var defaultTo = _curry2(function defaultTo(d, v) {
        return v == null ? d : v;
    });

    /**
     * Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
     * Duplication is determined according to the value returned by applying the supplied predicate to two list
     * elements.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig (a,a -> Boolean) -> [a] -> [a] -> [a]
     * @param {Function} pred A predicate used to test whether two items are equal.
     * @param {Array} list1 The first list.
     * @param {Array} list2 The second list.
     * @see R.difference
     * @return {Array} The elements in `list1` that are not in `list2`.
     * @example
     *
     *      function cmp(x, y) { return x.a === y.a; }
     *      var l1 = [{a: 1}, {a: 2}, {a: 3}];
     *      var l2 = [{a: 3}, {a: 4}];
     *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
     */
    var differenceWith = _curry3(function differenceWith(pred, first, second) {
        var out = [];
        var idx = 0;
        var firstLen = first.length;
        var containsPred = containsWith(pred);
        while (idx < firstLen) {
            if (!containsPred(first[idx], second) && !containsPred(first[idx], out)) {
                out[out.length] = first[idx];
            }
            idx += 1;
        }
        return out;
    });

    /**
     * Returns a new object that does not contain a `prop` property.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig String -> {k: v} -> {k: v}
     * @param {String} prop the name of the property to dissociate
     * @param {Object} obj the object to clone
     * @return {Object} a new object similar to the original but without the specified property
     * @see R.assoc
     * @example
     *
     *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
     */
    var dissoc = _curry2(function dissoc(prop, obj) {
        var result = {};
        for (var p in obj) {
            if (p !== prop) {
                result[p] = obj[p];
            }
        }
        return result;
    });

    /**
     * Makes a shallow clone of an object, omitting the property at the
     * given path. Note that this copies and flattens prototype properties
     * onto the new object as well.  All non-primitive properties are copied
     * by reference.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig [String] -> {k: v} -> {k: v}
     * @param {Array} path the path to set
     * @param {Object} obj the object to clone
     * @return {Object} a new object without the property at path
     * @see R.assocPath
     * @example
     *
     *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
     */
    var dissocPath = _curry2(function dissocPath(path, obj) {
        switch (path.length) {
        case 0:
            return obj;
        case 1:
            return dissoc(path[0], obj);
        default:
            var head = path[0];
            var tail = _slice(path, 1);
            return obj[head] == null ? obj : assoc(head, dissocPath(tail, obj[head]), obj);
        }
    });

    /**
     * Divides two numbers. Equivalent to `a / b`.
     *
     * @func
     * @memberOf R
     * @category Math
     * @sig Number -> Number -> Number
     * @param {Number} a The first value.
     * @param {Number} b The second value.
     * @return {Number} The result of `a / b`.
     * @see R.multiply
     * @example
     *
     *      R.divide(71, 100); //=> 0.71
     *
     *      var half = R.divide(R.__, 2);
     *      half(42); //=> 21
     *
     *      var reciprocal = R.divide(1);
     *      reciprocal(4);   //=> 0.25
     */
    var divide = _curry2(function divide(a, b) {
        return a / b;
    });

    /**
     * Returns a new list containing all but last the`n` elements of a given list,
     * passing each value from the right to the supplied predicate function, skipping
     * elements while the predicate function returns `true`. The predicate function
     * is passed one argument: (value)*.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> Boolean) -> [a] -> [a]
     * @param {Function} fn The function called per iteration.
     * @param {Array} list The collection to iterate over.
     * @return {Array} A new array.
     * @see R.takeLastWhile
     * @example
     *
     *      var lteThree = function(x) {
     *        return x <= 3;
     *      };
     *
     *      R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2]
     */
    var dropLastWhile = _curry2(function dropLastWhile(pred, list) {
        var idx = list.length - 1;
        while (idx >= 0 && pred(list[idx])) {
            idx -= 1;
        }
        return _slice(list, 0, idx + 1);
    });

    /**
     * A function wrapping calls to the two functions in an `||` operation, returning the result of the first
     * function if it is truth-y and the result of the second function otherwise.  Note that this is
     * short-circuited, meaning that the second function will not be invoked if the first returns a truth-y
     * value.
     *
     * @func
     * @memberOf R
     * @category Logic
     * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
     * @param {Function} f a predicate
     * @param {Function} g another predicate
     * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
     * @see R.or
     * @example
     *
     *      var gt10 = function(x) { return x > 10; };
     *      var even = function(x) { return x % 2 === 0 };
     *      var f = R.either(gt10, even);
     *      f(101); //=> true
     *      f(8); //=> true
     */
    var either = _curry2(function either(f, g) {
        return function _either() {
            return f.apply(this, arguments) || g.apply(this, arguments);
        };
    });

    /**
     * Returns the empty value of its argument's type. Ramda defines the empty
     * value of Array (`[]`), Object (`{}`), and String (`''`). Other types are
     * supported if they define `<Type>.empty` and/or `<Type>.prototype.empty`.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig a -> a
     * @param {*} x
     * @return {*}
     * @example
     *
     *      R.empty(Just(42));      //=> Nothing()
     *      R.empty([1, 2, 3]);     //=> []
     *      R.empty('unicorns');    //=> ''
     *      R.empty({x: 1, y: 2});  //=> {}
     */
    var empty = _curry1(function empty(x) {
        if (x != null && typeof x.empty === 'function') {
            return x.empty();
        } else if (x != null && typeof x.constructor != null && typeof x.constructor.empty === 'function') {
            return x.constructor.empty();
        } else {
            switch (Object.prototype.toString.call(x)) {
            case '[object Array]':
                return [];
            case '[object Object]':
                return {};
            case '[object String]':
                return '';
            }
        }
    });

    /**
     * Creates a new object by recursively evolving a shallow copy of `object`, according to the
     * `transformation` functions. All non-primitive properties are copied by reference.
     *
     * A `tranformation` function will not be invoked if its corresponding key does not exist in
     * the evolved object.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig {k: (v -> v)} -> {k: v} -> {k: v}
     * @param {Object} transformations The object specifying transformation functions to apply
     *        to the object.
     * @param {Object} object The object to be transformed.
     * @return {Object} The transformed object.
     * @example
     *
     *      var tomato  = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
     *      var transformations = {
     *        firstName: R.trim,
     *        lastName: R.trim, // Will not get invoked.
     *        data: {elapsed: R.add(1), remaining: R.add(-1)}
     *      };
     *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
     */
    var evolve = _curry2(function evolve(transformations, object) {
        var transformation, key, type, result = {};
        for (key in object) {
            transformation = transformations[key];
            type = typeof transformation;
            result[key] = type === 'function' ? transformation(object[key]) : type === 'object' ? evolve(transformations[key], object[key]) : object[key];
        }
        return result;
    });

    /**
     * Creates a new object out of a list key-value pairs.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig [[k,v]] -> {k: v}
     * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
     * @return {Object} The object made by pairing up `keys` and `values`.
     * @see R.toPairs
     * @example
     *
     *      R.fromPairs([['a', 1], ['b', 2],  ['c', 3]]); //=> {a: 1, b: 2, c: 3}
     */
    var fromPairs = _curry1(function fromPairs(pairs) {
        var idx = 0, len = pairs.length, out = {};
        while (idx < len) {
            if (_isArray(pairs[idx]) && pairs[idx].length) {
                out[pairs[idx][0]] = pairs[idx][1];
            }
            idx += 1;
        }
        return out;
    });

    /**
     * Returns `true` if the first argument is greater than the second;
     * `false` otherwise.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig Ord a => a -> a -> Boolean
     * @param {*} a
     * @param {*} b
     * @return {Boolean}
     * @see R.lt
     * @example
     *
     *      R.gt(2, 1); //=> true
     *      R.gt(2, 2); //=> false
     *      R.gt(2, 3); //=> false
     *      R.gt('a', 'z'); //=> false
     *      R.gt('z', 'a'); //=> true
     */
    var gt = _curry2(function gt(a, b) {
        return a > b;
    });

    /**
     * Returns `true` if the first argument is greater than or equal to the second;
     * `false` otherwise.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig Ord a => a -> a -> Boolean
     * @param {Number} a
     * @param {Number} b
     * @return {Boolean}
     * @see R.lte
     * @example
     *
     *      R.gte(2, 1); //=> true
     *      R.gte(2, 2); //=> true
     *      R.gte(2, 3); //=> false
     *      R.gte('a', 'z'); //=> false
     *      R.gte('z', 'a'); //=> true
     */
    var gte = _curry2(function gte(a, b) {
        return a >= b;
    });

    /**
     * Returns whether or not an object has an own property with
     * the specified name
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig s -> {s: x} -> Boolean
     * @param {String} prop The name of the property to check for.
     * @param {Object} obj The object to query.
     * @return {Boolean} Whether the property exists.
     * @example
     *
     *      var hasName = R.has('name');
     *      hasName({name: 'alice'});   //=> true
     *      hasName({name: 'bob'});     //=> true
     *      hasName({});                //=> false
     *
     *      var point = {x: 0, y: 0};
     *      var pointHas = R.has(R.__, point);
     *      pointHas('x');  //=> true
     *      pointHas('y');  //=> true
     *      pointHas('z');  //=> false
     */
    var has = _curry2(_has);

    /**
     * Returns whether or not an object or its prototype chain has
     * a property with the specified name
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig s -> {s: x} -> Boolean
     * @param {String} prop The name of the property to check for.
     * @param {Object} obj The object to query.
     * @return {Boolean} Whether the property exists.
     * @example
     *
     *      function Rectangle(width, height) {
     *        this.width = width;
     *        this.height = height;
     *      }
     *      Rectangle.prototype.area = function() {
     *        return this.width * this.height;
     *      };
     *
     *      var square = new Rectangle(2, 2);
     *      R.hasIn('width', square);  //=> true
     *      R.hasIn('area', square);  //=> true
     */
    var hasIn = _curry2(function hasIn(prop, obj) {
        return prop in obj;
    });

    /**
     * Returns true if its arguments are identical, false otherwise. Values are
     * identical if they reference the same memory. `NaN` is identical to `NaN`;
     * `0` and `-0` are not identical.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig a -> a -> Boolean
     * @param {*} a
     * @param {*} b
     * @return {Boolean}
     * @example
     *
     *      var o = {};
     *      R.identical(o, o); //=> true
     *      R.identical(1, 1); //=> true
     *      R.identical(1, '1'); //=> false
     *      R.identical([], []); //=> false
     *      R.identical(0, -0); //=> false
     *      R.identical(NaN, NaN); //=> true
     */
    // SameValue algorithm
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Step 6.a: NaN == NaN
    var identical = _curry2(function identical(a, b) {
        // SameValue algorithm
        if (a === b) {
            // Steps 1-5, 7-10
            // Steps 6.b-6.e: +0 != -0
            return a !== 0 || 1 / a === 1 / b;
        } else {
            // Step 6.a: NaN == NaN
            return a !== a && b !== b;
        }
    });

    /**
     * A function that does nothing but return the parameter supplied to it. Good as a default
     * or placeholder function.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig a -> a
     * @param {*} x The value to return.
     * @return {*} The input value, `x`.
     * @example
     *
     *      R.identity(1); //=> 1
     *
     *      var obj = {};
     *      R.identity(obj) === obj; //=> true
     */
    var identity = _curry1(_identity);

    /**
     * Creates a function that will process either the `onTrue` or the `onFalse` function depending
     * upon the result of the `condition` predicate.
     *
     * @func
     * @memberOf R
     * @category Logic
     * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
     * @param {Function} condition A predicate function
     * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
     * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
     * @return {Function} A new unary function that will process either the `onTrue` or the `onFalse`
     *                    function depending upon the result of the `condition` predicate.
     * @example
     *
     *      // Flatten all arrays in the list but leave other values alone.
     *      var flattenArrays = R.map(R.ifElse(Array.isArray, R.flatten, R.identity));
     *
     *      flattenArrays([[0], [[10], [8]], 1234, {}]); //=> [[0], [10, 8], 1234, {}]
     *      flattenArrays([[[10], 123], [8, [10]], "hello"]); //=> [[10, 123], [8, 10], "hello"]
     */
    var ifElse = _curry3(function ifElse(condition, onTrue, onFalse) {
        return curryN(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
            return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
        });
    });

    /**
     * Increments its argument.
     *
     * @func
     * @memberOf R
     * @category Math
     * @sig Number -> Number
     * @param {Number} n
     * @return {Number}
     * @see R.dec
     * @example
     *
     *      R.inc(42); //=> 43
     */
    var inc = add(1);

    /**
     * Inserts the supplied element into the list, at index `index`.  _Note
     * that this is not destructive_: it returns a copy of the list with the changes.
     * <small>No lists have been harmed in the application of this function.</small>
     *
     * @func
     * @memberOf R
     * @category List
     * @sig Number -> a -> [a] -> [a]
     * @param {Number} index The position to insert the element
     * @param {*} elt The element to insert into the Array
     * @param {Array} list The list to insert into
     * @return {Array} A new Array with `elt` inserted at `index`.
     * @example
     *
     *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
     */
    var insert = _curry3(function insert(idx, elt, list) {
        idx = idx < list.length && idx >= 0 ? idx : list.length;
        var result = _slice(list);
        result.splice(idx, 0, elt);
        return result;
    });

    /**
     * Inserts the sub-list into the list, at index `index`.  _Note  that this
     * is not destructive_: it returns a copy of the list with the changes.
     * <small>No lists have been harmed in the application of this function.</small>
     *
     * @func
     * @memberOf R
     * @category List
     * @sig Number -> [a] -> [a] -> [a]
     * @param {Number} index The position to insert the sub-list
     * @param {Array} elts The sub-list to insert into the Array
     * @param {Array} list The list to insert the sub-list into
     * @return {Array} A new Array with `elts` inserted starting at `index`.
     * @example
     *
     *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
     */
    var insertAll = _curry3(function insertAll(idx, elts, list) {
        idx = idx < list.length && idx >= 0 ? idx : list.length;
        return _concat(_concat(_slice(list, 0, idx), elts), _slice(list, idx));
    });

    /**
     * See if an object (`val`) is an instance of the supplied constructor.
     * This function will check up the inheritance chain, if any.
     *
     * @func
     * @memberOf R
     * @category Type
     * @sig (* -> {*}) -> a -> Boolean
     * @param {Object} ctor A constructor
     * @param {*} val The value to test
     * @return {Boolean}
     * @example
     *
     *      R.is(Object, {}); //=> true
     *      R.is(Number, 1); //=> true
     *      R.is(Object, 1); //=> false
     *      R.is(String, 's'); //=> true
     *      R.is(String, new String('')); //=> true
     *      R.is(Object, new String('')); //=> true
     *      R.is(Object, 's'); //=> false
     *      R.is(Number, {}); //=> false
     */
    var is = _curry2(function is(Ctor, val) {
        return val != null && val.constructor === Ctor || val instanceof Ctor;
    });

    /**
     * Tests whether or not an object is similar to an array.
     *
     * @func
     * @memberOf R
     * @category Type
     * @category List
     * @sig * -> Boolean
     * @param {*} x The object to test.
     * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
     * @example
     *
     *      R.isArrayLike([]); //=> true
     *      R.isArrayLike(true); //=> false
     *      R.isArrayLike({}); //=> false
     *      R.isArrayLike({length: 10}); //=> false
     *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
     */
    var isArrayLike = _curry1(function isArrayLike(x) {
        if (_isArray(x)) {
            return true;
        }
        if (!x) {
            return false;
        }
        if (typeof x !== 'object') {
            return false;
        }
        if (x instanceof String) {
            return false;
        }
        if (x.nodeType === 1) {
            return !!x.length;
        }
        if (x.length === 0) {
            return true;
        }
        if (x.length > 0) {
            return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
        }
        return false;
    });

    /**
     * Reports whether the list has zero elements.
     *
     * @func
     * @memberOf R
     * @category Logic
     * @sig [a] -> Boolean
     * @param {Array} list
     * @return {Boolean}
     * @example
     *
     *      R.isEmpty([1, 2, 3]);   //=> false
     *      R.isEmpty([]);          //=> true
     *      R.isEmpty('');          //=> true
     *      R.isEmpty(null);        //=> false
     *      R.isEmpty(R.keys({}));  //=> true
     *      R.isEmpty({});          //=> false ({} does not have a length property)
     *      R.isEmpty({length: 0}); //=> true
     */
    var isEmpty = _curry1(function isEmpty(list) {
        return Object(list).length === 0;
    });

    /**
     * Checks if the input value is `null` or `undefined`.
     *
     * @func
     * @memberOf R
     * @category Type
     * @sig * -> Boolean
     * @param {*} x The value to test.
     * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
     * @example
     *
     *      R.isNil(null); //=> true
     *      R.isNil(undefined); //=> true
     *      R.isNil(0); //=> false
     *      R.isNil([]); //=> false
     */
    var isNil = _curry1(function isNil(x) {
        return x == null;
    });

    /**
     * Returns a list containing the names of all the enumerable own
     * properties of the supplied object.
     * Note that the order of the output array is not guaranteed to be
     * consistent across different JS platforms.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig {k: v} -> [k]
     * @param {Object} obj The object to extract properties from
     * @return {Array} An array of the object's own properties.
     * @example
     *
     *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
     */
    // cover IE < 9 keys issues
    var keys = function () {
        // cover IE < 9 keys issues
        var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
        var nonEnumerableProps = [
            'constructor',
            'valueOf',
            'isPrototypeOf',
            'toString',
            'propertyIsEnumerable',
            'hasOwnProperty',
            'toLocaleString'
        ];
        var contains = function contains(list, item) {
            var idx = 0;
            while (idx < list.length) {
                if (list[idx] === item) {
                    return true;
                }
                idx += 1;
            }
            return false;
        };
        return typeof Object.keys === 'function' ? _curry1(function keys(obj) {
            return Object(obj) !== obj ? [] : Object.keys(obj);
        }) : _curry1(function keys(obj) {
            if (Object(obj) !== obj) {
                return [];
            }
            var prop, ks = [], nIdx;
            for (prop in obj) {
                if (_has(prop, obj)) {
                    ks[ks.length] = prop;
                }
            }
            if (hasEnumBug) {
                nIdx = nonEnumerableProps.length - 1;
                while (nIdx >= 0) {
                    prop = nonEnumerableProps[nIdx];
                    if (_has(prop, obj) && !contains(ks, prop)) {
                        ks[ks.length] = prop;
                    }
                    nIdx -= 1;
                }
            }
            return ks;
        });
    }();

    /**
     * Returns a list containing the names of all the
     * properties of the supplied object, including prototype properties.
     * Note that the order of the output array is not guaranteed to be
     * consistent across different JS platforms.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig {k: v} -> [k]
     * @param {Object} obj The object to extract properties from
     * @return {Array} An array of the object's own and prototype properties.
     * @example
     *
     *      var F = function() { this.x = 'X'; };
     *      F.prototype.y = 'Y';
     *      var f = new F();
     *      R.keysIn(f); //=> ['x', 'y']
     */
    var keysIn = _curry1(function keysIn(obj) {
        var prop, ks = [];
        for (prop in obj) {
            ks[ks.length] = prop;
        }
        return ks;
    });

    /**
     * Returns the number of elements in the array by returning `list.length`.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig [a] -> Number
     * @param {Array} list The array to inspect.
     * @return {Number} The length of the array.
     * @example
     *
     *      R.length([]); //=> 0
     *      R.length([1, 2, 3]); //=> 3
     */
    var length = _curry1(function length(list) {
        return list != null && is(Number, list.length) ? list.length : NaN;
    });

    /**
     * Returns `true` if the first argument is less than the second;
     * `false` otherwise.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig Ord a => a -> a -> Boolean
     * @param {*} a
     * @param {*} b
     * @return {Boolean}
     * @see R.gt
     * @example
     *
     *      R.lt(2, 1); //=> false
     *      R.lt(2, 2); //=> false
     *      R.lt(2, 3); //=> true
     *      R.lt('a', 'z'); //=> true
     *      R.lt('z', 'a'); //=> false
     */
    var lt = _curry2(function lt(a, b) {
        return a < b;
    });

    /**
     * Returns `true` if the first argument is less than or equal to the second;
     * `false` otherwise.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig Ord a => a -> a -> Boolean
     * @param {Number} a
     * @param {Number} b
     * @return {Boolean}
     * @see R.gte
     * @example
     *
     *      R.lte(2, 1); //=> false
     *      R.lte(2, 2); //=> true
     *      R.lte(2, 3); //=> true
     *      R.lte('a', 'z'); //=> true
     *      R.lte('z', 'a'); //=> false
     */
    var lte = _curry2(function lte(a, b) {
        return a <= b;
    });

    /**
     * The mapAccum function behaves like a combination of map and reduce; it applies a
     * function to each element of a list, passing an accumulating parameter from left to
     * right, and returning a final value of this accumulator together with the new list.
     *
     * The iterator function receives two arguments, *acc* and *value*, and should return
     * a tuple *[acc, value]*.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (acc -> x -> (acc, y)) -> acc -> [x] -> (acc, [y])
     * @param {Function} fn The function to be called on every element of the input `list`.
     * @param {*} acc The accumulator value.
     * @param {Array} list The list to iterate over.
     * @return {*} The final, accumulated value.
     * @example
     *
     *      var digits = ['1', '2', '3', '4'];
     *      var append = function(a, b) {
     *        return [a + b, a + b];
     *      }
     *
     *      R.mapAccum(append, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
     */
    var mapAccum = _curry3(function mapAccum(fn, acc, list) {
        var idx = 0, len = list.length, result = [], tuple = [acc];
        while (idx < len) {
            tuple = fn(tuple[0], list[idx]);
            result[idx] = tuple[1];
            idx += 1;
        }
        return [
            tuple[0],
            result
        ];
    });

    /**
     * The mapAccumRight function behaves like a combination of map and reduce; it applies a
     * function to each element of a list, passing an accumulating parameter from right
     * to left, and returning a final value of this accumulator together with the new list.
     *
     * Similar to `mapAccum`, except moves through the input list from the right to the
     * left.
     *
     * The iterator function receives two arguments, *acc* and *value*, and should return
     * a tuple *[acc, value]*.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (acc -> x -> (acc, y)) -> acc -> [x] -> (acc, [y])
     * @param {Function} fn The function to be called on every element of the input `list`.
     * @param {*} acc The accumulator value.
     * @param {Array} list The list to iterate over.
     * @return {*} The final, accumulated value.
     * @example
     *
     *      var digits = ['1', '2', '3', '4'];
     *      var append = function(a, b) {
     *        return [a + b, a + b];
     *      }
     *
     *      R.mapAccumRight(append, 0, digits); //=> ['04321', ['04321', '0432', '043', '04']]
     */
    var mapAccumRight = _curry3(function mapAccumRight(fn, acc, list) {
        var idx = list.length - 1, result = [], tuple = [acc];
        while (idx >= 0) {
            tuple = fn(tuple[0], list[idx]);
            result[idx] = tuple[1];
            idx -= 1;
        }
        return [
            tuple[0],
            result
        ];
    });

    /**
     * Tests a regular expression against a String. Note that this function
     * will return an empty array when there are no matches. This differs
     * from [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
     * which returns `null` when there are no matches.
     *
     * @func
     * @memberOf R
     * @see R.test
     * @category String
     * @sig RegExp -> String -> [String | Undefined]
     * @param {RegExp} rx A regular expression.
     * @param {String} str The string to match against
     * @return {Array} The list of matches or empty array.
     * @example
     *
     *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
     *      R.match(/a/, 'b'); //=> []
     *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
     */
    var match = _curry2(function match(rx, str) {
        return str.match(rx) || [];
    });

    /**
     * mathMod behaves like the modulo operator should mathematically, unlike the `%`
     * operator (and by extension, R.modulo). So while "-17 % 5" is -2,
     * mathMod(-17, 5) is 3. mathMod requires Integer arguments, and returns NaN
     * when the modulus is zero or negative.
     *
     * @func
     * @memberOf R
     * @category Math
     * @sig Number -> Number -> Number
     * @param {Number} m The dividend.
     * @param {Number} p the modulus.
     * @return {Number} The result of `b mod a`.
     * @example
     *
     *      R.mathMod(-17, 5);  //=> 3
     *      R.mathMod(17, 5);   //=> 2
     *      R.mathMod(17, -5);  //=> NaN
     *      R.mathMod(17, 0);   //=> NaN
     *      R.mathMod(17.2, 5); //=> NaN
     *      R.mathMod(17, 5.3); //=> NaN
     *
     *      var clock = R.mathMod(R.__, 12);
     *      clock(15); //=> 3
     *      clock(24); //=> 0
     *
     *      var seventeenMod = R.mathMod(17);
     *      seventeenMod(3);  //=> 2
     *      seventeenMod(4);  //=> 1
     *      seventeenMod(10); //=> 7
     */
    var mathMod = _curry2(function mathMod(m, p) {
        if (!_isInteger(m)) {
            return NaN;
        }
        if (!_isInteger(p) || p < 1) {
            return NaN;
        }
        return (m % p + p) % p;
    });

    /**
     * Returns the larger of its two arguments.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig Ord a => a -> a -> a
     * @param {*} a
     * @param {*} b
     * @return {*}
     * @see R.maxBy, R.min
     * @example
     *
     *      R.max(789, 123); //=> 789
     *      R.max('a', 'b'); //=> 'b'
     */
    var max = _curry2(function max(a, b) {
        return b > a ? b : a;
    });

    /**
     * Takes a function and two values, and returns whichever value produces
     * the larger result when passed to the provided function.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig Ord b => (a -> b) -> a -> a -> a
     * @param {Function} f
     * @param {*} a
     * @param {*} b
     * @return {*}
     * @see R.max, R.minBy
     * @example
     *
     *      R.maxBy(function(n) { return n * n; }, -3, 2); //=> -3
     */
    var maxBy = _curry3(function maxBy(f, a, b) {
        return f(b) > f(a) ? b : a;
    });

    /**
     * Create a new object with the own properties of `a`
     * merged with the own properties of object `b`.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig {k: v} -> {k: v} -> {k: v}
     * @param {Object} a
     * @param {Object} b
     * @return {Object}
     * @example
     *
     *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
     *      //=> { 'name': 'fred', 'age': 40 }
     *
     *      var resetToDefault = R.merge(R.__, {x: 0});
     *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
     */
    var merge = _curry2(function merge(a, b) {
        var result = {};
        var ks = keys(a);
        var idx = 0;
        while (idx < ks.length) {
            result[ks[idx]] = a[ks[idx]];
            idx += 1;
        }
        ks = keys(b);
        idx = 0;
        while (idx < ks.length) {
            result[ks[idx]] = b[ks[idx]];
            idx += 1;
        }
        return result;
    });

    /**
     * Returns the smaller of its two arguments.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig Ord a => a -> a -> a
     * @param {*} a
     * @param {*} b
     * @return {*}
     * @see R.minBy, R.max
     * @example
     *
     *      R.min(789, 123); //=> 123
     *      R.min('a', 'b'); //=> 'a'
     */
    var min = _curry2(function min(a, b) {
        return b < a ? b : a;
    });

    /**
     * Takes a function and two values, and returns whichever value produces
     * the smaller result when passed to the provided function.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig Ord b => (a -> b) -> a -> a -> a
     * @param {Function} f
     * @param {*} a
     * @param {*} b
     * @return {*}
     * @see R.min, R.maxBy
     * @example
     *
     *      R.minBy(function(n) { return n * n; }, -3, 2); //=> 2
     */
    var minBy = _curry3(function minBy(f, a, b) {
        return f(b) < f(a) ? b : a;
    });

    /**
     * Divides the second parameter by the first and returns the remainder.
     * Note that this functions preserves the JavaScript-style behavior for
     * modulo. For mathematical modulo see `mathMod`
     *
     * @func
     * @memberOf R
     * @category Math
     * @sig Number -> Number -> Number
     * @param {Number} a The value to the divide.
     * @param {Number} b The pseudo-modulus
     * @return {Number} The result of `b % a`.
     * @see R.mathMod
     * @example
     *
     *      R.modulo(17, 3); //=> 2
     *      // JS behavior:
     *      R.modulo(-17, 3); //=> -2
     *      R.modulo(17, -3); //=> 2
     *
     *      var isOdd = R.modulo(R.__, 2);
     *      isOdd(42); //=> 0
     *      isOdd(21); //=> 1
     */
    var modulo = _curry2(function modulo(a, b) {
        return a % b;
    });

    /**
     * Multiplies two numbers. Equivalent to `a * b` but curried.
     *
     * @func
     * @memberOf R
     * @category Math
     * @sig Number -> Number -> Number
     * @param {Number} a The first value.
     * @param {Number} b The second value.
     * @return {Number} The result of `a * b`.
     * @see R.divide
     * @example
     *
     *      var double = R.multiply(2);
     *      var triple = R.multiply(3);
     *      double(3);       //=>  6
     *      triple(4);       //=> 12
     *      R.multiply(2, 5);  //=> 10
     */
    var multiply = _curry2(function multiply(a, b) {
        return a * b;
    });

    /**
     * Wraps a function of any arity (including nullary) in a function that accepts exactly `n`
     * parameters. Any extraneous parameters will not be passed to the supplied function.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig Number -> (* -> a) -> (* -> a)
     * @param {Number} n The desired arity of the new function.
     * @param {Function} fn The function to wrap.
     * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
     *         arity `n`.
     * @example
     *
     *      var takesTwoArgs = function(a, b) {
     *        return [a, b];
     *      };
     *      takesTwoArgs.length; //=> 2
     *      takesTwoArgs(1, 2); //=> [1, 2]
     *
     *      var takesOneArg = R.nAry(1, takesTwoArgs);
     *      takesOneArg.length; //=> 1
     *      // Only `n` arguments are passed to the wrapped function
     *      takesOneArg(1, 2); //=> [1, undefined]
     */
    var nAry = _curry2(function nAry(n, fn) {
        switch (n) {
        case 0:
            return function () {
                return fn.call(this);
            };
        case 1:
            return function (a0) {
                return fn.call(this, a0);
            };
        case 2:
            return function (a0, a1) {
                return fn.call(this, a0, a1);
            };
        case 3:
            return function (a0, a1, a2) {
                return fn.call(this, a0, a1, a2);
            };
        case 4:
            return function (a0, a1, a2, a3) {
                return fn.call(this, a0, a1, a2, a3);
            };
        case 5:
            return function (a0, a1, a2, a3, a4) {
                return fn.call(this, a0, a1, a2, a3, a4);
            };
        case 6:
            return function (a0, a1, a2, a3, a4, a5) {
                return fn.call(this, a0, a1, a2, a3, a4, a5);
            };
        case 7:
            return function (a0, a1, a2, a3, a4, a5, a6) {
                return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
            };
        case 8:
            return function (a0, a1, a2, a3, a4, a5, a6, a7) {
                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
            };
        case 9:
            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
            };
        case 10:
            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
            };
        default:
            throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
        }
    });

    /**
     * Negates its argument.
     *
     * @func
     * @memberOf R
     * @category Math
     * @sig Number -> Number
     * @param {Number} n
     * @return {Number}
     * @example
     *
     *      R.negate(42); //=> -42
     */
    var negate = _curry1(function negate(n) {
        return -n;
    });

    /**
     * A function that returns the `!` of its argument. It will return `true` when
     * passed false-y value, and `false` when passed a truth-y one.
     *
     * @func
     * @memberOf R
     * @category Logic
     * @sig * -> Boolean
     * @param {*} a any value
     * @return {Boolean} the logical inverse of passed argument.
     * @see R.complement
     * @example
     *
     *      R.not(true); //=> false
     *      R.not(false); //=> true
     *      R.not(0); => true
     *      R.not(1); => false
     */
    var not = _curry1(function not(a) {
        return !a;
    });

    /**
     * Returns the nth element of the given list or string.
     * If n is negative the element at index length + n is returned.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig Number -> [a] -> a | Undefined
     * @sig Number -> String -> String
     * @param {Number} offset
     * @param {*} list
     * @return {*}
     * @example
     *
     *      var list = ['foo', 'bar', 'baz', 'quux'];
     *      R.nth(1, list); //=> 'bar'
     *      R.nth(-1, list); //=> 'quux'
     *      R.nth(-99, list); //=> undefined
     *
     *      R.nth('abc', 2); //=> 'c'
     *      R.nth('abc', 3); //=> ''
     */
    var nth = _curry2(function nth(offset, list) {
        var idx = offset < 0 ? list.length + offset : offset;
        return _isString(list) ? list.charAt(idx) : list[idx];
    });

    /**
     * Returns a function which returns its nth argument.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig Number -> *... -> *
     * @param {Number} n
     * @return {Function}
     * @example
     *
     *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
     *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
     */
    var nthArg = _curry1(function nthArg(n) {
        return function () {
            return nth(n, arguments);
        };
    });

    /**
     * Returns the nth character of the given string.
     *
     * @func
     * @memberOf R
     * @category String
     * @sig Number -> String -> String
     * @param {Number} n
     * @param {String} str
     * @return {String}
     * @deprecated since v0.16.0
     * @example
     *
     *      R.nthChar(2, 'Ramda'); //=> 'm'
     *      R.nthChar(-2, 'Ramda'); //=> 'd'
     */
    var nthChar = _curry2(function nthChar(n, str) {
        return str.charAt(n < 0 ? str.length + n : n);
    });

    /**
     * Returns the character code of the nth character of the given string.
     *
     * @func
     * @memberOf R
     * @category String
     * @sig Number -> String -> Number
     * @param {Number} n
     * @param {String} str
     * @return {Number}
     * @deprecated since v0.16.0
     * @example
     *
     *      R.nthCharCode(2, 'Ramda'); //=> 'm'.charCodeAt(0)
     *      R.nthCharCode(-2, 'Ramda'); //=> 'd'.charCodeAt(0)
     */
    var nthCharCode = _curry2(function nthCharCode(n, str) {
        return str.charCodeAt(n < 0 ? str.length + n : n);
    });

    /**
     * Returns a singleton array containing the value provided.
     *
     * Note this `of` is different from the ES6 `of`; See
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig a -> [a]
     * @param {*} x any value
     * @return {Array} An array wrapping `x`.
     * @example
     *
     *      R.of(null); //=> [null]
     *      R.of([42]); //=> [[42]]
     */
    var of = _curry1(function of(x) {
        return [x];
    });

    /**
     * Accepts a function `fn` and returns a function that guards invocation of `fn` such that
     * `fn` can only ever be called once, no matter how many times the returned function is
     * invoked.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig (a... -> b) -> (a... -> b)
     * @param {Function} fn The function to wrap in a call-only-once wrapper.
     * @return {Function} The wrapped function.
     * @example
     *
     *      var addOneOnce = R.once(function(x){ return x + 1; });
     *      addOneOnce(10); //=> 11
     *      addOneOnce(addOneOnce(50)); //=> 11
     */
    var once = _curry1(function once(fn) {
        var called = false, result;
        return function () {
            if (called) {
                return result;
            }
            called = true;
            result = fn.apply(this, arguments);
            return result;
        };
    });

    /**
     * Returns the result of "setting" the portion of the given data structure
     * focused by the given lens to the given value.
     *
     * @func
     * @memberOf R
     * @category Object
     * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
     * @sig Lens s a -> (a -> a) -> s -> s
     * @param {Lens} lens
     * @param {*} v
     * @param {*} x
     * @return {*}
     * @see R.prop, R.lensIndex, R.lensProp
     * @example
     *
     *      var headLens = R.lensIndex(0);
     *
     *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
     */
    var over = function () {
        var Identity = function (x) {
            return {
                value: x,
                map: function (f) {
                    return Identity(f(x));
                }
            };
        };
        return _curry3(function over(lens, f, x) {
            return lens(function (y) {
                return Identity(f(y));
            })(x).value;
        });
    }();

    /**
     * Retrieve the value at a given path.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig [String] -> {k: v} -> v | Undefined
     * @param {Array} path The path to use.
     * @return {*} The data at `path`.
     * @example
     *
     *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
     *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
     */
    var path = _curry2(function path(paths, obj) {
        if (obj == null) {
            return;
        } else {
            var val = obj;
            for (var idx = 0, len = paths.length; idx < len && val != null; idx += 1) {
                val = val[paths[idx]];
            }
            return val;
        }
    });

    /**
     * Returns a partial copy of an object containing only the keys specified.  If the key does not exist, the
     * property is ignored.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig [k] -> {k: v} -> {k: v}
     * @param {Array} names an array of String property names to copy onto a new object
     * @param {Object} obj The object to copy from
     * @return {Object} A new object with only properties from `names` on it.
     * @see R.omit
     * @example
     *
     *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
     *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
     */
    var pick = _curry2(function pick(names, obj) {
        var result = {};
        var idx = 0;
        while (idx < names.length) {
            if (names[idx] in obj) {
                result[names[idx]] = obj[names[idx]];
            }
            idx += 1;
        }
        return result;
    });

    /**
     * Similar to `pick` except that this one includes a `key: undefined` pair for properties that don't exist.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig [k] -> {k: v} -> {k: v}
     * @param {Array} names an array of String property names to copy onto a new object
     * @param {Object} obj The object to copy from
     * @return {Object} A new object with only properties from `names` on it.
     * @see R.pick
     * @example
     *
     *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
     *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
     */
    var pickAll = _curry2(function pickAll(names, obj) {
        var result = {};
        var idx = 0;
        var len = names.length;
        while (idx < len) {
            var name = names[idx];
            result[name] = obj[name];
            idx += 1;
        }
        return result;
    });

    /**
     * Returns a partial copy of an object containing only the keys that
     * satisfy the supplied predicate.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig (v, k -> Boolean) -> {k: v} -> {k: v}
     * @param {Function} pred A predicate to determine whether or not a key
     *        should be included on the output object.
     * @param {Object} obj The object to copy from
     * @return {Object} A new object with only properties that satisfy `pred`
     *         on it.
     * @see R.pick
     * @example
     *
     *      var isUpperCase = function(val, key) { return key.toUpperCase() === key; }
     *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
     */
    var pickBy = _curry2(function pickBy(test, obj) {
        var result = {};
        for (var prop in obj) {
            if (test(obj[prop], prop, obj)) {
                result[prop] = obj[prop];
            }
        }
        return result;
    });

    /**
     * Returns a new list with the given element at the front, followed by the contents of the
     * list.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig a -> [a] -> [a]
     * @param {*} el The item to add to the head of the output list.
     * @param {Array} list The array to add to the tail of the output list.
     * @return {Array} A new array.
     * @see R.append
     * @example
     *
     *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
     */
    var prepend = _curry2(function prepend(el, list) {
        return _concat([el], list);
    });

    /**
     * Returns a function that when supplied an object returns the indicated property of that object, if it exists.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig s -> {s: a} -> a | Undefined
     * @param {String} p The property name
     * @param {Object} obj The object to query
     * @return {*} The value at `obj.p`.
     * @example
     *
     *      R.prop('x', {x: 100}); //=> 100
     *      R.prop('x', {}); //=> undefined
     */
    var prop = _curry2(function prop(p, obj) {
        return obj[p];
    });

    /**
     * If the given, non-null object has an own property with the specified name,
     * returns the value of that property.
     * Otherwise returns the provided default value.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig a -> String -> Object -> a
     * @param {*} val The default value.
     * @param {String} p The name of the property to return.
     * @param {Object} obj The object to query.
     * @return {*} The value of given property of the supplied object or the default value.
     * @example
     *
     *      var alice = {
     *        name: 'ALICE',
     *        age: 101
     *      };
     *      var favorite = R.prop('favoriteLibrary');
     *      var favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
     *
     *      favorite(alice);  //=> undefined
     *      favoriteWithDefault(alice);  //=> 'Ramda'
     */
    var propOr = _curry3(function propOr(val, p, obj) {
        return obj != null && _has(p, obj) ? obj[p] : val;
    });

    /**
     * Returns `true` if the specified object property satisfies the given
     * predicate; `false` otherwise.
     *
     * @func
     * @memberOf R
     * @category Logic
     * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
     * @param {Function} pred
     * @param {String} name
     * @param {*} obj
     * @return {Boolean}
     * @see R.propEq
     * @see R.propIs
     * @example
     *
     *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
     */
    var propSatisfies = _curry3(function propSatisfies(pred, name, obj) {
        return pred(obj[name]);
    });

    /**
     * Acts as multiple `prop`: array of keys in, array of values out. Preserves order.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig [k] -> {k: v} -> [v]
     * @param {Array} ps The property names to fetch
     * @param {Object} obj The object to query
     * @return {Array} The corresponding values or partially applied function.
     * @example
     *
     *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
     *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
     *
     *      var fullName = R.compose(R.join(' '), R.props(['first', 'last']));
     *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
     */
    var props = _curry2(function props(ps, obj) {
        var len = ps.length;
        var out = [];
        var idx = 0;
        while (idx < len) {
            out[idx] = obj[ps[idx]];
            idx += 1;
        }
        return out;
    });

    /**
     * Returns a list of numbers from `from` (inclusive) to `to`
     * (exclusive).
     *
     * @func
     * @memberOf R
     * @category List
     * @sig Number -> Number -> [Number]
     * @param {Number} from The first number in the list.
     * @param {Number} to One more than the last number in the list.
     * @return {Array} The list of numbers in tthe set `[a, b)`.
     * @example
     *
     *      R.range(1, 5);    //=> [1, 2, 3, 4]
     *      R.range(50, 53);  //=> [50, 51, 52]
     */
    var range = _curry2(function range(from, to) {
        if (!(_isNumber(from) && _isNumber(to))) {
            throw new TypeError('Both arguments to range must be numbers');
        }
        var result = [];
        var n = from;
        while (n < to) {
            result.push(n);
            n += 1;
        }
        return result;
    });

    /**
     * Returns a single item by iterating through the list, successively calling the iterator
     * function and passing it an accumulator value and the current value from the array, and
     * then passing the result to the next call.
     *
     * Similar to `reduce`, except moves through the input list from the right to the left.
     *
     * The iterator function receives two values: *(acc, value)*
     *
     * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse arrays), unlike
     * the native `Array.prototype.reduce` method. For more details on this behavior, see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a,b -> a) -> a -> [b] -> a
     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
     *        current element from the array.
     * @param {*} acc The accumulator value.
     * @param {Array} list The list to iterate over.
     * @return {*} The final, accumulated value.
     * @example
     *
     *      var pairs = [ ['a', 1], ['b', 2], ['c', 3] ];
     *      var flattenPairs = function(acc, pair) {
     *        return acc.concat(pair);
     *      };
     *
     *      R.reduceRight(flattenPairs, [], pairs); //=> [ 'c', 3, 'b', 2, 'a', 1 ]
     */
    var reduceRight = _curry3(function reduceRight(fn, acc, list) {
        var idx = list.length - 1;
        while (idx >= 0) {
            acc = fn(acc, list[idx]);
            idx -= 1;
        }
        return acc;
    });

    /**
     * Returns a value wrapped to indicate that it is the final value of the
     * reduce and transduce functions.  The returned value
     * should be considered a black box: the internal structure is not
     * guaranteed to be stable.
     *
     * Note: this optimization is unavailable to functions not explicitly listed
     * above.  For instance, it is not currently supported by reduceIndexed,
     * reduceRight, or reduceRightIndexed.
     *
     * @func
     * @memberOf R
     * @category List
     * @see R.reduce, R.transduce
     * @sig a -> *
     * @param {*} x The final value of the reduce.
     * @return {*} The wrapped value.
     * @example
     *
     *      R.reduce(
     *        R.pipe(R.add, R.ifElse(R.lte(10), R.reduced, R.identity)),
     *        0,
     *        [1, 2, 3, 4, 5]) // 10
     */
    var reduced = _curry1(_reduced);

    /**
     * Removes the sub-list of `list` starting at index `start` and containing
     * `count` elements.  _Note that this is not destructive_: it returns a
     * copy of the list with the changes.
     * <small>No lists have been harmed in the application of this function.</small>
     *
     * @func
     * @memberOf R
     * @category List
     * @sig Number -> Number -> [a] -> [a]
     * @param {Number} start The position to start removing elements
     * @param {Number} count The number of elements to remove
     * @param {Array} list The list to remove from
     * @return {Array} A new Array with `count` elements from `start` removed.
     * @example
     *
     *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
     */
    var remove = _curry3(function remove(start, count, list) {
        return _concat(_slice(list, 0, Math.min(start, list.length)), _slice(list, Math.min(list.length, start + count)));
    });

    /**
     * Replace a substring or regex match in a string with a replacement.
     *
     * @func
     * @memberOf R
     * @category String
     * @sig RegExp|String -> String -> String -> String
     * @param {RegExp|String} pattern A regular expression or a substring to match.
     * @param {String} replacement The string to replace the matches with.
     * @param {String} str The String to do the search and replacement in.
     * @return {String} The result.
     * @example
     *
     *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
     *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
     *
     *      // Use the "g" (global) flag to replace all occurrences:
     *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
     */
    var replace = _curry3(function replace(regex, replacement, str) {
        return str.replace(regex, replacement);
    });

    /**
     * Returns a new list with the same elements as the original list, just
     * in the reverse order.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig [a] -> [a]
     * @param {Array} list The list to reverse.
     * @return {Array} A copy of the list in reverse order.
     * @example
     *
     *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
     *      R.reverse([1, 2]);     //=> [2, 1]
     *      R.reverse([1]);        //=> [1]
     *      R.reverse([]);         //=> []
     */
    var reverse = _curry1(function reverse(list) {
        return _slice(list).reverse();
    });

    /**
     * Scan is similar to reduce, but returns a list of successively reduced values from the left
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a,b -> a) -> a -> [b] -> [a]
     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
     *        current element from the array
     * @param {*} acc The accumulator value.
     * @param {Array} list The list to iterate over.
     * @return {Array} A list of all intermediately reduced values.
     * @example
     *
     *      var numbers = [1, 2, 3, 4];
     *      var factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
     */
    var scan = _curry3(function scan(fn, acc, list) {
        var idx = 0, len = list.length, result = [acc];
        while (idx < len) {
            acc = fn(acc, list[idx]);
            result[idx + 1] = acc;
            idx += 1;
        }
        return result;
    });

    /**
     * Returns the result of "setting" the portion of the given data structure
     * focused by the given lens to the given value.
     *
     * @func
     * @memberOf R
     * @category Object
     * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
     * @sig Lens s a -> a -> s -> s
     * @param {Lens} lens
     * @param {*} v
     * @param {*} x
     * @return {*}
     * @see R.prop, R.lensIndex, R.lensProp
     * @example
     *
     *      var xLens = R.lensProp('x');
     *
     *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
     *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
     */
    var set = _curry3(function set(lens, v, x) {
        return over(lens, always(v), x);
    });

    /**
     * Returns a copy of the list, sorted according to the comparator function, which should accept two values at a
     * time and return a negative number if the first value is smaller, a positive number if it's larger, and zero
     * if they are equal.  Please note that this is a **copy** of the list.  It does not modify the original.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a,a -> Number) -> [a] -> [a]
     * @param {Function} comparator A sorting function :: a -> b -> Int
     * @param {Array} list The list to sort
     * @return {Array} a new array with its elements sorted by the comparator function.
     * @example
     *
     *      var diff = function(a, b) { return a - b; };
     *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
     */
    var sort = _curry2(function sort(comparator, list) {
        return _slice(list).sort(comparator);
    });

    /**
     * Sorts the list according to the supplied function.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig Ord b => (a -> b) -> [a] -> [a]
     * @param {Function} fn
     * @param {Array} list The list to sort.
     * @return {Array} A new list sorted by the keys generated by `fn`.
     * @example
     *
     *      var sortByFirstItem = R.sortBy(prop(0));
     *      var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
     *      var pairs = [[-1, 1], [-2, 2], [-3, 3]];
     *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
     *      var alice = {
     *        name: 'ALICE',
     *        age: 101
     *      };
     *      var bob = {
     *        name: 'Bob',
     *        age: -10
     *      };
     *      var clara = {
     *        name: 'clara',
     *        age: 314.159
     *      };
     *      var people = [clara, bob, alice];
     *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
     */
    var sortBy = _curry2(function sortBy(fn, list) {
        return _slice(list).sort(function (a, b) {
            var aa = fn(a);
            var bb = fn(b);
            return aa < bb ? -1 : aa > bb ? 1 : 0;
        });
    });

    /**
     * Subtracts two numbers. Equivalent to `a - b` but curried.
     *
     * @func
     * @memberOf R
     * @category Math
     * @sig Number -> Number -> Number
     * @param {Number} a The first value.
     * @param {Number} b The second value.
     * @return {Number} The result of `a - b`.
     * @see R.add
     * @example
     *
     *      R.subtract(10, 8); //=> 2
     *
     *      var minus5 = R.subtract(R.__, 5);
     *      minus5(17); //=> 12
     *
     *      var complementaryAngle = R.subtract(90);
     *      complementaryAngle(30); //=> 60
     *      complementaryAngle(72); //=> 18
     */
    var subtract = _curry2(function subtract(a, b) {
        return a - b;
    });

    /**
     * Returns a new list containing the last `n` elements of a given list, passing each value
     * to the supplied predicate function, and terminating when the predicate function returns
     * `false`. Excludes the element that caused the predicate function to fail. The predicate
     * function is passed one argument: *(value)*.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> Boolean) -> [a] -> [a]
     * @param {Function} fn The function called per iteration.
     * @param {Array} list The collection to iterate over.
     * @return {Array} A new array.
     * @see R.dropLastWhile
     * @example
     *
     *      var isNotOne = function(x) {
     *        return !(x === 1);
     *      };
     *
     *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
     */
    var takeLastWhile = _curry2(function takeLastWhile(fn, list) {
        var idx = list.length - 1;
        while (idx >= 0 && fn(list[idx])) {
            idx -= 1;
        }
        return _slice(list, idx + 1, Infinity);
    });

    /**
     * Runs the given function with the supplied object, then returns the object.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig (a -> *) -> a -> a
     * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
     * @param {*} x
     * @return {*} `x`.
     * @example
     *
     *      var sayX = function(x) { console.log('x is ' + x); };
     *      R.tap(sayX, 100); //=> 100
     *      //-> 'x is 100'
     */
    var tap = _curry2(function tap(fn, x) {
        fn(x);
        return x;
    });

    /**
     * Determines whether a given string matches a given regular expression.
     *
     * @func
     * @memberOf R
     * @see R.match
     * @category String
     * @sig RegExp -> String -> Boolean
     * @param {RegExp} pattern
     * @param {String} str
     * @return {Boolean}
     * @example
     *
     *      R.test(/^x/, 'xyz'); //=> true
     *      R.test(/^y/, 'xyz'); //=> false
     */
    var test = _curry2(function test(pattern, str) {
        return _cloneRegExp(pattern).test(str);
    });

    /**
     * Calls an input function `n` times, returning an array containing the results of those
     * function calls.
     *
     * `fn` is passed one argument: The current value of `n`, which begins at `0` and is
     * gradually incremented to `n - 1`.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (i -> a) -> i -> [a]
     * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
     * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
     * @return {Array} An array containing the return values of all calls to `fn`.
     * @example
     *
     *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
     */
    var times = _curry2(function times(fn, n) {
        var len = Number(n);
        var list = new Array(len);
        var idx = 0;
        while (idx < len) {
            list[idx] = fn(idx);
            idx += 1;
        }
        return list;
    });

    /**
     * Converts an object into an array of key, value arrays.
     * Only the object's own properties are used.
     * Note that the order of the output array is not guaranteed to be
     * consistent across different JS platforms.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig {String: *} -> [[String,*]]
     * @param {Object} obj The object to extract from
     * @return {Array} An array of key, value arrays from the object's own properties.
     * @see R.fromPairs
     * @example
     *
     *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
     */
    var toPairs = _curry1(function toPairs(obj) {
        var pairs = [];
        for (var prop in obj) {
            if (_has(prop, obj)) {
                pairs[pairs.length] = [
                    prop,
                    obj[prop]
                ];
            }
        }
        return pairs;
    });

    /**
     * Converts an object into an array of key, value arrays.
     * The object's own properties and prototype properties are used.
     * Note that the order of the output array is not guaranteed to be
     * consistent across different JS platforms.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig {String: *} -> [[String,*]]
     * @param {Object} obj The object to extract from
     * @return {Array} An array of key, value arrays from the object's own
     *         and prototype properties.
     * @example
     *
     *      var F = function() { this.x = 'X'; };
     *      F.prototype.y = 'Y';
     *      var f = new F();
     *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
     */
    var toPairsIn = _curry1(function toPairsIn(obj) {
        var pairs = [];
        for (var prop in obj) {
            pairs[pairs.length] = [
                prop,
                obj[prop]
            ];
        }
        return pairs;
    });

    /**
     * Removes (strips) whitespace from both ends of the string.
     *
     * @func
     * @memberOf R
     * @category String
     * @sig String -> String
     * @param {String} str The string to trim.
     * @return {String} Trimmed version of `str`.
     * @example
     *
     *      R.trim('   xyz  '); //=> 'xyz'
     *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
     */
    var trim = function () {
        var ws = '\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
        var zeroWidth = '\u200B';
        var hasProtoTrim = typeof String.prototype.trim === 'function';
        if (!hasProtoTrim || (ws.trim() || !zeroWidth.trim())) {
            return _curry1(function trim(str) {
                var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
                var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
                return str.replace(beginRx, '').replace(endRx, '');
            });
        } else {
            return _curry1(function trim(str) {
                return str.trim();
            });
        }
    }();

    /**
     * Gives a single-word string description of the (native) type of a value, returning such
     * answers as 'Object', 'Number', 'Array', or 'Null'.  Does not attempt to distinguish user
     * Object types any further, reporting them all as 'Object'.
     *
     * @func
     * @memberOf R
     * @category Type
     * @sig (* -> {*}) -> String
     * @param {*} val The value to test
     * @return {String}
     * @example
     *
     *      R.type({}); //=> "Object"
     *      R.type(1); //=> "Number"
     *      R.type(false); //=> "Boolean"
     *      R.type('s'); //=> "String"
     *      R.type(null); //=> "Null"
     *      R.type([]); //=> "Array"
     *      R.type(/[A-z]/); //=> "RegExp"
     */
    var type = _curry1(function type(val) {
        return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
    });

    /**
     * Takes a function `fn`, which takes a single array argument, and returns
     * a function which:
     *
     *   - takes any number of positional arguments;
     *   - passes these arguments to `fn` as an array; and
     *   - returns the result.
     *
     * In other words, R.unapply derives a variadic function from a function
     * which takes an array. R.unapply is the inverse of R.apply.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig ([*...] -> a) -> (*... -> a)
     * @param {Function} fn
     * @return {Function}
     * @see R.apply
     * @example
     *
     *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
     */
    var unapply = _curry1(function unapply(fn) {
        return function () {
            return fn(_slice(arguments));
        };
    });

    /**
     * Wraps a function of any arity (including nullary) in a function that accepts exactly 1
     * parameter. Any extraneous parameters will not be passed to the supplied function.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig (* -> b) -> (a -> b)
     * @param {Function} fn The function to wrap.
     * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
     *         arity 1.
     * @example
     *
     *      var takesTwoArgs = function(a, b) {
     *        return [a, b];
     *      };
     *      takesTwoArgs.length; //=> 2
     *      takesTwoArgs(1, 2); //=> [1, 2]
     *
     *      var takesOneArg = R.unary(takesTwoArgs);
     *      takesOneArg.length; //=> 1
     *      // Only 1 argument is passed to the wrapped function
     *      takesOneArg(1, 2); //=> [1, undefined]
     */
    var unary = _curry1(function unary(fn) {
        return nAry(1, fn);
    });

    /**
     * Returns a function of arity `n` from a (manually) curried function.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig Number -> (a -> b) -> (a -> c)
     * @param {Number} length The arity for the returned function.
     * @param {Function} fn The function to uncurry.
     * @return {Function} A new function.
     * @see R.curry
     * @example
     *
     *      var addFour = function(a) {
     *        return function(b) {
     *          return function(c) {
     *            return function(d) {
     *              return a + b + c + d;
     *            };
     *          };
     *        };
     *      };
     *
     *      var uncurriedAddFour = R.uncurryN(4, addFour);
     *      curriedAddFour(1, 2, 3, 4); //=> 10
     */
    var uncurryN = _curry2(function uncurryN(depth, fn) {
        return curryN(depth, function () {
            var currentDepth = 1;
            var value = fn;
            var idx = 0;
            var endIdx;
            while (currentDepth <= depth && typeof value === 'function') {
                endIdx = currentDepth === depth ? arguments.length : idx + value.length;
                value = value.apply(this, _slice(arguments, idx, endIdx));
                currentDepth += 1;
                idx = endIdx;
            }
            return value;
        });
    });

    /**
     * Builds a list from a seed value. Accepts an iterator function, which returns either false
     * to stop iteration or an array of length 2 containing the value to add to the resulting
     * list and the seed to be used in the next call to the iterator function.
     *
     * The iterator function receives one argument: *(seed)*.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> [b]) -> * -> [b]
     * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
     *        either false to quit iteration or an array of length two to proceed. The element
     *        at index 0 of this array will be added to the resulting array, and the element
     *        at index 1 will be passed to the next call to `fn`.
     * @param {*} seed The seed value.
     * @return {Array} The final list.
     * @example
     *
     *      var f = function(n) { return n > 50 ? false : [-n, n + 10] };
     *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
     */
    var unfold = _curry2(function unfold(fn, seed) {
        var pair = fn(seed);
        var result = [];
        while (pair && pair.length) {
            result[result.length] = pair[0];
            pair = fn(pair[1]);
        }
        return result;
    });

    /**
     * Returns a new list containing only one copy of each element in the original list, based
     * upon the value returned by applying the supplied predicate to two list elements. Prefers
     * the first item if two items compare equal based on the predicate.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a, a -> Boolean) -> [a] -> [a]
     * @param {Function} pred A predicate used to test whether two items are equal.
     * @param {Array} list The array to consider.
     * @return {Array} The list of unique items.
     * @example
     *
     *      var strEq = function(a, b) { return String(a) === String(b); };
     *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
     *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]
     *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
     *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
     */
    var uniqWith = _curry2(function uniqWith(pred, list) {
        var idx = 0, len = list.length;
        var result = [], item;
        while (idx < len) {
            item = list[idx];
            if (!_containsWith(pred, item, result)) {
                result[result.length] = item;
            }
            idx += 1;
        }
        return result;
    });

    /**
     * Returns a new copy of the array with the element at the
     * provided index replaced with the given value.
     * @see R.adjust
     *
     * @func
     * @memberOf R
     * @category List
     * @sig Number -> a -> [a] -> [a]
     * @param {Number} idx The index to update.
     * @param {*} x The value to exist at the given index of the returned array.
     * @param {Array|Arguments} list The source array-like object to be updated.
     * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
     * @example
     *
     *      R.update(1, 11, [0, 1, 2]);     //=> [0, 11, 2]
     *      R.update(1)(11)([0, 1, 2]);     //=> [0, 11, 2]
     */
    var update = _curry3(function update(idx, x, list) {
        return adjust(always(x), idx, list);
    });

    /**
     * Returns a list of all the enumerable own properties of the supplied object.
     * Note that the order of the output array is not guaranteed across
     * different JS platforms.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig {k: v} -> [v]
     * @param {Object} obj The object to extract values from
     * @return {Array} An array of the values of the object's own properties.
     * @example
     *
     *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
     */
    var values = _curry1(function values(obj) {
        var props = keys(obj);
        var len = props.length;
        var vals = [];
        var idx = 0;
        while (idx < len) {
            vals[idx] = obj[props[idx]];
            idx += 1;
        }
        return vals;
    });

    /**
     * Returns a list of all the properties, including prototype properties,
     * of the supplied object.
     * Note that the order of the output array is not guaranteed to be
     * consistent across different JS platforms.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig {k: v} -> [v]
     * @param {Object} obj The object to extract values from
     * @return {Array} An array of the values of the object's own and prototype properties.
     * @example
     *
     *      var F = function() { this.x = 'X'; };
     *      F.prototype.y = 'Y';
     *      var f = new F();
     *      R.valuesIn(f); //=> ['X', 'Y']
     */
    var valuesIn = _curry1(function valuesIn(obj) {
        var prop, vs = [];
        for (prop in obj) {
            vs[vs.length] = obj[prop];
        }
        return vs;
    });

    /**
     * Returns a "view" of the given data structure, determined by the given lens.
     * The lens's focus determines which portion of the data structure is visible.
     *
     * @func
     * @memberOf R
     * @category Object
     * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
     * @sig Lens s a -> s -> a
     * @param {Lens} lens
     * @param {*} x
     * @return {*}
     * @see R.prop, R.lensIndex, R.lensProp
     * @example
     *
     *      var xLens = R.lensProp('x');
     *
     *      R.view(xLens, {x: 1, y: 2});  //=> 1
     *      R.view(xLens, {x: 4, y: 2});  //=> 4
     */
    var view = function () {
        var Const = function (x) {
            return {
                value: x,
                map: function () {
                    return this;
                }
            };
        };
        return _curry2(function view(lens, x) {
            return lens(Const)(x).value;
        });
    }();

    /**
     * Takes a spec object and a test object; returns true if the test satisfies
     * the spec. Each of the spec's own properties must be a predicate function.
     * Each predicate is applied to the value of the corresponding property of
     * the test object. `where` returns true if all the predicates return true,
     * false otherwise.
     *
     * `where` is well suited to declaratively expressing constraints for other
     * functions such as `filter` and `find`.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
     * @param {Object} spec
     * @param {Object} testObj
     * @return {Boolean}
     * @example
     *
     *      // pred :: Object -> Boolean
     *      var pred = R.where({
     *        a: R.equals('foo'),
     *        b: R.complement(R.equals('bar')),
     *        x: R.gt(_, 10),
     *        y: R.lt(_, 20)
     *      });
     *
     *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
     *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
     *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
     *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
     *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
     */
    var where = _curry2(function where(spec, testObj) {
        for (var prop in spec) {
            if (_has(prop, spec) && !spec[prop](testObj[prop])) {
                return false;
            }
        }
        return true;
    });

    /**
     * Wrap a function inside another to allow you to make adjustments to the parameters, or do
     * other processing either before the internal function is called or with its results.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig (a... -> b) -> ((a... -> b) -> a... -> c) -> (a... -> c)
     * @param {Function} fn The function to wrap.
     * @param {Function} wrapper The wrapper function.
     * @return {Function} The wrapped function.
     * @example
     *
     *      var greet = function(name) {return 'Hello ' + name;};
     *
     *      var shoutedGreet = R.wrap(greet, function(gr, name) {
     *        return gr(name).toUpperCase();
     *      });
     *      shoutedGreet("Kathy"); //=> "HELLO KATHY"
     *
     *      var shortenedGreet = R.wrap(greet, function(gr, name) {
     *        return gr(name.substring(0, 3));
     *      });
     *      shortenedGreet("Robert"); //=> "Hello Rob"
     */
    var wrap = _curry2(function wrap(fn, wrapper) {
        return curryN(fn.length, function () {
            return wrapper.apply(this, _concat([fn], arguments));
        });
    });

    /**
     * Creates a new list out of the two supplied by creating each possible
     * pair from the lists.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig [a] -> [b] -> [[a,b]]
     * @param {Array} as The first list.
     * @param {Array} bs The second list.
     * @return {Array} The list made by combining each possible pair from
     *         `as` and `bs` into pairs (`[a, b]`).
     * @example
     *
     *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
     */
    // = xprodWith(prepend); (takes about 3 times as long...)
    var xprod = _curry2(function xprod(a, b) {
        // = xprodWith(prepend); (takes about 3 times as long...)
        var idx = 0;
        var ilen = a.length;
        var j;
        var jlen = b.length;
        var result = [];
        while (idx < ilen) {
            j = 0;
            while (j < jlen) {
                result[result.length] = [
                    a[idx],
                    b[j]
                ];
                j += 1;
            }
            idx += 1;
        }
        return result;
    });

    /**
     * Creates a new list out of the two supplied by pairing up
     * equally-positioned items from both lists.  The returned list is
     * truncated to the length of the shorter of the two input lists.
     * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig [a] -> [b] -> [[a,b]]
     * @param {Array} list1 The first array to consider.
     * @param {Array} list2 The second array to consider.
     * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
     * @example
     *
     *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
     */
    var zip = _curry2(function zip(a, b) {
        var rv = [];
        var idx = 0;
        var len = Math.min(a.length, b.length);
        while (idx < len) {
            rv[idx] = [
                a[idx],
                b[idx]
            ];
            idx += 1;
        }
        return rv;
    });

    /**
     * Creates a new object out of a list of keys and a list of values.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig [String] -> [*] -> {String: *}
     * @param {Array} keys The array that will be properties on the output object.
     * @param {Array} values The list of values on the output object.
     * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
     * @example
     *
     *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
     */
    var zipObj = _curry2(function zipObj(keys, values) {
        var idx = 0, len = keys.length, out = {};
        while (idx < len) {
            out[keys[idx]] = values[idx];
            idx += 1;
        }
        return out;
    });

    /**
     * Creates a new list out of the two supplied by applying the function to
     * each equally-positioned pair in the lists. The returned list is
     * truncated to the length of the shorter of the two input lists.
     *
     * @function
     * @memberOf R
     * @category List
     * @sig (a,b -> c) -> [a] -> [b] -> [c]
     * @param {Function} fn The function used to combine the two elements into one value.
     * @param {Array} list1 The first array to consider.
     * @param {Array} list2 The second array to consider.
     * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`
     *         using `fn`.
     * @example
     *
     *      var f = function(x, y) {
     *        // ...
     *      };
     *      R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
     *      //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
     */
    var zipWith = _curry3(function zipWith(fn, a, b) {
        var rv = [], idx = 0, len = Math.min(a.length, b.length);
        while (idx < len) {
            rv[idx] = fn(a[idx], b[idx]);
            idx += 1;
        }
        return rv;
    });

    /**
     * A function that always returns `false`. Any passed in parameters are ignored.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig * -> false
     * @return {Boolean} false
     * @see R.always, R.T
     * @example
     *
     *      R.F(); //=> false
     */
    var F = always(false);

    /**
     * A function that always returns `true`. Any passed in parameters are ignored.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig * -> true
     * @return {Boolean} `true`.
     * @see R.always, R.F
     * @example
     *
     *      R.T(); //=> true
     */
    var T = always(true);

    /**
     * Similar to hasMethod, this checks whether a function has a [methodname]
     * function. If it isn't an array it will execute that function otherwise it will
     * default to the ramda implementation.
     *
     * @private
     * @param {Function} fn ramda implemtation
     * @param {String} methodname property to check for a custom implementation
     * @return {Object} Whatever the return value of the method is.
     */
    var _checkForMethod = function _checkForMethod(methodname, fn) {
        return function () {
            var length = arguments.length;
            if (length === 0) {
                return fn();
            }
            var obj = arguments[length - 1];
            return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
        };
    };

    /**
     * Copies an object.
     *
     * @private
     * @param {*} value The value to be copied
     * @param {Array} refFrom Array containing the source references
     * @param {Array} refTo Array containing the copied source references
     * @return {*} The copied value.
     */
    var _clone = function _clone(value, refFrom, refTo) {
        var copy = function copy(copiedValue) {
            var len = refFrom.length;
            var idx = 0;
            while (idx < len) {
                if (value === refFrom[idx]) {
                    return refTo[idx];
                }
                idx += 1;
            }
            refFrom[idx + 1] = value;
            refTo[idx + 1] = copiedValue;
            for (var key in value) {
                copiedValue[key] = _clone(value[key], refFrom, refTo);
            }
            return copiedValue;
        };
        switch (type(value)) {
        case 'Object':
            return copy({});
        case 'Array':
            return copy([]);
        case 'Date':
            return new Date(value);
        case 'RegExp':
            return _cloneRegExp(value);
        default:
            return value;
        }
    };

    var _createPartialApplicator = function _createPartialApplicator(concat) {
        return function (fn) {
            var args = _slice(arguments, 1);
            return _arity(Math.max(0, fn.length - args.length), function () {
                return fn.apply(this, concat(args, arguments));
            });
        };
    };

    /**
     * Returns a function that dispatches with different strategies based on the
     * object in list position (last argument). If it is an array, executes [fn].
     * Otherwise, if it has a  function with [methodname], it will execute that
     * function (functor case). Otherwise, if it is a transformer, uses transducer
     * [xf] to return a new transformer (transducer case). Otherwise, it will
     * default to executing [fn].
     *
     * @private
     * @param {String} methodname property to check for a custom implementation
     * @param {Function} xf transducer to initialize if object is transformer
     * @param {Function} fn default ramda implementation
     * @return {Function} A function that dispatches on object in list position
     */
    var _dispatchable = function _dispatchable(methodname, xf, fn) {
        return function () {
            var length = arguments.length;
            if (length === 0) {
                return fn();
            }
            var obj = arguments[length - 1];
            if (!_isArray(obj)) {
                var args = _slice(arguments, 0, length - 1);
                if (typeof obj[methodname] === 'function') {
                    return obj[methodname].apply(obj, args);
                }
                if (_isTransformer(obj)) {
                    var transducer = xf.apply(null, args);
                    return transducer(obj);
                }
            }
            return fn.apply(this, arguments);
        };
    };

    // The algorithm used to handle cyclic structures is
    // inspired by underscore's isEqual
    // RegExp equality algorithm: http://stackoverflow.com/a/10776635
    var _equals = function _equals(a, b, stackA, stackB) {
        var typeA = type(a);
        if (typeA !== type(b)) {
            return false;
        }
        if (typeA === 'Boolean' || typeA === 'Number' || typeA === 'String') {
            return typeof a === 'object' ? typeof b === 'object' && identical(a.valueOf(), b.valueOf()) : identical(a, b);
        }
        if (identical(a, b)) {
            return true;
        }
        if (typeA === 'RegExp') {
            // RegExp equality algorithm: http://stackoverflow.com/a/10776635
            return a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode;
        }
        if (Object(a) === a) {
            if (typeA === 'Date' && a.getTime() !== b.getTime()) {
                return false;
            }
            var keysA = keys(a);
            if (keysA.length !== keys(b).length) {
                return false;
            }
            var idx = stackA.length - 1;
            while (idx >= 0) {
                if (stackA[idx] === a) {
                    return stackB[idx] === b;
                }
                idx -= 1;
            }
            stackA[stackA.length] = a;
            stackB[stackB.length] = b;
            idx = keysA.length - 1;
            while (idx >= 0) {
                var key = keysA[idx];
                if (!_has(key, b) || !_equals(b[key], a[key], stackA, stackB)) {
                    return false;
                }
                idx -= 1;
            }
            stackA.pop();
            stackB.pop();
            return true;
        }
        return false;
    };

    /**
     * Private function that determines whether or not a provided object has a given method.
     * Does not ignore methods stored on the object's prototype chain. Used for dynamically
     * dispatching Ramda methods to non-Array objects.
     *
     * @private
     * @param {String} methodName The name of the method to check for.
     * @param {Object} obj The object to test.
     * @return {Boolean} `true` has a given method, `false` otherwise.
     * @example
     *
     *      var person = { name: 'John' };
     *      person.shout = function() { alert(this.name); };
     *
     *      _hasMethod('shout', person); //=> true
     *      _hasMethod('foo', person); //=> false
     */
    var _hasMethod = function _hasMethod(methodName, obj) {
        return obj != null && !_isArray(obj) && typeof obj[methodName] === 'function';
    };

    /**
     * `_makeFlat` is a helper function that returns a one-level or fully recursive function
     * based on the flag passed in.
     *
     * @private
     */
    var _makeFlat = function _makeFlat(recursive) {
        return function flatt(list) {
            var value, result = [], idx = 0, j, ilen = list.length, jlen;
            while (idx < ilen) {
                if (isArrayLike(list[idx])) {
                    value = recursive ? flatt(list[idx]) : list[idx];
                    j = 0;
                    jlen = value.length;
                    while (j < jlen) {
                        result[result.length] = value[j];
                        j += 1;
                    }
                } else {
                    result[result.length] = list[idx];
                }
                idx += 1;
            }
            return result;
        };
    };

    var _reduce = function () {
        function _arrayReduce(xf, acc, list) {
            var idx = 0, len = list.length;
            while (idx < len) {
                acc = xf['@@transducer/step'](acc, list[idx]);
                if (acc && acc['@@transducer/reduced']) {
                    acc = acc['@@transducer/value'];
                    break;
                }
                idx += 1;
            }
            return xf['@@transducer/result'](acc);
        }
        function _iterableReduce(xf, acc, iter) {
            var step = iter.next();
            while (!step.done) {
                acc = xf['@@transducer/step'](acc, step.value);
                if (acc && acc['@@transducer/reduced']) {
                    acc = acc['@@transducer/value'];
                    break;
                }
                step = iter.next();
            }
            return xf['@@transducer/result'](acc);
        }
        function _methodReduce(xf, acc, obj) {
            return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
        }
        var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
        return function _reduce(fn, acc, list) {
            if (typeof fn === 'function') {
                fn = _xwrap(fn);
            }
            if (isArrayLike(list)) {
                return _arrayReduce(fn, acc, list);
            }
            if (typeof list.reduce === 'function') {
                return _methodReduce(fn, acc, list);
            }
            if (list[symIterator] != null) {
                return _iterableReduce(fn, acc, list[symIterator]());
            }
            if (typeof list.next === 'function') {
                return _iterableReduce(fn, acc, list);
            }
            throw new TypeError('reduce: list must be array or iterable');
        };
    }();

    var _stepCat = function () {
        var _stepCatArray = {
            '@@transducer/init': Array,
            '@@transducer/step': function (xs, x) {
                return _concat(xs, [x]);
            },
            '@@transducer/result': _identity
        };
        var _stepCatString = {
            '@@transducer/init': String,
            '@@transducer/step': function (a, b) {
                return a + b;
            },
            '@@transducer/result': _identity
        };
        var _stepCatObject = {
            '@@transducer/init': Object,
            '@@transducer/step': function (result, input) {
                return merge(result, isArrayLike(input) ? createMapEntry(input[0], input[1]) : input);
            },
            '@@transducer/result': _identity
        };
        return function _stepCat(obj) {
            if (_isTransformer(obj)) {
                return obj;
            }
            if (isArrayLike(obj)) {
                return _stepCatArray;
            }
            if (typeof obj === 'string') {
                return _stepCatString;
            }
            if (typeof obj === 'object') {
                return _stepCatObject;
            }
            throw new Error('Cannot create transformer for ' + obj);
        };
    }();

    var _xall = function () {
        function XAll(f, xf) {
            this.xf = xf;
            this.f = f;
            this.all = true;
        }
        XAll.prototype['@@transducer/init'] = _xfBase.init;
        XAll.prototype['@@transducer/result'] = function (result) {
            if (this.all) {
                result = this.xf['@@transducer/step'](result, true);
            }
            return this.xf['@@transducer/result'](result);
        };
        XAll.prototype['@@transducer/step'] = function (result, input) {
            if (!this.f(input)) {
                this.all = false;
                result = _reduced(this.xf['@@transducer/step'](result, false));
            }
            return result;
        };
        return _curry2(function _xall(f, xf) {
            return new XAll(f, xf);
        });
    }();

    var _xany = function () {
        function XAny(f, xf) {
            this.xf = xf;
            this.f = f;
            this.any = false;
        }
        XAny.prototype['@@transducer/init'] = _xfBase.init;
        XAny.prototype['@@transducer/result'] = function (result) {
            if (!this.any) {
                result = this.xf['@@transducer/step'](result, false);
            }
            return this.xf['@@transducer/result'](result);
        };
        XAny.prototype['@@transducer/step'] = function (result, input) {
            if (this.f(input)) {
                this.any = true;
                result = _reduced(this.xf['@@transducer/step'](result, true));
            }
            return result;
        };
        return _curry2(function _xany(f, xf) {
            return new XAny(f, xf);
        });
    }();

    var _xdrop = function () {
        function XDrop(n, xf) {
            this.xf = xf;
            this.n = n;
        }
        XDrop.prototype['@@transducer/init'] = _xfBase.init;
        XDrop.prototype['@@transducer/result'] = _xfBase.result;
        XDrop.prototype['@@transducer/step'] = function (result, input) {
            if (this.n > 0) {
                this.n -= 1;
                return result;
            }
            return this.xf['@@transducer/step'](result, input);
        };
        return _curry2(function _xdrop(n, xf) {
            return new XDrop(n, xf);
        });
    }();

    var _xdropWhile = function () {
        function XDropWhile(f, xf) {
            this.xf = xf;
            this.f = f;
        }
        XDropWhile.prototype['@@transducer/init'] = _xfBase.init;
        XDropWhile.prototype['@@transducer/result'] = _xfBase.result;
        XDropWhile.prototype['@@transducer/step'] = function (result, input) {
            if (this.f) {
                if (this.f(input)) {
                    return result;
                }
                this.f = null;
            }
            return this.xf['@@transducer/step'](result, input);
        };
        return _curry2(function _xdropWhile(f, xf) {
            return new XDropWhile(f, xf);
        });
    }();

    var _xgroupBy = function () {
        function XGroupBy(f, xf) {
            this.xf = xf;
            this.f = f;
            this.inputs = {};
        }
        XGroupBy.prototype['@@transducer/init'] = _xfBase.init;
        XGroupBy.prototype['@@transducer/result'] = function (result) {
            var key;
            for (key in this.inputs) {
                if (_has(key, this.inputs)) {
                    result = this.xf['@@transducer/step'](result, this.inputs[key]);
                    if (result['@@transducer/reduced']) {
                        result = result['@@transducer/value'];
                        break;
                    }
                }
            }
            return this.xf['@@transducer/result'](result);
        };
        XGroupBy.prototype['@@transducer/step'] = function (result, input) {
            var key = this.f(input);
            this.inputs[key] = this.inputs[key] || [
                key,
                []
            ];
            this.inputs[key][1] = append(input, this.inputs[key][1]);
            return result;
        };
        return _curry2(function _xgroupBy(f, xf) {
            return new XGroupBy(f, xf);
        });
    }();

    /**
     * Creates a new list iteration function from an existing one by adding two new parameters
     * to its callback function: the current index, and the entire list.
     *
     * This would turn, for instance, Ramda's simple `map` function into one that more closely
     * resembles `Array.prototype.map`.  Note that this will only work for functions in which
     * the iteration callback function is the first parameter, and where the list is the last
     * parameter.  (This latter might be unimportant if the list parameter is not used.)
     *
     * @func
     * @memberOf R
     * @category Function
     * @category List
     * @sig ((a ... -> b) ... -> [a] -> *) -> (a ..., Int, [a] -> b) ... -> [a] -> *)
     * @param {Function} fn A list iteration function that does not pass index or list to its callback
     * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
     * @example
     *
     *      var mapIndexed = R.addIndex(R.map);
     *      mapIndexed(function(val, idx) {return idx + '-' + val;}, ['f', 'o', 'o', 'b', 'a', 'r']);
     *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
     */
    var addIndex = _curry1(function addIndex(fn) {
        return curryN(fn.length, function () {
            var idx = 0;
            var origFn = arguments[0];
            var list = arguments[arguments.length - 1];
            var args = _slice(arguments);
            args[0] = function () {
                var result = origFn.apply(this, _concat(arguments, [
                    idx,
                    list
                ]));
                idx += 1;
                return result;
            };
            return fn.apply(this, args);
        });
    });

    /**
     * Returns `true` if all elements of the list match the predicate, `false` if there are any
     * that don't.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> Boolean) -> [a] -> Boolean
     * @param {Function} fn The predicate function.
     * @param {Array} list The array to consider.
     * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
     *         otherwise.
     * @see R.any, R.none
     * @example
     *
     *      var lessThan2 = R.flip(R.lt)(2);
     *      var lessThan3 = R.flip(R.lt)(3);
     *      R.all(lessThan2)([1, 2]); //=> false
     *      R.all(lessThan3)([1, 2]); //=> true
     */
    var all = _curry2(_dispatchable('all', _xall, function all(fn, list) {
        var idx = 0;
        while (idx < list.length) {
            if (!fn(list[idx])) {
                return false;
            }
            idx += 1;
        }
        return true;
    }));

    /**
     * A function that returns the first argument if it's falsy otherwise the second
     * argument. Note that this is NOT short-circuited, meaning that if expressions
     * are passed they are both evaluated.
     *
     * Dispatches to the `and` method of the first argument if applicable.
     *
     * @func
     * @memberOf R
     * @category Logic
     * @sig * -> * -> *
     * @param {*} a any value
     * @param {*} b any other value
     * @return {*} the first argument if falsy otherwise the second argument.
     * @see R.both
     * @example
     *
     *      R.and(false, true); //=> false
     *      R.and(0, []); //=> 0
     *      R.and(null, ''); => null
     */
    var and = _curry2(function and(a, b) {
        return _hasMethod('and', a) ? a.and(b) : a && b;
    });

    /**
     * Returns `true` if at least one of elements of the list match the predicate, `false`
     * otherwise.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> Boolean) -> [a] -> Boolean
     * @param {Function} fn The predicate function.
     * @param {Array} list The array to consider.
     * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
     *         otherwise.
     * @see R.all, R.none
     * @example
     *
     *      var lessThan0 = R.flip(R.lt)(0);
     *      var lessThan2 = R.flip(R.lt)(2);
     *      R.any(lessThan0)([1, 2]); //=> false
     *      R.any(lessThan2)([1, 2]); //=> true
     */
    var any = _curry2(_dispatchable('any', _xany, function any(fn, list) {
        var idx = 0;
        while (idx < list.length) {
            if (fn(list[idx])) {
                return true;
            }
            idx += 1;
        }
        return false;
    }));

    /**
     * Wraps a function of any arity (including nullary) in a function that accepts exactly 2
     * parameters. Any extraneous parameters will not be passed to the supplied function.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig (* -> c) -> (a, b -> c)
     * @param {Function} fn The function to wrap.
     * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
     *         arity 2.
     * @example
     *
     *      var takesThreeArgs = function(a, b, c) {
     *        return [a, b, c];
     *      };
     *      takesThreeArgs.length; //=> 3
     *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
     *
     *      var takesTwoArgs = R.binary(takesThreeArgs);
     *      takesTwoArgs.length; //=> 2
     *      // Only 2 arguments are passed to the wrapped function
     *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
     */
    var binary = _curry1(function binary(fn) {
        return nAry(2, fn);
    });

    /**
     * Creates a deep copy of the value which may contain (nested) `Array`s and
     * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are
     * not copied, but assigned by their reference.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig {*} -> {*}
     * @param {*} value The object or array to clone
     * @return {*} A new object or array.
     * @example
     *
     *      var objects = [{}, {}, {}];
     *      var objectsClone = R.clone(objects);
     *      objects[0] === objectsClone[0]; //=> false
     */
    var clone = _curry1(function clone(value) {
        return _clone(value, [], []);
    });

    /**
     * Returns a new list consisting of the elements of the first list followed by the elements
     * of the second.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig [a] -> [a] -> [a]
     * @param {Array} list1 The first list to merge.
     * @param {Array} list2 The second set to merge.
     * @return {Array} A new array consisting of the contents of `list1` followed by the
     *         contents of `list2`. If, instead of an Array for `list1`, you pass an
     *         object with a `concat` method on it, `concat` will call `list1.concat`
     *         and pass it the value of `list2`.
     *
     * @example
     *
     *      R.concat([], []); //=> []
     *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
     *      R.concat('ABC', 'DEF'); // 'ABCDEF'
     */
    var concat = _curry2(function concat(set1, set2) {
        if (_isArray(set2)) {
            return _concat(set1, set2);
        } else if (_hasMethod('concat', set1)) {
            return set1.concat(set2);
        } else {
            throw new TypeError('can\'t concat ' + typeof set1);
        }
    });

    /**
     * Returns a curried equivalent of the provided function. The curried
     * function has two unusual capabilities. First, its arguments needn't
     * be provided one at a time. If `f` is a ternary function and `g` is
     * `R.curry(f)`, the following are equivalent:
     *
     *   - `g(1)(2)(3)`
     *   - `g(1)(2, 3)`
     *   - `g(1, 2)(3)`
     *   - `g(1, 2, 3)`
     *
     * Secondly, the special placeholder value `R.__` may be used to specify
     * "gaps", allowing partial application of any combination of arguments,
     * regardless of their positions. If `g` is as above and `_` is `R.__`,
     * the following are equivalent:
     *
     *   - `g(1, 2, 3)`
     *   - `g(_, 2, 3)(1)`
     *   - `g(_, _, 3)(1)(2)`
     *   - `g(_, _, 3)(1, 2)`
     *   - `g(_, 2)(1)(3)`
     *   - `g(_, 2)(1, 3)`
     *   - `g(_, 2)(_, 3)(1)`
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig (* -> a) -> (* -> a)
     * @param {Function} fn The function to curry.
     * @return {Function} A new, curried function.
     * @see R.curryN
     * @example
     *
     *      var addFourNumbers = function(a, b, c, d) {
     *        return a + b + c + d;
     *      };
     *
     *      var curriedAddFourNumbers = R.curry(addFourNumbers);
     *      var f = curriedAddFourNumbers(1, 2);
     *      var g = f(3);
     *      g(4); //=> 10
     */
    var curry = _curry1(function curry(fn) {
        return curryN(fn.length, fn);
    });

    /**
     * Returns a new list containing the last `n` elements of a given list, passing each value
     * to the supplied predicate function, skipping elements while the predicate function returns
     * `true`. The predicate function is passed one argument: *(value)*.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> Boolean) -> [a] -> [a]
     * @param {Function} fn The function called per iteration.
     * @param {Array} list The collection to iterate over.
     * @return {Array} A new array.
     * @see R.takeWhile
     * @example
     *
     *      var lteTwo = function(x) {
     *        return x <= 2;
     *      };
     *
     *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
     */
    var dropWhile = _curry2(_dispatchable('dropWhile', _xdropWhile, function dropWhile(pred, list) {
        var idx = 0, len = list.length;
        while (idx < len && pred(list[idx])) {
            idx += 1;
        }
        return _slice(list, idx);
    }));

    /**
     * Returns `true` if its arguments are equivalent, `false` otherwise.
     * Dispatches to an `equals` method if present. Handles cyclical data
     * structures.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig a -> b -> Boolean
     * @param {*} a
     * @param {*} b
     * @return {Boolean}
     * @example
     *
     *      R.equals(1, 1); //=> true
     *      R.equals(1, '1'); //=> false
     *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
     *
     *      var a = {}; a.v = a;
     *      var b = {}; b.v = b;
     *      R.equals(a, b); //=> true
     */
    var equals = _curry2(function equals(a, b) {
        return _hasMethod('equals', a) ? a.equals(b) : _hasMethod('equals', b) ? b.equals(a) : _equals(a, b, [], []);
    });

    /**
     * Returns a new list containing only those items that match a given predicate function.
     * The predicate function is passed one argument: *(value)*.
     *
     * Note that `R.filter` does not skip deleted or unassigned indices, unlike the native
     * `Array.prototype.filter` method. For more details on this behavior, see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Description
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> Boolean) -> [a] -> [a]
     * @param {Function} fn The function called per iteration.
     * @param {Array} list The collection to iterate over.
     * @return {Array} The new filtered array.
     * @see R.reject
     * @example
     *
     *      var isEven = function(n) {
     *        return n % 2 === 0;
     *      };
     *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
     */
    var filter = _curry2(_dispatchable('filter', _xfilter, _filter));

    /**
     * Returns the first element of the list which matches the predicate, or `undefined` if no
     * element matches.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> Boolean) -> [a] -> a | undefined
     * @param {Function} fn The predicate function used to determine if the element is the
     *        desired one.
     * @param {Array} list The array to consider.
     * @return {Object} The element found, or `undefined`.
     * @example
     *
     *      var xs = [{a: 1}, {a: 2}, {a: 3}];
     *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
     *      R.find(R.propEq('a', 4))(xs); //=> undefined
     */
    var find = _curry2(_dispatchable('find', _xfind, function find(fn, list) {
        var idx = 0;
        var len = list.length;
        while (idx < len) {
            if (fn(list[idx])) {
                return list[idx];
            }
            idx += 1;
        }
    }));

    /**
     * Returns the index of the first element of the list which matches the predicate, or `-1`
     * if no element matches.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> Boolean) -> [a] -> Number
     * @param {Function} fn The predicate function used to determine if the element is the
     * desired one.
     * @param {Array} list The array to consider.
     * @return {Number} The index of the element found, or `-1`.
     * @example
     *
     *      var xs = [{a: 1}, {a: 2}, {a: 3}];
     *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
     *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
     */
    var findIndex = _curry2(_dispatchable('findIndex', _xfindIndex, function findIndex(fn, list) {
        var idx = 0;
        var len = list.length;
        while (idx < len) {
            if (fn(list[idx])) {
                return idx;
            }
            idx += 1;
        }
        return -1;
    }));

    /**
     * Returns the last element of the list which matches the predicate, or `undefined` if no
     * element matches.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> Boolean) -> [a] -> a | undefined
     * @param {Function} fn The predicate function used to determine if the element is the
     * desired one.
     * @param {Array} list The array to consider.
     * @return {Object} The element found, or `undefined`.
     * @example
     *
     *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
     *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
     *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
     */
    var findLast = _curry2(_dispatchable('findLast', _xfindLast, function findLast(fn, list) {
        var idx = list.length - 1;
        while (idx >= 0) {
            if (fn(list[idx])) {
                return list[idx];
            }
            idx -= 1;
        }
    }));

    /**
     * Returns the index of the last element of the list which matches the predicate, or
     * `-1` if no element matches.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> Boolean) -> [a] -> Number
     * @param {Function} fn The predicate function used to determine if the element is the
     * desired one.
     * @param {Array} list The array to consider.
     * @return {Number} The index of the element found, or `-1`.
     * @example
     *
     *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
     *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
     *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
     */
    var findLastIndex = _curry2(_dispatchable('findLastIndex', _xfindLastIndex, function findLastIndex(fn, list) {
        var idx = list.length - 1;
        while (idx >= 0) {
            if (fn(list[idx])) {
                return idx;
            }
            idx -= 1;
        }
        return -1;
    }));

    /**
     * Returns a new list by pulling every item out of it (and all its sub-arrays) and putting
     * them in a new array, depth-first.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig [a] -> [b]
     * @param {Array} list The array to consider.
     * @return {Array} The flattened list.
     * @see R.unnest
     * @example
     *
     *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
     *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
     */
    var flatten = _curry1(_makeFlat(true));

    /**
     * Returns a new function much like the supplied one, except that the first two arguments'
     * order is reversed.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig (a -> b -> c -> ... -> z) -> (b -> a -> c -> ... -> z)
     * @param {Function} fn The function to invoke with its first two parameters reversed.
     * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
     * @example
     *
     *      var mergeThree = function(a, b, c) {
     *        return ([]).concat(a, b, c);
     *      };
     *
     *      mergeThree(1, 2, 3); //=> [1, 2, 3]
     *
     *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
     */
    var flip = _curry1(function flip(fn) {
        return curry(function (a, b) {
            var args = _slice(arguments);
            args[0] = b;
            args[1] = a;
            return fn.apply(this, args);
        });
    });

    /**
     * Iterate over an input `list`, calling a provided function `fn` for each element in the
     * list.
     *
     * `fn` receives one argument: *(value)*.
     *
     * Note: `R.forEach` does not skip deleted or unassigned indices (sparse arrays), unlike
     * the native `Array.prototype.forEach` method. For more details on this behavior, see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
     *
     * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns the original
     * array. In some libraries this function is named `each`.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> *) -> [a] -> [a]
     * @param {Function} fn The function to invoke. Receives one argument, `value`.
     * @param {Array} list The list to iterate over.
     * @return {Array} The original list.
     * @example
     *
     *      var printXPlusFive = function(x) { console.log(x + 5); };
     *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
     *      //-> 6
     *      //-> 7
     *      //-> 8
     */
    var forEach = _curry2(_checkForMethod('forEach', function forEach(fn, list) {
        var len = list.length;
        var idx = 0;
        while (idx < len) {
            fn(list[idx]);
            idx += 1;
        }
        return list;
    }));

    /**
     * Returns a list of function names of object's own functions
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig {*} -> [String]
     * @param {Object} obj The objects with functions in it
     * @return {Array} A list of the object's own properties that map to functions.
     * @example
     *
     *      R.functions(R); // returns list of ramda's own function names
     *
     *      var F = function() { this.x = function(){}; this.y = 1; }
     *      F.prototype.z = function() {};
     *      F.prototype.a = 100;
     *      R.functions(new F()); //=> ["x"]
     */
    var functions = _curry1(_functionsWith(keys));

    /**
     * Returns a list of function names of object's own and prototype functions
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig {*} -> [String]
     * @param {Object} obj The objects with functions in it
     * @return {Array} A list of the object's own properties and prototype
     *         properties that map to functions.
     * @example
     *
     *      R.functionsIn(R); // returns list of ramda's own and prototype function names
     *
     *      var F = function() { this.x = function(){}; this.y = 1; }
     *      F.prototype.z = function() {};
     *      F.prototype.a = 100;
     *      R.functionsIn(new F()); //=> ["x", "z"]
     */
    var functionsIn = _curry1(_functionsWith(keysIn));

    /**
     * Splits a list into sub-lists stored in an object, based on the result of calling a String-returning function
     * on each element, and grouping the results according to values returned.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> String) -> [a] -> {String: [a]}
     * @param {Function} fn Function :: a -> String
     * @param {Array} list The array to group
     * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
     *         that produced that key when passed to `fn`.
     * @example
     *
     *      var byGrade = R.groupBy(function(student) {
     *        var score = student.score;
     *        return score < 65 ? 'F' :
     *               score < 70 ? 'D' :
     *               score < 80 ? 'C' :
     *               score < 90 ? 'B' : 'A';
     *      });
     *      var students = [{name: 'Abby', score: 84},
     *                      {name: 'Eddy', score: 58},
     *                      // ...
     *                      {name: 'Jack', score: 69}];
     *      byGrade(students);
     *      // {
     *      //   'A': [{name: 'Dianne', score: 99}],
     *      //   'B': [{name: 'Abby', score: 84}]
     *      //   // ...,
     *      //   'F': [{name: 'Eddy', score: 58}]
     *      // }
     */
    var groupBy = _curry2(_dispatchable('groupBy', _xgroupBy, function groupBy(fn, list) {
        return _reduce(function (acc, elt) {
            var key = fn(elt);
            acc[key] = append(elt, acc[key] || (acc[key] = []));
            return acc;
        }, {}, list);
    }));

    /**
     * Returns the first element of the given list or string. In some libraries
     * this function is named `first`.
     *
     * @func
     * @memberOf R
     * @category List
     * @see R.tail, R.init, R.last
     * @sig [a] -> a | Undefined
     * @sig String -> String
     * @param {*} list
     * @return {*}
     * @example
     *
     *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
     *      R.head([]); //=> undefined
     *
     *      R.head('abc'); //=> 'a'
     *      R.head(''); //=> ''
     */
    var head = nth(0);

    /**
     * Combines two lists into a set (i.e. no duplicates) composed of those
     * elements common to both lists.  Duplication is determined according
     * to the value returned by applying the supplied predicate to two list
     * elements.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig (a,a -> Boolean) -> [a] -> [a] -> [a]
     * @param {Function} pred A predicate function that determines whether
     *        the two supplied elements are equal.
     * @param {Array} list1 One list of items to compare
     * @param {Array} list2 A second list of items to compare
     * @see R.intersection
     * @return {Array} A new list containing those elements common to both lists.
     * @example
     *
     *      var buffaloSpringfield = [
     *        {id: 824, name: 'Richie Furay'},
     *        {id: 956, name: 'Dewey Martin'},
     *        {id: 313, name: 'Bruce Palmer'},
     *        {id: 456, name: 'Stephen Stills'},
     *        {id: 177, name: 'Neil Young'}
     *      ];
     *      var csny = [
     *        {id: 204, name: 'David Crosby'},
     *        {id: 456, name: 'Stephen Stills'},
     *        {id: 539, name: 'Graham Nash'},
     *        {id: 177, name: 'Neil Young'}
     *      ];
     *
     *      var sameId = function(o1, o2) {return o1.id === o2.id;};
     *
     *      R.intersectionWith(sameId, buffaloSpringfield, csny);
     *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
     */
    var intersectionWith = _curry3(function intersectionWith(pred, list1, list2) {
        var results = [], idx = 0;
        while (idx < list1.length) {
            if (_containsWith(pred, list1[idx], list2)) {
                results[results.length] = list1[idx];
            }
            idx += 1;
        }
        return uniqWith(pred, results);
    });

    /**
     * Creates a new list with the separator interposed between elements.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig a -> [a] -> [a]
     * @param {*} separator The element to add to the list.
     * @param {Array} list The list to be interposed.
     * @return {Array} The new list.
     * @example
     *
     *      R.intersperse('n', ['ba', 'a', 'a']); //=> ['ba', 'n', 'a', 'n', 'a']
     */
    var intersperse = _curry2(_checkForMethod('intersperse', function intersperse(separator, list) {
        var out = [];
        var idx = 0;
        var length = list.length;
        while (idx < length) {
            if (idx === length - 1) {
                out.push(list[idx]);
            } else {
                out.push(list[idx], separator);
            }
            idx += 1;
        }
        return out;
    }));

    /**
     * Transforms the items of the list with the transducer and appends the transformed items to
     * the accumulator using an appropriate iterator function based on the accumulator type.
     *
     * The accumulator can be an array, string, object or a transformer. Iterated items will
     * be appended to arrays and concatenated to strings. Objects will be merged directly or 2-item
     * arrays will be merged as key, value pairs.
     *
     * The accumulator can also be a transformer object that provides a 2-arity reducing iterator
     * function, step, 0-arity initial value function, init, and 1-arity result extraction function
     * result. The step function is used as the iterator function in reduce. The result function is
     * used to convert the final accumulator into the return type and in most cases is R.identity.
     * The init function is used to provide the initial accumulator.
     *
     * The iteration is performed with R.reduce after initializing the transducer.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig a -> (b -> b) -> [c] -> a
     * @param {*} acc The initial accumulator value.
     * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
     * @param {Array} list The list to iterate over.
     * @return {*} The final, accumulated value.
     * @example
     *
     *      var numbers = [1, 2, 3, 4];
     *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
     *
     *      R.into([], transducer, numbers); //=> [2, 3]
     *
     *      var intoArray = R.into([]);
     *      intoArray(transducer, numbers); //=> [2, 3]
     */
    var into = _curry3(function into(acc, xf, list) {
        return _isTransformer(acc) ? _reduce(xf(acc), acc['@@transducer/init'](), list) : _reduce(xf(_stepCat(acc)), acc, list);
    });

    /**
     * Same as R.invertObj, however this accounts for objects
     * with duplicate values by putting the values into an
     * array.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig {s: x} -> {x: [ s, ... ]}
     * @param {Object} obj The object or array to invert
     * @return {Object} out A new object with keys
     * in an array.
     * @example
     *
     *      var raceResultsByFirstName = {
     *        first: 'alice',
     *        second: 'jake',
     *        third: 'alice',
     *      };
     *      R.invert(raceResultsByFirstName);
     *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
     */
    var invert = _curry1(function invert(obj) {
        var props = keys(obj);
        var len = props.length;
        var idx = 0;
        var out = {};
        while (idx < len) {
            var key = props[idx];
            var val = obj[key];
            var list = _has(val, out) ? out[val] : out[val] = [];
            list[list.length] = key;
            idx += 1;
        }
        return out;
    });

    /**
     * Returns a new object with the keys of the given object
     * as values, and the values of the given object as keys.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig {s: x} -> {x: s}
     * @param {Object} obj The object or array to invert
     * @return {Object} out A new object
     * @example
     *
     *      var raceResults = {
     *        first: 'alice',
     *        second: 'jake'
     *      };
     *      R.invertObj(raceResults);
     *      //=> { 'alice': 'first', 'jake':'second' }
     *
     *      // Alternatively:
     *      var raceResults = ['alice', 'jake'];
     *      R.invertObj(raceResults);
     *      //=> { 'alice': '0', 'jake':'1' }
     */
    var invertObj = _curry1(function invertObj(obj) {
        var props = keys(obj);
        var len = props.length;
        var idx = 0;
        var out = {};
        while (idx < len) {
            var key = props[idx];
            out[obj[key]] = key;
            idx += 1;
        }
        return out;
    });

    /**
     * Returns the last element of the given list or string.
     *
     * @func
     * @memberOf R
     * @category List
     * @see R.init, R.head, R.tail
     * @sig [a] -> a | Undefined
     * @sig String -> String
     * @param {*} list
     * @return {*}
     * @example
     *
     *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
     *      R.last([]); //=> undefined
     *
     *      R.last('abc'); //=> 'c'
     *      R.last(''); //=> ''
     */
    var last = nth(-1);

    /**
     * Returns the position of the last occurrence of an item in
     * an array, or -1 if the item is not included in the array.
     * `R.equals` is used to determine equality.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig a -> [a] -> Number
     * @param {*} target The item to find.
     * @param {Array} xs The array to search in.
     * @return {Number} the index of the target, or -1 if the target is not found.
     * @see R.indexOf
     * @example
     *
     *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
     *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
     */
    var lastIndexOf = _curry2(function lastIndexOf(target, xs) {
        if (_hasMethod('lastIndexOf', xs)) {
            return xs.lastIndexOf(target);
        } else {
            var idx = xs.length - 1;
            while (idx >= 0) {
                if (equals(xs[idx], target)) {
                    return idx;
                }
                idx -= 1;
            }
            return -1;
        }
    });

    /**
     * Returns a new list, constructed by applying the supplied function to every element of the
     * supplied list.
     *
     * Note: `R.map` does not skip deleted or unassigned indices (sparse arrays), unlike the
     * native `Array.prototype.map` method. For more details on this behavior, see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Description
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> b) -> [a] -> [b]
     * @param {Function} fn The function to be called on every element of the input `list`.
     * @param {Array} list The list to be iterated over.
     * @return {Array} The new list.
     * @example
     *
     *      var double = function(x) {
     *        return x * 2;
     *      };
     *
     *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
     */
    var map = _curry2(_dispatchable('map', _xmap, _map));

    /**
     * Map, but for objects. Creates an object with the same keys as `obj` and values
     * generated by running each property of `obj` through `fn`. `fn` is passed one argument:
     * *(value)*.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig (v -> v) -> {k: v} -> {k: v}
     * @param {Function} fn A function called for each property in `obj`. Its return value will
     * become a new property on the return object.
     * @param {Object} obj The object to iterate over.
     * @return {Object} A new object with the same keys as `obj` and values that are the result
     *         of running each property through `fn`.
     * @example
     *
     *      var values = { x: 1, y: 2, z: 3 };
     *      var double = function(num) {
     *        return num * 2;
     *      };
     *
     *      R.mapObj(double, values); //=> { x: 2, y: 4, z: 6 }
     */
    var mapObj = _curry2(function mapObj(fn, obj) {
        return _reduce(function (acc, key) {
            acc[key] = fn(obj[key]);
            return acc;
        }, {}, keys(obj));
    });

    /**
     * Like `mapObj`, but but passes additional arguments to the predicate function. The
     * predicate function is passed three arguments: *(value, key, obj)*.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig (v, k, {k: v} -> v) -> {k: v} -> {k: v}
     * @param {Function} fn A function called for each property in `obj`. Its return value will
     *        become a new property on the return object.
     * @param {Object} obj The object to iterate over.
     * @return {Object} A new object with the same keys as `obj` and values that are the result
     *         of running each property through `fn`.
     * @example
     *
     *      var values = { x: 1, y: 2, z: 3 };
     *      var prependKeyAndDouble = function(num, key, obj) {
     *        return key + (num * 2);
     *      };
     *
     *      R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
     */
    var mapObjIndexed = _curry2(function mapObjIndexed(fn, obj) {
        return _reduce(function (acc, key) {
            acc[key] = fn(obj[key], key, obj);
            return acc;
        }, {}, keys(obj));
    });

    /**
     * Returns `true` if no elements of the list match the predicate,
     * `false` otherwise.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> Boolean) -> [a] -> Boolean
     * @param {Function} fn The predicate function.
     * @param {Array} list The array to consider.
     * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
     * @see R.all, R.any
     * @example
     *
     *      R.none(R.isNaN, [1, 2, 3]); //=> true
     *      R.none(R.isNaN, [1, 2, 3, NaN]); //=> false
     */
    var none = _curry2(_complement(_dispatchable('any', _xany, any)));

    /**
     * A function that returns the first truthy of two arguments otherwise the
     * last argument. Note that this is NOT short-circuited, meaning that if
     * expressions are passed they are both evaluated.
     *
     * Dispatches to the `or` method of the first argument if applicable.
     *
     * @func
     * @memberOf R
     * @category Logic
     * @sig * -> * -> *
     * @param {*} a any value
     * @param {*} b any other value
     * @return {*} the first truthy argument, otherwise the last argument.
     * @see R.either
     * @example
     *
     *      R.or(false, true); //=> true
     *      R.or(0, []); //=> []
     *      R.or(null, ''); => ''
     */
    var or = _curry2(function or(a, b) {
        return _hasMethod('or', a) ? a.or(b) : a || b;
    });

    /**
     * Accepts as its arguments a function and any number of values and returns a function that,
     * when invoked, calls the original function with all of the values prepended to the
     * original function's arguments list. In some libraries this function is named `applyLeft`.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig (a -> b -> ... -> i -> j -> ... -> m -> n) -> a -> b-> ... -> i -> (j -> ... -> m -> n)
     * @param {Function} fn The function to invoke.
     * @param {...*} [args] Arguments to prepend to `fn` when the returned function is invoked.
     * @return {Function} A new function wrapping `fn`. When invoked, it will call `fn`
     *         with `args` prepended to `fn`'s arguments list.
     * @example
     *
     *      var multiply = function(a, b) { return a * b; };
     *      var double = R.partial(multiply, 2);
     *      double(2); //=> 4
     *
     *      var greet = function(salutation, title, firstName, lastName) {
     *        return salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
     *      };
     *      var sayHello = R.partial(greet, 'Hello');
     *      var sayHelloToMs = R.partial(sayHello, 'Ms.');
     *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
     */
    var partial = curry(_createPartialApplicator(_concat));

    /**
     * Accepts as its arguments a function and any number of values and returns a function that,
     * when invoked, calls the original function with all of the values appended to the original
     * function's arguments list.
     *
     * Note that `partialRight` is the opposite of `partial`: `partialRight` fills `fn`'s arguments
     * from the right to the left.  In some libraries this function is named `applyRight`.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig (a -> b-> ... -> i -> j -> ... -> m -> n) -> j -> ... -> m -> n -> (a -> b-> ... -> i)
     * @param {Function} fn The function to invoke.
     * @param {...*} [args] Arguments to append to `fn` when the returned function is invoked.
     * @return {Function} A new function wrapping `fn`. When invoked, it will call `fn` with
     *         `args` appended to `fn`'s arguments list.
     * @example
     *
     *      var greet = function(salutation, title, firstName, lastName) {
     *        return salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
     *      };
     *      var greetMsJaneJones = R.partialRight(greet, 'Ms.', 'Jane', 'Jones');
     *
     *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
     */
    var partialRight = curry(_createPartialApplicator(flip(_concat)));

    /**
     * Takes a predicate and a list and returns the pair of lists of
     * elements which do and do not satisfy the predicate, respectively.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> Boolean) -> [a] -> [[a],[a]]
     * @param {Function} pred A predicate to determine which array the element belongs to.
     * @param {Array} list The array to partition.
     * @return {Array} A nested array, containing first an array of elements that satisfied the predicate,
     *         and second an array of elements that did not satisfy.
     * @example
     *
     *      R.partition(R.contains('s'), ['sss', 'ttt', 'foo', 'bars']);
     *      //=> [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
     */
    var partition = _curry2(function partition(pred, list) {
        return _reduce(function (acc, elt) {
            var xs = acc[pred(elt) ? 0 : 1];
            xs[xs.length] = elt;
            return acc;
        }, [
            [],
            []
        ], list);
    });

    /**
     * Determines whether a nested path on an object has a specific value,
     * in `R.equals` terms. Most likely used to filter a list.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig [String] -> * -> {String: *} -> Boolean
     * @param {Array} path The path of the nested property to use
     * @param {*} val The value to compare the nested property with
     * @param {Object} obj The object to check the nested property in
     * @return {Boolean} `true` if the value equals the nested object property,
     *         `false` otherwise.
     * @example
     *
     *      var user1 = { address: { zipCode: 90210 } };
     *      var user2 = { address: { zipCode: 55555 } };
     *      var user3 = { name: 'Bob' };
     *      var users = [ user1, user2, user3 ];
     *      var isFamous = R.pathEq(['address', 'zipCode'], 90210);
     *      R.filter(isFamous, users); //=> [ user1 ]
     */
    var pathEq = _curry3(function pathEq(_path, val, obj) {
        return equals(path(_path, obj), val);
    });

    /**
     * Returns a new list by plucking the same named property off all objects in the list supplied.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig k -> [{k: v}] -> [v]
     * @param {Number|String} key The key name to pluck off of each object.
     * @param {Array} list The array to consider.
     * @return {Array} The list of values for the given key.
     * @example
     *
     *      R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]
     *      R.pluck(0)([[1, 2], [3, 4]]);   //=> [1, 3]
     */
    var pluck = _curry2(function pluck(p, list) {
        return map(prop(p), list);
    });

    /**
     * Returns `true` if the specified object property is equal, in `R.equals`
     * terms, to the given value; `false` otherwise.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig String -> a -> Object -> Boolean
     * @param {String} name
     * @param {*} val
     * @param {*} obj
     * @return {Boolean}
     * @see R.equals, R.propSatisfies
     * @example
     *
     *      var abby = {name: 'Abby', age: 7, hair: 'blond'};
     *      var fred = {name: 'Fred', age: 12, hair: 'brown'};
     *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
     *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};
     *      var kids = [abby, fred, rusty, alois];
     *      var hasBrownHair = R.propEq('hair', 'brown');
     *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
     */
    var propEq = _curry3(function propEq(name, val, obj) {
        return propSatisfies(equals(val), name, obj);
    });

    /**
     * Returns `true` if the specified object property is of the given type;
     * `false` otherwise.
     *
     * @func
     * @memberOf R
     * @category Type
     * @sig Type -> String -> Object -> Boolean
     * @param {Function} type
     * @param {String} name
     * @param {*} obj
     * @return {Boolean}
     * @see R.is
     * @see R.propSatisfies
     * @example
     *
     *      R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
     *      R.propIs(Number, 'x', {x: 'foo'});    //=> false
     *      R.propIs(Number, 'x', {});            //=> false
     */
    var propIs = _curry3(function propIs(type, name, obj) {
        return propSatisfies(is(type), name, obj);
    });

    /**
     * Returns a single item by iterating through the list, successively calling the iterator
     * function and passing it an accumulator value and the current value from the array, and
     * then passing the result to the next call.
     *
     * The iterator function receives two values: *(acc, value)*.  It may use `R.reduced` to
     * shortcut the iteration.
     *
     * Note: `R.reduce` does not skip deleted or unassigned indices (sparse arrays), unlike
     * the native `Array.prototype.reduce` method. For more details on this behavior, see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
     * @see R.reduced
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a,b -> a) -> a -> [b] -> a
     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
     *        current element from the array.
     * @param {*} acc The accumulator value.
     * @param {Array} list The list to iterate over.
     * @return {*} The final, accumulated value.
     * @example
     *
     *      var numbers = [1, 2, 3];
     *      var add = function(a, b) {
     *        return a + b;
     *      };
     *
     *      R.reduce(add, 10, numbers); //=> 16
     */
    var reduce = _curry3(_reduce);

    /**
     * Similar to `filter`, except that it keeps only values for which the given predicate
     * function returns falsy. The predicate function is passed one argument: *(value)*.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> Boolean) -> [a] -> [a]
     * @param {Function} fn The function called per iteration.
     * @param {Array} list The collection to iterate over.
     * @return {Array} The new filtered array.
     * @see R.filter
     * @example
     *
     *      var isOdd = function(n) {
     *        return n % 2 === 1;
     *      };
     *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
     */
    var reject = _curry2(function reject(fn, list) {
        return filter(_complement(fn), list);
    });

    /**
     * Returns a fixed list of size `n` containing a specified identical value.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig a -> n -> [a]
     * @param {*} value The value to repeat.
     * @param {Number} n The desired size of the output list.
     * @return {Array} A new array containing `n` `value`s.
     * @example
     *
     *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
     *
     *      var obj = {};
     *      var repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
     *      repeatedObjs[0] === repeatedObjs[1]; //=> true
     */
    var repeat = _curry2(function repeat(value, n) {
        return times(always(value), n);
    });

    /**
     * Returns the elements of the given list or string (or object with a `slice`
     * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
     *
     * @func
     * @memberOf R
     * @category List
     * @sig Number -> Number -> [a] -> [a]
     * @sig Number -> Number -> String -> String
     * @param {Number} fromIndex The start index (inclusive).
     * @param {Number} toIndex The end index (exclusive).
     * @param {*} list
     * @return {*}
     * @example
     *
     *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
     *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
     *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
     *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
     *      R.slice(0, 3, 'ramda');                     //=> 'ram'
     */
    var slice = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
        return Array.prototype.slice.call(list, fromIndex, toIndex);
    }));

    /**
     * Splits a collection into slices of the specified length.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig Number -> [a] -> [[a]]
     * @sig Number -> String -> [String]
     * @param {Number} n
     * @param {Array} list
     * @return {Array}
     * @example
     *
     *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
     *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
     */
    var splitEvery = _curry2(function splitEvery(n, list) {
        if (n <= 0) {
            throw new Error('First argument to splitEvery must be a positive integer');
        }
        var result = [];
        var idx = 0;
        while (idx < list.length) {
            result.push(slice(idx, idx += n, list));
        }
        return result;
    });

    /**
     * Adds together all the elements of a list.
     *
     * @func
     * @memberOf R
     * @category Math
     * @sig [Number] -> Number
     * @param {Array} list An array of numbers
     * @return {Number} The sum of all the numbers in the list.
     * @see R.reduce
     * @example
     *
     *      R.sum([2,4,6,8,100,1]); //=> 121
     */
    var sum = reduce(add, 0);

    /**
     * Returns all but the first element of the given list or string (or object
     * with a `tail` method).
     *
     * @func
     * @memberOf R
     * @category List
     * @see R.head, R.init, R.last
     * @sig [a] -> [a]
     * @sig String -> String
     * @param {*} list
     * @return {*}
     * @example
     *
     *      R.tail([1, 2, 3]);  //=> [2, 3]
     *      R.tail([1, 2]);     //=> [2]
     *      R.tail([1]);        //=> []
     *      R.tail([]);         //=> []
     *
     *      R.tail('abc');  //=> 'bc'
     *      R.tail('ab');   //=> 'b'
     *      R.tail('a');    //=> ''
     *      R.tail('');     //=> ''
     */
    var tail = _checkForMethod('tail', slice(1, Infinity));

    /**
     * Returns the first `n` elements of the given list, string, or
     * transducer/transformer (or object with a `take` method).
     *
     * @func
     * @memberOf R
     * @category List
     * @sig Number -> [a] -> [a]
     * @sig Number -> String -> String
     * @param {Number} n
     * @param {*} list
     * @return {*}
     * @see R.drop
     * @example
     *
     *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
     *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
     *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
     *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
     *      R.take(3, 'ramda');               //=> 'ram'
     *
     *      var personnel = [
     *        'Dave Brubeck',
     *        'Paul Desmond',
     *        'Eugene Wright',
     *        'Joe Morello',
     *        'Gerry Mulligan',
     *        'Bob Bates',
     *        'Joe Dodge',
     *        'Ron Crotty'
     *      ];
     *
     *      var takeFive = R.take(5);
     *      takeFive(personnel);
     *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
     */
    var take = _curry2(_dispatchable('take', _xtake, function take(n, xs) {
        return slice(0, n < 0 ? Infinity : n, xs);
    }));

    /**
     * Returns a new list containing the first `n` elements of a given list, passing each value
     * to the supplied predicate function, and terminating when the predicate function returns
     * `false`. Excludes the element that caused the predicate function to fail. The predicate
     * function is passed one argument: *(value)*.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> Boolean) -> [a] -> [a]
     * @param {Function} fn The function called per iteration.
     * @param {Array} list The collection to iterate over.
     * @return {Array} A new array.
     * @see R.dropWhile
     * @example
     *
     *      var isNotFour = function(x) {
     *        return !(x === 4);
     *      };
     *
     *      R.takeWhile(isNotFour, [1, 2, 3, 4]); //=> [1, 2, 3]
     */
    var takeWhile = _curry2(_dispatchable('takeWhile', _xtakeWhile, function takeWhile(fn, list) {
        var idx = 0, len = list.length;
        while (idx < len && fn(list[idx])) {
            idx += 1;
        }
        return _slice(list, 0, idx);
    }));

    /**
     * Initializes a transducer using supplied iterator function. Returns a single item by
     * iterating through the list, successively calling the transformed iterator function and
     * passing it an accumulator value and the current value from the array, and then passing
     * the result to the next call.
     *
     * The iterator function receives two values: *(acc, value)*. It will be wrapped as a
     * transformer to initialize the transducer. A transformer can be passed directly in place
     * of an iterator function.  In both cases, iteration may be stopped early with the
     * `R.reduced` function.
     *
     * A transducer is a function that accepts a transformer and returns a transformer and can
     * be composed directly.
     *
     * A transformer is an an object that provides a 2-arity reducing iterator function, step,
     * 0-arity initial value function, init, and 1-arity result extraction function, result.
     * The step function is used as the iterator function in reduce. The result function is used
     * to convert the final accumulator into the return type and in most cases is R.identity.
     * The init function can be used to provide an initial accumulator, but is ignored by transduce.
     *
     * The iteration is performed with R.reduce after initializing the transducer.
     *
     * @func
     * @memberOf R
     * @category List
     * @see R.reduce, R.reduced, R.into
     * @sig (c -> c) -> (a,b -> a) -> a -> [b] -> a
     * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
     *        current element from the array. Wrapped as transformer, if necessary, and used to
     *        initialize the transducer
     * @param {*} acc The initial accumulator value.
     * @param {Array} list The list to iterate over.
     * @return {*} The final, accumulated value.
     * @example
     *
     *      var numbers = [1, 2, 3, 4];
     *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
     *
     *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
     */
    var transduce = curryN(4, function transduce(xf, fn, acc, list) {
        return _reduce(xf(typeof fn === 'function' ? _xwrap(fn) : fn), acc, list);
    });

    /**
     * Combines two lists into a set (i.e. no duplicates) composed of the elements of each list.  Duplication is
     * determined according to the value returned by applying the supplied predicate to two list elements.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig (a,a -> Boolean) -> [a] -> [a] -> [a]
     * @param {Function} pred A predicate used to test whether two items are equal.
     * @param {Array} list1 The first list.
     * @param {Array} list2 The second list.
     * @return {Array} The first and second lists concatenated, with
     *         duplicates removed.
     * @see R.union
     * @example
     *
     *      function cmp(x, y) { return x.a === y.a; }
     *      var l1 = [{a: 1}, {a: 2}];
     *      var l2 = [{a: 1}, {a: 4}];
     *      R.unionWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
     */
    var unionWith = _curry3(function unionWith(pred, list1, list2) {
        return uniqWith(pred, _concat(list1, list2));
    });

    /**
     * Returns a new list containing only one copy of each element in the original list.
     * `R.equals` is used to determine equality.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig [a] -> [a]
     * @param {Array} list The array to consider.
     * @return {Array} The list of unique items.
     * @example
     *
     *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
     *      R.uniq([1, '1']);     //=> [1, '1']
     *      R.uniq([[42], [42]]); //=> [[42]]
     */
    var uniq = uniqWith(equals);

    /**
     * Returns a new list by pulling every item at the first level of nesting out, and putting
     * them in a new array.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig [a] -> [b]
     * @param {Array} list The array to consider.
     * @return {Array} The flattened list.
     * @see R.flatten
     * @example
     *
     *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
     *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
     */
    var unnest = _curry1(_makeFlat(false));

    /**
     * Accepts a function `fn` and any number of transformer functions and returns a new
     * function. When the new function is invoked, it calls the function `fn` with parameters
     * consisting of the result of calling each supplied handler on successive arguments to the
     * new function.
     *
     * If more arguments are passed to the returned function than transformer functions, those
     * arguments are passed directly to `fn` as additional parameters. If you expect additional
     * arguments that don't need to be transformed, although you can ignore them, it's best to
     * pass an identity function so that the new function reports the correct arity.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig (x1 -> x2 -> ... -> z) -> ((a -> x1), (b -> x2), ...) -> (a -> b -> ... -> z)
     * @param {Function} fn The function to wrap.
     * @param {...Function} transformers A variable number of transformer functions
     * @return {Function} The wrapped function.
     * @example
     *
     *      var double = function(y) { return y * 2; };
     *      var square = function(x) { return x * x; };
     *      var add = function(a, b) { return a + b; };
     *      // Adds any number of arguments together
     *      var addAll = function() {
     *        return R.reduce(add, 0, arguments);
     *      };
     *
     *      // Basic example
     *      var addDoubleAndSquare = R.useWith(addAll, double, square);
     *
     *      //≅ addAll(double(10), square(5));
     *      addDoubleAndSquare(10, 5); //=> 45
     *
     *      // Example of passing more arguments than transformers
     *      //≅ addAll(double(10), square(5), 100);
     *      addDoubleAndSquare(10, 5, 100); //=> 145
     *
     *      // If there are extra _expected_ arguments that don't need to be transformed, although
     *      // you can ignore them, it might be best to pass in the identity function so that the new
     *      // function correctly reports arity.
     *      var addDoubleAndSquareWithExtraParams = R.useWith(addAll, double, square, R.identity);
     *      // addDoubleAndSquareWithExtraParams.length //=> 3
     *      //≅ addAll(double(10), square(5), R.identity(100));
     *      addDoubleAndSquare(10, 5, 100); //=> 145
     */
    /*, transformers */
    var useWith = curry(function useWith(fn) {
        var transformers = _slice(arguments, 1);
        var tlen = transformers.length;
        return curry(_arity(tlen, function () {
            var args = [], idx = 0;
            while (idx < tlen) {
                args[idx] = transformers[idx](arguments[idx]);
                idx += 1;
            }
            return fn.apply(this, args.concat(_slice(arguments, tlen)));
        }));
    });

    /**
     * Takes a spec object and a test object; returns true if the test satisfies
     * the spec, false otherwise. An object satisfies the spec if, for each of the
     * spec's own properties, accessing that property of the object gives the same
     * value (in `R.equals` terms) as accessing that property of the spec.
     *
     * `whereEq` is a specialization of [`where`](#where).
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig {String: *} -> {String: *} -> Boolean
     * @param {Object} spec
     * @param {Object} testObj
     * @return {Boolean}
     * @see R.where
     * @example
     *
     *      // pred :: Object -> Boolean
     *      var pred = R.whereEq({a: 1, b: 2});
     *
     *      pred({a: 1});              //=> false
     *      pred({a: 1, b: 2});        //=> true
     *      pred({a: 1, b: 2, c: 3});  //=> true
     *      pred({a: 1, b: 1});        //=> false
     */
    var whereEq = _curry2(function whereEq(spec, testObj) {
        return where(mapObj(equals, spec), testObj);
    });

    var _flatCat = function () {
        var preservingReduced = function (xf) {
            return {
                '@@transducer/init': _xfBase.init,
                '@@transducer/result': function (result) {
                    return xf['@@transducer/result'](result);
                },
                '@@transducer/step': function (result, input) {
                    var ret = xf['@@transducer/step'](result, input);
                    return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
                }
            };
        };
        return function _xcat(xf) {
            var rxf = preservingReduced(xf);
            return {
                '@@transducer/init': _xfBase.init,
                '@@transducer/result': function (result) {
                    return rxf['@@transducer/result'](result);
                },
                '@@transducer/step': function (result, input) {
                    return !isArrayLike(input) ? _reduce(rxf, result, [input]) : _reduce(rxf, result, input);
                }
            };
        };
    }();

    var _indexOf = function _indexOf(list, item, from) {
        var idx = from;
        while (idx < list.length) {
            if (equals(list[idx], item)) {
                return idx;
            }
            idx += 1;
        }
        return -1;
    };

    /**
     * Create a predicate wrapper which will call a pick function (all/any) for each predicate
     *
     * @private
     * @see R.all
     * @see R.any
     */
    // Call function immediately if given arguments
    // Return a function which will call the predicates with the provided arguments
    var _predicateWrap = function _predicateWrap(predPicker) {
        return function (preds) {
            var predIterator = function () {
                var args = arguments;
                return predPicker(function (predicate) {
                    return predicate.apply(null, args);
                }, preds);
            };
            return arguments.length > 1 ? // Call function immediately if given arguments
            predIterator.apply(null, _slice(arguments, 1)) : // Return a function which will call the predicates with the provided arguments
            _arity(Math.max.apply(Math, pluck('length', preds)), predIterator);
        };
    };

    var _xchain = _curry2(function _xchain(f, xf) {
        return map(f, _flatCat(xf));
    });

    /**
     * Given a list of predicates, returns a new predicate that will be true exactly when all of them are.
     *
     * @func
     * @memberOf R
     * @category Logic
     * @sig [(*... -> Boolean)] -> (*... -> Boolean)
     * @param {Array} list An array of predicate functions
     * @param {*} optional Any arguments to pass into the predicates
     * @return {Function} a function that applies its arguments to each of
     *         the predicates, returning `true` if all are satisfied.
     * @see R.anyPass
     * @example
     *
     *      var gt10 = function(x) { return x > 10; };
     *      var even = function(x) { return x % 2 === 0};
     *      var f = R.allPass([gt10, even]);
     *      f(11); //=> false
     *      f(12); //=> true
     */
    var allPass = _curry1(_predicateWrap(all));

    /**
     * Given a list of predicates returns a new predicate that will be true exactly when any one of them is.
     *
     * @func
     * @memberOf R
     * @category Logic
     * @sig [(*... -> Boolean)] -> (*... -> Boolean)
     * @param {Array} list An array of predicate functions
     * @param {*} optional Any arguments to pass into the predicates
     * @return {Function} A function that applies its arguments to each of the predicates, returning
     *         `true` if all are satisfied.
     * @see R.allPass
     * @example
     *
     *      var gt10 = function(x) { return x > 10; };
     *      var even = function(x) { return x % 2 === 0};
     *      var f = R.anyPass([gt10, even]);
     *      f(11); //=> true
     *      f(8); //=> true
     *      f(9); //=> false
     */
    var anyPass = _curry1(_predicateWrap(any));

    /**
     * ap applies a list of functions to a list of values.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig [f] -> [a] -> [f a]
     * @param {Array} fns An array of functions
     * @param {Array} vs An array of values
     * @return {Array} An array of results of applying each of `fns` to all of `vs` in turn.
     * @example
     *
     *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
     */
    var ap = _curry2(function ap(fns, vs) {
        return _hasMethod('ap', fns) ? fns.ap(vs) : _reduce(function (acc, fn) {
            return _concat(acc, map(fn, vs));
        }, [], fns);
    });

    /**
     * Returns the result of calling its first argument with the remaining
     * arguments. This is occasionally useful as a converging function for
     * `R.converge`: the left branch can produce a function while the right
     * branch produces a value to be passed to that function as an argument.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig (*... -> a),*... -> a
     * @param {Function} fn The function to apply to the remaining arguments.
     * @param {...*} args Any number of positional arguments.
     * @return {*}
     * @see R.apply
     * @example
     *
     *      var indentN = R.pipe(R.times(R.always(' ')),
     *                           R.join(''),
     *                           R.replace(/^(?!$)/gm));
     *
     *      var format = R.converge(R.call,
     *                              R.pipe(R.prop('indent'), indentN),
     *                              R.prop('value'));
     *
     *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
     */
    var call = curry(function call(fn) {
        return fn.apply(this, _slice(arguments, 1));
    });

    /**
     * `chain` maps a function over a list and concatenates the results.
     * This implementation is compatible with the
     * Fantasy-land Chain spec, and will work with types that implement that spec.
     * `chain` is also known as `flatMap` in some libraries
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> [b]) -> [a] -> [b]
     * @param {Function} fn
     * @param {Array} list
     * @return {Array}
     * @example
     *
     *      var duplicate = function(n) {
     *        return [n, n];
     *      };
     *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
     */
    var chain = _curry2(_dispatchable('chain', _xchain, function chain(fn, list) {
        return unnest(map(fn, list));
    }));

    /**
     * Turns a list of Functors into a Functor of a list, applying
     * a mapping function to the elements of the list along the way.
     *
     * @func
     * @memberOf R
     * @category List
     * @see R.commute
     * @sig Functor f => (f a -> f b) -> (x -> f x) -> [f a] -> f [b]
     * @param {Function} fn The transformation function
     * @param {Function} of A function that returns the data type to return
     * @param {Array} list An array of functors of the same type
     * @return {*}
     * @example
     *
     *      R.commuteMap(R.map(R.add(10)), R.of, [[1], [2, 3]]);   //=> [[11, 12], [11, 13]]
     *      R.commuteMap(R.map(R.add(10)), R.of, [[1, 2], [3]]);   //=> [[11, 13], [12, 13]]
     *      R.commuteMap(R.map(R.add(10)), R.of, [[1], [2], [3]]); //=> [[11, 12, 13]]
     *      R.commuteMap(R.map(R.add(10)), Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([11, 12, 13])
     *      R.commuteMap(R.map(R.add(10)), Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
     */
    var commuteMap = _curry3(function commuteMap(fn, of, list) {
        function consF(acc, ftor) {
            return ap(map(append, fn(ftor)), acc);
        }
        return _reduce(consF, of([]), list);
    });

    /**
     * Wraps a constructor function inside a curried function that can be called with the same
     * arguments and returns the same type. The arity of the function returned is specified
     * to allow using variadic constructor functions.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig Number -> (* -> {*}) -> (* -> {*})
     * @param {Number} n The arity of the constructor function.
     * @param {Function} Fn The constructor function to wrap.
     * @return {Function} A wrapped, curried constructor function.
     * @example
     *
     *      // Variadic constructor function
     *      var Widget = function() {
     *        this.children = Array.prototype.slice.call(arguments);
     *        // ...
     *      };
     *      Widget.prototype = {
     *        // ...
     *      };
     *      var allConfigs = [
     *        // ...
     *      ];
     *      R.map(R.constructN(1, Widget), allConfigs); // a list of Widgets
     */
    var constructN = _curry2(function constructN(n, Fn) {
        if (n > 10) {
            throw new Error('Constructor with greater than ten arguments');
        }
        if (n === 0) {
            return function () {
                return new Fn();
            };
        }
        return curry(nAry(n, function ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
            switch (arguments.length) {
            case 1:
                return new Fn($0);
            case 2:
                return new Fn($0, $1);
            case 3:
                return new Fn($0, $1, $2);
            case 4:
                return new Fn($0, $1, $2, $3);
            case 5:
                return new Fn($0, $1, $2, $3, $4);
            case 6:
                return new Fn($0, $1, $2, $3, $4, $5);
            case 7:
                return new Fn($0, $1, $2, $3, $4, $5, $6);
            case 8:
                return new Fn($0, $1, $2, $3, $4, $5, $6, $7);
            case 9:
                return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);
            case 10:
                return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
            }
        }));
    });

    /**
     * Accepts at least three functions and returns a new function. When invoked, this new
     * function will invoke the first function, `after`, passing as its arguments the
     * results of invoking the subsequent functions with whatever arguments are passed to
     * the new function.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig (x1 -> x2 -> ... -> z) -> ((a -> b -> ... -> x1), (a -> b -> ... -> x2), ...) -> (a -> b -> ... -> z)
     * @param {Function} after A function. `after` will be invoked with the return values of
     *        `fn1` and `fn2` as its arguments.
     * @param {...Function} functions A variable number of functions.
     * @return {Function} A new function.
     * @example
     *
     *      var add = function(a, b) { return a + b; };
     *      var multiply = function(a, b) { return a * b; };
     *      var subtract = function(a, b) { return a - b; };
     *
     *      //≅ multiply( add(1, 2), subtract(1, 2) );
     *      R.converge(multiply, add, subtract)(1, 2); //=> -3
     *
     *      var add3 = function(a, b, c) { return a + b + c; };
     *      R.converge(add3, multiply, add, subtract)(1, 2); //=> 4
     */
    var converge = curryN(3, function converge(after) {
        var fns = _slice(arguments, 1);
        return curryN(Math.max.apply(Math, pluck('length', fns)), function () {
            var args = arguments;
            var context = this;
            return after.apply(context, _map(function (fn) {
                return fn.apply(context, args);
            }, fns));
        });
    });

    /**
     * Returns all but the first `n` elements of the given list, string, or
     * transducer/transformer (or object with a `drop` method).
     *
     * @func
     * @memberOf R
     * @category List
     * @see R.transduce
     * @sig Number -> [a] -> [a]
     * @sig Number -> String -> String
     * @param {Number} n
     * @param {*} list
     * @return {*}
     * @see R.take
     * @example
     *
     *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
     *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
     *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
     *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
     *      R.drop(3, 'ramda');               //=> 'da'
     */
    var drop = _curry2(_dispatchable('drop', _xdrop, function drop(n, xs) {
        return slice(Math.max(0, n), Infinity, xs);
    }));

    /**
     * Returns a list containing all but the last `n` elements of the given `list`.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig Number -> [a] -> [a]
     * @sig Number -> String -> String
     * @param {Number} n The number of elements of `xs` to skip.
     * @param {Array} xs The collection to consider.
     * @return {Array}
     * @see R.takeLast
     * @example
     *
     *      R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
     *      R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
     *      R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
     *      R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
     *      R.dropLast(3, 'ramda');               //=> 'ra'
     */
    var dropLast = _curry2(function dropLast(n, xs) {
        return take(n < xs.length ? xs.length - n : 0, xs);
    });

    /**
     * Returns a new list without any consecutively repeating elements. Equality is
     * determined by applying the supplied predicate two consecutive elements.
     * The first element in a series of equal element is the one being preserved.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a, a -> Boolean) -> [a] -> [a]
     * @param {Function} pred A predicate used to test whether two items are equal.
     * @param {Array} list The array to consider.
     * @return {Array} `list` without repeating elements.
     * @example
     *
     *      function lengthEq(x, y) { return Math.abs(x) === Math.abs(y); };
     *      var l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
     *      R.dropRepeatsWith(lengthEq, l); //=> [1, 3, 4, -5, 3]
     */
    var dropRepeatsWith = _curry2(_dispatchable('dropRepeatsWith', _xdropRepeatsWith, function dropRepeatsWith(pred, list) {
        var result = [];
        var idx = 1;
        var len = list.length;
        if (len !== 0) {
            result[0] = list[0];
            while (idx < len) {
                if (!pred(last(result), list[idx])) {
                    result[result.length] = list[idx];
                }
                idx += 1;
            }
        }
        return result;
    }));

    /**
     * Reports whether two objects have the same value, in `R.equals` terms,
     * for the specified property. Useful as a curried predicate.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig k -> {k: v} -> {k: v} -> Boolean
     * @param {String} prop The name of the property to compare
     * @param {Object} obj1
     * @param {Object} obj2
     * @return {Boolean}
     *
     * @example
     *
     *      var o1 = { a: 1, b: 2, c: 3, d: 4 };
     *      var o2 = { a: 10, b: 20, c: 3, d: 40 };
     *      R.eqProps('a', o1, o2); //=> false
     *      R.eqProps('c', o1, o2); //=> true
     */
    var eqProps = _curry3(function eqProps(prop, obj1, obj2) {
        return equals(obj1[prop], obj2[prop]);
    });

    /**
     * Returns the position of the first occurrence of an item in an array,
     * or -1 if the item is not included in the array. `R.equals` is used to
     * determine equality.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig a -> [a] -> Number
     * @param {*} target The item to find.
     * @param {Array} xs The array to search in.
     * @return {Number} the index of the target, or -1 if the target is not found.
     * @see R.lastIndexOf
     * @example
     *
     *      R.indexOf(3, [1,2,3,4]); //=> 2
     *      R.indexOf(10, [1,2,3,4]); //=> -1
     */
    var indexOf = _curry2(function indexOf(target, xs) {
        return _hasMethod('indexOf', xs) ? xs.indexOf(target) : _indexOf(xs, target, 0);
    });

    /**
     * Returns all but the last element of the given list or string.
     *
     * @func
     * @memberOf R
     * @category List
     * @see R.last, R.head, R.tail
     * @sig [a] -> [a]
     * @sig String -> String
     * @param {*} list
     * @return {*}
     * @example
     *
     *      R.init([1, 2, 3]);  //=> [1, 2]
     *      R.init([1, 2]);     //=> [1]
     *      R.init([1]);        //=> []
     *      R.init([]);         //=> []
     *
     *      R.init('abc');  //=> 'ab'
     *      R.init('ab');   //=> 'a'
     *      R.init('a');    //=> ''
     *      R.init('');     //=> ''
     */
    var init = slice(0, -1);

    /**
     * Returns `true` if all elements are unique, in `R.equals` terms,
     * otherwise `false`.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig [a] -> Boolean
     * @param {Array} list The array to consider.
     * @return {Boolean} `true` if all elements are unique, else `false`.
     * @example
     *
     *      R.isSet(['1', 1]); //=> true
     *      R.isSet([1, 1]);   //=> false
     *      R.isSet([[42], [42]]); //=> false
     */
    var isSet = _curry1(function isSet(list) {
        var len = list.length;
        var idx = 0;
        while (idx < len) {
            if (_indexOf(list, list[idx], idx + 1) >= 0) {
                return false;
            }
            idx += 1;
        }
        return true;
    });

    /**
     * Returns a lens for the given getter and setter functions. The getter "gets"
     * the value of the focus; the setter "sets" the value of the focus. The setter
     * should not mutate the data structure.
     *
     * @func
     * @memberOf R
     * @category Object
     * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
     * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
     * @param {Function} getter
     * @param {Function} setter
     * @return {Lens}
     * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
     * @example
     *
     *      var xLens = R.lens(R.prop('x'), R.assoc('x'));
     *
     *      R.view(xLens, {x: 1, y: 2});            //=> 1
     *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
     *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
     */
    var lens = _curry2(function lens(getter, setter) {
        return function (f) {
            return function (s) {
                return map(function (v) {
                    return setter(v, s);
                }, f(getter(s)));
            };
        };
    });

    /**
     * Returns a lens whose focus is the specified index.
     *
     * @func
     * @memberOf R
     * @category Object
     * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
     * @sig Number -> Lens s a
     * @param {Number} n
     * @return {Lens}
     * @see R.view, R.set, R.over
     * @example
     *
     *      var headLens = R.lensIndex(0);
     *
     *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
     *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
     *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
     */
    var lensIndex = _curry1(function lensIndex(n) {
        return lens(nth(n), update(n));
    });

    /**
     * Returns a lens whose focus is the specified property.
     *
     * @func
     * @memberOf R
     * @category Object
     * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
     * @sig String -> Lens s a
     * @param {String} k
     * @return {Lens}
     * @see R.view, R.set, R.over
     * @example
     *
     *      var xLens = R.lensProp('x');
     *
     *      R.view(xLens, {x: 1, y: 2});            //=> 1
     *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
     *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
     */
    var lensProp = _curry1(function lensProp(k) {
        return lens(prop(k), assoc(k));
    });

    /**
     * "lifts" a function to be the specified arity, so that it may "map over" that many
     * lists (or other Functors).
     *
     * @func
     * @memberOf R
     * @see R.lift
     * @category Function
     * @sig Number -> (*... -> *) -> ([*]... -> [*])
     * @param {Function} fn The function to lift into higher context
     * @return {Function} The function `fn` applicable to mappable objects.
     * @example
     *
     *      var madd3 = R.liftN(3, R.curryN(3, function() {
     *        return R.reduce(R.add, 0, arguments);
     *      }));
     *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
     */
    var liftN = _curry2(function liftN(arity, fn) {
        var lifted = curryN(arity, fn);
        return curryN(arity, function () {
            return _reduce(ap, map(lifted, arguments[0]), _slice(arguments, 1));
        });
    });

    /**
     * Returns the mean of the given list of numbers.
     *
     * @func
     * @memberOf R
     * @category Math
     * @sig [Number] -> Number
     * @param {Array} list
     * @return {Number}
     * @example
     *
     *      R.mean([2, 7, 9]); //=> 6
     *      R.mean([]); //=> NaN
     */
    var mean = _curry1(function mean(list) {
        return sum(list) / list.length;
    });

    /**
     * Returns the median of the given list of numbers.
     *
     * @func
     * @memberOf R
     * @category Math
     * @sig [Number] -> Number
     * @param {Array} list
     * @return {Number}
     * @example
     *
     *      R.median([2, 9, 7]); //=> 7
     *      R.median([7, 2, 10, 9]); //=> 8
     *      R.median([]); //=> NaN
     */
    var median = _curry1(function median(list) {
        var len = list.length;
        if (len === 0) {
            return NaN;
        }
        var width = 2 - len % 2;
        var idx = (len - width) / 2;
        return mean(_slice(list).sort(function (a, b) {
            return a < b ? -1 : a > b ? 1 : 0;
        }).slice(idx, idx + width));
    });

    /**
     * Merges a list of objects together into one object.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig [{k: v}] -> {k: v}
     * @param {Array} list An array of objects
     * @return {Object} A merged object.
     * @see R.reduce
     * @example
     *
     *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
     *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
     */
    var mergeAll = _curry1(function mergeAll(list) {
        return reduce(merge, {}, list);
    });

    /**
     * Performs left-to-right function composition. The leftmost function may have
     * any arity; the remaining functions must be unary.
     *
     * In some libraries this function is named `sequence`.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> (a -> b -> ... -> n -> z)
     * @param {...Function} functions
     * @return {Function}
     * @see R.compose
     * @example
     *
     *      var f = R.pipe(Math.pow, R.negate, R.inc);
     *
     *      f(3, 4); // -(3^4) + 1
     */
    var pipe = function pipe() {
        if (arguments.length === 0) {
            throw new Error('pipe requires at least one argument');
        }
        return curryN(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
    };

    /**
     * Performs left-to-right composition of one or more Promise-returning
     * functions. The leftmost function may have any arity; the remaining
     * functions must be unary.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig ((a -> Promise b), (b -> Promise c), ..., (y -> Promise z)) -> (a -> Promise z)
     * @param {...Function} functions
     * @return {Function}
     * @see R.composeP
     * @example
     *
     *      //  followersForUser :: String -> Promise [User]
     *      var followersForUser = R.pipeP(db.getUserById, db.getFollowers);
     */
    var pipeP = function pipeP() {
        if (arguments.length === 0) {
            throw new Error('pipeP requires at least one argument');
        }
        return curryN(arguments[0].length, reduce(_pipeP, arguments[0], tail(arguments)));
    };

    /**
     * Multiplies together all the elements of a list.
     *
     * @func
     * @memberOf R
     * @category Math
     * @sig [Number] -> Number
     * @param {Array} list An array of numbers
     * @return {Number} The product of all the numbers in the list.
     * @see R.reduce
     * @example
     *
     *      R.product([2,4,6,8,100,1]); //=> 38400
     */
    var product = reduce(multiply, 1);

    /**
     * Reasonable analog to SQL `select` statement.
     *
     * @func
     * @memberOf R
     * @category Object
     * @category Relation
     * @sig [k] -> [{k: v}] -> [{k: v}]
     * @param {Array} props The property names to project
     * @param {Array} objs The objects to query
     * @return {Array} An array of objects with just the `props` properties.
     * @example
     *
     *      var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
     *      var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
     *      var kids = [abby, fred];
     *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
     */
    // passing `identity` gives correct arity
    var project = useWith(_map, pickAll, identity);

    /**
     * Returns a new list containing the last `n` elements of the given list.
     * If `n > list.length`, returns a list of `list.length` elements.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig Number -> [a] -> [a]
     * @sig Number -> String -> String
     * @param {Number} n The number of elements to return.
     * @param {Array} xs The collection to consider.
     * @return {Array}
     * @see R.dropLast
     * @example
     *
     *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
     *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['for', 'baz']
     *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
     *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
     *      R.takeLast(3, 'ramda');               //=> 'mda'
     */
    var takeLast = _curry2(function takeLast(n, xs) {
        return drop(n >= 0 ? xs.length - n : 0, xs);
    });

    var _contains = function _contains(a, list) {
        return _indexOf(list, a, 0) >= 0;
    };

    //  mapPairs :: (Object, [String]) -> [String]
    // Function, RegExp, user-defined types
    var _toString = function _toString(x, seen) {
        var recur = function recur(y) {
            var xs = seen.concat([x]);
            return _contains(y, xs) ? '<Circular>' : _toString(y, xs);
        };
        //  mapPairs :: (Object, [String]) -> [String]
        var mapPairs = function (obj, keys) {
            return _map(function (k) {
                return _quote(k) + ': ' + recur(obj[k]);
            }, keys.slice().sort());
        };
        switch (Object.prototype.toString.call(x)) {
        case '[object Arguments]':
            return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';
        case '[object Array]':
            return '[' + _map(recur, x).concat(mapPairs(x, reject(test(/^\d+$/), keys(x)))).join(', ') + ']';
        case '[object Boolean]':
            return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
        case '[object Date]':
            return 'new Date(' + _quote(_toISOString(x)) + ')';
        case '[object Null]':
            return 'null';
        case '[object Number]':
            return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
        case '[object String]':
            return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);
        case '[object Undefined]':
            return 'undefined';
        default:
            return typeof x.constructor === 'function' && x.constructor.name !== 'Object' && typeof x.toString === 'function' && x.toString() !== '[object Object]' ? x.toString() : // Function, RegExp, user-defined types
            '{' + mapPairs(x, keys(x)).join(', ') + '}';
        }
    };

    /**
     * Turns a list of Functors into a Functor of a list.
     *
     * @func
     * @memberOf R
     * @category List
     * @see R.commuteMap
     * @sig Functor f => (x -> f x) -> [f a] -> f [a]
     * @param {Function} of A function that returns the data type to return
     * @param {Array} list An array of functors of the same type
     * @return {*}
     * @example
     *
     *      R.commute(R.of, [[1], [2, 3]]);   //=> [[1, 2], [1, 3]]
     *      R.commute(R.of, [[1, 2], [3]]);   //=> [[1, 3], [2, 3]]
     *      R.commute(R.of, [[1], [2], [3]]); //=> [[1, 2, 3]]
     *      R.commute(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
     *      R.commute(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
     */
    var commute = commuteMap(identity);

    /**
     * Performs right-to-left function composition. The rightmost function may have
     * any arity; the remaining functions must be unary.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> (a -> b -> ... -> n -> z)
     * @param {...Function} functions
     * @return {Function}
     * @see R.pipe
     * @example
     *
     *      var f = R.compose(R.inc, R.negate, Math.pow);
     *
     *      f(3, 4); // -(3^4) + 1
     */
    var compose = function compose() {
        if (arguments.length === 0) {
            throw new Error('compose requires at least one argument');
        }
        return pipe.apply(this, reverse(arguments));
    };

    /**
     * Returns the right-to-left Kleisli composition of the provided functions,
     * each of which must return a value of a type supported by [`chain`](#chain).
     *
     * `R.composeK(h, g, f)` is equivalent to `R.compose(R.chain(h), R.chain(g), R.chain(f))`.
     *
     * @func
     * @memberOf R
     * @category Function
     * @see R.pipeK
     * @sig Chain m => ((y -> m z), (x -> m y), ..., (a -> m b)) -> (m a -> m z)
     * @param {...Function}
     * @return {Function}
     * @example
     *
     *      //  parseJson :: String -> Maybe *
     *      //  get :: String -> Object -> Maybe *
     *
     *      //  getStateCode :: Maybe String -> Maybe String
     *      var getStateCode = R.composeK(
     *        R.compose(Maybe.of, R.toUpper),
     *        get('state'),
     *        get('address'),
     *        get('user'),
     *        parseJson
     *      );
     *
     *      getStateCode(Maybe.of('{"user":{"address":{"state":"ny"}}}'));
     *      //=> Just('NY')
     *      getStateCode(Maybe.of('[Invalid JSON]'));
     *      //=> Nothing()
     */
    var composeK = function composeK() {
        return arguments.length === 0 ? identity : compose.apply(this, map(chain, arguments));
    };

    /**
     * Performs right-to-left composition of one or more Promise-returning
     * functions. The rightmost function may have any arity; the remaining
     * functions must be unary.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig ((y -> Promise z), (x -> Promise y), ..., (a -> Promise b)) -> (a -> Promise z)
     * @param {...Function} functions
     * @return {Function}
     * @see R.pipeP
     * @example
     *
     *      //  followersForUser :: String -> Promise [User]
     *      var followersForUser = R.composeP(db.getFollowers, db.getUserById);
     */
    var composeP = function composeP() {
        if (arguments.length === 0) {
            throw new Error('composeP requires at least one argument');
        }
        return pipeP.apply(this, reverse(arguments));
    };

    /**
     * Wraps a constructor function inside a curried function that can be called with the same
     * arguments and returns the same type.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig (* -> {*}) -> (* -> {*})
     * @param {Function} Fn The constructor function to wrap.
     * @return {Function} A wrapped, curried constructor function.
     * @example
     *
     *      // Constructor function
     *      var Widget = function(config) {
     *        // ...
     *      };
     *      Widget.prototype = {
     *        // ...
     *      };
     *      var allConfigs = [
     *        // ...
     *      ];
     *      R.map(R.construct(Widget), allConfigs); // a list of Widgets
     */
    var construct = _curry1(function construct(Fn) {
        return constructN(Fn.length, Fn);
    });

    /**
     * Returns `true` if the specified value is equal, in `R.equals` terms,
     * to at least one element of the given list; `false` otherwise.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig a -> [a] -> Boolean
     * @param {Object} a The item to compare against.
     * @param {Array} list The array to consider.
     * @return {Boolean} `true` if the item is in the list, `false` otherwise.
     *
     * @example
     *
     *      R.contains(3, [1, 2, 3]); //=> true
     *      R.contains(4, [1, 2, 3]); //=> false
     *      R.contains([42], [[42]]); //=> true
     */
    var contains = _curry2(_contains);

    /**
     * Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig [a] -> [a] -> [a]
     * @param {Array} list1 The first list.
     * @param {Array} list2 The second list.
     * @return {Array} The elements in `list1` that are not in `list2`.
     * @see R.differenceWith
     * @example
     *
     *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
     *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
     */
    var difference = _curry2(function difference(first, second) {
        var out = [];
        var idx = 0;
        var firstLen = first.length;
        while (idx < firstLen) {
            if (!_contains(first[idx], second) && !_contains(first[idx], out)) {
                out[out.length] = first[idx];
            }
            idx += 1;
        }
        return out;
    });

    /**
     * Returns a new list without any consecutively repeating elements.
     * `R.equals` is used to determine equality.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @category List
     * @sig [a] -> [a]
     * @param {Array} list The array to consider.
     * @return {Array} `list` without repeating elements.
     * @example
     *
     *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
     */
    var dropRepeats = _curry1(_dispatchable('dropRepeats', _xdropRepeatsWith(equals), dropRepeatsWith(equals)));

    /**
     * Combines two lists into a set (i.e. no duplicates) composed of those elements common to both lists.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig [a] -> [a] -> [a]
     * @param {Array} list1 The first list.
     * @param {Array} list2 The second list.
     * @see R.intersectionWith
     * @return {Array} The list of elements found in both `list1` and `list2`.
     * @example
     *
     *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
     */
    var intersection = _curry2(function intersection(list1, list2) {
        return uniq(_filter(flip(_contains)(list1), list2));
    });

    /**
     * "lifts" a function of arity > 1 so that it may "map over" an Array or
     * other Functor.
     *
     * @func
     * @memberOf R
     * @see R.liftN
     * @category Function
     * @sig (*... -> *) -> ([*]... -> [*])
     * @param {Function} fn The function to lift into higher context
     * @return {Function} The function `fn` applicable to mappable objects.
     * @example
     *
     *      var madd3 = R.lift(R.curry(function(a, b, c) {
     *        return a + b + c;
     *      }));
     *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
     *
     *      var madd5 = R.lift(R.curry(function(a, b, c, d, e) {
     *        return a + b + c + d + e;
     *      }));
     *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
     */
    var lift = _curry1(function lift(fn) {
        return liftN(fn.length, fn);
    });

    /**
     * Returns a partial copy of an object omitting the keys specified.
     *
     * @func
     * @memberOf R
     * @category Object
     * @sig [String] -> {String: *} -> {String: *}
     * @param {Array} names an array of String property names to omit from the new object
     * @param {Object} obj The object to copy from
     * @return {Object} A new object with properties from `names` not on it.
     * @see R.pick
     * @example
     *
     *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
     */
    var omit = _curry2(function omit(names, obj) {
        var result = {};
        for (var prop in obj) {
            if (!_contains(prop, names)) {
                result[prop] = obj[prop];
            }
        }
        return result;
    });

    /**
     * Returns the left-to-right Kleisli composition of the provided functions,
     * each of which must return a value of a type supported by [`chain`](#chain).
     *
     * `R.pipeK(f, g, h)` is equivalent to `R.pipe(R.chain(f), R.chain(g), R.chain(h))`.
     *
     * @func
     * @memberOf R
     * @category Function
     * @see R.composeK
     * @sig Chain m => ((a -> m b), (b -> m c), ..., (y -> m z)) -> (m a -> m z)
     * @param {...Function}
     * @return {Function}
     * @example
     *
     *      //  parseJson :: String -> Maybe *
     *      //  get :: String -> Object -> Maybe *
     *
     *      //  getStateCode :: Maybe String -> Maybe String
     *      var getStateCode = R.pipeK(
     *        parseJson,
     *        get('user'),
     *        get('address'),
     *        get('state'),
     *        R.compose(Maybe.of, R.toUpper)
     *      );
     *
     *      getStateCode(Maybe.of('{"user":{"address":{"state":"ny"}}}'));
     *      //=> Just('NY')
     *      getStateCode(Maybe.of('[Invalid JSON]'));
     *      //=> Nothing()
     */
    var pipeK = function pipeK() {
        return composeK.apply(this, reverse(arguments));
    };

    /**
     * Returns the string representation of the given value. `eval`'ing the output
     * should result in a value equivalent to the input value. Many of the built-in
     * `toString` methods do not satisfy this requirement.
     *
     * If the given value is an `[object Object]` with a `toString` method other
     * than `Object.prototype.toString`, this method is invoked with no arguments
     * to produce the return value. This means user-defined constructor functions
     * can provide a suitable `toString` method. For example:
     *
     *     function Point(x, y) {
     *       this.x = x;
     *       this.y = y;
     *     }
     *
     *     Point.prototype.toString = function() {
     *       return 'new Point(' + this.x + ', ' + this.y + ')';
     *     };
     *
     *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
     *
     * @func
     * @memberOf R
     * @category String
     * @sig * -> String
     * @param {*} val
     * @return {String}
     * @example
     *
     *      R.toString(42); //=> '42'
     *      R.toString('abc'); //=> '"abc"'
     *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
     *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
     *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
     */
    var toString = _curry1(function toString(val) {
        return _toString(val, []);
    });

    /**
     * Combines two lists into a set (i.e. no duplicates) composed of the
     * elements of each list.
     *
     * @func
     * @memberOf R
     * @category Relation
     * @sig [a] -> [a] -> [a]
     * @param {Array} as The first list.
     * @param {Array} bs The second list.
     * @return {Array} The first and second lists concatenated, with
     *         duplicates removed.
     * @example
     *
     *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
     */
    var union = _curry2(compose(uniq, _concat));

    /**
     * Returns a new list containing only one copy of each element in the
     * original list, based upon the value returned by applying the supplied
     * function to each list element. Prefers the first item if the supplied
     * function produces the same value on two items. `R.equals` is used for
     * comparison.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig (a -> b) -> [a] -> [a]
     * @param {Function} fn A function used to produce a value to use during comparisons.
     * @param {Array} list The array to consider.
     * @return {Array} The list of unique items.
     * @example
     *
     *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
     */
    var uniqBy = _curry2(function uniqBy(fn, list) {
        var idx = 0, applied = [], result = [], appliedItem, item;
        while (idx < list.length) {
            item = list[idx];
            appliedItem = fn(item);
            if (!_contains(appliedItem, applied)) {
                result.push(item);
                applied.push(appliedItem);
            }
            idx += 1;
        }
        return result;
    });

    /**
     * Turns a named method with a specified arity into a function
     * that can be called directly supplied with arguments and a target object.
     *
     * The returned function is curried and accepts `arity + 1` parameters where
     * the final parameter is the target object.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
     * @param {Number} arity Number of arguments the returned function should take
     *        before the target object.
     * @param {Function} method Name of the method to call.
     * @return {Function} A new curried function.
     * @example
     *
     *      var sliceFrom = R.invoker(1, 'slice');
     *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
     *      var sliceFrom6 = R.invoker(2, 'slice')(6);
     *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
     */
    var invoker = _curry2(function invoker(arity, method) {
        return curryN(arity + 1, function () {
            var target = arguments[arity];
            if (target != null && is(Function, target[method])) {
                return target[method].apply(target, _slice(arguments, 0, arity));
            }
            throw new TypeError(toString(target) + ' does not have a method named "' + method + '"');
        });
    });

    /**
     * Returns a string made by inserting the `separator` between each
     * element and concatenating all the elements into a single string.
     *
     * @func
     * @memberOf R
     * @category List
     * @sig String -> [a] -> String
     * @param {Number|String} separator The string used to separate the elements.
     * @param {Array} xs The elements to join into a string.
     * @return {String} str The string made by concatenating `xs` with `separator`.
     * @see R.split
     * @example
     *
     *      var spacer = R.join(' ');
     *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
     *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
     */
    var join = invoker(1, 'join');

    /**
     * Creates a new function that, when invoked, caches the result of calling `fn` for a given
     * argument set and returns the result. Subsequent calls to the memoized `fn` with the same
     * argument set will not result in an additional call to `fn`; instead, the cached result
     * for that set of arguments will be returned.
     *
     * @func
     * @memberOf R
     * @category Function
     * @sig (*... -> a) -> (*... -> a)
     * @param {Function} fn The function to memoize.
     * @return {Function} Memoized version of `fn`.
     * @example
     *
     *      var count = 0;
     *      var factorial = R.memoize(function(n) {
     *        count += 1;
     *        return R.product(R.range(1, n + 1));
     *      });
     *      factorial(5); //=> 120
     *      factorial(5); //=> 120
     *      factorial(5); //=> 120
     *      count; //=> 1
     */
    var memoize = _curry1(function memoize(fn) {
        var cache = {};
        return function () {
            var key = toString(arguments);
            if (!_has(key, cache)) {
                cache[key] = fn.apply(this, arguments);
            }
            return cache[key];
        };
    });

    /**
     * Splits a string into an array of strings based on the given
     * separator.
     *
     * @func
     * @memberOf R
     * @category String
     * @sig String -> String -> [String]
     * @param {String} sep The separator string.
     * @param {String} str The string to separate into an array.
     * @return {Array} The array of strings from `str` separated by `str`.
     * @see R.join
     * @example
     *
     *      var pathComponents = R.split('/');
     *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
     *
     *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
     */
    var split = invoker(1, 'split');

    /**
     * The lower case version of a string.
     *
     * @func
     * @memberOf R
     * @category String
     * @sig String -> String
     * @param {String} str The string to lower case.
     * @return {String} The lower case version of `str`.
     * @see R.toUpper
     * @example
     *
     *      R.toLower('XYZ'); //=> 'xyz'
     */
    var toLower = invoker(0, 'toLowerCase');

    /**
     * The upper case version of a string.
     *
     * @func
     * @memberOf R
     * @category String
     * @sig String -> String
     * @param {String} str The string to upper case.
     * @return {String} The upper case version of `str`.
     * @see R.toLower
     * @example
     *
     *      R.toUpper('abc'); //=> 'ABC'
     */
    var toUpper = invoker(0, 'toUpperCase');

    var R = {
        F: F,
        T: T,
        __: __,
        add: add,
        addIndex: addIndex,
        adjust: adjust,
        all: all,
        allPass: allPass,
        always: always,
        and: and,
        any: any,
        anyPass: anyPass,
        ap: ap,
        aperture: aperture,
        append: append,
        apply: apply,
        assoc: assoc,
        assocPath: assocPath,
        binary: binary,
        bind: bind,
        both: both,
        call: call,
        chain: chain,
        clone: clone,
        commute: commute,
        commuteMap: commuteMap,
        comparator: comparator,
        complement: complement,
        compose: compose,
        composeK: composeK,
        composeP: composeP,
        concat: concat,
        cond: cond,
        construct: construct,
        constructN: constructN,
        contains: contains,
        containsWith: containsWith,
        converge: converge,
        countBy: countBy,
        createMapEntry: createMapEntry,
        curry: curry,
        curryN: curryN,
        dec: dec,
        defaultTo: defaultTo,
        difference: difference,
        differenceWith: differenceWith,
        dissoc: dissoc,
        dissocPath: dissocPath,
        divide: divide,
        drop: drop,
        dropLast: dropLast,
        dropLastWhile: dropLastWhile,
        dropRepeats: dropRepeats,
        dropRepeatsWith: dropRepeatsWith,
        dropWhile: dropWhile,
        either: either,
        empty: empty,
        eqProps: eqProps,
        equals: equals,
        evolve: evolve,
        filter: filter,
        find: find,
        findIndex: findIndex,
        findLast: findLast,
        findLastIndex: findLastIndex,
        flatten: flatten,
        flip: flip,
        forEach: forEach,
        fromPairs: fromPairs,
        functions: functions,
        functionsIn: functionsIn,
        groupBy: groupBy,
        gt: gt,
        gte: gte,
        has: has,
        hasIn: hasIn,
        head: head,
        identical: identical,
        identity: identity,
        ifElse: ifElse,
        inc: inc,
        indexOf: indexOf,
        init: init,
        insert: insert,
        insertAll: insertAll,
        intersection: intersection,
        intersectionWith: intersectionWith,
        intersperse: intersperse,
        into: into,
        invert: invert,
        invertObj: invertObj,
        invoker: invoker,
        is: is,
        isArrayLike: isArrayLike,
        isEmpty: isEmpty,
        isNil: isNil,
        isSet: isSet,
        join: join,
        keys: keys,
        keysIn: keysIn,
        last: last,
        lastIndexOf: lastIndexOf,
        length: length,
        lens: lens,
        lensIndex: lensIndex,
        lensProp: lensProp,
        lift: lift,
        liftN: liftN,
        lt: lt,
        lte: lte,
        map: map,
        mapAccum: mapAccum,
        mapAccumRight: mapAccumRight,
        mapObj: mapObj,
        mapObjIndexed: mapObjIndexed,
        match: match,
        mathMod: mathMod,
        max: max,
        maxBy: maxBy,
        mean: mean,
        median: median,
        memoize: memoize,
        merge: merge,
        mergeAll: mergeAll,
        min: min,
        minBy: minBy,
        modulo: modulo,
        multiply: multiply,
        nAry: nAry,
        negate: negate,
        none: none,
        not: not,
        nth: nth,
        nthArg: nthArg,
        nthChar: nthChar,
        nthCharCode: nthCharCode,
        of: of,
        omit: omit,
        once: once,
        or: or,
        over: over,
        partial: partial,
        partialRight: partialRight,
        partition: partition,
        path: path,
        pathEq: pathEq,
        pick: pick,
        pickAll: pickAll,
        pickBy: pickBy,
        pipe: pipe,
        pipeK: pipeK,
        pipeP: pipeP,
        pluck: pluck,
        prepend: prepend,
        product: product,
        project: project,
        prop: prop,
        propEq: propEq,
        propIs: propIs,
        propOr: propOr,
        propSatisfies: propSatisfies,
        props: props,
        range: range,
        reduce: reduce,
        reduceRight: reduceRight,
        reduced: reduced,
        reject: reject,
        remove: remove,
        repeat: repeat,
        replace: replace,
        reverse: reverse,
        scan: scan,
        set: set,
        slice: slice,
        sort: sort,
        sortBy: sortBy,
        split: split,
        splitEvery: splitEvery,
        subtract: subtract,
        sum: sum,
        tail: tail,
        take: take,
        takeLast: takeLast,
        takeLastWhile: takeLastWhile,
        takeWhile: takeWhile,
        tap: tap,
        test: test,
        times: times,
        toLower: toLower,
        toPairs: toPairs,
        toPairsIn: toPairsIn,
        toString: toString,
        toUpper: toUpper,
        transduce: transduce,
        trim: trim,
        type: type,
        unapply: unapply,
        unary: unary,
        uncurryN: uncurryN,
        unfold: unfold,
        union: union,
        unionWith: unionWith,
        uniq: uniq,
        uniqBy: uniqBy,
        uniqWith: uniqWith,
        unnest: unnest,
        update: update,
        useWith: useWith,
        values: values,
        valuesIn: valuesIn,
        view: view,
        where: where,
        whereEq: whereEq,
        wrap: wrap,
        xprod: xprod,
        zip: zip,
        zipObj: zipObj,
        zipWith: zipWith
    };

  /* TEST_ENTRY_POINT */

  if (typeof exports === 'object') {
    module.exports = R;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return R; });
  } else {
    this.R = R;
  }

}.call(this));

},{}],2:[function(require,module,exports){
module.exports={
  "name": "woot-js",
  "version": "0.0.7",
  "description": "Core library for creating real time collaborative documents without Operational transformation (WOOT). This package provides the core logic and data types for building a server capable and handling real time editing with WOOT.",
  "main": "dist/woot.js",
  "scripts": {
    "test": "./node_modules/.bin/gulp test"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/TGOlson/woot-js.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/TGOlson/woot-js/issues"
  },
  "homepage": "https://github.com/TGOlson/woot-js#readme",
  "devDependencies": {
    "babel-core": "^6.4.0",
    "babel-eslint": "^5.0.0-beta6",
    "babel-preset-es2015": "^6.3.13",
    "babel-preset-react": "^6.3.13",
    "babel-preset-stage-1": "^6.3.13",
    "babel-register": "^6.4.3",
    "babelify": "^7.2.0",
    "browserify": "^13.0.0",
    "eslint": "^1.10.3",
    "eslint-config-airbnb": "^3.1.0",
    "eslint-plugin-flow-vars": "^0.1.3",
    "eslint-plugin-react": "^3.7.1",
    "flow-bin": "^0.22.1",
    "gulp": "^3.9.0",
    "gulp-shell": "^0.5.1",
    "gulp-util": "^3.0.7",
    "jasmine": "^2.3.2",
    "v8-profiler": "^5.3.2",
    "vinyl-source-stream": "^1.1.0"
  },
  "dependencies": {
    "ramda": "^0.17.1"
  }
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__version = exports.Operation = exports.WChar = exports.WString = exports.sendLocalInsert = exports.sendLocalDelete = exports.sendOperations = exports.sendOperation = exports.makeWootClientEmpty = exports.makeWootClient = exports.showClientString = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _core = require('./woot/core');

var Core = _interopRequireWildcard(_core);

var _operation = require('./woot/operation');

var Operation = _interopRequireWildcard(_operation);

var _wchar = require('./woot/wchar');

var WChar = _interopRequireWildcard(_wchar);

var _wstring = require('./woot/wstring');

var WString = _interopRequireWildcard(_wstring);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var incClock = function incClock(client) {
  return _extends({}, client, { clock: client.clock + 1 });
};

var showClientString = exports.showClientString = function showClientString(client) {
  return WString.show(client.wString);
};

// TODO: this check if the client id already exists in the provided string
// and then start the client clock at the correct value.
var makeWootClient = exports.makeWootClient = function makeWootClient(wString, clientId) {
  return {
    clientId: clientId,
    clock: 0,
    wString: wString,
    operationQueue: []
  };
};

var makeWootClientEmpty = exports.makeWootClientEmpty = function makeWootClientEmpty(clientId) {
  return makeWootClient(WString.makeEmptyWString(), clientId);
};

var updateOperationQueue = function updateOperationQueue(operations, client) {
  return _extends({}, client, { operationQueue: operations });
};

var updateWString = function updateWString(wString, client) {
  return _extends({}, client, { wString: wString });
};

// sends an operation to a woot client, returning a new woot client
// the operation will either be integrated into the woot client's string
// or it will be added to the client's interal operation queue to be tried again
var sendOperation = exports.sendOperation = function sendOperation(client, operation) {
  var operations = _ramda2.default.append(operation, client.operationQueue);
  var result = Core.integrateAll(operations, client.wString);

  return updateWString(result.wString, updateOperationQueue(result.operations, client));
};

// sendOperations :: WootClient -> [Operation] -> WootClient
var sendOperations = exports.sendOperations = _ramda2.default.reduce(sendOperation);

// identical to sendOperation, but increments the clients internal clock
// not exposed - consumers should use sendLocalDelete or sendLocalInsert
// TODO: refactor with sendOperations - lots of similar functionality
var sendLocalOperation = function sendLocalOperation(client, operation) {
  var operations = _ramda2.default.append(operation, client.operationQueue);
  var result = Core.integrateAllLocal(operations, client.wString);

  return incClock(updateWString(result.wString, updateOperationQueue(result.operations, client)));
};

// -- note: failed local operations can result in no-ops if the underlying operation is invalid
// -- they will not be added to a client's operation queue
// -- the assumption is that anything done locally should already be verified
// -- if the local operation was successful, the operation should be broadcasted to other clients
// sendLocalDelete :: WootClient -> Int -> {operation: Operation | null, client: WootClient}
var sendLocalDelete = exports.sendLocalDelete = function sendLocalDelete(client, position) {
  var maybeOp = Core.makeDeleteOperation(client.clientId, position, client.wString);

  return {
    operation: maybeOp,
    client: maybeOp ? sendLocalOperation(client, maybeOp) : client
  };
};

var sendLocalInsert = exports.sendLocalInsert = function sendLocalInsert(client, position, alpha) {
  var wCharId = WChar.makeWCharId(client.clientId, client.clock);
  var maybeOp = Core.makeInsertOperation(wCharId, position, alpha, client.wString);

  return {
    operation: maybeOp,
    client: maybeOp ? sendLocalOperation(client, maybeOp) : client
  };
};

exports.WString = WString;
exports.WChar = WChar;
exports.Operation = Operation;
var __version = exports.__version = _package2.default.version;

// TODO: no default export
exports.default = {
  // Construction
  makeWootClient: makeWootClient,
  makeWootClientEmpty: makeWootClientEmpty,

  // Operation Handling
  sendOperation: sendOperation,
  sendOperations: sendOperations,
  sendLocalDelete: sendLocalDelete,
  sendLocalInsert: sendLocalInsert,

  // Utility functions
  showClientString: showClientString,

  // Re-export sub modules
  WString: WString,
  WChar: WChar,
  Operation: Operation,

  // meta meta
  __version: _package2.default.version
};

},{"../package.json":2,"./woot/core":4,"./woot/operation":5,"./woot/wchar":6,"./woot/wstring":7,"ramda":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeInsertOperation = exports.makeDeleteOperation = exports.integrateAllLocal = exports.integrateLocal = exports.integrateAll = exports.integrate = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _operation = require('./operation');

var Operation = _interopRequireWildcard(_operation);

var _wchar = require('./wchar');

var WChar = _interopRequireWildcard(_wchar);

var _wstring = require('./wstring');

var WString = _interopRequireWildcard(_wstring);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canIntegrate = function canIntegrate(operation, wString) {
  var type = operation.type;
  var wChar = operation.wChar;

  switch (type) {
    case 'INSERT':
      {
        var containsPrev = WString.contains(wChar.prevId, wString);
        var containsNext = WString.contains(wChar.nextId, wString);
        return containsPrev && containsNext;
      }

    case 'DELETE':
      {
        return WString.contains(wChar.id, wString);
      }

    default:
      throw new Error('Invalid operation type: ' + type);
  }
};

var integrateInsert = function integrateInsert(prevId, nextId, wChar, wString) {
  if (WString.contains(wChar.id, wString)) {
    return wString;
  }

  var subsection = WString.subsection(prevId, nextId, wString);

  if (subsection.length === 0) {
    var index = WString.indexOf(nextId, wString);
    return WString.insert(index, wChar, wString);
  }

  var newPrevId = subsection[0].id;

  // if the current char id is less than the previous id
  if (WChar.compareWCharIds(wChar.id, newPrevId) === -1) {
    var _index = WString.indexOf(newPrevId, wString);
    return WString.insert(_index, wChar, wString);
  }

  // recurse to integrateInsert with next id in the subsection
  return integrateInsert(newPrevId, nextId, wChar, wString);
};

var integrateDelete = function integrateDelete(wChar, wString) {
  return WString.hideChar(wChar.id, wString);
};

var integrateOp = function integrateOp(operation, wString) {
  var type = operation.type;
  var wChar = operation.wChar;

  switch (type) {
    case 'INSERT':
      {
        return integrateInsert(wChar.prevId, wChar.nextId, wChar, wString);
      }

    case 'DELETE':
      {
        return integrateDelete(wChar, wString);
      }

    default:
      throw new Error('Invalid operation type: ' + type);
  }
};

var integrateAllWith = function integrateAllWith(integrationFn, initialOps, initialWString) {
  // no operations have been integrated
  // and wString has its initial value
  var initialState = { operations: [], wString: initialWString };

  var integrate_ = function integrate_(_ref, op) {
    var operations = _ref.operations;
    var wString = _ref.wString;

    var newString = integrationFn(op, wString);
    return newString ? { operations: operations, wString: newString } : { operations: _ramda2.default.append(op, operations), wString: wString };
  };

  var _R$reduce = _ramda2.default.reduce(integrate_, initialState, initialOps);

  var operations = _R$reduce.operations;
  var wString = _R$reduce.wString;


  var operationsAreStable = _ramda2.default.length(initialOps) === _ramda2.default.length(operations);

  return operationsAreStable ? { operations: operations, wString: wString } : integrateAllWith(integrationFn, operations, wString);
};

var integrate = exports.integrate = function integrate(operation, wString) {
  return canIntegrate(operation, wString) ? integrateOp(operation, wString) : null;
};

// iterate through operation list until stable
// return any remaining operations, along with new string
var integrateAll = exports.integrateAll = function integrateAll(operations, wString) {
  return integrateAllWith(integrate, operations, wString);
};

// this function acts under the assumption that local operations have already been validated
// integrateLocal :: Operation -> WString -> WString
var integrateLocal = exports.integrateLocal = integrateOp;

// this function acts under the assumption that local operations have already been validated
var integrateAllLocal = exports.integrateAllLocal = function integrateAllLocal(operations, wString) {
  return integrateAllWith(integrateLocal, operations, wString);
};

var makeDeleteOperation = exports.makeDeleteOperation = function makeDeleteOperation(clientId, position, wString) {
  var wChar = WString.nthVisible(position, wString);

  return wChar ? Operation.makeDeleteOperation(clientId, wChar) : null;
};

// position based of off visible characters only
// operations should only be concerned with the visible string
var makeInsertOperation = exports.makeInsertOperation = function makeInsertOperation(wCharId, position, alpha, wString) {
  var numVisible = WString.show(wString).length;

  var prev = position === 0 ? _ramda2.default.head(wString) : WString.nthVisible(position - 1, wString);

  var next = position === numVisible ? _ramda2.default.last(wString) : WString.nthVisible(position, wString);

  if (prev && next) {
    var wChar = WChar.makeWChar({
      id: wCharId,
      isVisible: true,
      alpha: alpha,
      prevId: prev.id,
      nextId: next.id
    });

    return Operation.makeInsertOperation(wCharId.clientId, wChar);
  }

  return null;
};

},{"./operation":5,"./wchar":6,"./wstring":7,"ramda":1}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var makeInsertOperation = exports.makeInsertOperation = function makeInsertOperation(clientId, wChar) {
  return {
    type: 'INSERT',
    clientId: clientId,
    wChar: wChar
  };
};

var makeDeleteOperation = exports.makeDeleteOperation = function makeDeleteOperation(clientId, wChar) {
  return {
    type: 'DELETE',
    clientId: clientId,
    wChar: wChar
  };
};

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareWCharIds = exports.hide = exports.wCharEnding = exports.wCharBeginning = exports.makeWCharId = exports.makeWChar = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: remove 'make<X> functions' once everything is typed
var makeWChar = exports.makeWChar = _ramda2.default.identity;

var makeWCharId = exports.makeWCharId = function makeWCharId(clientId, clock) {
  return { clientId: clientId, clock: clock };
};

var wCharIdBeginning = makeWCharId(-1, 0);
var wCharIdEnding = makeWCharId(-1, 1);

// -- special character to mark the beginning of a wString
// -- note: clientId of -1 denotes a special character generated by this library
// -- includes a self-referential 'prevId' field
var wCharBeginning = exports.wCharBeginning = {
  id: wCharIdBeginning,
  isVisible: false,
  alpha: ' ',
  prevId: wCharIdBeginning,
  nextId: wCharIdEnding
};

// -- special character to mark the ending of a wString
// -- note: clientId of -1 denotes a special character generated by this library
// -- includes a self-referential 'nextId' field
var wCharEnding = exports.wCharEnding = {
  id: wCharIdEnding,
  isVisible: false,
  alpha: ' ',
  prevId: wCharIdBeginning,
  nextId: wCharIdEnding
};

var hide = exports.hide = _ramda2.default.assoc('isVisible', false);

// compareCharIds :: WCharId -> WCharId -> Ordering (-1, 0, 1)
var compareWCharIds = exports.compareWCharIds = function compareWCharIds(idA, idB) {
  if (idA.clientId === idB.clientId) {
    if (idA.clock === idB.clock) {
      return 0;
    }

    return idA.clock < idB.clock ? -1 : 1;
  }

  return idA.clientId < idB.clientId ? -1 : 1;
};

},{"ramda":1}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideChar = exports.nthVisible = exports.subsection = exports.contains = exports.indexOf = exports.insert = exports.show = exports.makeEmptyWString = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _wchar = require('./wchar');

var WChar = _interopRequireWildcard(_wchar);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeEmptyWString = exports.makeEmptyWString = function makeEmptyWString() {
  return [WChar.wCharBeginning, WChar.wCharEnding];
};

var show = exports.show = function show(wString) {
  var i = 0;
  var str = '';

  for (; i < wString.length; i++) {
    if (wString[i].isVisible) {
      str += wString[i].alpha;
    }
  }

  return str;
};

// -- insert before index i
// -- insert 2 'x' "abc" -> abxc
// insert :: Int -> WChar -> WString -> WString
var insert = exports.insert = _ramda2.default.insert;

var indexOf = exports.indexOf = function indexOf(id, wString) {
  var index = _ramda2.default.findIndex(function (wChar) {
    return WChar.compareWCharIds(id, wChar.id) === 0;
  }, wString);

  return index === -1 ? null : index;
};

var contains = exports.contains = function contains(id, wString) {
  return indexOf(id, wString) !== null;
};

var subsection = exports.subsection = function subsection(idA, idB, wString) {
  var indexA = indexOf(idA, wString);
  var indexB = indexOf(idB, wString);

  if (indexA && indexB && indexA < indexB) {
    return _ramda2.default.slice(indexA + 1, indexB, wString);
  }

  return [];
};

var nthVisible = exports.nthVisible = function nthVisible(i, wString) {
  var numFound = 0;
  var j = 0;

  if (i > wString.length) {
    return null;
  }

  for (; numFound < i + 1; j++) {
    if (!wString[j]) {
      return null;
    }

    if (wString[j].isVisible) {
      numFound++;
    }
  }

  return wString[j - 1];
};

var hideChar = exports.hideChar = function hideChar(id, wString) {
  var index = indexOf(id, wString);

  return index ? _ramda2.default.update(index, WChar.hide(wString[index]), wString) : wString;
};

},{"./wchar":6,"ramda":1}]},{},[3])(3)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvZGlzdC9yYW1kYS5qcyIsInBhY2thZ2UuanNvbiIsInNyYy93b290LmpzIiwic3JjL3dvb3QvY29yZS5qcyIsInNyYy93b290L29wZXJhdGlvbi5qcyIsInNyYy93b290L3djaGFyLmpzIiwic3JjL3dvb3Qvd3N0cmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeHpPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzNDQTs7OztBQUVBOzs7O0FBRUE7O0lBQVk7O0FBQ1o7O0lBQVk7O0FBQ1o7O0lBQVk7O0FBQ1o7O0lBQVk7Ozs7OztBQVdaLElBQU0sV0FBVyxTQUFYLFFBQVcsQ0FBQyxNQUFEO3NCQUNULFVBQVEsT0FBTyxPQUFPLEtBQVAsR0FBZSxDQUFmO0NBRE47O0FBSVYsSUFBTSw4Q0FBbUIsU0FBbkIsZ0JBQW1CLENBQUMsTUFBRDtTQUM5QixRQUFRLElBQVIsQ0FBYSxPQUFPLE9BQVA7Q0FEaUI7Ozs7QUFNekIsSUFBTSwwQ0FBaUIsU0FBakIsY0FBaUIsQ0FBQyxPQUFELEVBQTJCLFFBQTNCLEVBQThEO0FBQzFGLFNBQU87QUFDTCxzQkFESztBQUVMLFdBQU8sQ0FBUDtBQUNBLG9CQUhLO0FBSUwsb0JBQWdCLEVBQWhCO0dBSkYsQ0FEMEY7Q0FBOUQ7O0FBVXZCLElBQU0sb0RBQXNCLFNBQXRCLG1CQUFzQixDQUFDLFFBQUQ7U0FDakMsZUFBZSxRQUFRLGdCQUFSLEVBQWYsRUFBMkMsUUFBM0M7Q0FEaUM7O0FBSW5DLElBQU0sdUJBQXVCLFNBQXZCLG9CQUF1QixDQUMzQixVQUQyQixFQUUzQixNQUYyQjtzQkFJckIsVUFBUSxnQkFBZ0IsVUFBaEI7Q0FKYTs7QUFNN0IsSUFBTSxnQkFBZ0IsU0FBaEIsYUFBZ0IsQ0FBQyxPQUFELEVBQTJCLE1BQTNCO3NCQUNkLFVBQVE7Q0FETTs7Ozs7QUFPZixJQUFNLHdDQUFnQixTQUFoQixhQUFnQixDQUFDLE1BQUQsRUFBcUIsU0FBckIsRUFBb0U7QUFDL0YsTUFBTSxhQUFhLGdCQUFFLE1BQUYsQ0FBUyxTQUFULEVBQW9CLE9BQU8sY0FBUCxDQUFqQyxDQUR5RjtBQUUvRixNQUFNLFNBQVMsS0FBSyxZQUFMLENBQWtCLFVBQWxCLEVBQThCLE9BQU8sT0FBUCxDQUF2QyxDQUZ5Rjs7QUFJL0YsU0FBTyxjQUFjLE9BQU8sT0FBUCxFQUNuQixxQkFBcUIsT0FBTyxVQUFQLEVBQW1CLE1BQXhDLENBREssQ0FBUCxDQUorRjtDQUFwRTs7O0FBV3RCLElBQU0sMENBQWlCLGdCQUFFLE1BQUYsQ0FBUyxhQUFULENBQWpCOzs7OztBQU1iLElBQU0scUJBQXFCLFNBQXJCLGtCQUFxQixDQUFDLE1BQUQsRUFBcUIsU0FBckIsRUFBd0Q7QUFDakYsTUFBTSxhQUFhLGdCQUFFLE1BQUYsQ0FBUyxTQUFULEVBQW9CLE9BQU8sY0FBUCxDQUFqQyxDQUQyRTtBQUVqRixNQUFNLFNBQVMsS0FBSyxpQkFBTCxDQUF1QixVQUF2QixFQUFtQyxPQUFPLE9BQVAsQ0FBNUMsQ0FGMkU7O0FBSWpGLFNBQU8sU0FDTCxjQUFjLE9BQU8sT0FBUCxFQUNaLHFCQUFxQixPQUFPLFVBQVAsRUFBbUIsTUFBeEMsQ0FERixDQURLLENBQVAsQ0FKaUY7Q0FBeEQ7Ozs7Ozs7QUFpQnBCLElBQU0sNENBQWtCLFNBQWxCLGVBQWtCLENBQzdCLE1BRDZCLEVBRTdCLFFBRjZCLEVBRytCO0FBQzVELE1BQU0sVUFBVSxLQUFLLG1CQUFMLENBQXlCLE9BQU8sUUFBUCxFQUFpQixRQUExQyxFQUFvRCxPQUFPLE9BQVAsQ0FBOUQsQ0FEc0Q7O0FBRzVELFNBQU87QUFDTCxlQUFXLE9BQVg7QUFDQSxZQUFRLFVBQVUsbUJBQW1CLE1BQW5CLEVBQTJCLE9BQTNCLENBQVYsR0FBZ0QsTUFBaEQ7R0FGVixDQUg0RDtDQUgvQjs7QUFheEIsSUFBTSw0Q0FBa0IsU0FBbEIsZUFBa0IsQ0FDN0IsTUFENkIsRUFFN0IsUUFGNkIsRUFHN0IsS0FINkIsRUFJK0I7QUFDNUQsTUFBTSxVQUFVLE1BQU0sV0FBTixDQUFrQixPQUFPLFFBQVAsRUFBaUIsT0FBTyxLQUFQLENBQTdDLENBRHNEO0FBRTVELE1BQU0sVUFBVSxLQUFLLG1CQUFMLENBQXlCLE9BQXpCLEVBQWtDLFFBQWxDLEVBQTRDLEtBQTVDLEVBQW1ELE9BQU8sT0FBUCxDQUE3RCxDQUZzRDs7QUFJNUQsU0FBTztBQUNMLGVBQVcsT0FBWDtBQUNBLFlBQVEsVUFBVSxtQkFBbUIsTUFBbkIsRUFBMkIsT0FBM0IsQ0FBVixHQUFnRCxNQUFoRDtHQUZWLENBSjREO0NBSi9COztRQWU3QjtRQUNBO1FBQ0E7QUFHSyxJQUFNLGdDQUFZLGtCQUFRLE9BQVI7OztrQkFHVjs7QUFFYixnQ0FGYTtBQUdiLDBDQUhhOzs7QUFNYiw4QkFOYTtBQU9iLGdDQVBhO0FBUWIsa0NBUmE7QUFTYixrQ0FUYTs7O0FBWWIsb0NBWmE7OztBQWViLGtCQWZhO0FBZ0JiLGNBaEJhO0FBaUJiLHNCQWpCYTs7O0FBb0JiLGFBQVcsa0JBQVEsT0FBUjs7Ozs7Ozs7Ozs7QUNqSmI7Ozs7QUFHQTs7SUFBWTs7QUFDWjs7SUFBWTs7QUFDWjs7SUFBWTs7Ozs7O0FBS1osSUFBTSxlQUFlLFNBQWYsWUFBZSxDQUFDLFNBQUQsRUFBaUMsT0FBakMsRUFBdUU7TUFDbEYsT0FBZ0IsVUFBaEIsS0FEa0Y7TUFDNUUsUUFBVSxVQUFWLE1BRDRFOztBQUUxRixVQUFRLElBQVI7QUFDRSxTQUFLLFFBQUw7QUFBZTtBQUNiLFlBQU0sZUFBZSxRQUFRLFFBQVIsQ0FBaUIsTUFBTSxNQUFOLEVBQWMsT0FBL0IsQ0FBZixDQURPO0FBRWIsWUFBTSxlQUFlLFFBQVEsUUFBUixDQUFpQixNQUFNLE1BQU4sRUFBYyxPQUEvQixDQUFmLENBRk87QUFHYixlQUFPLGdCQUFnQixZQUFoQixDQUhNO09BQWY7O0FBREYsU0FPTyxRQUFMO0FBQWU7QUFDYixlQUFPLFFBQVEsUUFBUixDQUFpQixNQUFNLEVBQU4sRUFBVSxPQUEzQixDQUFQLENBRGE7T0FBZjs7QUFQRjtBQVdXLFlBQU0sSUFBSSxLQUFKLDhCQUFxQyxJQUFyQyxDQUFOLENBQVQ7QUFYRixHQUYwRjtDQUF2RTs7QUFrQnJCLElBQU0sa0JBQWtCLFNBQWxCLGVBQWtCLENBQ3RCLE1BRHNCLEVBRXRCLE1BRnNCLEVBR3RCLEtBSHNCLEVBSXRCLE9BSnNCLEVBS0Y7QUFDcEIsTUFBSSxRQUFRLFFBQVIsQ0FBaUIsTUFBTSxFQUFOLEVBQVUsT0FBM0IsQ0FBSixFQUF5QztBQUN2QyxXQUFPLE9BQVAsQ0FEdUM7R0FBekM7O0FBSUEsTUFBTSxhQUFhLFFBQVEsVUFBUixDQUFtQixNQUFuQixFQUEyQixNQUEzQixFQUFtQyxPQUFuQyxDQUFiLENBTGM7O0FBT3BCLE1BQUksV0FBVyxNQUFYLEtBQXNCLENBQXRCLEVBQXlCO0FBQzNCLFFBQU0sUUFBUSxRQUFRLE9BQVIsQ0FBZ0IsTUFBaEIsRUFBd0IsT0FBeEIsQ0FBUixDQURxQjtBQUUzQixXQUFPLFFBQVEsTUFBUixDQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsT0FBN0IsQ0FBUCxDQUYyQjtHQUE3Qjs7QUFLQSxNQUFNLFlBQVksV0FBVyxDQUFYLEVBQWMsRUFBZDs7O0FBWkUsTUFlaEIsTUFBTSxlQUFOLENBQXNCLE1BQU0sRUFBTixFQUFVLFNBQWhDLE1BQStDLENBQUMsQ0FBRCxFQUFJO0FBQ3JELFFBQU0sU0FBUSxRQUFRLE9BQVIsQ0FBZ0IsU0FBaEIsRUFBMkIsT0FBM0IsQ0FBUixDQUQrQztBQUVyRCxXQUFPLFFBQVEsTUFBUixDQUFlLE1BQWYsRUFBc0IsS0FBdEIsRUFBNkIsT0FBN0IsQ0FBUCxDQUZxRDtHQUF2RDs7O0FBZm9CLFNBcUJiLGdCQUFnQixTQUFoQixFQUEyQixNQUEzQixFQUFtQyxLQUFuQyxFQUEwQyxPQUExQyxDQUFQLENBckJvQjtDQUxFOztBQThCeEIsSUFBTSxrQkFBa0IsU0FBbEIsZUFBa0IsQ0FBQyxLQUFELEVBQXFCLE9BQXJCLEVBQWtEO0FBQ3hFLFNBQU8sUUFBUSxRQUFSLENBQWlCLE1BQU0sRUFBTixFQUFVLE9BQTNCLENBQVAsQ0FEd0U7Q0FBbEQ7O0FBSXhCLElBQU0sY0FBYyxTQUFkLFdBQWMsQ0FBQyxTQUFELEVBQWlDLE9BQWpDLEVBQStFO01BQ3pGLE9BQWdCLFVBQWhCLEtBRHlGO01BQ25GLFFBQVUsVUFBVixNQURtRjs7QUFFakcsVUFBUSxJQUFSO0FBQ0UsU0FBSyxRQUFMO0FBQWU7QUFDYixlQUFPLGdCQUFnQixNQUFNLE1BQU4sRUFBYyxNQUFNLE1BQU4sRUFBYyxLQUE1QyxFQUFtRCxPQUFuRCxDQUFQLENBRGE7T0FBZjs7QUFERixTQUtPLFFBQUw7QUFBZTtBQUNiLGVBQU8sZ0JBQWdCLEtBQWhCLEVBQXVCLE9BQXZCLENBQVAsQ0FEYTtPQUFmOztBQUxGO0FBU1csWUFBTSxJQUFJLEtBQUosOEJBQXFDLElBQXJDLENBQU4sQ0FBVDtBQVRGLEdBRmlHO0NBQS9FOztBQWdCcEIsSUFBTSxtQkFBbUIsU0FBbkIsZ0JBQW1CLENBQ3ZCLGFBRHVCLEVBRXZCLFVBRnVCLEVBR3ZCLGNBSHVCLEVBSWdEOzs7QUFHdkUsTUFBTSxlQUFlLEVBQUUsWUFBWSxFQUFaLEVBQWdCLFNBQVMsY0FBVCxFQUFqQyxDQUhpRTs7QUFLdkUsTUFBTSxhQUFhLFNBQWIsVUFBYSxPQUEwQixFQUExQixFQUFpQztRQUE5Qiw2QkFBOEI7UUFBbEIsdUJBQWtCOztBQUNsRCxRQUFNLFlBQVksY0FBYyxFQUFkLEVBQWtCLE9BQWxCLENBQVosQ0FENEM7QUFFbEQsV0FBTyxZQUNILEVBQUUsc0JBQUYsRUFBYyxTQUFTLFNBQVQsRUFEWCxHQUVILEVBQUUsWUFBWSxnQkFBRSxNQUFGLENBQVMsRUFBVCxFQUFhLFVBQWIsQ0FBWixFQUFzQyxnQkFBeEMsRUFGRyxDQUYyQztHQUFqQyxDQUxvRDs7a0JBWXZDLGdCQUFFLE1BQUYsQ0FBUyxVQUFULEVBQXFCLFlBQXJCLEVBQW1DLFVBQW5DLEVBWnVDOztNQVkvRCxrQ0FaK0Q7TUFZbkQsNEJBWm1EOzs7QUFjdkUsTUFBTSxzQkFBc0IsZ0JBQUUsTUFBRixDQUFTLFVBQVQsTUFBeUIsZ0JBQUUsTUFBRixDQUFTLFVBQVQsQ0FBekIsQ0FkMkM7O0FBZ0J2RSxTQUFPLHNCQUNILEVBQUUsc0JBQUYsRUFBYyxnQkFBZCxFQURHLEdBRUgsaUJBQWlCLGFBQWpCLEVBQWdDLFVBQWhDLEVBQTRDLE9BQTVDLENBRkcsQ0FoQmdFO0NBSmhEOztBQTBCbEIsSUFBTSxnQ0FBWSxTQUFaLFNBQVksQ0FDdkIsU0FEdUIsRUFFdkIsT0FGdUIsRUFHRjtBQUNyQixTQUFPLGFBQWEsU0FBYixFQUF3QixPQUF4QixJQUFtQyxZQUFZLFNBQVosRUFBdUIsT0FBdkIsQ0FBbkMsR0FBcUUsSUFBckUsQ0FEYztDQUhFOzs7O0FBVWxCLElBQU0sc0NBQWUsU0FBZixZQUFlLENBQzFCLFVBRDBCLEVBRTFCLE9BRjBCO1NBSTFCLGlCQUFpQixTQUFqQixFQUE0QixVQUE1QixFQUF3QyxPQUF4QztDQUowQjs7OztBQVNyQixJQUFNLDBDQUFpQixXQUFqQjs7O0FBSU4sSUFBTSxnREFBb0IsU0FBcEIsaUJBQW9CLENBQy9CLFVBRCtCLEVBRS9CLE9BRitCO1NBSS9CLGlCQUFpQixjQUFqQixFQUFpQyxVQUFqQyxFQUE2QyxPQUE3QztDQUorQjs7QUFPMUIsSUFBTSxvREFBc0IsU0FBdEIsbUJBQXNCLENBQ2pDLFFBRGlDLEVBRWpDLFFBRmlDLEVBR2pDLE9BSGlDLEVBSVI7QUFDekIsTUFBTSxRQUFRLFFBQVEsVUFBUixDQUFtQixRQUFuQixFQUE2QixPQUE3QixDQUFSLENBRG1COztBQUd6QixTQUFPLFFBQVEsVUFBVSxtQkFBVixDQUE4QixRQUE5QixFQUF3QyxLQUF4QyxDQUFSLEdBQXlELElBQXpELENBSGtCO0NBSlE7Ozs7QUFhNUIsSUFBTSxvREFBc0IsU0FBdEIsbUJBQXNCLENBQ2pDLE9BRGlDLEVBRS9CLFFBRitCLEVBRy9CLEtBSCtCLEVBSS9CLE9BSitCLEVBS1I7QUFDekIsTUFBTSxhQUFhLFFBQVEsSUFBUixDQUFhLE9BQWIsRUFBc0IsTUFBdEIsQ0FETTs7QUFHekIsTUFBTSxPQUFPLGFBQWEsQ0FBYixHQUNULGdCQUFFLElBQUYsQ0FBTyxPQUFQLENBRFMsR0FFVCxRQUFRLFVBQVIsQ0FBbUIsV0FBVyxDQUFYLEVBQWMsT0FBakMsQ0FGUyxDQUhZOztBQU96QixNQUFNLE9BQU8sYUFBYSxVQUFiLEdBQ1QsZ0JBQUUsSUFBRixDQUFPLE9BQVAsQ0FEUyxHQUVULFFBQVEsVUFBUixDQUFtQixRQUFuQixFQUE2QixPQUE3QixDQUZTLENBUFk7O0FBV3pCLE1BQUksUUFBUSxJQUFSLEVBQWM7QUFDaEIsUUFBTSxRQUFRLE1BQU0sU0FBTixDQUFnQjtBQUM1QixVQUFJLE9BQUo7QUFDQSxpQkFBVyxJQUFYO0FBQ0Esa0JBSDRCO0FBSTVCLGNBQVEsS0FBSyxFQUFMO0FBQ1IsY0FBUSxLQUFLLEVBQUw7S0FMSSxDQUFSLENBRFU7O0FBU2hCLFdBQU8sVUFBVSxtQkFBVixDQUE4QixRQUFRLFFBQVIsRUFBa0IsS0FBaEQsQ0FBUCxDQVRnQjtHQUFsQjs7QUFZQSxTQUFPLElBQVAsQ0F2QnlCO0NBTFE7Ozs7Ozs7O0FDekk1QixJQUFNLG9EQUFzQixTQUF0QixtQkFBc0IsQ0FBQyxRQUFELEVBQW1CLEtBQW5CO1NBQWdEO0FBQ2pGLFVBQU0sUUFBTjtBQUNBLHNCQUZpRjtBQUdqRixnQkFIaUY7O0NBQWhEOztBQU01QixJQUFNLG9EQUFzQixTQUF0QixtQkFBc0IsQ0FBQyxRQUFELEVBQW1CLEtBQW5CO1NBQWdEO0FBQ2pGLFVBQU0sUUFBTjtBQUNBLHNCQUZpRjtBQUdqRixnQkFIaUY7O0NBQWhEOzs7Ozs7Ozs7O0FDaEJuQzs7Ozs7OztBQW1CTyxJQUFNLGdDQUNYLGdCQUFFLFFBQUY7O0FBR0ssSUFBTSxvQ0FBYyxTQUFkLFdBQWMsQ0FBQyxRQUFELEVBQW1CLEtBQW5CO1NBQStDLEVBQUUsa0JBQUYsRUFBWSxZQUFaO0NBQS9DOztBQUczQixJQUFNLG1CQUE0QixZQUFZLENBQUMsQ0FBRCxFQUFJLENBQWhCLENBQTVCO0FBQ04sSUFBTSxnQkFBeUIsWUFBWSxDQUFDLENBQUQsRUFBSSxDQUFoQixDQUF6Qjs7Ozs7QUFNQyxJQUFNLDBDQUFpQjtBQUM1QixNQUFJLGdCQUFKO0FBQ0EsYUFBVyxLQUFYO0FBQ0EsU0FBTyxHQUFQO0FBQ0EsVUFBUSxnQkFBUjtBQUNBLFVBQVEsYUFBUjtDQUxXOzs7OztBQVlOLElBQU0sb0NBQWM7QUFDekIsTUFBSSxhQUFKO0FBQ0EsYUFBVyxLQUFYO0FBQ0EsU0FBTyxHQUFQO0FBQ0EsVUFBUSxnQkFBUjtBQUNBLFVBQVEsYUFBUjtDQUxXOztBQVNOLElBQU0sc0JBQ1gsZ0JBQUUsS0FBRixDQUFRLFdBQVIsRUFBcUIsS0FBckIsQ0FEVzs7O0FBS04sSUFBTSw0Q0FBa0IsU0FBbEIsZUFBa0IsQ0FBQyxHQUFELEVBQWUsR0FBZixFQUEwQztBQUN2RSxNQUFJLElBQUksUUFBSixLQUFpQixJQUFJLFFBQUosRUFBYztBQUNqQyxRQUFJLElBQUksS0FBSixLQUFjLElBQUksS0FBSixFQUFXO0FBQzNCLGFBQU8sQ0FBUCxDQUQyQjtLQUE3Qjs7QUFJQSxXQUFPLElBQUksS0FBSixHQUFZLElBQUksS0FBSixHQUFZLENBQUMsQ0FBRCxHQUFLLENBQTdCLENBTDBCO0dBQW5DOztBQVFBLFNBQU8sSUFBSSxRQUFKLEdBQWUsSUFBSSxRQUFKLEdBQWUsQ0FBQyxDQUFELEdBQUssQ0FBbkMsQ0FUZ0U7Q0FBMUM7Ozs7Ozs7Ozs7QUMzRC9COzs7O0FBRUE7O0lBQVk7Ozs7OztBQUlMLElBQU0sOENBQW1CLFNBQW5CLGdCQUFtQjtTQUFlLENBQUMsTUFBTSxjQUFOLEVBQXNCLE1BQU0sV0FBTjtDQUF0Qzs7QUFHekIsSUFBTSxzQkFBTyxTQUFQLElBQU8sQ0FBQyxPQUFELEVBQThCO0FBQ2hELE1BQUksSUFBSSxDQUFKLENBRDRDO0FBRWhELE1BQUksTUFBTSxFQUFOLENBRjRDOztBQUloRCxTQUFPLElBQUksUUFBUSxNQUFSLEVBQWdCLEdBQTNCLEVBQWdDO0FBQzlCLFFBQUksUUFBUSxDQUFSLEVBQVcsU0FBWCxFQUFzQjtBQUN4QixhQUFPLFFBQVEsQ0FBUixFQUFXLEtBQVgsQ0FEaUI7S0FBMUI7R0FERjs7QUFNQSxTQUFPLEdBQVAsQ0FWZ0Q7Q0FBOUI7Ozs7O0FBaUJiLElBQU0sMEJBQVMsZ0JBQUUsTUFBRjs7QUFHZixJQUFNLDRCQUFVLFNBQVYsT0FBVSxDQUFDLEVBQUQsRUFBb0IsT0FBcEIsRUFBa0Q7QUFDdkUsTUFBTSxRQUFRLGdCQUFFLFNBQUYsQ0FBWSxVQUFDLEtBQUQsRUFBVztBQUNuQyxXQUFPLE1BQU0sZUFBTixDQUFzQixFQUF0QixFQUEwQixNQUFNLEVBQU4sQ0FBMUIsS0FBd0MsQ0FBeEMsQ0FENEI7R0FBWCxFQUV2QixPQUZXLENBQVIsQ0FEaUU7O0FBS3ZFLFNBQU8sVUFBVSxDQUFDLENBQUQsR0FBSyxJQUFmLEdBQXNCLEtBQXRCLENBTGdFO0NBQWxEOztBQVNoQixJQUFNLDhCQUFXLFNBQVgsUUFBVyxDQUFDLEVBQUQsRUFBb0IsT0FBcEIsRUFBa0Q7QUFDeEUsU0FBTyxRQUFRLEVBQVIsRUFBWSxPQUFaLE1BQXlCLElBQXpCLENBRGlFO0NBQWxEOztBQUtqQixJQUFNLGtDQUFhLFNBQWIsVUFBYSxDQUFDLEdBQUQsRUFBcUIsR0FBckIsRUFBeUMsT0FBekMsRUFBdUU7QUFDL0YsTUFBTSxTQUFTLFFBQVEsR0FBUixFQUFhLE9BQWIsQ0FBVCxDQUR5RjtBQUUvRixNQUFNLFNBQVMsUUFBUSxHQUFSLEVBQWEsT0FBYixDQUFULENBRnlGOztBQUkvRixNQUFJLFVBQVUsTUFBVixJQUFxQixTQUFTLE1BQVQsRUFBa0I7QUFDekMsV0FBTyxnQkFBRSxLQUFGLENBQVEsU0FBUyxDQUFULEVBQVksTUFBcEIsRUFBNEIsT0FBNUIsQ0FBUCxDQUR5QztHQUEzQzs7QUFJQSxTQUFPLEVBQVAsQ0FSK0Y7Q0FBdkU7O0FBWW5CLElBQU0sa0NBQWEsU0FBYixVQUFhLENBQUMsQ0FBRCxFQUFZLE9BQVosRUFBK0M7QUFDdkUsTUFBSSxXQUFXLENBQVgsQ0FEbUU7QUFFdkUsTUFBSSxJQUFJLENBQUosQ0FGbUU7O0FBSXZFLE1BQUksSUFBSSxRQUFRLE1BQVIsRUFBZ0I7QUFDdEIsV0FBTyxJQUFQLENBRHNCO0dBQXhCOztBQUlBLFNBQU8sV0FBVyxJQUFJLENBQUosRUFBTyxHQUF6QixFQUE4QjtBQUM1QixRQUFJLENBQUMsUUFBUSxDQUFSLENBQUQsRUFBYTtBQUNmLGFBQU8sSUFBUCxDQURlO0tBQWpCOztBQUlBLFFBQUksUUFBUSxDQUFSLEVBQVcsU0FBWCxFQUFzQjtBQUN4QixpQkFEd0I7S0FBMUI7R0FMRjs7QUFVQSxTQUFPLFFBQVEsSUFBSSxDQUFKLENBQWYsQ0FsQnVFO0NBQS9DOztBQXNCbkIsSUFBTSw4QkFBVyxTQUFYLFFBQVcsQ0FBQyxFQUFELEVBQW9CLE9BQXBCLEVBQWtEO0FBQ3hFLE1BQU0sUUFBUSxRQUFRLEVBQVIsRUFBWSxPQUFaLENBQVIsQ0FEa0U7O0FBR3hFLFNBQU8sUUFBUSxnQkFBRSxNQUFGLENBQVMsS0FBVCxFQUFnQixNQUFNLElBQU4sQ0FBVyxRQUFRLEtBQVIsQ0FBWCxDQUFoQixFQUE0QyxPQUE1QyxDQUFSLEdBQStELE9BQS9ELENBSGlFO0NBQWxEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vICBSYW1kYSB2MC4xNy4xXG4vLyAgaHR0cHM6Ly9naXRodWIuY29tL3JhbWRhL3JhbWRhXG4vLyAgKGMpIDIwMTMtMjAxNSBTY290dCBTYXV5ZXQsIE1pY2hhZWwgSHVybGV5LCBhbmQgRGF2aWQgQ2hhbWJlcnNcbi8vICBSYW1kYSBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cblxuOyhmdW5jdGlvbigpIHtcblxuICAndXNlIHN0cmljdCc7XG5cbiAgLyoqXG4gICAgICogQSBzcGVjaWFsIHBsYWNlaG9sZGVyIHZhbHVlIHVzZWQgdG8gc3BlY2lmeSBcImdhcHNcIiB3aXRoaW4gY3VycmllZCBmdW5jdGlvbnMsXG4gICAgICogYWxsb3dpbmcgcGFydGlhbCBhcHBsaWNhdGlvbiBvZiBhbnkgY29tYmluYXRpb24gb2YgYXJndW1lbnRzLFxuICAgICAqIHJlZ2FyZGxlc3Mgb2YgdGhlaXIgcG9zaXRpb25zLlxuICAgICAqXG4gICAgICogSWYgYGdgIGlzIGEgY3VycmllZCB0ZXJuYXJ5IGZ1bmN0aW9uIGFuZCBgX2AgaXMgYFIuX19gLCB0aGUgZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICAgICAqXG4gICAgICogICAtIGBnKDEsIDIsIDMpYFxuICAgICAqICAgLSBgZyhfLCAyLCAzKSgxKWBcbiAgICAgKiAgIC0gYGcoXywgXywgMykoMSkoMilgXG4gICAgICogICAtIGBnKF8sIF8sIDMpKDEsIDIpYFxuICAgICAqICAgLSBgZyhfLCAyLCBfKSgxLCAzKWBcbiAgICAgKiAgIC0gYGcoXywgMikoMSkoMylgXG4gICAgICogICAtIGBnKF8sIDIpKDEsIDMpYFxuICAgICAqICAgLSBgZyhfLCAyKShfLCAzKSgxKWBcbiAgICAgKlxuICAgICAqIEBjb25zdGFudFxuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGdyZWV0ID0gUi5yZXBsYWNlKCd7bmFtZX0nLCBSLl9fLCAnSGVsbG8sIHtuYW1lfSEnKTtcbiAgICAgKiAgICAgIGdyZWV0KCdBbGljZScpOyAvLz0+ICdIZWxsbywgQWxpY2UhJ1xuICAgICAqL1xuICAgIHZhciBfXyA9IHsgJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlcic6IHRydWUgfTtcblxuICAgIC8vIGpzaGludCB1bnVzZWQ6dmFyc1xuICAgIHZhciBfYXJpdHkgPSBmdW5jdGlvbiBfYXJpdHkobiwgZm4pIHtcbiAgICAgICAgLy8ganNoaW50IHVudXNlZDp2YXJzXG4gICAgICAgIHN3aXRjaCAobikge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCwgYTkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IHRvIF9hcml0eSBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIGludGVnZXIgbm8gZ3JlYXRlciB0aGFuIHRlbicpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBfY2xvbmVSZWdFeHAgPSBmdW5jdGlvbiBfY2xvbmVSZWdFeHAocGF0dGVybikge1xuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChwYXR0ZXJuLnNvdXJjZSwgKHBhdHRlcm4uZ2xvYmFsID8gJ2cnIDogJycpICsgKHBhdHRlcm4uaWdub3JlQ2FzZSA/ICdpJyA6ICcnKSArIChwYXR0ZXJuLm11bHRpbGluZSA/ICdtJyA6ICcnKSArIChwYXR0ZXJuLnN0aWNreSA/ICd5JyA6ICcnKSArIChwYXR0ZXJuLnVuaWNvZGUgPyAndScgOiAnJykpO1xuICAgIH07XG5cbiAgICB2YXIgX2NvbXBsZW1lbnQgPSBmdW5jdGlvbiBfY29tcGxlbWVudChmKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gIWYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHJpdmF0ZSBgY29uY2F0YCBmdW5jdGlvbiB0byBtZXJnZSB0d28gYXJyYXktbGlrZSBvYmplY3RzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0FycmF5fEFyZ3VtZW50c30gW3NldDE9W11dIEFuIGFycmF5LWxpa2Ugb2JqZWN0LlxuICAgICAqIEBwYXJhbSB7QXJyYXl8QXJndW1lbnRzfSBbc2V0Mj1bXV0gQW4gYXJyYXktbGlrZSBvYmplY3QuXG4gICAgICogQHJldHVybiB7QXJyYXl9IEEgbmV3LCBtZXJnZWQgYXJyYXkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgX2NvbmNhdChbNCwgNSwgNl0sIFsxLCAyLCAzXSk7IC8vPT4gWzQsIDUsIDYsIDEsIDIsIDNdXG4gICAgICovXG4gICAgdmFyIF9jb25jYXQgPSBmdW5jdGlvbiBfY29uY2F0KHNldDEsIHNldDIpIHtcbiAgICAgICAgc2V0MSA9IHNldDEgfHwgW107XG4gICAgICAgIHNldDIgPSBzZXQyIHx8IFtdO1xuICAgICAgICB2YXIgaWR4O1xuICAgICAgICB2YXIgbGVuMSA9IHNldDEubGVuZ3RoO1xuICAgICAgICB2YXIgbGVuMiA9IHNldDIubGVuZ3RoO1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIGlkeCA9IDA7XG4gICAgICAgIHdoaWxlIChpZHggPCBsZW4xKSB7XG4gICAgICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBzZXQxW2lkeF07XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZHggPSAwO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGVuMikge1xuICAgICAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gc2V0MltpZHhdO1xuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgdmFyIF9jb250YWluc1dpdGggPSBmdW5jdGlvbiBfY29udGFpbnNXaXRoKHByZWQsIHgsIGxpc3QpIHtcbiAgICAgICAgdmFyIGlkeCA9IDAsIGxlbiA9IGxpc3QubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAocHJlZCh4LCBsaXN0W2lkeF0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIE9wdGltaXplZCBpbnRlcm5hbCB0d28tYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gICAgICovXG4gICAgdmFyIF9jdXJyeTEgPSBmdW5jdGlvbiBfY3VycnkxKGZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBmMShhKSB7XG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYSAhPSBudWxsICYmIGFbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGYxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogT3B0aW1pemVkIGludGVybmFsIHR3by1hcml0eSBjdXJyeSBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICB2YXIgX2N1cnJ5MiA9IGZ1bmN0aW9uIF9jdXJyeTIoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGYyKGEsIGIpIHtcbiAgICAgICAgICAgIHZhciBuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChuID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGYyO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuID09PSAxICYmIGEgIT0gbnVsbCAmJiBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobiA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfY3VycnkxKGZ1bmN0aW9uIChiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmbihhLCBiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobiA9PT0gMiAmJiBhICE9IG51bGwgJiYgYVsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUgJiYgYiAhPSBudWxsICYmIGJbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGYyO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuID09PSAyICYmIGEgIT0gbnVsbCAmJiBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfY3VycnkxKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmbihhLCBiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobiA9PT0gMiAmJiBiICE9IG51bGwgJiYgYlsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2N1cnJ5MShmdW5jdGlvbiAoYikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm4oYSwgYik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbihhLCBiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogT3B0aW1pemVkIGludGVybmFsIHRocmVlLWFyaXR5IGN1cnJ5IGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIHZhciBfY3VycnkzID0gZnVuY3Rpb24gX2N1cnJ5Myhmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gZjMoYSwgYiwgYykge1xuICAgICAgICAgICAgdmFyIG4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKG4gPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZjM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gPT09IDEgJiYgYSAhPSBudWxsICYmIGFbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGYzO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gKGIsIGMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuKGEsIGIsIGMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuID09PSAyICYmIGEgIT0gbnVsbCAmJiBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSAmJiBiICE9IG51bGwgJiYgYlsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZjM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gPT09IDIgJiYgYSAhPSBudWxsICYmIGFbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gKGEsIGMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuKGEsIGIsIGMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuID09PSAyICYmIGIgIT0gbnVsbCAmJiBiWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIChiLCBjKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmbihhLCBiLCBjKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobiA9PT0gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBfY3VycnkxKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmbihhLCBiLCBjKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobiA9PT0gMyAmJiBhICE9IG51bGwgJiYgYVsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUgJiYgYiAhPSBudWxsICYmIGJbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlICYmIGMgIT0gbnVsbCAmJiBjWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmMztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobiA9PT0gMyAmJiBhICE9IG51bGwgJiYgYVsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUgJiYgYiAhPSBudWxsICYmIGJbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuKGEsIGIsIGMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuID09PSAzICYmIGEgIT0gbnVsbCAmJiBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSAmJiBjICE9IG51bGwgJiYgY1snQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiAoYSwgYykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm4oYSwgYiwgYyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gPT09IDMgJiYgYiAhPSBudWxsICYmIGJbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlICYmIGMgIT0gbnVsbCAmJiBjWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIChiLCBjKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmbihhLCBiLCBjKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobiA9PT0gMyAmJiBhICE9IG51bGwgJiYgYVsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2N1cnJ5MShmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm4oYSwgYiwgYyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gPT09IDMgJiYgYiAhPSBudWxsICYmIGJbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jdXJyeTEoZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuKGEsIGIsIGMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuID09PSAzICYmIGMgIT0gbnVsbCAmJiBjWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfY3VycnkxKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmbihhLCBiLCBjKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKGEsIGIsIGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBjdXJyeU4gZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggVGhlIGFyaXR5IG9mIHRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICAgICAqIEByZXR1cm4ge2FycmF5fSBBbiBhcnJheSBvZiBhcmd1bWVudHMgcmVjZWl2ZWQgdGh1cyBmYXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICAgICAqL1xuICAgIHZhciBfY3VycnlOID0gZnVuY3Rpb24gX2N1cnJ5TihsZW5ndGgsIHJlY2VpdmVkLCBmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNvbWJpbmVkID0gW107XG4gICAgICAgICAgICB2YXIgYXJnc0lkeCA9IDA7XG4gICAgICAgICAgICB2YXIgbGVmdCA9IGxlbmd0aDtcbiAgICAgICAgICAgIHZhciBjb21iaW5lZElkeCA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoY29tYmluZWRJZHggPCByZWNlaXZlZC5sZW5ndGggfHwgYXJnc0lkeCA8IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmIChjb21iaW5lZElkeCA8IHJlY2VpdmVkLmxlbmd0aCAmJiAocmVjZWl2ZWRbY29tYmluZWRJZHhdID09IG51bGwgfHwgcmVjZWl2ZWRbY29tYmluZWRJZHhdWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSAhPT0gdHJ1ZSB8fCBhcmdzSWR4ID49IGFyZ3VtZW50cy5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlY2VpdmVkW2NvbWJpbmVkSWR4XTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBhcmd1bWVudHNbYXJnc0lkeF07XG4gICAgICAgICAgICAgICAgICAgIGFyZ3NJZHggKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29tYmluZWRbY29tYmluZWRJZHhdID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT0gbnVsbCB8fCByZXN1bHRbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgLT0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29tYmluZWRJZHggKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsZWZ0IDw9IDAgPyBmbi5hcHBseSh0aGlzLCBjb21iaW5lZCkgOiBfYXJpdHkobGVmdCwgX2N1cnJ5TihsZW5ndGgsIGNvbWJpbmVkLCBmbikpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgX2ZpbHRlciA9IGZ1bmN0aW9uIF9maWx0ZXIoZm4sIGxpc3QpIHtcbiAgICAgICAgdmFyIGlkeCA9IDAsIGxlbiA9IGxpc3QubGVuZ3RoLCByZXN1bHQgPSBbXTtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGZuKGxpc3RbaWR4XSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBsaXN0W2lkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICB2YXIgX2ZvcmNlUmVkdWNlZCA9IGZ1bmN0aW9uIF9mb3JjZVJlZHVjZWQoeCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ0BAdHJhbnNkdWNlci92YWx1ZSc6IHgsXG4gICAgICAgICAgICAnQEB0cmFuc2R1Y2VyL3JlZHVjZWQnOiB0cnVlXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHN0cmF0ZWd5IGZvciBleHRyYWN0aW5nIGZ1bmN0aW9uIG5hbWVzIGZyb20gYW4gb2JqZWN0XG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhbiBvYmplY3QgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgZnVuY3Rpb24gbmFtZXMuXG4gICAgICovXG4gICAgdmFyIF9mdW5jdGlvbnNXaXRoID0gZnVuY3Rpb24gX2Z1bmN0aW9uc1dpdGgoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBfZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG9ialtrZXldID09PSAnZnVuY3Rpb24nO1xuICAgICAgICAgICAgfSwgZm4ob2JqKSk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBfaGFzID0gZnVuY3Rpb24gX2hhcyhwcm9wLCBvYmopIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xuICAgIH07XG5cbiAgICB2YXIgX2lkZW50aXR5ID0gZnVuY3Rpb24gX2lkZW50aXR5KHgpIHtcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRlc3RzIHdoZXRoZXIgb3Igbm90IGFuIG9iamVjdCBpcyBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsqfSB2YWwgVGhlIG9iamVjdCB0byB0ZXN0LlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBgdmFsYCBpcyBhbiBhcnJheSwgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgX2lzQXJyYXkoW10pOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIF9pc0FycmF5KG51bGwpOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBfaXNBcnJheSh7fSk7IC8vPT4gZmFsc2VcbiAgICAgKi9cbiAgICB2YXIgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIF9pc0FycmF5KHZhbCkge1xuICAgICAgICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsLmxlbmd0aCA+PSAwICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgdGhlIHBhc3NlZCBhcmd1bWVudCBpcyBhbiBpbnRlZ2VyLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0geyp9IG5cbiAgICAgKiBAY2F0ZWdvcnkgVHlwZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIF9pc0ludGVnZXIgPSBOdW1iZXIuaXNJbnRlZ2VyIHx8IGZ1bmN0aW9uIF9pc0ludGVnZXIobikge1xuICAgICAgICByZXR1cm4gbiA8PCAwID09PSBuO1xuICAgIH07XG5cbiAgICB2YXIgX2lzTnVtYmVyID0gZnVuY3Rpb24gX2lzTnVtYmVyKHgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgTnVtYmVyXSc7XG4gICAgfTtcblxuICAgIHZhciBfaXNTdHJpbmcgPSBmdW5jdGlvbiBfaXNTdHJpbmcoeCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBTdHJpbmddJztcbiAgICB9O1xuXG4gICAgdmFyIF9pc1RyYW5zZm9ybWVyID0gZnVuY3Rpb24gX2lzVHJhbnNmb3JtZXIob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqWydAQHRyYW5zZHVjZXIvc3RlcCddID09PSAnZnVuY3Rpb24nO1xuICAgIH07XG5cbiAgICB2YXIgX21hcCA9IGZ1bmN0aW9uIF9tYXAoZm4sIGxpc3QpIHtcbiAgICAgICAgdmFyIGlkeCA9IDAsIGxlbiA9IGxpc3QubGVuZ3RoLCByZXN1bHQgPSBBcnJheShsZW4pO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICByZXN1bHRbaWR4XSA9IGZuKGxpc3RbaWR4XSk7XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICB2YXIgX3BpcGUgPSBmdW5jdGlvbiBfcGlwZShmLCBnKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZy5jYWxsKHRoaXMsIGYuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBfcGlwZVAgPSBmdW5jdGlvbiBfcGlwZVAoZiwgZykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN0eCA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gZi5hcHBseShjdHgsIGFyZ3VtZW50cykudGhlbihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnLmNhbGwoY3R4LCB4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgX3F1b3RlID0gZnVuY3Rpb24gX3F1b3RlKHMpIHtcbiAgICAgICAgcmV0dXJuICdcIicgKyBzLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIic7XG4gICAgfTtcblxuICAgIHZhciBfcmVkdWNlZCA9IGZ1bmN0aW9uIF9yZWR1Y2VkKHgpIHtcbiAgICAgICAgcmV0dXJuIHggJiYgeFsnQEB0cmFuc2R1Y2VyL3JlZHVjZWQnXSA/IHggOiB7XG4gICAgICAgICAgICAnQEB0cmFuc2R1Y2VyL3ZhbHVlJzogeCxcbiAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvcmVkdWNlZCc6IHRydWVcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQW4gb3B0aW1pemVkLCBwcml2YXRlIGFycmF5IGBzbGljZWAgaW1wbGVtZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJndW1lbnRzfEFycmF5fSBhcmdzIFRoZSBhcnJheSBvciBhcmd1bWVudHMgb2JqZWN0IHRvIGNvbnNpZGVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbZnJvbT0wXSBUaGUgYXJyYXkgaW5kZXggdG8gc2xpY2UgZnJvbSwgaW5jbHVzaXZlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbdG89YXJncy5sZW5ndGhdIFRoZSBhcnJheSBpbmRleCB0byBzbGljZSB0bywgZXhjbHVzaXZlLlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBBIG5ldywgc2xpY2VkIGFycmF5LlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIF9zbGljZShbMSwgMiwgMywgNCwgNV0sIDEsIDMpOyAvLz0+IFsyLCAzXVxuICAgICAqXG4gICAgICogICAgICB2YXIgZmlyc3RUaHJlZUFyZ3MgPSBmdW5jdGlvbihhLCBiLCBjLCBkKSB7XG4gICAgICogICAgICAgIHJldHVybiBfc2xpY2UoYXJndW1lbnRzLCAwLCAzKTtcbiAgICAgKiAgICAgIH07XG4gICAgICogICAgICBmaXJzdFRocmVlQXJncygxLCAyLCAzLCA0KTsgLy89PiBbMSwgMiwgM11cbiAgICAgKi9cbiAgICB2YXIgX3NsaWNlID0gZnVuY3Rpb24gX3NsaWNlKGFyZ3MsIGZyb20sIHRvKSB7XG4gICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICByZXR1cm4gX3NsaWNlKGFyZ3MsIDAsIGFyZ3MubGVuZ3RoKTtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgcmV0dXJuIF9zbGljZShhcmdzLCBmcm9tLCBhcmdzLmxlbmd0aCk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2YXIgbGlzdCA9IFtdO1xuICAgICAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgICAgICB2YXIgbGVuID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oYXJncy5sZW5ndGgsIHRvKSAtIGZyb20pO1xuICAgICAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgICAgIGxpc3RbaWR4XSA9IGFyZ3NbZnJvbSArIGlkeF07XG4gICAgICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGlzdDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQb2x5ZmlsbCBmcm9tIDxodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9EYXRlL3RvSVNPU3RyaW5nPi5cbiAgICAgKi9cbiAgICB2YXIgX3RvSVNPU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGFkID0gZnVuY3Rpb24gcGFkKG4pIHtcbiAgICAgICAgICAgIHJldHVybiAobiA8IDEwID8gJzAnIDogJycpICsgbjtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJyA/IGZ1bmN0aW9uIF90b0lTT1N0cmluZyhkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC50b0lTT1N0cmluZygpO1xuICAgICAgICB9IDogZnVuY3Rpb24gX3RvSVNPU3RyaW5nKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLmdldFVUQ0Z1bGxZZWFyKCkgKyAnLScgKyBwYWQoZC5nZXRVVENNb250aCgpICsgMSkgKyAnLScgKyBwYWQoZC5nZXRVVENEYXRlKCkpICsgJ1QnICsgcGFkKGQuZ2V0VVRDSG91cnMoKSkgKyAnOicgKyBwYWQoZC5nZXRVVENNaW51dGVzKCkpICsgJzonICsgcGFkKGQuZ2V0VVRDU2Vjb25kcygpKSArICcuJyArIChkLmdldFVUQ01pbGxpc2Vjb25kcygpIC8gMTAwMCkudG9GaXhlZCgzKS5zbGljZSgyLCA1KSArICdaJztcbiAgICAgICAgfTtcbiAgICB9KCk7XG5cbiAgICB2YXIgX3hkcm9wUmVwZWF0c1dpdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFhEcm9wUmVwZWF0c1dpdGgocHJlZCwgeGYpIHtcbiAgICAgICAgICAgIHRoaXMueGYgPSB4ZjtcbiAgICAgICAgICAgIHRoaXMucHJlZCA9IHByZWQ7XG4gICAgICAgICAgICB0aGlzLmxhc3RWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuc2VlbkZpcnN0VmFsdWUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBYRHJvcFJlcGVhdHNXaXRoLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvaW5pdCddKCk7XG4gICAgICAgIH07XG4gICAgICAgIFhEcm9wUmVwZWF0c1dpdGgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIFhEcm9wUmVwZWF0c1dpdGgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICAgICAgICAgIHZhciBzYW1lQXNMYXN0ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VlbkZpcnN0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlZW5GaXJzdFZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmVkKHRoaXMubGFzdFZhbHVlLCBpbnB1dCkpIHtcbiAgICAgICAgICAgICAgICBzYW1lQXNMYXN0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubGFzdFZhbHVlID0gaW5wdXQ7XG4gICAgICAgICAgICByZXR1cm4gc2FtZUFzTGFzdCA/IHJlc3VsdCA6IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBpbnB1dCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIF94ZHJvcFJlcGVhdHNXaXRoKHByZWQsIHhmKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFhEcm9wUmVwZWF0c1dpdGgocHJlZCwgeGYpO1xuICAgICAgICB9KTtcbiAgICB9KCk7XG5cbiAgICB2YXIgX3hmQmFzZSA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9pbml0J10oKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVzdWx0OiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIF94ZmlsdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBYRmlsdGVyKGYsIHhmKSB7XG4gICAgICAgICAgICB0aGlzLnhmID0geGY7XG4gICAgICAgICAgICB0aGlzLmYgPSBmO1xuICAgICAgICB9XG4gICAgICAgIFhGaWx0ZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICAgICAgICBYRmlsdGVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gX3hmQmFzZS5yZXN1bHQ7XG4gICAgICAgIFhGaWx0ZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmYoaW5wdXQpID8gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KSA6IHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gX3hmaWx0ZXIoZiwgeGYpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgWEZpbHRlcihmLCB4Zik7XG4gICAgICAgIH0pO1xuICAgIH0oKTtcblxuICAgIHZhciBfeGZpbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFhGaW5kKGYsIHhmKSB7XG4gICAgICAgICAgICB0aGlzLnhmID0geGY7XG4gICAgICAgICAgICB0aGlzLmYgPSBmO1xuICAgICAgICAgICAgdGhpcy5mb3VuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIFhGaW5kLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgICAgICAgWEZpbmQucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZm91bmQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgdm9pZCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgWEZpbmQucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmYoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gX3JlZHVjZWQodGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeGZpbmQoZiwgeGYpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgWEZpbmQoZiwgeGYpO1xuICAgICAgICB9KTtcbiAgICB9KCk7XG5cbiAgICB2YXIgX3hmaW5kSW5kZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFhGaW5kSW5kZXgoZiwgeGYpIHtcbiAgICAgICAgICAgIHRoaXMueGYgPSB4ZjtcbiAgICAgICAgICAgIHRoaXMuZiA9IGY7XG4gICAgICAgICAgICB0aGlzLmlkeCA9IC0xO1xuICAgICAgICAgICAgdGhpcy5mb3VuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIFhGaW5kSW5kZXgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICAgICAgICBYRmluZEluZGV4LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmZvdW5kKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIC0xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgWEZpbmRJbmRleC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5pZHggKz0gMTtcbiAgICAgICAgICAgIGlmICh0aGlzLmYoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gX3JlZHVjZWQodGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIHRoaXMuaWR4KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeGZpbmRJbmRleChmLCB4Zikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYRmluZEluZGV4KGYsIHhmKTtcbiAgICAgICAgfSk7XG4gICAgfSgpO1xuXG4gICAgdmFyIF94ZmluZExhc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFhGaW5kTGFzdChmLCB4Zikge1xuICAgICAgICAgICAgdGhpcy54ZiA9IHhmO1xuICAgICAgICAgICAgdGhpcy5mID0gZjtcbiAgICAgICAgfVxuICAgICAgICBYRmluZExhc3QucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICAgICAgICBYRmluZExhc3QucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB0aGlzLmxhc3QpKTtcbiAgICAgICAgfTtcbiAgICAgICAgWEZpbmRMYXN0LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mKGlucHV0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdCA9IGlucHV0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gX3hmaW5kTGFzdChmLCB4Zikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYRmluZExhc3QoZiwgeGYpO1xuICAgICAgICB9KTtcbiAgICB9KCk7XG5cbiAgICB2YXIgX3hmaW5kTGFzdEluZGV4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBYRmluZExhc3RJbmRleChmLCB4Zikge1xuICAgICAgICAgICAgdGhpcy54ZiA9IHhmO1xuICAgICAgICAgICAgdGhpcy5mID0gZjtcbiAgICAgICAgICAgIHRoaXMuaWR4ID0gLTE7XG4gICAgICAgICAgICB0aGlzLmxhc3RJZHggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBYRmluZExhc3RJbmRleC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gICAgICAgIFhGaW5kTGFzdEluZGV4LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSh0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgdGhpcy5sYXN0SWR4KSk7XG4gICAgICAgIH07XG4gICAgICAgIFhGaW5kTGFzdEluZGV4LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgICAgICAgICB0aGlzLmlkeCArPSAxO1xuICAgICAgICAgICAgaWYgKHRoaXMuZihpbnB1dCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RJZHggPSB0aGlzLmlkeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIF94ZmluZExhc3RJbmRleChmLCB4Zikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYRmluZExhc3RJbmRleChmLCB4Zik7XG4gICAgICAgIH0pO1xuICAgIH0oKTtcblxuICAgIHZhciBfeG1hcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gWE1hcChmLCB4Zikge1xuICAgICAgICAgICAgdGhpcy54ZiA9IHhmO1xuICAgICAgICAgICAgdGhpcy5mID0gZjtcbiAgICAgICAgfVxuICAgICAgICBYTWFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgICAgICAgWE1hcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IF94ZkJhc2UucmVzdWx0O1xuICAgICAgICBYTWFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIHRoaXMuZihpbnB1dCkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeG1hcChmLCB4Zikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYTWFwKGYsIHhmKTtcbiAgICAgICAgfSk7XG4gICAgfSgpO1xuXG4gICAgdmFyIF94dGFrZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gWFRha2UobiwgeGYpIHtcbiAgICAgICAgICAgIHRoaXMueGYgPSB4ZjtcbiAgICAgICAgICAgIHRoaXMubiA9IG47XG4gICAgICAgIH1cbiAgICAgICAgWFRha2UucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICAgICAgICBYVGFrZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IF94ZkJhc2UucmVzdWx0O1xuICAgICAgICBYVGFrZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfcmVkdWNlZChyZXN1bHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm4gLT0gMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gX3h0YWtlKG4sIHhmKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFhUYWtlKG4sIHhmKTtcbiAgICAgICAgfSk7XG4gICAgfSgpO1xuXG4gICAgdmFyIF94dGFrZVdoaWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBYVGFrZVdoaWxlKGYsIHhmKSB7XG4gICAgICAgICAgICB0aGlzLnhmID0geGY7XG4gICAgICAgICAgICB0aGlzLmYgPSBmO1xuICAgICAgICB9XG4gICAgICAgIFhUYWtlV2hpbGUucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICAgICAgICBYVGFrZVdoaWxlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gX3hmQmFzZS5yZXN1bHQ7XG4gICAgICAgIFhUYWtlV2hpbGUucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmYoaW5wdXQpID8gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KSA6IF9yZWR1Y2VkKHJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIF94dGFrZVdoaWxlKGYsIHhmKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFhUYWtlV2hpbGUoZiwgeGYpO1xuICAgICAgICB9KTtcbiAgICB9KCk7XG5cbiAgICB2YXIgX3h3cmFwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBYV3JhcChmbikge1xuICAgICAgICAgICAgdGhpcy5mID0gZm47XG4gICAgICAgIH1cbiAgICAgICAgWFdyYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbml0IG5vdCBpbXBsZW1lbnRlZCBvbiBYV3JhcCcpO1xuICAgICAgICB9O1xuICAgICAgICBYV3JhcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uIChhY2MpIHtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH07XG4gICAgICAgIFhXcmFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChhY2MsIHgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmYoYWNjLCB4KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIF94d3JhcChmbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYV3JhcChmbik7XG4gICAgICAgIH07XG4gICAgfSgpO1xuXG4gICAgLyoqXG4gICAgICogQWRkcyB0d28gbnVtYmVycy4gRXF1aXZhbGVudCB0byBgYSArIGJgIGJ1dCBjdXJyaWVkLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBNYXRoXG4gICAgICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IE51bWJlclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICogQHNlZSBSLnN1YnRyYWN0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5hZGQoMiwgMyk7ICAgICAgIC8vPT4gIDVcbiAgICAgKiAgICAgIFIuYWRkKDcpKDEwKTsgICAgICAvLz0+IDE3XG4gICAgICovXG4gICAgdmFyIGFkZCA9IF9jdXJyeTIoZnVuY3Rpb24gYWRkKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIHRoZSB2YWx1ZSBhdCB0aGUgZ2l2ZW4gaW5kZXggb2YgYW4gYXJyYXksXG4gICAgICogcmV0dXJuaW5nIGEgbmV3IGNvcHkgb2YgdGhlIGFycmF5IHdpdGggdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuXG4gICAgICogaW5kZXggcmVwbGFjZWQgd2l0aCB0aGUgcmVzdWx0IG9mIHRoZSBmdW5jdGlvbiBhcHBsaWNhdGlvbi5cbiAgICAgKiBAc2VlIFIudXBkYXRlXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhIC0+IGEpIC0+IE51bWJlciAtPiBbYV0gLT4gW2FdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGFwcGx5LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpZHggVGhlIGluZGV4LlxuICAgICAqIEBwYXJhbSB7QXJyYXl8QXJndW1lbnRzfSBsaXN0IEFuIGFycmF5LWxpa2Ugb2JqZWN0IHdob3NlIHZhbHVlXG4gICAgICogICAgICAgIGF0IHRoZSBzdXBwbGllZCBpbmRleCB3aWxsIGJlIHJlcGxhY2VkLlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBBIGNvcHkgb2YgdGhlIHN1cHBsaWVkIGFycmF5LWxpa2Ugb2JqZWN0IHdpdGhcbiAgICAgKiAgICAgICAgIHRoZSBlbGVtZW50IGF0IGluZGV4IGBpZHhgIHJlcGxhY2VkIHdpdGggdGhlIHZhbHVlXG4gICAgICogICAgICAgICByZXR1cm5lZCBieSBhcHBseWluZyBgZm5gIHRvIHRoZSBleGlzdGluZyBlbGVtZW50LlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuYWRqdXN0KFIuYWRkKDEwKSwgMSwgWzAsIDEsIDJdKTsgICAgIC8vPT4gWzAsIDExLCAyXVxuICAgICAqICAgICAgUi5hZGp1c3QoUi5hZGQoMTApKSgxKShbMCwgMSwgMl0pOyAgICAgLy89PiBbMCwgMTEsIDJdXG4gICAgICovXG4gICAgdmFyIGFkanVzdCA9IF9jdXJyeTMoZnVuY3Rpb24gYWRqdXN0KGZuLCBpZHgsIGxpc3QpIHtcbiAgICAgICAgaWYgKGlkeCA+PSBsaXN0Lmxlbmd0aCB8fCBpZHggPCAtbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0O1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdGFydCA9IGlkeCA8IDAgPyBsaXN0Lmxlbmd0aCA6IDA7XG4gICAgICAgIHZhciBfaWR4ID0gc3RhcnQgKyBpZHg7XG4gICAgICAgIHZhciBfbGlzdCA9IF9jb25jYXQobGlzdCk7XG4gICAgICAgIF9saXN0W19pZHhdID0gZm4obGlzdFtfaWR4XSk7XG4gICAgICAgIHJldHVybiBfbGlzdDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGFsd2F5cyByZXR1cm5zIHRoZSBnaXZlbiB2YWx1ZS4gTm90ZSB0aGF0IGZvclxuICAgICAqIG5vbi1wcmltaXRpdmVzIHRoZSB2YWx1ZSByZXR1cm5lZCBpcyBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgdmFsdWUuXG4gICAgICpcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGtub3duIGFzIGBjb25zdGAsIGBjb25zdGFudGAsIG9yIGBLYCAoZm9yIEsgY29tYmluYXRvcilcbiAgICAgKiBpbiBvdGhlciBsYW5ndWFnZXMgYW5kIGxpYnJhcmllcy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIGEgLT4gKCogLT4gYSlcbiAgICAgKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gd3JhcCBpbiBhIGZ1bmN0aW9uXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgRnVuY3Rpb24gOjogKiAtPiB2YWwuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHQgPSBSLmFsd2F5cygnVGVlJyk7XG4gICAgICogICAgICB0KCk7IC8vPT4gJ1RlZSdcbiAgICAgKi9cbiAgICB2YXIgYWx3YXlzID0gX2N1cnJ5MShmdW5jdGlvbiBhbHdheXModmFsKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG5ldyBsaXN0LCBjb21wb3NlZCBvZiBuLXR1cGxlcyBvZiBjb25zZWN1dGl2ZSBlbGVtZW50c1xuICAgICAqIElmIGBuYCBpcyBncmVhdGVyIHRoYW4gdGhlIGxlbmd0aCBvZiB0aGUgbGlzdCwgYW4gZW1wdHkgbGlzdCBpcyByZXR1cm5lZC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgTnVtYmVyIC0+IFthXSAtPiBbW2FdXVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBuIFRoZSBzaXplIG9mIHRoZSB0dXBsZXMgdG8gY3JlYXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBzcGxpdCBpbnRvIGBuYC10dXBsZXNcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIG5ldyBsaXN0LlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuYXBlcnR1cmUoMiwgWzEsIDIsIDMsIDQsIDVdKTsgLy89PiBbWzEsIDJdLCBbMiwgM10sIFszLCA0XSwgWzQsIDVdXVxuICAgICAqICAgICAgUi5hcGVydHVyZSgzLCBbMSwgMiwgMywgNCwgNV0pOyAvLz0+IFtbMSwgMiwgM10sIFsyLCAzLCA0XSwgWzMsIDQsIDVdXVxuICAgICAqICAgICAgUi5hcGVydHVyZSg3LCBbMSwgMiwgMywgNCwgNV0pOyAvLz0+IFtdXG4gICAgICovXG4gICAgdmFyIGFwZXJ0dXJlID0gX2N1cnJ5MihmdW5jdGlvbiBhcGVydHVyZShuLCBsaXN0KSB7XG4gICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICB2YXIgbGltaXQgPSBsaXN0Lmxlbmd0aCAtIChuIC0gMSk7XG4gICAgICAgIHZhciBhY2MgPSBuZXcgQXJyYXkobGltaXQgPj0gMCA/IGxpbWl0IDogMCk7XG4gICAgICAgIHdoaWxlIChpZHggPCBsaW1pdCkge1xuICAgICAgICAgICAgYWNjW2lkeF0gPSBfc2xpY2UobGlzdCwgaWR4LCBpZHggKyBuKTtcbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3QgY29udGFpbmluZyB0aGUgY29udGVudHMgb2YgdGhlIGdpdmVuIGxpc3QsIGZvbGxvd2VkIGJ5IHRoZSBnaXZlblxuICAgICAqIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIGEgLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7Kn0gZWwgVGhlIGVsZW1lbnQgdG8gYWRkIHRvIHRoZSBlbmQgb2YgdGhlIG5ldyBsaXN0LlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3Qgd2hvc2UgY29udGVudHMgd2lsbCBiZSBhZGRlZCB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBvdXRwdXRcbiAgICAgKiAgICAgICAgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgbGlzdCBjb250YWluaW5nIHRoZSBjb250ZW50cyBvZiB0aGUgb2xkIGxpc3QgZm9sbG93ZWQgYnkgYGVsYC5cbiAgICAgKiBAc2VlIFIucHJlcGVuZFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuYXBwZW5kKCd0ZXN0cycsIFsnd3JpdGUnLCAnbW9yZSddKTsgLy89PiBbJ3dyaXRlJywgJ21vcmUnLCAndGVzdHMnXVxuICAgICAqICAgICAgUi5hcHBlbmQoJ3Rlc3RzJywgW10pOyAvLz0+IFsndGVzdHMnXVxuICAgICAqICAgICAgUi5hcHBlbmQoWyd0ZXN0cyddLCBbJ3dyaXRlJywgJ21vcmUnXSk7IC8vPT4gWyd3cml0ZScsICdtb3JlJywgWyd0ZXN0cyddXVxuICAgICAqL1xuICAgIHZhciBhcHBlbmQgPSBfY3VycnkyKGZ1bmN0aW9uIGFwcGVuZChlbCwgbGlzdCkge1xuICAgICAgICByZXR1cm4gX2NvbmNhdChsaXN0LCBbZWxdKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgZnVuY3Rpb24gYGZuYCB0byB0aGUgYXJndW1lbnQgbGlzdCBgYXJnc2AuIFRoaXMgaXMgdXNlZnVsIGZvclxuICAgICAqIGNyZWF0aW5nIGEgZml4ZWQtYXJpdHkgZnVuY3Rpb24gZnJvbSBhIHZhcmlhZGljIGZ1bmN0aW9uLiBgZm5gIHNob3VsZFxuICAgICAqIGJlIGEgYm91bmQgZnVuY3Rpb24gaWYgY29udGV4dCBpcyBzaWduaWZpY2FudC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnICgqLi4uIC0+IGEpIC0+IFsqXSAtPiBhXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcmdzXG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKiBAc2VlIFIuY2FsbCwgUi51bmFwcGx5XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIG51bXMgPSBbMSwgMiwgMywgLTk5LCA0MiwgNiwgN107XG4gICAgICogICAgICBSLmFwcGx5KE1hdGgubWF4LCBudW1zKTsgLy89PiA0MlxuICAgICAqL1xuICAgIHZhciBhcHBseSA9IF9jdXJyeTIoZnVuY3Rpb24gYXBwbHkoZm4sIGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogTWFrZXMgYSBzaGFsbG93IGNsb25lIG9mIGFuIG9iamVjdCwgc2V0dGluZyBvciBvdmVycmlkaW5nIHRoZSBzcGVjaWZpZWRcbiAgICAgKiBwcm9wZXJ0eSB3aXRoIHRoZSBnaXZlbiB2YWx1ZS4gIE5vdGUgdGhhdCB0aGlzIGNvcGllcyBhbmQgZmxhdHRlbnNcbiAgICAgKiBwcm90b3R5cGUgcHJvcGVydGllcyBvbnRvIHRoZSBuZXcgb2JqZWN0IGFzIHdlbGwuICBBbGwgbm9uLXByaW1pdGl2ZVxuICAgICAqIHByb3BlcnRpZXMgYXJlIGNvcGllZCBieSByZWZlcmVuY2UuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcgU3RyaW5nIC0+IGEgLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIHRoZSBwcm9wZXJ0eSBuYW1lIHRvIHNldFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsIHRoZSBuZXcgdmFsdWVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIHRoZSBvYmplY3QgdG8gY2xvbmVcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGEgbmV3IG9iamVjdCBzaW1pbGFyIHRvIHRoZSBvcmlnaW5hbCBleGNlcHQgZm9yIHRoZSBzcGVjaWZpZWQgcHJvcGVydHkuXG4gICAgICogQHNlZSBSLmRpc3NvY1xuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuYXNzb2MoJ2MnLCAzLCB7YTogMSwgYjogMn0pOyAvLz0+IHthOiAxLCBiOiAyLCBjOiAzfVxuICAgICAqL1xuICAgIHZhciBhc3NvYyA9IF9jdXJyeTMoZnVuY3Rpb24gYXNzb2MocHJvcCwgdmFsLCBvYmopIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgICBmb3IgKHZhciBwIGluIG9iaikge1xuICAgICAgICAgICAgcmVzdWx0W3BdID0gb2JqW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdFtwcm9wXSA9IHZhbDtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIE1ha2VzIGEgc2hhbGxvdyBjbG9uZSBvZiBhbiBvYmplY3QsIHNldHRpbmcgb3Igb3ZlcnJpZGluZyB0aGUgbm9kZXNcbiAgICAgKiByZXF1aXJlZCB0byBjcmVhdGUgdGhlIGdpdmVuIHBhdGgsIGFuZCBwbGFjaW5nIHRoZSBzcGVjaWZpYyB2YWx1ZSBhdCB0aGVcbiAgICAgKiB0YWlsIGVuZCBvZiB0aGF0IHBhdGguICBOb3RlIHRoYXQgdGhpcyBjb3BpZXMgYW5kIGZsYXR0ZW5zIHByb3RvdHlwZVxuICAgICAqIHByb3BlcnRpZXMgb250byB0aGUgbmV3IG9iamVjdCBhcyB3ZWxsLiAgQWxsIG5vbi1wcmltaXRpdmUgcHJvcGVydGllc1xuICAgICAqIGFyZSBjb3BpZWQgYnkgcmVmZXJlbmNlLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIFtTdHJpbmddIC0+IGEgLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhdGggdGhlIHBhdGggdG8gc2V0XG4gICAgICogQHBhcmFtIHsqfSB2YWwgdGhlIG5ldyB2YWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogdGhlIG9iamVjdCB0byBjbG9uZVxuICAgICAqIEByZXR1cm4ge09iamVjdH0gYSBuZXcgb2JqZWN0IHNpbWlsYXIgdG8gdGhlIG9yaWdpbmFsIGV4Y2VwdCBhbG9uZyB0aGUgc3BlY2lmaWVkIHBhdGguXG4gICAgICogQHNlZSBSLmRpc3NvY1BhdGhcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmFzc29jUGF0aChbJ2EnLCAnYicsICdjJ10sIDQyLCB7YToge2I6IHtjOiAwfX19KTsgLy89PiB7YToge2I6IHtjOiA0Mn19fVxuICAgICAqL1xuICAgIHZhciBhc3NvY1BhdGggPSBfY3VycnkzKGZ1bmN0aW9uIGFzc29jUGF0aChwYXRoLCB2YWwsIG9iaikge1xuICAgICAgICBzd2l0Y2ggKHBhdGgubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHJldHVybiBhc3NvYyhwYXRoWzBdLCB2YWwsIG9iaik7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gYXNzb2MocGF0aFswXSwgYXNzb2NQYXRoKF9zbGljZShwYXRoLCAxKSwgdmFsLCBPYmplY3Qob2JqW3BhdGhbMF1dKSksIG9iaik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGlzIGJvdW5kIHRvIGEgY29udGV4dC5cbiAgICAgKiBOb3RlOiBgUi5iaW5kYCBkb2VzIG5vdCBwcm92aWRlIHRoZSBhZGRpdGlvbmFsIGFyZ3VtZW50LWJpbmRpbmcgY2FwYWJpbGl0aWVzIG9mXG4gICAgICogW0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9GdW5jdGlvbi9iaW5kKS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNlZSBSLnBhcnRpYWxcbiAgICAgKiBAc2lnICgqIC0+ICopIC0+IHsqfSAtPiAoKiAtPiAqKVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBiaW5kIHRvIGNvbnRleHRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdGhpc09iaiBUaGUgY29udGV4dCB0byBiaW5kIGBmbmAgdG9cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHdpbGwgZXhlY3V0ZSBpbiB0aGUgY29udGV4dCBvZiBgdGhpc09iamAuXG4gICAgICovXG4gICAgdmFyIGJpbmQgPSBfY3VycnkyKGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNPYmopIHtcbiAgICAgICAgcmV0dXJuIF9hcml0eShmbi5sZW5ndGgsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzT2JqLCBhcmd1bWVudHMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEEgZnVuY3Rpb24gd3JhcHBpbmcgY2FsbHMgdG8gdGhlIHR3byBmdW5jdGlvbnMgaW4gYW4gYCYmYCBvcGVyYXRpb24sIHJldHVybmluZyB0aGUgcmVzdWx0IG9mIHRoZSBmaXJzdFxuICAgICAqIGZ1bmN0aW9uIGlmIGl0IGlzIGZhbHNlLXkgYW5kIHRoZSByZXN1bHQgb2YgdGhlIHNlY29uZCBmdW5jdGlvbiBvdGhlcndpc2UuICBOb3RlIHRoYXQgdGhpcyBpc1xuICAgICAqIHNob3J0LWNpcmN1aXRlZCwgbWVhbmluZyB0aGF0IHRoZSBzZWNvbmQgZnVuY3Rpb24gd2lsbCBub3QgYmUgaW52b2tlZCBpZiB0aGUgZmlyc3QgcmV0dXJucyBhIGZhbHNlLXlcbiAgICAgKiB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTG9naWNcbiAgICAgKiBAc2lnICgqLi4uIC0+IEJvb2xlYW4pIC0+ICgqLi4uIC0+IEJvb2xlYW4pIC0+ICgqLi4uIC0+IEJvb2xlYW4pXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZiBhIHByZWRpY2F0ZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGcgYW5vdGhlciBwcmVkaWNhdGVcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gYSBmdW5jdGlvbiB0aGF0IGFwcGxpZXMgaXRzIGFyZ3VtZW50cyB0byBgZmAgYW5kIGBnYCBhbmQgYCYmYHMgdGhlaXIgb3V0cHV0cyB0b2dldGhlci5cbiAgICAgKiBAc2VlIFIuYW5kXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGd0MTAgPSBmdW5jdGlvbih4KSB7IHJldHVybiB4ID4gMTA7IH07XG4gICAgICogICAgICB2YXIgZXZlbiA9IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHggJSAyID09PSAwIH07XG4gICAgICogICAgICB2YXIgZiA9IFIuYm90aChndDEwLCBldmVuKTtcbiAgICAgKiAgICAgIGYoMTAwKTsgLy89PiB0cnVlXG4gICAgICogICAgICBmKDEwMSk7IC8vPT4gZmFsc2VcbiAgICAgKi9cbiAgICB2YXIgYm90aCA9IF9jdXJyeTIoZnVuY3Rpb24gYm90aChmLCBnKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBfYm90aCgpIHtcbiAgICAgICAgICAgIHJldHVybiBmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgJiYgZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogTWFrZXMgYSBjb21wYXJhdG9yIGZ1bmN0aW9uIG91dCBvZiBhIGZ1bmN0aW9uIHRoYXQgcmVwb3J0cyB3aGV0aGVyIHRoZSBmaXJzdCBlbGVtZW50IGlzIGxlc3MgdGhhbiB0aGUgc2Vjb25kLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKGEsIGIgLT4gQm9vbGVhbikgLT4gKGEsIGIgLT4gTnVtYmVyKVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgQSBwcmVkaWNhdGUgZnVuY3Rpb24gb2YgYXJpdHkgdHdvLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIEZ1bmN0aW9uIDo6IGEgLT4gYiAtPiBJbnQgdGhhdCByZXR1cm5zIGAtMWAgaWYgYSA8IGIsIGAxYCBpZiBiIDwgYSwgb3RoZXJ3aXNlIGAwYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgY21wID0gUi5jb21wYXJhdG9yKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgKiAgICAgICAgcmV0dXJuIGEuYWdlIDwgYi5hZ2U7XG4gICAgICogICAgICB9KTtcbiAgICAgKiAgICAgIHZhciBwZW9wbGUgPSBbXG4gICAgICogICAgICAgIC8vIC4uLlxuICAgICAqICAgICAgXTtcbiAgICAgKiAgICAgIFIuc29ydChjbXAsIHBlb3BsZSk7XG4gICAgICovXG4gICAgdmFyIGNvbXBhcmF0b3IgPSBfY3VycnkxKGZ1bmN0aW9uIGNvbXBhcmF0b3IocHJlZCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmVkKGEsIGIpID8gLTEgOiBwcmVkKGIsIGEpID8gMSA6IDA7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhIGZ1bmN0aW9uIGBmYCBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIGBnYCBzdWNoIHRoYXQ6XG4gICAgICpcbiAgICAgKiAgIC0gYXBwbHlpbmcgYGdgIHRvIHplcm8gb3IgbW9yZSBhcmd1bWVudHMgd2lsbCBnaXZlIF9fdHJ1ZV9fIGlmIGFwcGx5aW5nXG4gICAgICogICAgIHRoZSBzYW1lIGFyZ3VtZW50cyB0byBgZmAgZ2l2ZXMgYSBsb2dpY2FsIF9fZmFsc2VfXyB2YWx1ZTsgYW5kXG4gICAgICpcbiAgICAgKiAgIC0gYXBwbHlpbmcgYGdgIHRvIHplcm8gb3IgbW9yZSBhcmd1bWVudHMgd2lsbCBnaXZlIF9fZmFsc2VfXyBpZiBhcHBseWluZ1xuICAgICAqICAgICB0aGUgc2FtZSBhcmd1bWVudHMgdG8gYGZgIGdpdmVzIGEgbG9naWNhbCBfX3RydWVfXyB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTG9naWNcbiAgICAgKiBAc2lnICgqLi4uIC0+ICopIC0+ICgqLi4uIC0+IEJvb2xlYW4pXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAqIEBzZWUgUi5ub3RcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgaXNFdmVuID0gZnVuY3Rpb24obikgeyByZXR1cm4gbiAlIDIgPT09IDA7IH07XG4gICAgICogICAgICB2YXIgaXNPZGQgPSBSLmNvbXBsZW1lbnQoaXNFdmVuKTtcbiAgICAgKiAgICAgIGlzT2RkKDIxKTsgLy89PiB0cnVlXG4gICAgICogICAgICBpc09kZCg0Mik7IC8vPT4gZmFsc2VcbiAgICAgKi9cbiAgICB2YXIgY29tcGxlbWVudCA9IF9jdXJyeTEoX2NvbXBsZW1lbnQpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uLCBgZm5gLCB3aGljaCBlbmNhcHN1bGF0ZXMgaWYvZWxzZS1pZi9lbHNlIGxvZ2ljLlxuICAgICAqIGBSLmNvbmRgIHRha2VzIGEgbGlzdCBvZiBbcHJlZGljYXRlLCB0cmFuc2Zvcm1dIHBhaXJzLiBBbGwgb2YgdGhlXG4gICAgICogYXJndW1lbnRzIHRvIGBmbmAgYXJlIGFwcGxpZWQgdG8gZWFjaCBvZiB0aGUgcHJlZGljYXRlcyBpbiB0dXJuXG4gICAgICogdW50aWwgb25lIHJldHVybnMgYSBcInRydXRoeVwiIHZhbHVlLCBhdCB3aGljaCBwb2ludCBgZm5gIHJldHVybnMgdGhlXG4gICAgICogcmVzdWx0IG9mIGFwcGx5aW5nIGl0cyBhcmd1bWVudHMgdG8gdGhlIGNvcnJlc3BvbmRpbmcgdHJhbnNmb3JtZXIuXG4gICAgICogSWYgbm9uZSBvZiB0aGUgcHJlZGljYXRlcyBtYXRjaGVzLCBgZm5gIHJldHVybnMgdW5kZWZpbmVkLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMb2dpY1xuICAgICAqIEBzaWcgW1soKi4uLiAtPiBCb29sZWFuKSwoKi4uLiAtPiAqKV1dIC0+ICgqLi4uIC0+ICopXG4gICAgICogQHBhcmFtIHtBcnJheX0gcGFpcnNcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgZm4gPSBSLmNvbmQoW1xuICAgICAqICAgICAgICBbUi5lcXVhbHMoMCksICAgUi5hbHdheXMoJ3dhdGVyIGZyZWV6ZXMgYXQgMMKwQycpXSxcbiAgICAgKiAgICAgICAgW1IuZXF1YWxzKDEwMCksIFIuYWx3YXlzKCd3YXRlciBib2lscyBhdCAxMDDCsEMnKV0sXG4gICAgICogICAgICAgIFtSLlQsICAgICAgICAgICBmdW5jdGlvbih0ZW1wKSB7IHJldHVybiAnbm90aGluZyBzcGVjaWFsIGhhcHBlbnMgYXQgJyArIHRlbXAgKyAnwrBDJzsgfV1cbiAgICAgKiAgICAgIF0pO1xuICAgICAqICAgICAgZm4oMCk7IC8vPT4gJ3dhdGVyIGZyZWV6ZXMgYXQgMMKwQydcbiAgICAgKiAgICAgIGZuKDUwKTsgLy89PiAnbm90aGluZyBzcGVjaWFsIGhhcHBlbnMgYXQgNTDCsEMnXG4gICAgICogICAgICBmbigxMDApOyAvLz0+ICd3YXRlciBib2lscyBhdCAxMDDCsEMnXG4gICAgICovXG4gICAgdmFyIGNvbmQgPSBfY3VycnkxKGZ1bmN0aW9uIGNvbmQocGFpcnMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGlkeCA8IHBhaXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmIChwYWlyc1tpZHhdWzBdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhaXJzW2lkeF1bMV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYHhgIGlzIGZvdW5kIGluIHRoZSBgbGlzdGAsIHVzaW5nIGBwcmVkYCBhcyBhblxuICAgICAqIGVxdWFsaXR5IHByZWRpY2F0ZSBmb3IgYHhgLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyAoYSwgYSAtPiBCb29sZWFuKSAtPiBhIC0+IFthXSAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSB1c2VkIHRvIHRlc3Qgd2hldGhlciB0d28gaXRlbXMgYXJlIGVxdWFsLlxuICAgICAqIEBwYXJhbSB7Kn0geCBUaGUgaXRlbSB0byBmaW5kXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBpdGVyYXRlIG92ZXJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgYHhgIGlzIGluIGBsaXN0YCwgZWxzZSBgZmFsc2VgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciB4cyA9IFt7eDogMTJ9LCB7eDogMTF9LCB7eDogMTB9XTtcbiAgICAgKiAgICAgIFIuY29udGFpbnNXaXRoKGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEueCA9PT0gYi54OyB9LCB7eDogMTB9LCB4cyk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5jb250YWluc1dpdGgoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYS54ID09PSBiLng7IH0sIHt4OiAxfSwgeHMpOyAvLz0+IGZhbHNlXG4gICAgICovXG4gICAgdmFyIGNvbnRhaW5zV2l0aCA9IF9jdXJyeTMoX2NvbnRhaW5zV2l0aCk7XG5cbiAgICAvKipcbiAgICAgKiBDb3VudHMgdGhlIGVsZW1lbnRzIG9mIGEgbGlzdCBhY2NvcmRpbmcgdG8gaG93IG1hbnkgbWF0Y2ggZWFjaCB2YWx1ZVxuICAgICAqIG9mIGEga2V5IGdlbmVyYXRlZCBieSB0aGUgc3VwcGxpZWQgZnVuY3Rpb24uIFJldHVybnMgYW4gb2JqZWN0XG4gICAgICogbWFwcGluZyB0aGUga2V5cyBwcm9kdWNlZCBieSBgZm5gIHRvIHRoZSBudW1iZXIgb2Ygb2NjdXJyZW5jZXMgaW5cbiAgICAgKiB0aGUgbGlzdC4gTm90ZSB0aGF0IGFsbCBrZXlzIGFyZSBjb2VyY2VkIHRvIHN0cmluZ3MgYmVjYXVzZSBvZiBob3dcbiAgICAgKiBKYXZhU2NyaXB0IG9iamVjdHMgd29yay5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAgICAgKiBAc2lnIChhIC0+IFN0cmluZykgLT4gW2FdIC0+IHsqfVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB1c2VkIHRvIG1hcCB2YWx1ZXMgdG8ga2V5cy5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGNvdW50IGVsZW1lbnRzIGZyb20uXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3QgbWFwcGluZyBrZXlzIHRvIG51bWJlciBvZiBvY2N1cnJlbmNlcyBpbiB0aGUgbGlzdC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgbnVtYmVycyA9IFsxLjAsIDEuMSwgMS4yLCAyLjAsIDMuMCwgMi4yXTtcbiAgICAgKiAgICAgIHZhciBsZXR0ZXJzID0gUi5zcGxpdCgnJywgJ2FiY0FCQ2FhYUJCYycpO1xuICAgICAqICAgICAgUi5jb3VudEJ5KE1hdGguZmxvb3IpKG51bWJlcnMpOyAgICAvLz0+IHsnMSc6IDMsICcyJzogMiwgJzMnOiAxfVxuICAgICAqICAgICAgUi5jb3VudEJ5KFIudG9Mb3dlcikobGV0dGVycyk7ICAgLy89PiB7J2EnOiA1LCAnYic6IDQsICdjJzogM31cbiAgICAgKi9cbiAgICB2YXIgY291bnRCeSA9IF9jdXJyeTIoZnVuY3Rpb24gY291bnRCeShmbiwgbGlzdCkge1xuICAgICAgICB2YXIgY291bnRzID0ge307XG4gICAgICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBmbihsaXN0W2lkeF0pO1xuICAgICAgICAgICAgY291bnRzW2tleV0gPSAoX2hhcyhrZXksIGNvdW50cykgPyBjb3VudHNba2V5XSA6IDApICsgMTtcbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3VudHM7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIG9iamVjdCBjb250YWluaW5nIGEgc2luZ2xlIGtleTp2YWx1ZSBwYWlyLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIFN0cmluZyAtPiBhIC0+IHtTdHJpbmc6YX1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsqfSB2YWxcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIG1hdGNoUGhyYXNlcyA9IFIuY29tcG9zZShcbiAgICAgKiAgICAgICAgUi5jcmVhdGVNYXBFbnRyeSgnbXVzdCcpLFxuICAgICAqICAgICAgICBSLm1hcChSLmNyZWF0ZU1hcEVudHJ5KCdtYXRjaF9waHJhc2UnKSlcbiAgICAgKiAgICAgICk7XG4gICAgICogICAgICBtYXRjaFBocmFzZXMoWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiB7bXVzdDogW3ttYXRjaF9waHJhc2U6ICdmb28nfSwge21hdGNoX3BocmFzZTogJ2Jhcid9LCB7bWF0Y2hfcGhyYXNlOiAnYmF6J31dfVxuICAgICAqL1xuICAgIHZhciBjcmVhdGVNYXBFbnRyeSA9IF9jdXJyeTIoZnVuY3Rpb24gY3JlYXRlTWFwRW50cnkoa2V5LCB2YWwpIHtcbiAgICAgICAgdmFyIG9iaiA9IHt9O1xuICAgICAgICBvYmpba2V5XSA9IHZhbDtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBjdXJyaWVkIGVxdWl2YWxlbnQgb2YgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLCB3aXRoIHRoZVxuICAgICAqIHNwZWNpZmllZCBhcml0eS4gVGhlIGN1cnJpZWQgZnVuY3Rpb24gaGFzIHR3byB1bnVzdWFsIGNhcGFiaWxpdGllcy5cbiAgICAgKiBGaXJzdCwgaXRzIGFyZ3VtZW50cyBuZWVkbid0IGJlIHByb3ZpZGVkIG9uZSBhdCBhIHRpbWUuIElmIGBnYCBpc1xuICAgICAqIGBSLmN1cnJ5TigzLCBmKWAsIHRoZSBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gICAgICpcbiAgICAgKiAgIC0gYGcoMSkoMikoMylgXG4gICAgICogICAtIGBnKDEpKDIsIDMpYFxuICAgICAqICAgLSBgZygxLCAyKSgzKWBcbiAgICAgKiAgIC0gYGcoMSwgMiwgMylgXG4gICAgICpcbiAgICAgKiBTZWNvbmRseSwgdGhlIHNwZWNpYWwgcGxhY2Vob2xkZXIgdmFsdWUgYFIuX19gIG1heSBiZSB1c2VkIHRvIHNwZWNpZnlcbiAgICAgKiBcImdhcHNcIiwgYWxsb3dpbmcgcGFydGlhbCBhcHBsaWNhdGlvbiBvZiBhbnkgY29tYmluYXRpb24gb2YgYXJndW1lbnRzLFxuICAgICAqIHJlZ2FyZGxlc3Mgb2YgdGhlaXIgcG9zaXRpb25zLiBJZiBgZ2AgaXMgYXMgYWJvdmUgYW5kIGBfYCBpcyBgUi5fX2AsXG4gICAgICogdGhlIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAgICAgKlxuICAgICAqICAgLSBgZygxLCAyLCAzKWBcbiAgICAgKiAgIC0gYGcoXywgMiwgMykoMSlgXG4gICAgICogICAtIGBnKF8sIF8sIDMpKDEpKDIpYFxuICAgICAqICAgLSBgZyhfLCBfLCAzKSgxLCAyKWBcbiAgICAgKiAgIC0gYGcoXywgMikoMSkoMylgXG4gICAgICogICAtIGBnKF8sIDIpKDEsIDMpYFxuICAgICAqICAgLSBgZyhfLCAyKShfLCAzKSgxKWBcbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIE51bWJlciAtPiAoKiAtPiBhKSAtPiAoKiAtPiBhKVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggVGhlIGFyaXR5IGZvciB0aGUgcmV0dXJuZWQgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldywgY3VycmllZCBmdW5jdGlvbi5cbiAgICAgKiBAc2VlIFIuY3VycnlcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgYWRkRm91ck51bWJlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgcmV0dXJuIFIuc3VtKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCA0KSk7XG4gICAgICogICAgICB9O1xuICAgICAqXG4gICAgICogICAgICB2YXIgY3VycmllZEFkZEZvdXJOdW1iZXJzID0gUi5jdXJyeU4oNCwgYWRkRm91ck51bWJlcnMpO1xuICAgICAqICAgICAgdmFyIGYgPSBjdXJyaWVkQWRkRm91ck51bWJlcnMoMSwgMik7XG4gICAgICogICAgICB2YXIgZyA9IGYoMyk7XG4gICAgICogICAgICBnKDQpOyAvLz0+IDEwXG4gICAgICovXG4gICAgdmFyIGN1cnJ5TiA9IF9jdXJyeTIoZnVuY3Rpb24gY3VycnlOKGxlbmd0aCwgZm4pIHtcbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIF9jdXJyeTEoZm4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfYXJpdHkobGVuZ3RoLCBfY3VycnlOKGxlbmd0aCwgW10sIGZuKSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBEZWNyZW1lbnRzIGl0cyBhcmd1bWVudC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTWF0aFxuICAgICAqIEBzaWcgTnVtYmVyIC0+IE51bWJlclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqIEBzZWUgUi5pbmNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmRlYyg0Mik7IC8vPT4gNDFcbiAgICAgKi9cbiAgICB2YXIgZGVjID0gYWRkKC0xKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHNlY29uZCBhcmd1bWVudCBpZiBpdCBpcyBub3QgbnVsbCBvciB1bmRlZmluZWQuIElmIGl0IGlzIG51bGxcbiAgICAgKiBvciB1bmRlZmluZWQsIHRoZSBmaXJzdCAoZGVmYXVsdCkgYXJndW1lbnQgaXMgcmV0dXJuZWQuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExvZ2ljXG4gICAgICogQHNpZyBhIC0+IGIgLT4gYSB8IGJcbiAgICAgKiBAcGFyYW0ge2F9IHZhbCBUaGUgZGVmYXVsdCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge2J9IHZhbCBUaGUgdmFsdWUgdG8gcmV0dXJuIGlmIGl0IGlzIG5vdCBudWxsIG9yIHVuZGVmaW5lZFxuICAgICAqIEByZXR1cm4geyp9IFRoZSB0aGUgc2Vjb25kIHZhbHVlIG9yIHRoZSBkZWZhdWx0IHZhbHVlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGRlZmF1bHRUbzQyID0gZGVmYXVsdFRvKDQyKTtcbiAgICAgKlxuICAgICAqICAgICAgZGVmYXVsdFRvNDIobnVsbCk7ICAvLz0+IDQyXG4gICAgICogICAgICBkZWZhdWx0VG80Mih1bmRlZmluZWQpOyAgLy89PiA0MlxuICAgICAqICAgICAgZGVmYXVsdFRvNDIoJ1JhbWRhJyk7ICAvLz0+ICdSYW1kYSdcbiAgICAgKi9cbiAgICB2YXIgZGVmYXVsdFRvID0gX2N1cnJ5MihmdW5jdGlvbiBkZWZhdWx0VG8oZCwgdikge1xuICAgICAgICByZXR1cm4gdiA9PSBudWxsID8gZCA6IHY7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgc2V0IChpLmUuIG5vIGR1cGxpY2F0ZXMpIG9mIGFsbCBlbGVtZW50cyBpbiB0aGUgZmlyc3QgbGlzdCBub3QgY29udGFpbmVkIGluIHRoZSBzZWNvbmQgbGlzdC5cbiAgICAgKiBEdXBsaWNhdGlvbiBpcyBkZXRlcm1pbmVkIGFjY29yZGluZyB0byB0aGUgdmFsdWUgcmV0dXJuZWQgYnkgYXBwbHlpbmcgdGhlIHN1cHBsaWVkIHByZWRpY2F0ZSB0byB0d28gbGlzdFxuICAgICAqIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICAgICAqIEBzaWcgKGEsYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgQSBwcmVkaWNhdGUgdXNlZCB0byB0ZXN0IHdoZXRoZXIgdHdvIGl0ZW1zIGFyZSBlcXVhbC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0MSBUaGUgZmlyc3QgbGlzdC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0MiBUaGUgc2Vjb25kIGxpc3QuXG4gICAgICogQHNlZSBSLmRpZmZlcmVuY2VcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIGVsZW1lbnRzIGluIGBsaXN0MWAgdGhhdCBhcmUgbm90IGluIGBsaXN0MmAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgZnVuY3Rpb24gY21wKHgsIHkpIHsgcmV0dXJuIHguYSA9PT0geS5hOyB9XG4gICAgICogICAgICB2YXIgbDEgPSBbe2E6IDF9LCB7YTogMn0sIHthOiAzfV07XG4gICAgICogICAgICB2YXIgbDIgPSBbe2E6IDN9LCB7YTogNH1dO1xuICAgICAqICAgICAgUi5kaWZmZXJlbmNlV2l0aChjbXAsIGwxLCBsMik7IC8vPT4gW3thOiAxfSwge2E6IDJ9XVxuICAgICAqL1xuICAgIHZhciBkaWZmZXJlbmNlV2l0aCA9IF9jdXJyeTMoZnVuY3Rpb24gZGlmZmVyZW5jZVdpdGgocHJlZCwgZmlyc3QsIHNlY29uZCkge1xuICAgICAgICB2YXIgb3V0ID0gW107XG4gICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICB2YXIgZmlyc3RMZW4gPSBmaXJzdC5sZW5ndGg7XG4gICAgICAgIHZhciBjb250YWluc1ByZWQgPSBjb250YWluc1dpdGgocHJlZCk7XG4gICAgICAgIHdoaWxlIChpZHggPCBmaXJzdExlbikge1xuICAgICAgICAgICAgaWYgKCFjb250YWluc1ByZWQoZmlyc3RbaWR4XSwgc2Vjb25kKSAmJiAhY29udGFpbnNQcmVkKGZpcnN0W2lkeF0sIG91dCkpIHtcbiAgICAgICAgICAgICAgICBvdXRbb3V0Lmxlbmd0aF0gPSBmaXJzdFtpZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgb2JqZWN0IHRoYXQgZG9lcyBub3QgY29udGFpbiBhIGBwcm9wYCBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNpZyBTdHJpbmcgLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBkaXNzb2NpYXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiB0aGUgb2JqZWN0IHRvIGNsb25lXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBhIG5ldyBvYmplY3Qgc2ltaWxhciB0byB0aGUgb3JpZ2luYWwgYnV0IHdpdGhvdXQgdGhlIHNwZWNpZmllZCBwcm9wZXJ0eVxuICAgICAqIEBzZWUgUi5hc3NvY1xuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuZGlzc29jKCdiJywge2E6IDEsIGI6IDIsIGM6IDN9KTsgLy89PiB7YTogMSwgYzogM31cbiAgICAgKi9cbiAgICB2YXIgZGlzc29jID0gX2N1cnJ5MihmdW5jdGlvbiBkaXNzb2MocHJvcCwgb2JqKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChwICE9PSBwcm9wKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W3BdID0gb2JqW3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBNYWtlcyBhIHNoYWxsb3cgY2xvbmUgb2YgYW4gb2JqZWN0LCBvbWl0dGluZyB0aGUgcHJvcGVydHkgYXQgdGhlXG4gICAgICogZ2l2ZW4gcGF0aC4gTm90ZSB0aGF0IHRoaXMgY29waWVzIGFuZCBmbGF0dGVucyBwcm90b3R5cGUgcHJvcGVydGllc1xuICAgICAqIG9udG8gdGhlIG5ldyBvYmplY3QgYXMgd2VsbC4gIEFsbCBub24tcHJpbWl0aXZlIHByb3BlcnRpZXMgYXJlIGNvcGllZFxuICAgICAqIGJ5IHJlZmVyZW5jZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNpZyBbU3RyaW5nXSAtPiB7azogdn0gLT4ge2s6IHZ9XG4gICAgICogQHBhcmFtIHtBcnJheX0gcGF0aCB0aGUgcGF0aCB0byBzZXRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIHRoZSBvYmplY3QgdG8gY2xvbmVcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGEgbmV3IG9iamVjdCB3aXRob3V0IHRoZSBwcm9wZXJ0eSBhdCBwYXRoXG4gICAgICogQHNlZSBSLmFzc29jUGF0aFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuZGlzc29jUGF0aChbJ2EnLCAnYicsICdjJ10sIHthOiB7Yjoge2M6IDQyfX19KTsgLy89PiB7YToge2I6IHt9fX1cbiAgICAgKi9cbiAgICB2YXIgZGlzc29jUGF0aCA9IF9jdXJyeTIoZnVuY3Rpb24gZGlzc29jUGF0aChwYXRoLCBvYmopIHtcbiAgICAgICAgc3dpdGNoIChwYXRoLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICByZXR1cm4gZGlzc29jKHBhdGhbMF0sIG9iaik7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2YXIgaGVhZCA9IHBhdGhbMF07XG4gICAgICAgICAgICB2YXIgdGFpbCA9IF9zbGljZShwYXRoLCAxKTtcbiAgICAgICAgICAgIHJldHVybiBvYmpbaGVhZF0gPT0gbnVsbCA/IG9iaiA6IGFzc29jKGhlYWQsIGRpc3NvY1BhdGgodGFpbCwgb2JqW2hlYWRdKSwgb2JqKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogRGl2aWRlcyB0d28gbnVtYmVycy4gRXF1aXZhbGVudCB0byBgYSAvIGJgLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBNYXRoXG4gICAgICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IE51bWJlclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhIFRoZSBmaXJzdCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYiBUaGUgc2Vjb25kIHZhbHVlLlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIHJlc3VsdCBvZiBgYSAvIGJgLlxuICAgICAqIEBzZWUgUi5tdWx0aXBseVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuZGl2aWRlKDcxLCAxMDApOyAvLz0+IDAuNzFcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGhhbGYgPSBSLmRpdmlkZShSLl9fLCAyKTtcbiAgICAgKiAgICAgIGhhbGYoNDIpOyAvLz0+IDIxXG4gICAgICpcbiAgICAgKiAgICAgIHZhciByZWNpcHJvY2FsID0gUi5kaXZpZGUoMSk7XG4gICAgICogICAgICByZWNpcHJvY2FsKDQpOyAgIC8vPT4gMC4yNVxuICAgICAqL1xuICAgIHZhciBkaXZpZGUgPSBfY3VycnkyKGZ1bmN0aW9uIGRpdmlkZShhLCBiKSB7XG4gICAgICAgIHJldHVybiBhIC8gYjtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgbGlzdCBjb250YWluaW5nIGFsbCBidXQgbGFzdCB0aGVgbmAgZWxlbWVudHMgb2YgYSBnaXZlbiBsaXN0LFxuICAgICAqIHBhc3NpbmcgZWFjaCB2YWx1ZSBmcm9tIHRoZSByaWdodCB0byB0aGUgc3VwcGxpZWQgcHJlZGljYXRlIGZ1bmN0aW9uLCBza2lwcGluZ1xuICAgICAqIGVsZW1lbnRzIHdoaWxlIHRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gcmV0dXJucyBgdHJ1ZWAuIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb25cbiAgICAgKiBpcyBwYXNzZWQgb25lIGFyZ3VtZW50OiAodmFsdWUpKi5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgYXJyYXkuXG4gICAgICogQHNlZSBSLnRha2VMYXN0V2hpbGVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgbHRlVGhyZWUgPSBmdW5jdGlvbih4KSB7XG4gICAgICogICAgICAgIHJldHVybiB4IDw9IDM7XG4gICAgICogICAgICB9O1xuICAgICAqXG4gICAgICogICAgICBSLmRyb3BMYXN0V2hpbGUobHRlVGhyZWUsIFsxLCAyLCAzLCA0LCAzLCAyLCAxXSk7IC8vPT4gWzEsIDJdXG4gICAgICovXG4gICAgdmFyIGRyb3BMYXN0V2hpbGUgPSBfY3VycnkyKGZ1bmN0aW9uIGRyb3BMYXN0V2hpbGUocHJlZCwgbGlzdCkge1xuICAgICAgICB2YXIgaWR4ID0gbGlzdC5sZW5ndGggLSAxO1xuICAgICAgICB3aGlsZSAoaWR4ID49IDAgJiYgcHJlZChsaXN0W2lkeF0pKSB7XG4gICAgICAgICAgICBpZHggLT0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3NsaWNlKGxpc3QsIDAsIGlkeCArIDEpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQSBmdW5jdGlvbiB3cmFwcGluZyBjYWxscyB0byB0aGUgdHdvIGZ1bmN0aW9ucyBpbiBhbiBgfHxgIG9wZXJhdGlvbiwgcmV0dXJuaW5nIHRoZSByZXN1bHQgb2YgdGhlIGZpcnN0XG4gICAgICogZnVuY3Rpb24gaWYgaXQgaXMgdHJ1dGgteSBhbmQgdGhlIHJlc3VsdCBvZiB0aGUgc2Vjb25kIGZ1bmN0aW9uIG90aGVyd2lzZS4gIE5vdGUgdGhhdCB0aGlzIGlzXG4gICAgICogc2hvcnQtY2lyY3VpdGVkLCBtZWFuaW5nIHRoYXQgdGhlIHNlY29uZCBmdW5jdGlvbiB3aWxsIG5vdCBiZSBpbnZva2VkIGlmIHRoZSBmaXJzdCByZXR1cm5zIGEgdHJ1dGgteVxuICAgICAqIHZhbHVlLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMb2dpY1xuICAgICAqIEBzaWcgKCouLi4gLT4gQm9vbGVhbikgLT4gKCouLi4gLT4gQm9vbGVhbikgLT4gKCouLi4gLT4gQm9vbGVhbilcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmIGEgcHJlZGljYXRlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZyBhbm90aGVyIHByZWRpY2F0ZVxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBhIGZ1bmN0aW9uIHRoYXQgYXBwbGllcyBpdHMgYXJndW1lbnRzIHRvIGBmYCBhbmQgYGdgIGFuZCBgfHxgcyB0aGVpciBvdXRwdXRzIHRvZ2V0aGVyLlxuICAgICAqIEBzZWUgUi5vclxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBndDEwID0gZnVuY3Rpb24oeCkgeyByZXR1cm4geCA+IDEwOyB9O1xuICAgICAqICAgICAgdmFyIGV2ZW4gPSBmdW5jdGlvbih4KSB7IHJldHVybiB4ICUgMiA9PT0gMCB9O1xuICAgICAqICAgICAgdmFyIGYgPSBSLmVpdGhlcihndDEwLCBldmVuKTtcbiAgICAgKiAgICAgIGYoMTAxKTsgLy89PiB0cnVlXG4gICAgICogICAgICBmKDgpOyAvLz0+IHRydWVcbiAgICAgKi9cbiAgICB2YXIgZWl0aGVyID0gX2N1cnJ5MihmdW5jdGlvbiBlaXRoZXIoZiwgZykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gX2VpdGhlcigpIHtcbiAgICAgICAgICAgIHJldHVybiBmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZW1wdHkgdmFsdWUgb2YgaXRzIGFyZ3VtZW50J3MgdHlwZS4gUmFtZGEgZGVmaW5lcyB0aGUgZW1wdHlcbiAgICAgKiB2YWx1ZSBvZiBBcnJheSAoYFtdYCksIE9iamVjdCAoYHt9YCksIGFuZCBTdHJpbmcgKGAnJ2ApLiBPdGhlciB0eXBlcyBhcmVcbiAgICAgKiBzdXBwb3J0ZWQgaWYgdGhleSBkZWZpbmUgYDxUeXBlPi5lbXB0eWAgYW5kL29yIGA8VHlwZT4ucHJvdG90eXBlLmVtcHR5YC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIGEgLT4gYVxuICAgICAqIEBwYXJhbSB7Kn0geFxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5lbXB0eShKdXN0KDQyKSk7ICAgICAgLy89PiBOb3RoaW5nKClcbiAgICAgKiAgICAgIFIuZW1wdHkoWzEsIDIsIDNdKTsgICAgIC8vPT4gW11cbiAgICAgKiAgICAgIFIuZW1wdHkoJ3VuaWNvcm5zJyk7ICAgIC8vPT4gJydcbiAgICAgKiAgICAgIFIuZW1wdHkoe3g6IDEsIHk6IDJ9KTsgIC8vPT4ge31cbiAgICAgKi9cbiAgICB2YXIgZW1wdHkgPSBfY3VycnkxKGZ1bmN0aW9uIGVtcHR5KHgpIHtcbiAgICAgICAgaWYgKHggIT0gbnVsbCAmJiB0eXBlb2YgeC5lbXB0eSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHguZW1wdHkoKTtcbiAgICAgICAgfSBlbHNlIGlmICh4ICE9IG51bGwgJiYgdHlwZW9mIHguY29uc3RydWN0b3IgIT0gbnVsbCAmJiB0eXBlb2YgeC5jb25zdHJ1Y3Rvci5lbXB0eSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHguY29uc3RydWN0b3IuZW1wdHkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpKSB7XG4gICAgICAgICAgICBjYXNlICdbb2JqZWN0IEFycmF5XSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgY2FzZSAnW29iamVjdCBPYmplY3RdJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICBjYXNlICdbb2JqZWN0IFN0cmluZ10nOlxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBvYmplY3QgYnkgcmVjdXJzaXZlbHkgZXZvbHZpbmcgYSBzaGFsbG93IGNvcHkgb2YgYG9iamVjdGAsIGFjY29yZGluZyB0byB0aGVcbiAgICAgKiBgdHJhbnNmb3JtYXRpb25gIGZ1bmN0aW9ucy4gQWxsIG5vbi1wcmltaXRpdmUgcHJvcGVydGllcyBhcmUgY29waWVkIGJ5IHJlZmVyZW5jZS5cbiAgICAgKlxuICAgICAqIEEgYHRyYW5mb3JtYXRpb25gIGZ1bmN0aW9uIHdpbGwgbm90IGJlIGludm9rZWQgaWYgaXRzIGNvcnJlc3BvbmRpbmcga2V5IGRvZXMgbm90IGV4aXN0IGluXG4gICAgICogdGhlIGV2b2x2ZWQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIHtrOiAodiAtPiB2KX0gLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB0cmFuc2Zvcm1hdGlvbnMgVGhlIG9iamVjdCBzcGVjaWZ5aW5nIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9ucyB0byBhcHBseVxuICAgICAqICAgICAgICB0byB0aGUgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSB0cmFuc2Zvcm1lZC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSB0cmFuc2Zvcm1lZCBvYmplY3QuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHRvbWF0byAgPSB7Zmlyc3ROYW1lOiAnICBUb21hdG8gJywgZGF0YToge2VsYXBzZWQ6IDEwMCwgcmVtYWluaW5nOiAxNDAwfSwgaWQ6MTIzfTtcbiAgICAgKiAgICAgIHZhciB0cmFuc2Zvcm1hdGlvbnMgPSB7XG4gICAgICogICAgICAgIGZpcnN0TmFtZTogUi50cmltLFxuICAgICAqICAgICAgICBsYXN0TmFtZTogUi50cmltLCAvLyBXaWxsIG5vdCBnZXQgaW52b2tlZC5cbiAgICAgKiAgICAgICAgZGF0YToge2VsYXBzZWQ6IFIuYWRkKDEpLCByZW1haW5pbmc6IFIuYWRkKC0xKX1cbiAgICAgKiAgICAgIH07XG4gICAgICogICAgICBSLmV2b2x2ZSh0cmFuc2Zvcm1hdGlvbnMsIHRvbWF0byk7IC8vPT4ge2ZpcnN0TmFtZTogJ1RvbWF0bycsIGRhdGE6IHtlbGFwc2VkOiAxMDEsIHJlbWFpbmluZzogMTM5OX0sIGlkOjEyM31cbiAgICAgKi9cbiAgICB2YXIgZXZvbHZlID0gX2N1cnJ5MihmdW5jdGlvbiBldm9sdmUodHJhbnNmb3JtYXRpb25zLCBvYmplY3QpIHtcbiAgICAgICAgdmFyIHRyYW5zZm9ybWF0aW9uLCBrZXksIHR5cGUsIHJlc3VsdCA9IHt9O1xuICAgICAgICBmb3IgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWF0aW9uID0gdHJhbnNmb3JtYXRpb25zW2tleV07XG4gICAgICAgICAgICB0eXBlID0gdHlwZW9mIHRyYW5zZm9ybWF0aW9uO1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0eXBlID09PSAnZnVuY3Rpb24nID8gdHJhbnNmb3JtYXRpb24ob2JqZWN0W2tleV0pIDogdHlwZSA9PT0gJ29iamVjdCcgPyBldm9sdmUodHJhbnNmb3JtYXRpb25zW2tleV0sIG9iamVjdFtrZXldKSA6IG9iamVjdFtrZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IG9iamVjdCBvdXQgb2YgYSBsaXN0IGtleS12YWx1ZSBwYWlycy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgW1trLHZdXSAtPiB7azogdn1cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYWlycyBBbiBhcnJheSBvZiB0d28tZWxlbWVudCBhcnJheXMgdGhhdCB3aWxsIGJlIHRoZSBrZXlzIGFuZCB2YWx1ZXMgb2YgdGhlIG91dHB1dCBvYmplY3QuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgb2JqZWN0IG1hZGUgYnkgcGFpcmluZyB1cCBga2V5c2AgYW5kIGB2YWx1ZXNgLlxuICAgICAqIEBzZWUgUi50b1BhaXJzXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5mcm9tUGFpcnMoW1snYScsIDFdLCBbJ2InLCAyXSwgIFsnYycsIDNdXSk7IC8vPT4ge2E6IDEsIGI6IDIsIGM6IDN9XG4gICAgICovXG4gICAgdmFyIGZyb21QYWlycyA9IF9jdXJyeTEoZnVuY3Rpb24gZnJvbVBhaXJzKHBhaXJzKSB7XG4gICAgICAgIHZhciBpZHggPSAwLCBsZW4gPSBwYWlycy5sZW5ndGgsIG91dCA9IHt9O1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoX2lzQXJyYXkocGFpcnNbaWR4XSkgJiYgcGFpcnNbaWR4XS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBvdXRbcGFpcnNbaWR4XVswXV0gPSBwYWlyc1tpZHhdWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBncmVhdGVyIHRoYW4gdGhlIHNlY29uZDtcbiAgICAgKiBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAgICAgKiBAc2lnIE9yZCBhID0+IGEgLT4gYSAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHsqfSBhXG4gICAgICogQHBhcmFtIHsqfSBiXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiBAc2VlIFIubHRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmd0KDIsIDEpOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIuZ3QoMiwgMik7IC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIuZ3QoMiwgMyk7IC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIuZ3QoJ2EnLCAneicpOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmd0KCd6JywgJ2EnKTsgLy89PiB0cnVlXG4gICAgICovXG4gICAgdmFyIGd0ID0gX2N1cnJ5MihmdW5jdGlvbiBndChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhID4gYjtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHNlY29uZDtcbiAgICAgKiBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAgICAgKiBAc2lnIE9yZCBhID0+IGEgLT4gYSAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGFcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQHNlZSBSLmx0ZVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuZ3RlKDIsIDEpOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIuZ3RlKDIsIDIpOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIuZ3RlKDIsIDMpOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmd0ZSgnYScsICd6Jyk7IC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIuZ3RlKCd6JywgJ2EnKTsgLy89PiB0cnVlXG4gICAgICovXG4gICAgdmFyIGd0ZSA9IF9jdXJyeTIoZnVuY3Rpb24gZ3RlKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgPj0gYjtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgYW4gb2JqZWN0IGhhcyBhbiBvd24gcHJvcGVydHkgd2l0aFxuICAgICAqIHRoZSBzcGVjaWZpZWQgbmFtZVxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIHMgLT4ge3M6IHh9IC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcCBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gY2hlY2sgZm9yLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBXaGV0aGVyIHRoZSBwcm9wZXJ0eSBleGlzdHMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGhhc05hbWUgPSBSLmhhcygnbmFtZScpO1xuICAgICAqICAgICAgaGFzTmFtZSh7bmFtZTogJ2FsaWNlJ30pOyAgIC8vPT4gdHJ1ZVxuICAgICAqICAgICAgaGFzTmFtZSh7bmFtZTogJ2JvYid9KTsgICAgIC8vPT4gdHJ1ZVxuICAgICAqICAgICAgaGFzTmFtZSh7fSk7ICAgICAgICAgICAgICAgIC8vPT4gZmFsc2VcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHBvaW50ID0ge3g6IDAsIHk6IDB9O1xuICAgICAqICAgICAgdmFyIHBvaW50SGFzID0gUi5oYXMoUi5fXywgcG9pbnQpO1xuICAgICAqICAgICAgcG9pbnRIYXMoJ3gnKTsgIC8vPT4gdHJ1ZVxuICAgICAqICAgICAgcG9pbnRIYXMoJ3knKTsgIC8vPT4gdHJ1ZVxuICAgICAqICAgICAgcG9pbnRIYXMoJ3onKTsgIC8vPT4gZmFsc2VcbiAgICAgKi9cbiAgICB2YXIgaGFzID0gX2N1cnJ5MihfaGFzKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgYW4gb2JqZWN0IG9yIGl0cyBwcm90b3R5cGUgY2hhaW4gaGFzXG4gICAgICogYSBwcm9wZXJ0eSB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZVxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIHMgLT4ge3M6IHh9IC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcCBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gY2hlY2sgZm9yLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBXaGV0aGVyIHRoZSBwcm9wZXJ0eSBleGlzdHMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgZnVuY3Rpb24gUmVjdGFuZ2xlKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgKiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAqICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgKiAgICAgIH1cbiAgICAgKiAgICAgIFJlY3RhbmdsZS5wcm90b3R5cGUuYXJlYSA9IGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICByZXR1cm4gdGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0O1xuICAgICAqICAgICAgfTtcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHNxdWFyZSA9IG5ldyBSZWN0YW5nbGUoMiwgMik7XG4gICAgICogICAgICBSLmhhc0luKCd3aWR0aCcsIHNxdWFyZSk7ICAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIuaGFzSW4oJ2FyZWEnLCBzcXVhcmUpOyAgLy89PiB0cnVlXG4gICAgICovXG4gICAgdmFyIGhhc0luID0gX2N1cnJ5MihmdW5jdGlvbiBoYXNJbihwcm9wLCBvYmopIHtcbiAgICAgICAgcmV0dXJuIHByb3AgaW4gb2JqO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGl0cyBhcmd1bWVudHMgYXJlIGlkZW50aWNhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBWYWx1ZXMgYXJlXG4gICAgICogaWRlbnRpY2FsIGlmIHRoZXkgcmVmZXJlbmNlIHRoZSBzYW1lIG1lbW9yeS4gYE5hTmAgaXMgaWRlbnRpY2FsIHRvIGBOYU5gO1xuICAgICAqIGAwYCBhbmQgYC0wYCBhcmUgbm90IGlkZW50aWNhbC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAgICAgKiBAc2lnIGEgLT4gYSAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHsqfSBhXG4gICAgICogQHBhcmFtIHsqfSBiXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgbyA9IHt9O1xuICAgICAqICAgICAgUi5pZGVudGljYWwobywgbyk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5pZGVudGljYWwoMSwgMSk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5pZGVudGljYWwoMSwgJzEnKTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5pZGVudGljYWwoW10sIFtdKTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5pZGVudGljYWwoMCwgLTApOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmlkZW50aWNhbChOYU4sIE5hTik7IC8vPT4gdHJ1ZVxuICAgICAqL1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgdmFyIGlkZW50aWNhbCA9IF9jdXJyeTIoZnVuY3Rpb24gaWRlbnRpY2FsKGEsIGIpIHtcbiAgICAgICAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICAgICAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAgICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgICAgICAgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgICAgICAgIHJldHVybiBhICE9PSBhICYmIGIgIT09IGI7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEEgZnVuY3Rpb24gdGhhdCBkb2VzIG5vdGhpbmcgYnV0IHJldHVybiB0aGUgcGFyYW1ldGVyIHN1cHBsaWVkIHRvIGl0LiBHb29kIGFzIGEgZGVmYXVsdFxuICAgICAqIG9yIHBsYWNlaG9sZGVyIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgYSAtPiBhXG4gICAgICogQHBhcmFtIHsqfSB4IFRoZSB2YWx1ZSB0byByZXR1cm4uXG4gICAgICogQHJldHVybiB7Kn0gVGhlIGlucHV0IHZhbHVlLCBgeGAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5pZGVudGl0eSgxKTsgLy89PiAxXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBvYmogPSB7fTtcbiAgICAgKiAgICAgIFIuaWRlbnRpdHkob2JqKSA9PT0gb2JqOyAvLz0+IHRydWVcbiAgICAgKi9cbiAgICB2YXIgaWRlbnRpdHkgPSBfY3VycnkxKF9pZGVudGl0eSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3aWxsIHByb2Nlc3MgZWl0aGVyIHRoZSBgb25UcnVlYCBvciB0aGUgYG9uRmFsc2VgIGZ1bmN0aW9uIGRlcGVuZGluZ1xuICAgICAqIHVwb24gdGhlIHJlc3VsdCBvZiB0aGUgYGNvbmRpdGlvbmAgcHJlZGljYXRlLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMb2dpY1xuICAgICAqIEBzaWcgKCouLi4gLT4gQm9vbGVhbikgLT4gKCouLi4gLT4gKikgLT4gKCouLi4gLT4gKikgLT4gKCouLi4gLT4gKilcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25kaXRpb24gQSBwcmVkaWNhdGUgZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvblRydWUgQSBmdW5jdGlvbiB0byBpbnZva2Ugd2hlbiB0aGUgYGNvbmRpdGlvbmAgZXZhbHVhdGVzIHRvIGEgdHJ1dGh5IHZhbHVlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uRmFsc2UgQSBmdW5jdGlvbiB0byBpbnZva2Ugd2hlbiB0aGUgYGNvbmRpdGlvbmAgZXZhbHVhdGVzIHRvIGEgZmFsc3kgdmFsdWUuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3IHVuYXJ5IGZ1bmN0aW9uIHRoYXQgd2lsbCBwcm9jZXNzIGVpdGhlciB0aGUgYG9uVHJ1ZWAgb3IgdGhlIGBvbkZhbHNlYFxuICAgICAqICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBkZXBlbmRpbmcgdXBvbiB0aGUgcmVzdWx0IG9mIHRoZSBgY29uZGl0aW9uYCBwcmVkaWNhdGUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgLy8gRmxhdHRlbiBhbGwgYXJyYXlzIGluIHRoZSBsaXN0IGJ1dCBsZWF2ZSBvdGhlciB2YWx1ZXMgYWxvbmUuXG4gICAgICogICAgICB2YXIgZmxhdHRlbkFycmF5cyA9IFIubWFwKFIuaWZFbHNlKEFycmF5LmlzQXJyYXksIFIuZmxhdHRlbiwgUi5pZGVudGl0eSkpO1xuICAgICAqXG4gICAgICogICAgICBmbGF0dGVuQXJyYXlzKFtbMF0sIFtbMTBdLCBbOF1dLCAxMjM0LCB7fV0pOyAvLz0+IFtbMF0sIFsxMCwgOF0sIDEyMzQsIHt9XVxuICAgICAqICAgICAgZmxhdHRlbkFycmF5cyhbW1sxMF0sIDEyM10sIFs4LCBbMTBdXSwgXCJoZWxsb1wiXSk7IC8vPT4gW1sxMCwgMTIzXSwgWzgsIDEwXSwgXCJoZWxsb1wiXVxuICAgICAqL1xuICAgIHZhciBpZkVsc2UgPSBfY3VycnkzKGZ1bmN0aW9uIGlmRWxzZShjb25kaXRpb24sIG9uVHJ1ZSwgb25GYWxzZSkge1xuICAgICAgICByZXR1cm4gY3VycnlOKE1hdGgubWF4KGNvbmRpdGlvbi5sZW5ndGgsIG9uVHJ1ZS5sZW5ndGgsIG9uRmFsc2UubGVuZ3RoKSwgZnVuY3Rpb24gX2lmRWxzZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25kaXRpb24uYXBwbHkodGhpcywgYXJndW1lbnRzKSA/IG9uVHJ1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDogb25GYWxzZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEluY3JlbWVudHMgaXRzIGFyZ3VtZW50LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBNYXRoXG4gICAgICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICogQHNlZSBSLmRlY1xuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuaW5jKDQyKTsgLy89PiA0M1xuICAgICAqL1xuICAgIHZhciBpbmMgPSBhZGQoMSk7XG5cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoZSBzdXBwbGllZCBlbGVtZW50IGludG8gdGhlIGxpc3QsIGF0IGluZGV4IGBpbmRleGAuICBfTm90ZVxuICAgICAqIHRoYXQgdGhpcyBpcyBub3QgZGVzdHJ1Y3RpdmVfOiBpdCByZXR1cm5zIGEgY29weSBvZiB0aGUgbGlzdCB3aXRoIHRoZSBjaGFuZ2VzLlxuICAgICAqIDxzbWFsbD5ObyBsaXN0cyBoYXZlIGJlZW4gaGFybWVkIGluIHRoZSBhcHBsaWNhdGlvbiBvZiB0aGlzIGZ1bmN0aW9uLjwvc21hbGw+XG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIE51bWJlciAtPiBhIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIHBvc2l0aW9uIHRvIGluc2VydCB0aGUgZWxlbWVudFxuICAgICAqIEBwYXJhbSB7Kn0gZWx0IFRoZSBlbGVtZW50IHRvIGluc2VydCBpbnRvIHRoZSBBcnJheVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaW5zZXJ0IGludG9cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgQXJyYXkgd2l0aCBgZWx0YCBpbnNlcnRlZCBhdCBgaW5kZXhgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuaW5zZXJ0KDIsICd4JywgWzEsMiwzLDRdKTsgLy89PiBbMSwyLCd4JywzLDRdXG4gICAgICovXG4gICAgdmFyIGluc2VydCA9IF9jdXJyeTMoZnVuY3Rpb24gaW5zZXJ0KGlkeCwgZWx0LCBsaXN0KSB7XG4gICAgICAgIGlkeCA9IGlkeCA8IGxpc3QubGVuZ3RoICYmIGlkeCA+PSAwID8gaWR4IDogbGlzdC5sZW5ndGg7XG4gICAgICAgIHZhciByZXN1bHQgPSBfc2xpY2UobGlzdCk7XG4gICAgICAgIHJlc3VsdC5zcGxpY2UoaWR4LCAwLCBlbHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGUgc3ViLWxpc3QgaW50byB0aGUgbGlzdCwgYXQgaW5kZXggYGluZGV4YC4gIF9Ob3RlICB0aGF0IHRoaXNcbiAgICAgKiBpcyBub3QgZGVzdHJ1Y3RpdmVfOiBpdCByZXR1cm5zIGEgY29weSBvZiB0aGUgbGlzdCB3aXRoIHRoZSBjaGFuZ2VzLlxuICAgICAqIDxzbWFsbD5ObyBsaXN0cyBoYXZlIGJlZW4gaGFybWVkIGluIHRoZSBhcHBsaWNhdGlvbiBvZiB0aGlzIGZ1bmN0aW9uLjwvc21hbGw+XG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIE51bWJlciAtPiBbYV0gLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgcG9zaXRpb24gdG8gaW5zZXJ0IHRoZSBzdWItbGlzdFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGVsdHMgVGhlIHN1Yi1saXN0IHRvIGluc2VydCBpbnRvIHRoZSBBcnJheVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaW5zZXJ0IHRoZSBzdWItbGlzdCBpbnRvXG4gICAgICogQHJldHVybiB7QXJyYXl9IEEgbmV3IEFycmF5IHdpdGggYGVsdHNgIGluc2VydGVkIHN0YXJ0aW5nIGF0IGBpbmRleGAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5pbnNlcnRBbGwoMiwgWyd4JywneScsJ3onXSwgWzEsMiwzLDRdKTsgLy89PiBbMSwyLCd4JywneScsJ3onLDMsNF1cbiAgICAgKi9cbiAgICB2YXIgaW5zZXJ0QWxsID0gX2N1cnJ5MyhmdW5jdGlvbiBpbnNlcnRBbGwoaWR4LCBlbHRzLCBsaXN0KSB7XG4gICAgICAgIGlkeCA9IGlkeCA8IGxpc3QubGVuZ3RoICYmIGlkeCA+PSAwID8gaWR4IDogbGlzdC5sZW5ndGg7XG4gICAgICAgIHJldHVybiBfY29uY2F0KF9jb25jYXQoX3NsaWNlKGxpc3QsIDAsIGlkeCksIGVsdHMpLCBfc2xpY2UobGlzdCwgaWR4KSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBTZWUgaWYgYW4gb2JqZWN0IChgdmFsYCkgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIHN1cHBsaWVkIGNvbnN0cnVjdG9yLlxuICAgICAqIFRoaXMgZnVuY3Rpb24gd2lsbCBjaGVjayB1cCB0aGUgaW5oZXJpdGFuY2UgY2hhaW4sIGlmIGFueS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgVHlwZVxuICAgICAqIEBzaWcgKCogLT4geyp9KSAtPiBhIC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY3RvciBBIGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuaXMoT2JqZWN0LCB7fSk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5pcyhOdW1iZXIsIDEpOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIuaXMoT2JqZWN0LCAxKTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5pcyhTdHJpbmcsICdzJyk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5pcyhTdHJpbmcsIG5ldyBTdHJpbmcoJycpKTsgLy89PiB0cnVlXG4gICAgICogICAgICBSLmlzKE9iamVjdCwgbmV3IFN0cmluZygnJykpOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIuaXMoT2JqZWN0LCAncycpOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmlzKE51bWJlciwge30pOyAvLz0+IGZhbHNlXG4gICAgICovXG4gICAgdmFyIGlzID0gX2N1cnJ5MihmdW5jdGlvbiBpcyhDdG9yLCB2YWwpIHtcbiAgICAgICAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gQ3RvciB8fCB2YWwgaW5zdGFuY2VvZiBDdG9yO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogVGVzdHMgd2hldGhlciBvciBub3QgYW4gb2JqZWN0IGlzIHNpbWlsYXIgdG8gYW4gYXJyYXkuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IFR5cGVcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKiAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHsqfSB4IFRoZSBvYmplY3QgdG8gdGVzdC5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgYHhgIGhhcyBhIG51bWVyaWMgbGVuZ3RoIHByb3BlcnR5IGFuZCBleHRyZW1lIGluZGljZXMgZGVmaW5lZDsgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5pc0FycmF5TGlrZShbXSk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5pc0FycmF5TGlrZSh0cnVlKTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5pc0FycmF5TGlrZSh7fSk7IC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIuaXNBcnJheUxpa2Uoe2xlbmd0aDogMTB9KTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5pc0FycmF5TGlrZSh7MDogJ3plcm8nLCA5OiAnbmluZScsIGxlbmd0aDogMTB9KTsgLy89PiB0cnVlXG4gICAgICovXG4gICAgdmFyIGlzQXJyYXlMaWtlID0gX2N1cnJ5MShmdW5jdGlvbiBpc0FycmF5TGlrZSh4KSB7XG4gICAgICAgIGlmIChfaXNBcnJheSh4KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF4KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB4ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4IGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHgubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAhIXgubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHgubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHguaGFzT3duUHJvcGVydHkoMCkgJiYgeC5oYXNPd25Qcm9wZXJ0eSh4Lmxlbmd0aCAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJlcG9ydHMgd2hldGhlciB0aGUgbGlzdCBoYXMgemVybyBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTG9naWNcbiAgICAgKiBAc2lnIFthXSAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5pc0VtcHR5KFsxLCAyLCAzXSk7ICAgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5pc0VtcHR5KFtdKTsgICAgICAgICAgLy89PiB0cnVlXG4gICAgICogICAgICBSLmlzRW1wdHkoJycpOyAgICAgICAgICAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIuaXNFbXB0eShudWxsKTsgICAgICAgIC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIuaXNFbXB0eShSLmtleXMoe30pKTsgIC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5pc0VtcHR5KHt9KTsgICAgICAgICAgLy89PiBmYWxzZSAoe30gZG9lcyBub3QgaGF2ZSBhIGxlbmd0aCBwcm9wZXJ0eSlcbiAgICAgKiAgICAgIFIuaXNFbXB0eSh7bGVuZ3RoOiAwfSk7IC8vPT4gdHJ1ZVxuICAgICAqL1xuICAgIHZhciBpc0VtcHR5ID0gX2N1cnJ5MShmdW5jdGlvbiBpc0VtcHR5KGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdChsaXN0KS5sZW5ndGggPT09IDA7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIGlucHV0IHZhbHVlIGlzIGBudWxsYCBvciBgdW5kZWZpbmVkYC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgVHlwZVxuICAgICAqIEBzaWcgKiAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHsqfSB4IFRoZSB2YWx1ZSB0byB0ZXN0LlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBgeGAgaXMgYHVuZGVmaW5lZGAgb3IgYG51bGxgLCBvdGhlcndpc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmlzTmlsKG51bGwpOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIuaXNOaWwodW5kZWZpbmVkKTsgLy89PiB0cnVlXG4gICAgICogICAgICBSLmlzTmlsKDApOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmlzTmlsKFtdKTsgLy89PiBmYWxzZVxuICAgICAqL1xuICAgIHZhciBpc05pbCA9IF9jdXJyeTEoZnVuY3Rpb24gaXNOaWwoeCkge1xuICAgICAgICByZXR1cm4geCA9PSBudWxsO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3QgY29udGFpbmluZyB0aGUgbmFtZXMgb2YgYWxsIHRoZSBlbnVtZXJhYmxlIG93blxuICAgICAqIHByb3BlcnRpZXMgb2YgdGhlIHN1cHBsaWVkIG9iamVjdC5cbiAgICAgKiBOb3RlIHRoYXQgdGhlIG9yZGVyIG9mIHRoZSBvdXRwdXQgYXJyYXkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmVcbiAgICAgKiBjb25zaXN0ZW50IGFjcm9zcyBkaWZmZXJlbnQgSlMgcGxhdGZvcm1zLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIHtrOiB2fSAtPiBba11cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gZXh0cmFjdCBwcm9wZXJ0aWVzIGZyb21cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgb2YgdGhlIG9iamVjdCdzIG93biBwcm9wZXJ0aWVzLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIua2V5cyh7YTogMSwgYjogMiwgYzogM30pOyAvLz0+IFsnYScsICdiJywgJ2MnXVxuICAgICAqL1xuICAgIC8vIGNvdmVyIElFIDwgOSBrZXlzIGlzc3Vlc1xuICAgIHZhciBrZXlzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBjb3ZlciBJRSA8IDkga2V5cyBpc3N1ZXNcbiAgICAgICAgdmFyIGhhc0VudW1CdWcgPSAheyB0b1N0cmluZzogbnVsbCB9LnByb3BlcnR5SXNFbnVtZXJhYmxlKCd0b1N0cmluZycpO1xuICAgICAgICB2YXIgbm9uRW51bWVyYWJsZVByb3BzID0gW1xuICAgICAgICAgICAgJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgICAgICd2YWx1ZU9mJyxcbiAgICAgICAgICAgICdpc1Byb3RvdHlwZU9mJyxcbiAgICAgICAgICAgICd0b1N0cmluZycsXG4gICAgICAgICAgICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAgICAgICAgICAgJ2hhc093blByb3BlcnR5JyxcbiAgICAgICAgICAgICd0b0xvY2FsZVN0cmluZydcbiAgICAgICAgXTtcbiAgICAgICAgdmFyIGNvbnRhaW5zID0gZnVuY3Rpb24gY29udGFpbnMobGlzdCwgaXRlbSkge1xuICAgICAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaWR4IDwgbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdFtpZHhdID09PSBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJyA/IF9jdXJyeTEoZnVuY3Rpb24ga2V5cyhvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qob2JqKSAhPT0gb2JqID8gW10gOiBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICB9KSA6IF9jdXJyeTEoZnVuY3Rpb24ga2V5cyhvYmopIHtcbiAgICAgICAgICAgIGlmIChPYmplY3Qob2JqKSAhPT0gb2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHByb3AsIGtzID0gW10sIG5JZHg7XG4gICAgICAgICAgICBmb3IgKHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9oYXMocHJvcCwgb2JqKSkge1xuICAgICAgICAgICAgICAgICAgICBrc1trcy5sZW5ndGhdID0gcHJvcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFzRW51bUJ1Zykge1xuICAgICAgICAgICAgICAgIG5JZHggPSBub25FbnVtZXJhYmxlUHJvcHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICB3aGlsZSAobklkeCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3AgPSBub25FbnVtZXJhYmxlUHJvcHNbbklkeF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChfaGFzKHByb3AsIG9iaikgJiYgIWNvbnRhaW5zKGtzLCBwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAga3Nba3MubGVuZ3RoXSA9IHByb3A7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbklkeCAtPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBrcztcbiAgICAgICAgfSk7XG4gICAgfSgpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3QgY29udGFpbmluZyB0aGUgbmFtZXMgb2YgYWxsIHRoZVxuICAgICAqIHByb3BlcnRpZXMgb2YgdGhlIHN1cHBsaWVkIG9iamVjdCwgaW5jbHVkaW5nIHByb3RvdHlwZSBwcm9wZXJ0aWVzLlxuICAgICAqIE5vdGUgdGhhdCB0aGUgb3JkZXIgb2YgdGhlIG91dHB1dCBhcnJheSBpcyBub3QgZ3VhcmFudGVlZCB0byBiZVxuICAgICAqIGNvbnNpc3RlbnQgYWNyb3NzIGRpZmZlcmVudCBKUyBwbGF0Zm9ybXMuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcge2s6IHZ9IC0+IFtrXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBleHRyYWN0IHByb3BlcnRpZXMgZnJvbVxuICAgICAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSBvZiB0aGUgb2JqZWN0J3Mgb3duIGFuZCBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgRiA9IGZ1bmN0aW9uKCkgeyB0aGlzLnggPSAnWCc7IH07XG4gICAgICogICAgICBGLnByb3RvdHlwZS55ID0gJ1knO1xuICAgICAqICAgICAgdmFyIGYgPSBuZXcgRigpO1xuICAgICAqICAgICAgUi5rZXlzSW4oZik7IC8vPT4gWyd4JywgJ3knXVxuICAgICAqL1xuICAgIHZhciBrZXlzSW4gPSBfY3VycnkxKGZ1bmN0aW9uIGtleXNJbihvYmopIHtcbiAgICAgICAgdmFyIHByb3AsIGtzID0gW107XG4gICAgICAgIGZvciAocHJvcCBpbiBvYmopIHtcbiAgICAgICAgICAgIGtzW2tzLmxlbmd0aF0gPSBwcm9wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrcztcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgYXJyYXkgYnkgcmV0dXJuaW5nIGBsaXN0Lmxlbmd0aGAuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIFthXSAtPiBOdW1iZXJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGxlbmd0aCBvZiB0aGUgYXJyYXkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5sZW5ndGgoW10pOyAvLz0+IDBcbiAgICAgKiAgICAgIFIubGVuZ3RoKFsxLCAyLCAzXSk7IC8vPT4gM1xuICAgICAqL1xuICAgIHZhciBsZW5ndGggPSBfY3VycnkxKGZ1bmN0aW9uIGxlbmd0aChsaXN0KSB7XG4gICAgICAgIHJldHVybiBsaXN0ICE9IG51bGwgJiYgaXMoTnVtYmVyLCBsaXN0Lmxlbmd0aCkgPyBsaXN0Lmxlbmd0aCA6IE5hTjtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBsZXNzIHRoYW4gdGhlIHNlY29uZDtcbiAgICAgKiBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAgICAgKiBAc2lnIE9yZCBhID0+IGEgLT4gYSAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHsqfSBhXG4gICAgICogQHBhcmFtIHsqfSBiXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiBAc2VlIFIuZ3RcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmx0KDIsIDEpOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmx0KDIsIDIpOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmx0KDIsIDMpOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIubHQoJ2EnLCAneicpOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIubHQoJ3onLCAnYScpOyAvLz0+IGZhbHNlXG4gICAgICovXG4gICAgdmFyIGx0ID0gX2N1cnJ5MihmdW5jdGlvbiBsdChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhIDwgYjtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHNlY29uZDtcbiAgICAgKiBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAgICAgKiBAc2lnIE9yZCBhID0+IGEgLT4gYSAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGFcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQHNlZSBSLmd0ZVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIubHRlKDIsIDEpOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmx0ZSgyLCAyKTsgLy89PiB0cnVlXG4gICAgICogICAgICBSLmx0ZSgyLCAzKTsgLy89PiB0cnVlXG4gICAgICogICAgICBSLmx0ZSgnYScsICd6Jyk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5sdGUoJ3onLCAnYScpOyAvLz0+IGZhbHNlXG4gICAgICovXG4gICAgdmFyIGx0ZSA9IF9jdXJyeTIoZnVuY3Rpb24gbHRlKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgPD0gYjtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBtYXBBY2N1bSBmdW5jdGlvbiBiZWhhdmVzIGxpa2UgYSBjb21iaW5hdGlvbiBvZiBtYXAgYW5kIHJlZHVjZTsgaXQgYXBwbGllcyBhXG4gICAgICogZnVuY3Rpb24gdG8gZWFjaCBlbGVtZW50IG9mIGEgbGlzdCwgcGFzc2luZyBhbiBhY2N1bXVsYXRpbmcgcGFyYW1ldGVyIGZyb20gbGVmdCB0b1xuICAgICAqIHJpZ2h0LCBhbmQgcmV0dXJuaW5nIGEgZmluYWwgdmFsdWUgb2YgdGhpcyBhY2N1bXVsYXRvciB0b2dldGhlciB3aXRoIHRoZSBuZXcgbGlzdC5cbiAgICAgKlxuICAgICAqIFRoZSBpdGVyYXRvciBmdW5jdGlvbiByZWNlaXZlcyB0d28gYXJndW1lbnRzLCAqYWNjKiBhbmQgKnZhbHVlKiwgYW5kIHNob3VsZCByZXR1cm5cbiAgICAgKiBhIHR1cGxlICpbYWNjLCB2YWx1ZV0qLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyAoYWNjIC0+IHggLT4gKGFjYywgeSkpIC0+IGFjYyAtPiBbeF0gLT4gKGFjYywgW3ldKVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gZXZlcnkgZWxlbWVudCBvZiB0aGUgaW5wdXQgYGxpc3RgLlxuICAgICAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBhY2N1bXVsYXRvciB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHsqfSBUaGUgZmluYWwsIGFjY3VtdWxhdGVkIHZhbHVlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBkaWdpdHMgPSBbJzEnLCAnMicsICczJywgJzQnXTtcbiAgICAgKiAgICAgIHZhciBhcHBlbmQgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgICogICAgICAgIHJldHVybiBbYSArIGIsIGEgKyBiXTtcbiAgICAgKiAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgUi5tYXBBY2N1bShhcHBlbmQsIDAsIGRpZ2l0cyk7IC8vPT4gWycwMTIzNCcsIFsnMDEnLCAnMDEyJywgJzAxMjMnLCAnMDEyMzQnXV1cbiAgICAgKi9cbiAgICB2YXIgbWFwQWNjdW0gPSBfY3VycnkzKGZ1bmN0aW9uIG1hcEFjY3VtKGZuLCBhY2MsIGxpc3QpIHtcbiAgICAgICAgdmFyIGlkeCA9IDAsIGxlbiA9IGxpc3QubGVuZ3RoLCByZXN1bHQgPSBbXSwgdHVwbGUgPSBbYWNjXTtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgdHVwbGUgPSBmbih0dXBsZVswXSwgbGlzdFtpZHhdKTtcbiAgICAgICAgICAgIHJlc3VsdFtpZHhdID0gdHVwbGVbMV07XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdHVwbGVbMF0sXG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgXTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBtYXBBY2N1bVJpZ2h0IGZ1bmN0aW9uIGJlaGF2ZXMgbGlrZSBhIGNvbWJpbmF0aW9uIG9mIG1hcCBhbmQgcmVkdWNlOyBpdCBhcHBsaWVzIGFcbiAgICAgKiBmdW5jdGlvbiB0byBlYWNoIGVsZW1lbnQgb2YgYSBsaXN0LCBwYXNzaW5nIGFuIGFjY3VtdWxhdGluZyBwYXJhbWV0ZXIgZnJvbSByaWdodFxuICAgICAqIHRvIGxlZnQsIGFuZCByZXR1cm5pbmcgYSBmaW5hbCB2YWx1ZSBvZiB0aGlzIGFjY3VtdWxhdG9yIHRvZ2V0aGVyIHdpdGggdGhlIG5ldyBsaXN0LlxuICAgICAqXG4gICAgICogU2ltaWxhciB0byBgbWFwQWNjdW1gLCBleGNlcHQgbW92ZXMgdGhyb3VnaCB0aGUgaW5wdXQgbGlzdCBmcm9tIHRoZSByaWdodCB0byB0aGVcbiAgICAgKiBsZWZ0LlxuICAgICAqXG4gICAgICogVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIHJlY2VpdmVzIHR3byBhcmd1bWVudHMsICphY2MqIGFuZCAqdmFsdWUqLCBhbmQgc2hvdWxkIHJldHVyblxuICAgICAqIGEgdHVwbGUgKlthY2MsIHZhbHVlXSouXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhY2MgLT4geCAtPiAoYWNjLCB5KSkgLT4gYWNjIC0+IFt4XSAtPiAoYWNjLCBbeV0pXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBldmVyeSBlbGVtZW50IG9mIHRoZSBpbnB1dCBgbGlzdGAuXG4gICAgICogQHBhcmFtIHsqfSBhY2MgVGhlIGFjY3VtdWxhdG9yIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEByZXR1cm4geyp9IFRoZSBmaW5hbCwgYWNjdW11bGF0ZWQgdmFsdWUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGRpZ2l0cyA9IFsnMScsICcyJywgJzMnLCAnNCddO1xuICAgICAqICAgICAgdmFyIGFwcGVuZCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgKiAgICAgICAgcmV0dXJuIFthICsgYiwgYSArIGJdO1xuICAgICAqICAgICAgfVxuICAgICAqXG4gICAgICogICAgICBSLm1hcEFjY3VtUmlnaHQoYXBwZW5kLCAwLCBkaWdpdHMpOyAvLz0+IFsnMDQzMjEnLCBbJzA0MzIxJywgJzA0MzInLCAnMDQzJywgJzA0J11dXG4gICAgICovXG4gICAgdmFyIG1hcEFjY3VtUmlnaHQgPSBfY3VycnkzKGZ1bmN0aW9uIG1hcEFjY3VtUmlnaHQoZm4sIGFjYywgbGlzdCkge1xuICAgICAgICB2YXIgaWR4ID0gbGlzdC5sZW5ndGggLSAxLCByZXN1bHQgPSBbXSwgdHVwbGUgPSBbYWNjXTtcbiAgICAgICAgd2hpbGUgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICB0dXBsZSA9IGZuKHR1cGxlWzBdLCBsaXN0W2lkeF0pO1xuICAgICAgICAgICAgcmVzdWx0W2lkeF0gPSB0dXBsZVsxXTtcbiAgICAgICAgICAgIGlkeCAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0dXBsZVswXSxcbiAgICAgICAgICAgIHJlc3VsdFxuICAgICAgICBdO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogVGVzdHMgYSByZWd1bGFyIGV4cHJlc3Npb24gYWdhaW5zdCBhIFN0cmluZy4gTm90ZSB0aGF0IHRoaXMgZnVuY3Rpb25cbiAgICAgKiB3aWxsIHJldHVybiBhbiBlbXB0eSBhcnJheSB3aGVuIHRoZXJlIGFyZSBubyBtYXRjaGVzLiBUaGlzIGRpZmZlcnNcbiAgICAgKiBmcm9tIFtgU3RyaW5nLnByb3RvdHlwZS5tYXRjaGBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9tYXRjaClcbiAgICAgKiB3aGljaCByZXR1cm5zIGBudWxsYCB3aGVuIHRoZXJlIGFyZSBubyBtYXRjaGVzLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzZWUgUi50ZXN0XG4gICAgICogQGNhdGVnb3J5IFN0cmluZ1xuICAgICAqIEBzaWcgUmVnRXhwIC0+IFN0cmluZyAtPiBbU3RyaW5nIHwgVW5kZWZpbmVkXVxuICAgICAqIEBwYXJhbSB7UmVnRXhwfSByeCBBIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gbWF0Y2ggYWdhaW5zdFxuICAgICAqIEByZXR1cm4ge0FycmF5fSBUaGUgbGlzdCBvZiBtYXRjaGVzIG9yIGVtcHR5IGFycmF5LlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIubWF0Y2goLyhbYS16XWEpL2csICdiYW5hbmFzJyk7IC8vPT4gWydiYScsICduYScsICduYSddXG4gICAgICogICAgICBSLm1hdGNoKC9hLywgJ2InKTsgLy89PiBbXVxuICAgICAqICAgICAgUi5tYXRjaCgvYS8sIG51bGwpOyAvLz0+IFR5cGVFcnJvcjogbnVsbCBkb2VzIG5vdCBoYXZlIGEgbWV0aG9kIG5hbWVkIFwibWF0Y2hcIlxuICAgICAqL1xuICAgIHZhciBtYXRjaCA9IF9jdXJyeTIoZnVuY3Rpb24gbWF0Y2gocngsIHN0cikge1xuICAgICAgICByZXR1cm4gc3RyLm1hdGNoKHJ4KSB8fCBbXTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIG1hdGhNb2QgYmVoYXZlcyBsaWtlIHRoZSBtb2R1bG8gb3BlcmF0b3Igc2hvdWxkIG1hdGhlbWF0aWNhbGx5LCB1bmxpa2UgdGhlIGAlYFxuICAgICAqIG9wZXJhdG9yIChhbmQgYnkgZXh0ZW5zaW9uLCBSLm1vZHVsbykuIFNvIHdoaWxlIFwiLTE3ICUgNVwiIGlzIC0yLFxuICAgICAqIG1hdGhNb2QoLTE3LCA1KSBpcyAzLiBtYXRoTW9kIHJlcXVpcmVzIEludGVnZXIgYXJndW1lbnRzLCBhbmQgcmV0dXJucyBOYU5cbiAgICAgKiB3aGVuIHRoZSBtb2R1bHVzIGlzIHplcm8gb3IgbmVnYXRpdmUuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE1hdGhcbiAgICAgKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gTnVtYmVyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG0gVGhlIGRpdmlkZW5kLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwIHRoZSBtb2R1bHVzLlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIHJlc3VsdCBvZiBgYiBtb2QgYWAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5tYXRoTW9kKC0xNywgNSk7ICAvLz0+IDNcbiAgICAgKiAgICAgIFIubWF0aE1vZCgxNywgNSk7ICAgLy89PiAyXG4gICAgICogICAgICBSLm1hdGhNb2QoMTcsIC01KTsgIC8vPT4gTmFOXG4gICAgICogICAgICBSLm1hdGhNb2QoMTcsIDApOyAgIC8vPT4gTmFOXG4gICAgICogICAgICBSLm1hdGhNb2QoMTcuMiwgNSk7IC8vPT4gTmFOXG4gICAgICogICAgICBSLm1hdGhNb2QoMTcsIDUuMyk7IC8vPT4gTmFOXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBjbG9jayA9IFIubWF0aE1vZChSLl9fLCAxMik7XG4gICAgICogICAgICBjbG9jaygxNSk7IC8vPT4gM1xuICAgICAqICAgICAgY2xvY2soMjQpOyAvLz0+IDBcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHNldmVudGVlbk1vZCA9IFIubWF0aE1vZCgxNyk7XG4gICAgICogICAgICBzZXZlbnRlZW5Nb2QoMyk7ICAvLz0+IDJcbiAgICAgKiAgICAgIHNldmVudGVlbk1vZCg0KTsgIC8vPT4gMVxuICAgICAqICAgICAgc2V2ZW50ZWVuTW9kKDEwKTsgLy89PiA3XG4gICAgICovXG4gICAgdmFyIG1hdGhNb2QgPSBfY3VycnkyKGZ1bmN0aW9uIG1hdGhNb2QobSwgcCkge1xuICAgICAgICBpZiAoIV9pc0ludGVnZXIobSkpIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFfaXNJbnRlZ2VyKHApIHx8IHAgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAobSAlIHAgKyBwKSAlIHA7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsYXJnZXIgb2YgaXRzIHR3byBhcmd1bWVudHMuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gICAgICogQHNpZyBPcmQgYSA9PiBhIC0+IGEgLT4gYVxuICAgICAqIEBwYXJhbSB7Kn0gYVxuICAgICAqIEBwYXJhbSB7Kn0gYlxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICogQHNlZSBSLm1heEJ5LCBSLm1pblxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIubWF4KDc4OSwgMTIzKTsgLy89PiA3ODlcbiAgICAgKiAgICAgIFIubWF4KCdhJywgJ2InKTsgLy89PiAnYidcbiAgICAgKi9cbiAgICB2YXIgbWF4ID0gX2N1cnJ5MihmdW5jdGlvbiBtYXgoYSwgYikge1xuICAgICAgICByZXR1cm4gYiA+IGEgPyBiIDogYTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFRha2VzIGEgZnVuY3Rpb24gYW5kIHR3byB2YWx1ZXMsIGFuZCByZXR1cm5zIHdoaWNoZXZlciB2YWx1ZSBwcm9kdWNlc1xuICAgICAqIHRoZSBsYXJnZXIgcmVzdWx0IHdoZW4gcGFzc2VkIHRvIHRoZSBwcm92aWRlZCBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAgICAgKiBAc2lnIE9yZCBiID0+IChhIC0+IGIpIC0+IGEgLT4gYSAtPiBhXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZlxuICAgICAqIEBwYXJhbSB7Kn0gYVxuICAgICAqIEBwYXJhbSB7Kn0gYlxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICogQHNlZSBSLm1heCwgUi5taW5CeVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIubWF4QnkoZnVuY3Rpb24obikgeyByZXR1cm4gbiAqIG47IH0sIC0zLCAyKTsgLy89PiAtM1xuICAgICAqL1xuICAgIHZhciBtYXhCeSA9IF9jdXJyeTMoZnVuY3Rpb24gbWF4QnkoZiwgYSwgYikge1xuICAgICAgICByZXR1cm4gZihiKSA+IGYoYSkgPyBiIDogYTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBvYmplY3Qgd2l0aCB0aGUgb3duIHByb3BlcnRpZXMgb2YgYGFgXG4gICAgICogbWVyZ2VkIHdpdGggdGhlIG93biBwcm9wZXJ0aWVzIG9mIG9iamVjdCBgYmAuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcge2s6IHZ9IC0+IHtrOiB2fSAtPiB7azogdn1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIubWVyZ2UoeyAnbmFtZSc6ICdmcmVkJywgJ2FnZSc6IDEwIH0sIHsgJ2FnZSc6IDQwIH0pO1xuICAgICAqICAgICAgLy89PiB7ICduYW1lJzogJ2ZyZWQnLCAnYWdlJzogNDAgfVxuICAgICAqXG4gICAgICogICAgICB2YXIgcmVzZXRUb0RlZmF1bHQgPSBSLm1lcmdlKFIuX18sIHt4OiAwfSk7XG4gICAgICogICAgICByZXNldFRvRGVmYXVsdCh7eDogNSwgeTogMn0pOyAvLz0+IHt4OiAwLCB5OiAyfVxuICAgICAqL1xuICAgIHZhciBtZXJnZSA9IF9jdXJyeTIoZnVuY3Rpb24gbWVyZ2UoYSwgYikge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIHZhciBrcyA9IGtleXMoYSk7XG4gICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICB3aGlsZSAoaWR4IDwga3MubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXN1bHRba3NbaWR4XV0gPSBhW2tzW2lkeF1dO1xuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAga3MgPSBrZXlzKGIpO1xuICAgICAgICBpZHggPSAwO1xuICAgICAgICB3aGlsZSAoaWR4IDwga3MubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXN1bHRba3NbaWR4XV0gPSBiW2tzW2lkeF1dO1xuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHNtYWxsZXIgb2YgaXRzIHR3byBhcmd1bWVudHMuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gICAgICogQHNpZyBPcmQgYSA9PiBhIC0+IGEgLT4gYVxuICAgICAqIEBwYXJhbSB7Kn0gYVxuICAgICAqIEBwYXJhbSB7Kn0gYlxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICogQHNlZSBSLm1pbkJ5LCBSLm1heFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIubWluKDc4OSwgMTIzKTsgLy89PiAxMjNcbiAgICAgKiAgICAgIFIubWluKCdhJywgJ2InKTsgLy89PiAnYSdcbiAgICAgKi9cbiAgICB2YXIgbWluID0gX2N1cnJ5MihmdW5jdGlvbiBtaW4oYSwgYikge1xuICAgICAgICByZXR1cm4gYiA8IGEgPyBiIDogYTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFRha2VzIGEgZnVuY3Rpb24gYW5kIHR3byB2YWx1ZXMsIGFuZCByZXR1cm5zIHdoaWNoZXZlciB2YWx1ZSBwcm9kdWNlc1xuICAgICAqIHRoZSBzbWFsbGVyIHJlc3VsdCB3aGVuIHBhc3NlZCB0byB0aGUgcHJvdmlkZWQgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gICAgICogQHNpZyBPcmQgYiA9PiAoYSAtPiBiKSAtPiBhIC0+IGEgLT4gYVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZcbiAgICAgKiBAcGFyYW0geyp9IGFcbiAgICAgKiBAcGFyYW0geyp9IGJcbiAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAqIEBzZWUgUi5taW4sIFIubWF4QnlcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLm1pbkJ5KGZ1bmN0aW9uKG4pIHsgcmV0dXJuIG4gKiBuOyB9LCAtMywgMik7IC8vPT4gMlxuICAgICAqL1xuICAgIHZhciBtaW5CeSA9IF9jdXJyeTMoZnVuY3Rpb24gbWluQnkoZiwgYSwgYikge1xuICAgICAgICByZXR1cm4gZihiKSA8IGYoYSkgPyBiIDogYTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIERpdmlkZXMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgYnkgdGhlIGZpcnN0IGFuZCByZXR1cm5zIHRoZSByZW1haW5kZXIuXG4gICAgICogTm90ZSB0aGF0IHRoaXMgZnVuY3Rpb25zIHByZXNlcnZlcyB0aGUgSmF2YVNjcmlwdC1zdHlsZSBiZWhhdmlvciBmb3JcbiAgICAgKiBtb2R1bG8uIEZvciBtYXRoZW1hdGljYWwgbW9kdWxvIHNlZSBgbWF0aE1vZGBcbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTWF0aFxuICAgICAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBOdW1iZXJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYSBUaGUgdmFsdWUgdG8gdGhlIGRpdmlkZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYiBUaGUgcHNldWRvLW1vZHVsdXNcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSByZXN1bHQgb2YgYGIgJSBhYC5cbiAgICAgKiBAc2VlIFIubWF0aE1vZFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIubW9kdWxvKDE3LCAzKTsgLy89PiAyXG4gICAgICogICAgICAvLyBKUyBiZWhhdmlvcjpcbiAgICAgKiAgICAgIFIubW9kdWxvKC0xNywgMyk7IC8vPT4gLTJcbiAgICAgKiAgICAgIFIubW9kdWxvKDE3LCAtMyk7IC8vPT4gMlxuICAgICAqXG4gICAgICogICAgICB2YXIgaXNPZGQgPSBSLm1vZHVsbyhSLl9fLCAyKTtcbiAgICAgKiAgICAgIGlzT2RkKDQyKTsgLy89PiAwXG4gICAgICogICAgICBpc09kZCgyMSk7IC8vPT4gMVxuICAgICAqL1xuICAgIHZhciBtb2R1bG8gPSBfY3VycnkyKGZ1bmN0aW9uIG1vZHVsbyhhLCBiKSB7XG4gICAgICAgIHJldHVybiBhICUgYjtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIE11bHRpcGxpZXMgdHdvIG51bWJlcnMuIEVxdWl2YWxlbnQgdG8gYGEgKiBiYCBidXQgY3VycmllZC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTWF0aFxuICAgICAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBOdW1iZXJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYSBUaGUgZmlyc3QgdmFsdWUuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGIgVGhlIHNlY29uZCB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSByZXN1bHQgb2YgYGEgKiBiYC5cbiAgICAgKiBAc2VlIFIuZGl2aWRlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGRvdWJsZSA9IFIubXVsdGlwbHkoMik7XG4gICAgICogICAgICB2YXIgdHJpcGxlID0gUi5tdWx0aXBseSgzKTtcbiAgICAgKiAgICAgIGRvdWJsZSgzKTsgICAgICAgLy89PiAgNlxuICAgICAqICAgICAgdHJpcGxlKDQpOyAgICAgICAvLz0+IDEyXG4gICAgICogICAgICBSLm11bHRpcGx5KDIsIDUpOyAgLy89PiAxMFxuICAgICAqL1xuICAgIHZhciBtdWx0aXBseSA9IF9jdXJyeTIoZnVuY3Rpb24gbXVsdGlwbHkoYSwgYikge1xuICAgICAgICByZXR1cm4gYSAqIGI7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBXcmFwcyBhIGZ1bmN0aW9uIG9mIGFueSBhcml0eSAoaW5jbHVkaW5nIG51bGxhcnkpIGluIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGV4YWN0bHkgYG5gXG4gICAgICogcGFyYW1ldGVycy4gQW55IGV4dHJhbmVvdXMgcGFyYW1ldGVycyB3aWxsIG5vdCBiZSBwYXNzZWQgdG8gdGhlIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgTnVtYmVyIC0+ICgqIC0+IGEpIC0+ICgqIC0+IGEpXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG4gVGhlIGRlc2lyZWQgYXJpdHkgb2YgdGhlIG5ldyBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gd3JhcHBpbmcgYGZuYC4gVGhlIG5ldyBmdW5jdGlvbiBpcyBndWFyYW50ZWVkIHRvIGJlIG9mXG4gICAgICogICAgICAgICBhcml0eSBgbmAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHRha2VzVHdvQXJncyA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgKiAgICAgICAgcmV0dXJuIFthLCBiXTtcbiAgICAgKiAgICAgIH07XG4gICAgICogICAgICB0YWtlc1R3b0FyZ3MubGVuZ3RoOyAvLz0+IDJcbiAgICAgKiAgICAgIHRha2VzVHdvQXJncygxLCAyKTsgLy89PiBbMSwgMl1cbiAgICAgKlxuICAgICAqICAgICAgdmFyIHRha2VzT25lQXJnID0gUi5uQXJ5KDEsIHRha2VzVHdvQXJncyk7XG4gICAgICogICAgICB0YWtlc09uZUFyZy5sZW5ndGg7IC8vPT4gMVxuICAgICAqICAgICAgLy8gT25seSBgbmAgYXJndW1lbnRzIGFyZSBwYXNzZWQgdG8gdGhlIHdyYXBwZWQgZnVuY3Rpb25cbiAgICAgKiAgICAgIHRha2VzT25lQXJnKDEsIDIpOyAvLz0+IFsxLCB1bmRlZmluZWRdXG4gICAgICovXG4gICAgdmFyIG5BcnkgPSBfY3VycnkyKGZ1bmN0aW9uIG5BcnkobiwgZm4pIHtcbiAgICAgICAgc3dpdGNoIChuKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBhMCwgYTEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExLCBhMik7XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExLCBhMiwgYTMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBhMCwgYTEsIGEyLCBhMywgYTQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExLCBhMiwgYTMsIGE0LCBhNSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IHRvIG5BcnkgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIG5vIGdyZWF0ZXIgdGhhbiB0ZW4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogTmVnYXRlcyBpdHMgYXJndW1lbnQuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE1hdGhcbiAgICAgKiBAc2lnIE51bWJlciAtPiBOdW1iZXJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gblxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLm5lZ2F0ZSg0Mik7IC8vPT4gLTQyXG4gICAgICovXG4gICAgdmFyIG5lZ2F0ZSA9IF9jdXJyeTEoZnVuY3Rpb24gbmVnYXRlKG4pIHtcbiAgICAgICAgcmV0dXJuIC1uO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGAhYCBvZiBpdHMgYXJndW1lbnQuIEl0IHdpbGwgcmV0dXJuIGB0cnVlYCB3aGVuXG4gICAgICogcGFzc2VkIGZhbHNlLXkgdmFsdWUsIGFuZCBgZmFsc2VgIHdoZW4gcGFzc2VkIGEgdHJ1dGgteSBvbmUuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExvZ2ljXG4gICAgICogQHNpZyAqIC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0geyp9IGEgYW55IHZhbHVlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdGhlIGxvZ2ljYWwgaW52ZXJzZSBvZiBwYXNzZWQgYXJndW1lbnQuXG4gICAgICogQHNlZSBSLmNvbXBsZW1lbnRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLm5vdCh0cnVlKTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5ub3QoZmFsc2UpOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIubm90KDApOyA9PiB0cnVlXG4gICAgICogICAgICBSLm5vdCgxKTsgPT4gZmFsc2VcbiAgICAgKi9cbiAgICB2YXIgbm90ID0gX2N1cnJ5MShmdW5jdGlvbiBub3QoYSkge1xuICAgICAgICByZXR1cm4gIWE7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudGggZWxlbWVudCBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcuXG4gICAgICogSWYgbiBpcyBuZWdhdGl2ZSB0aGUgZWxlbWVudCBhdCBpbmRleCBsZW5ndGggKyBuIGlzIHJldHVybmVkLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBOdW1iZXIgLT4gW2FdIC0+IGEgfCBVbmRlZmluZWRcbiAgICAgKiBAc2lnIE51bWJlciAtPiBTdHJpbmcgLT4gU3RyaW5nXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldFxuICAgICAqIEBwYXJhbSB7Kn0gbGlzdFxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGxpc3QgPSBbJ2ZvbycsICdiYXInLCAnYmF6JywgJ3F1dXgnXTtcbiAgICAgKiAgICAgIFIubnRoKDEsIGxpc3QpOyAvLz0+ICdiYXInXG4gICAgICogICAgICBSLm50aCgtMSwgbGlzdCk7IC8vPT4gJ3F1dXgnXG4gICAgICogICAgICBSLm50aCgtOTksIGxpc3QpOyAvLz0+IHVuZGVmaW5lZFxuICAgICAqXG4gICAgICogICAgICBSLm50aCgnYWJjJywgMik7IC8vPT4gJ2MnXG4gICAgICogICAgICBSLm50aCgnYWJjJywgMyk7IC8vPT4gJydcbiAgICAgKi9cbiAgICB2YXIgbnRoID0gX2N1cnJ5MihmdW5jdGlvbiBudGgob2Zmc2V0LCBsaXN0KSB7XG4gICAgICAgIHZhciBpZHggPSBvZmZzZXQgPCAwID8gbGlzdC5sZW5ndGggKyBvZmZzZXQgOiBvZmZzZXQ7XG4gICAgICAgIHJldHVybiBfaXNTdHJpbmcobGlzdCkgPyBsaXN0LmNoYXJBdChpZHgpIDogbGlzdFtpZHhdO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgaXRzIG50aCBhcmd1bWVudC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIE51bWJlciAtPiAqLi4uIC0+ICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gblxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIubnRoQXJnKDEpKCdhJywgJ2InLCAnYycpOyAvLz0+ICdiJ1xuICAgICAqICAgICAgUi5udGhBcmcoLTEpKCdhJywgJ2InLCAnYycpOyAvLz0+ICdjJ1xuICAgICAqL1xuICAgIHZhciBudGhBcmcgPSBfY3VycnkxKGZ1bmN0aW9uIG50aEFyZyhuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnRoKG4sIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudGggY2hhcmFjdGVyIG9mIHRoZSBnaXZlbiBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IFN0cmluZ1xuICAgICAqIEBzaWcgTnVtYmVyIC0+IFN0cmluZyAtPiBTdHJpbmdcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjAuMTYuMFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIubnRoQ2hhcigyLCAnUmFtZGEnKTsgLy89PiAnbSdcbiAgICAgKiAgICAgIFIubnRoQ2hhcigtMiwgJ1JhbWRhJyk7IC8vPT4gJ2QnXG4gICAgICovXG4gICAgdmFyIG50aENoYXIgPSBfY3VycnkyKGZ1bmN0aW9uIG50aENoYXIobiwgc3RyKSB7XG4gICAgICAgIHJldHVybiBzdHIuY2hhckF0KG4gPCAwID8gc3RyLmxlbmd0aCArIG4gOiBuKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNoYXJhY3RlciBjb2RlIG9mIHRoZSBudGggY2hhcmFjdGVyIG9mIHRoZSBnaXZlbiBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IFN0cmluZ1xuICAgICAqIEBzaWcgTnVtYmVyIC0+IFN0cmluZyAtPiBOdW1iZXJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjAuMTYuMFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIubnRoQ2hhckNvZGUoMiwgJ1JhbWRhJyk7IC8vPT4gJ20nLmNoYXJDb2RlQXQoMClcbiAgICAgKiAgICAgIFIubnRoQ2hhckNvZGUoLTIsICdSYW1kYScpOyAvLz0+ICdkJy5jaGFyQ29kZUF0KDApXG4gICAgICovXG4gICAgdmFyIG50aENoYXJDb2RlID0gX2N1cnJ5MihmdW5jdGlvbiBudGhDaGFyQ29kZShuLCBzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5jaGFyQ29kZUF0KG4gPCAwID8gc3RyLmxlbmd0aCArIG4gOiBuKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzaW5nbGV0b24gYXJyYXkgY29udGFpbmluZyB0aGUgdmFsdWUgcHJvdmlkZWQuXG4gICAgICpcbiAgICAgKiBOb3RlIHRoaXMgYG9mYCBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgRVM2IGBvZmA7IFNlZVxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L29mXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHNpZyBhIC0+IFthXVxuICAgICAqIEBwYXJhbSB7Kn0geCBhbnkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgd3JhcHBpbmcgYHhgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIub2YobnVsbCk7IC8vPT4gW251bGxdXG4gICAgICogICAgICBSLm9mKFs0Ml0pOyAvLz0+IFtbNDJdXVxuICAgICAqL1xuICAgIHZhciBvZiA9IF9jdXJyeTEoZnVuY3Rpb24gb2YoeCkge1xuICAgICAgICByZXR1cm4gW3hdO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQWNjZXB0cyBhIGZ1bmN0aW9uIGBmbmAgYW5kIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGd1YXJkcyBpbnZvY2F0aW9uIG9mIGBmbmAgc3VjaCB0aGF0XG4gICAgICogYGZuYCBjYW4gb25seSBldmVyIGJlIGNhbGxlZCBvbmNlLCBubyBtYXR0ZXIgaG93IG1hbnkgdGltZXMgdGhlIHJldHVybmVkIGZ1bmN0aW9uIGlzXG4gICAgICogaW52b2tlZC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIChhLi4uIC0+IGIpIC0+IChhLi4uIC0+IGIpXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHdyYXAgaW4gYSBjYWxsLW9ubHktb25jZSB3cmFwcGVyLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgd3JhcHBlZCBmdW5jdGlvbi5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgYWRkT25lT25jZSA9IFIub25jZShmdW5jdGlvbih4KXsgcmV0dXJuIHggKyAxOyB9KTtcbiAgICAgKiAgICAgIGFkZE9uZU9uY2UoMTApOyAvLz0+IDExXG4gICAgICogICAgICBhZGRPbmVPbmNlKGFkZE9uZU9uY2UoNTApKTsgLy89PiAxMVxuICAgICAqL1xuICAgIHZhciBvbmNlID0gX2N1cnJ5MShmdW5jdGlvbiBvbmNlKGZuKSB7XG4gICAgICAgIHZhciBjYWxsZWQgPSBmYWxzZSwgcmVzdWx0O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGNhbGxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSByZXN1bHQgb2YgXCJzZXR0aW5nXCIgdGhlIHBvcnRpb24gb2YgdGhlIGdpdmVuIGRhdGEgc3RydWN0dXJlXG4gICAgICogZm9jdXNlZCBieSB0aGUgZ2l2ZW4gbGVucyB0byB0aGUgZ2l2ZW4gdmFsdWUuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEB0eXBlZGVmIExlbnMgcyBhID0gRnVuY3RvciBmID0+IChhIC0+IGYgYSkgLT4gcyAtPiBmIHNcbiAgICAgKiBAc2lnIExlbnMgcyBhIC0+IChhIC0+IGEpIC0+IHMgLT4gc1xuICAgICAqIEBwYXJhbSB7TGVuc30gbGVuc1xuICAgICAqIEBwYXJhbSB7Kn0gdlxuICAgICAqIEBwYXJhbSB7Kn0geFxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICogQHNlZSBSLnByb3AsIFIubGVuc0luZGV4LCBSLmxlbnNQcm9wXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGhlYWRMZW5zID0gUi5sZW5zSW5kZXgoMCk7XG4gICAgICpcbiAgICAgKiAgICAgIFIub3ZlcihoZWFkTGVucywgUi50b1VwcGVyLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnRk9PJywgJ2JhcicsICdiYXonXVxuICAgICAqL1xuICAgIHZhciBvdmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgSWRlbnRpdHkgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogeCxcbiAgICAgICAgICAgICAgICBtYXA6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBJZGVudGl0eShmKHgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX2N1cnJ5MyhmdW5jdGlvbiBvdmVyKGxlbnMsIGYsIHgpIHtcbiAgICAgICAgICAgIHJldHVybiBsZW5zKGZ1bmN0aW9uICh5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIElkZW50aXR5KGYoeSkpO1xuICAgICAgICAgICAgfSkoeCkudmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH0oKTtcblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIHRoZSB2YWx1ZSBhdCBhIGdpdmVuIHBhdGguXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcgW1N0cmluZ10gLT4ge2s6IHZ9IC0+IHYgfCBVbmRlZmluZWRcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYXRoIFRoZSBwYXRoIHRvIHVzZS5cbiAgICAgKiBAcmV0dXJuIHsqfSBUaGUgZGF0YSBhdCBgcGF0aGAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5wYXRoKFsnYScsICdiJ10sIHthOiB7YjogMn19KTsgLy89PiAyXG4gICAgICogICAgICBSLnBhdGgoWydhJywgJ2InXSwge2M6IHtiOiAyfX0pOyAvLz0+IHVuZGVmaW5lZFxuICAgICAqL1xuICAgIHZhciBwYXRoID0gX2N1cnJ5MihmdW5jdGlvbiBwYXRoKHBhdGhzLCBvYmopIHtcbiAgICAgICAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gb2JqO1xuICAgICAgICAgICAgZm9yICh2YXIgaWR4ID0gMCwgbGVuID0gcGF0aHMubGVuZ3RoOyBpZHggPCBsZW4gJiYgdmFsICE9IG51bGw7IGlkeCArPSAxKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gdmFsW3BhdGhzW2lkeF1dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHBhcnRpYWwgY29weSBvZiBhbiBvYmplY3QgY29udGFpbmluZyBvbmx5IHRoZSBrZXlzIHNwZWNpZmllZC4gIElmIHRoZSBrZXkgZG9lcyBub3QgZXhpc3QsIHRoZVxuICAgICAqIHByb3BlcnR5IGlzIGlnbm9yZWQuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcgW2tdIC0+IHtrOiB2fSAtPiB7azogdn1cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBuYW1lcyBhbiBhcnJheSBvZiBTdHJpbmcgcHJvcGVydHkgbmFtZXMgdG8gY29weSBvbnRvIGEgbmV3IG9iamVjdFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBjb3B5IGZyb21cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEEgbmV3IG9iamVjdCB3aXRoIG9ubHkgcHJvcGVydGllcyBmcm9tIGBuYW1lc2Agb24gaXQuXG4gICAgICogQHNlZSBSLm9taXRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnBpY2soWydhJywgJ2QnXSwge2E6IDEsIGI6IDIsIGM6IDMsIGQ6IDR9KTsgLy89PiB7YTogMSwgZDogNH1cbiAgICAgKiAgICAgIFIucGljayhbJ2EnLCAnZScsICdmJ10sIHthOiAxLCBiOiAyLCBjOiAzLCBkOiA0fSk7IC8vPT4ge2E6IDF9XG4gICAgICovXG4gICAgdmFyIHBpY2sgPSBfY3VycnkyKGZ1bmN0aW9uIHBpY2sobmFtZXMsIG9iaikge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAobmFtZXNbaWR4XSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbbmFtZXNbaWR4XV0gPSBvYmpbbmFtZXNbaWR4XV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogU2ltaWxhciB0byBgcGlja2AgZXhjZXB0IHRoYXQgdGhpcyBvbmUgaW5jbHVkZXMgYSBga2V5OiB1bmRlZmluZWRgIHBhaXIgZm9yIHByb3BlcnRpZXMgdGhhdCBkb24ndCBleGlzdC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNpZyBba10gLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG5hbWVzIGFuIGFycmF5IG9mIFN0cmluZyBwcm9wZXJ0eSBuYW1lcyB0byBjb3B5IG9udG8gYSBuZXcgb2JqZWN0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGNvcHkgZnJvbVxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQSBuZXcgb2JqZWN0IHdpdGggb25seSBwcm9wZXJ0aWVzIGZyb20gYG5hbWVzYCBvbiBpdC5cbiAgICAgKiBAc2VlIFIucGlja1xuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIucGlja0FsbChbJ2EnLCAnZCddLCB7YTogMSwgYjogMiwgYzogMywgZDogNH0pOyAvLz0+IHthOiAxLCBkOiA0fVxuICAgICAqICAgICAgUi5waWNrQWxsKFsnYScsICdlJywgJ2YnXSwge2E6IDEsIGI6IDIsIGM6IDMsIGQ6IDR9KTsgLy89PiB7YTogMSwgZTogdW5kZWZpbmVkLCBmOiB1bmRlZmluZWR9XG4gICAgICovXG4gICAgdmFyIHBpY2tBbGwgPSBfY3VycnkyKGZ1bmN0aW9uIHBpY2tBbGwobmFtZXMsIG9iaikge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICB2YXIgbGVuID0gbmFtZXMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IG5hbWVzW2lkeF07XG4gICAgICAgICAgICByZXN1bHRbbmFtZV0gPSBvYmpbbmFtZV07XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHBhcnRpYWwgY29weSBvZiBhbiBvYmplY3QgY29udGFpbmluZyBvbmx5IHRoZSBrZXlzIHRoYXRcbiAgICAgKiBzYXRpc2Z5IHRoZSBzdXBwbGllZCBwcmVkaWNhdGUuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcgKHYsIGsgLT4gQm9vbGVhbikgLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgQSBwcmVkaWNhdGUgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IGEga2V5XG4gICAgICogICAgICAgIHNob3VsZCBiZSBpbmNsdWRlZCBvbiB0aGUgb3V0cHV0IG9iamVjdC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gY29weSBmcm9tXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBBIG5ldyBvYmplY3Qgd2l0aCBvbmx5IHByb3BlcnRpZXMgdGhhdCBzYXRpc2Z5IGBwcmVkYFxuICAgICAqICAgICAgICAgb24gaXQuXG4gICAgICogQHNlZSBSLnBpY2tcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgaXNVcHBlckNhc2UgPSBmdW5jdGlvbih2YWwsIGtleSkgeyByZXR1cm4ga2V5LnRvVXBwZXJDYXNlKCkgPT09IGtleTsgfVxuICAgICAqICAgICAgUi5waWNrQnkoaXNVcHBlckNhc2UsIHthOiAxLCBiOiAyLCBBOiAzLCBCOiA0fSk7IC8vPT4ge0E6IDMsIEI6IDR9XG4gICAgICovXG4gICAgdmFyIHBpY2tCeSA9IF9jdXJyeTIoZnVuY3Rpb24gcGlja0J5KHRlc3QsIG9iaikge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAodGVzdChvYmpbcHJvcF0sIHByb3AsIG9iaikpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbcHJvcF0gPSBvYmpbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgbGlzdCB3aXRoIHRoZSBnaXZlbiBlbGVtZW50IGF0IHRoZSBmcm9udCwgZm9sbG93ZWQgYnkgdGhlIGNvbnRlbnRzIG9mIHRoZVxuICAgICAqIGxpc3QuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIGEgLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7Kn0gZWwgVGhlIGl0ZW0gdG8gYWRkIHRvIHRoZSBoZWFkIG9mIHRoZSBvdXRwdXQgbGlzdC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBhZGQgdG8gdGhlIHRhaWwgb2YgdGhlIG91dHB1dCBsaXN0LlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBhcnJheS5cbiAgICAgKiBAc2VlIFIuYXBwZW5kXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5wcmVwZW5kKCdmZWUnLCBbJ2ZpJywgJ2ZvJywgJ2Z1bSddKTsgLy89PiBbJ2ZlZScsICdmaScsICdmbycsICdmdW0nXVxuICAgICAqL1xuICAgIHZhciBwcmVwZW5kID0gX2N1cnJ5MihmdW5jdGlvbiBwcmVwZW5kKGVsLCBsaXN0KSB7XG4gICAgICAgIHJldHVybiBfY29uY2F0KFtlbF0sIGxpc3QpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2hlbiBzdXBwbGllZCBhbiBvYmplY3QgcmV0dXJucyB0aGUgaW5kaWNhdGVkIHByb3BlcnR5IG9mIHRoYXQgb2JqZWN0LCBpZiBpdCBleGlzdHMuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcgcyAtPiB7czogYX0gLT4gYSB8IFVuZGVmaW5lZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwIFRoZSBwcm9wZXJ0eSBuYW1lXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHF1ZXJ5XG4gICAgICogQHJldHVybiB7Kn0gVGhlIHZhbHVlIGF0IGBvYmoucGAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5wcm9wKCd4Jywge3g6IDEwMH0pOyAvLz0+IDEwMFxuICAgICAqICAgICAgUi5wcm9wKCd4Jywge30pOyAvLz0+IHVuZGVmaW5lZFxuICAgICAqL1xuICAgIHZhciBwcm9wID0gX2N1cnJ5MihmdW5jdGlvbiBwcm9wKHAsIG9iaikge1xuICAgICAgICByZXR1cm4gb2JqW3BdO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogSWYgdGhlIGdpdmVuLCBub24tbnVsbCBvYmplY3QgaGFzIGFuIG93biBwcm9wZXJ0eSB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSxcbiAgICAgKiByZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGF0IHByb3BlcnR5LlxuICAgICAqIE90aGVyd2lzZSByZXR1cm5zIHRoZSBwcm92aWRlZCBkZWZhdWx0IHZhbHVlLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIGEgLT4gU3RyaW5nIC0+IE9iamVjdCAtPiBhXG4gICAgICogQHBhcmFtIHsqfSB2YWwgVGhlIGRlZmF1bHQgdmFsdWUuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHAgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIHJldHVybi5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAgICogQHJldHVybiB7Kn0gVGhlIHZhbHVlIG9mIGdpdmVuIHByb3BlcnR5IG9mIHRoZSBzdXBwbGllZCBvYmplY3Qgb3IgdGhlIGRlZmF1bHQgdmFsdWUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGFsaWNlID0ge1xuICAgICAqICAgICAgICBuYW1lOiAnQUxJQ0UnLFxuICAgICAqICAgICAgICBhZ2U6IDEwMVxuICAgICAqICAgICAgfTtcbiAgICAgKiAgICAgIHZhciBmYXZvcml0ZSA9IFIucHJvcCgnZmF2b3JpdGVMaWJyYXJ5Jyk7XG4gICAgICogICAgICB2YXIgZmF2b3JpdGVXaXRoRGVmYXVsdCA9IFIucHJvcE9yKCdSYW1kYScsICdmYXZvcml0ZUxpYnJhcnknKTtcbiAgICAgKlxuICAgICAqICAgICAgZmF2b3JpdGUoYWxpY2UpOyAgLy89PiB1bmRlZmluZWRcbiAgICAgKiAgICAgIGZhdm9yaXRlV2l0aERlZmF1bHQoYWxpY2UpOyAgLy89PiAnUmFtZGEnXG4gICAgICovXG4gICAgdmFyIHByb3BPciA9IF9jdXJyeTMoZnVuY3Rpb24gcHJvcE9yKHZhbCwgcCwgb2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiBfaGFzKHAsIG9iaikgPyBvYmpbcF0gOiB2YWw7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgc3BlY2lmaWVkIG9iamVjdCBwcm9wZXJ0eSBzYXRpc2ZpZXMgdGhlIGdpdmVuXG4gICAgICogcHJlZGljYXRlOyBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTG9naWNcbiAgICAgKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFN0cmluZyAtPiB7U3RyaW5nOiBhfSAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHsqfSBvYmpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqIEBzZWUgUi5wcm9wRXFcbiAgICAgKiBAc2VlIFIucHJvcElzXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5wcm9wU2F0aXNmaWVzKHggPT4geCA+IDAsICd4Jywge3g6IDEsIHk6IDJ9KTsgLy89PiB0cnVlXG4gICAgICovXG4gICAgdmFyIHByb3BTYXRpc2ZpZXMgPSBfY3VycnkzKGZ1bmN0aW9uIHByb3BTYXRpc2ZpZXMocHJlZCwgbmFtZSwgb2JqKSB7XG4gICAgICAgIHJldHVybiBwcmVkKG9ialtuYW1lXSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBBY3RzIGFzIG11bHRpcGxlIGBwcm9wYDogYXJyYXkgb2Yga2V5cyBpbiwgYXJyYXkgb2YgdmFsdWVzIG91dC4gUHJlc2VydmVzIG9yZGVyLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIFtrXSAtPiB7azogdn0gLT4gW3ZdXG4gICAgICogQHBhcmFtIHtBcnJheX0gcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIGZldGNoXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHF1ZXJ5XG4gICAgICogQHJldHVybiB7QXJyYXl9IFRoZSBjb3JyZXNwb25kaW5nIHZhbHVlcyBvciBwYXJ0aWFsbHkgYXBwbGllZCBmdW5jdGlvbi5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnByb3BzKFsneCcsICd5J10sIHt4OiAxLCB5OiAyfSk7IC8vPT4gWzEsIDJdXG4gICAgICogICAgICBSLnByb3BzKFsnYycsICdhJywgJ2InXSwge2I6IDIsIGE6IDF9KTsgLy89PiBbdW5kZWZpbmVkLCAxLCAyXVxuICAgICAqXG4gICAgICogICAgICB2YXIgZnVsbE5hbWUgPSBSLmNvbXBvc2UoUi5qb2luKCcgJyksIFIucHJvcHMoWydmaXJzdCcsICdsYXN0J10pKTtcbiAgICAgKiAgICAgIGZ1bGxOYW1lKHtsYXN0OiAnQnVsbGV0LVRvb3RoJywgYWdlOiAzMywgZmlyc3Q6ICdUb255J30pOyAvLz0+ICdUb255IEJ1bGxldC1Ub290aCdcbiAgICAgKi9cbiAgICB2YXIgcHJvcHMgPSBfY3VycnkyKGZ1bmN0aW9uIHByb3BzKHBzLCBvYmopIHtcbiAgICAgICAgdmFyIGxlbiA9IHBzLmxlbmd0aDtcbiAgICAgICAgdmFyIG91dCA9IFtdO1xuICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgb3V0W2lkeF0gPSBvYmpbcHNbaWR4XV07XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgbnVtYmVycyBmcm9tIGBmcm9tYCAoaW5jbHVzaXZlKSB0byBgdG9gXG4gICAgICogKGV4Y2x1c2l2ZSkuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gW051bWJlcl1cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZnJvbSBUaGUgZmlyc3QgbnVtYmVyIGluIHRoZSBsaXN0LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0byBPbmUgbW9yZSB0aGFuIHRoZSBsYXN0IG51bWJlciBpbiB0aGUgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3Qgb2YgbnVtYmVycyBpbiB0dGhlIHNldCBgW2EsIGIpYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnJhbmdlKDEsIDUpOyAgICAvLz0+IFsxLCAyLCAzLCA0XVxuICAgICAqICAgICAgUi5yYW5nZSg1MCwgNTMpOyAgLy89PiBbNTAsIDUxLCA1Ml1cbiAgICAgKi9cbiAgICB2YXIgcmFuZ2UgPSBfY3VycnkyKGZ1bmN0aW9uIHJhbmdlKGZyb20sIHRvKSB7XG4gICAgICAgIGlmICghKF9pc051bWJlcihmcm9tKSAmJiBfaXNOdW1iZXIodG8pKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm90aCBhcmd1bWVudHMgdG8gcmFuZ2UgbXVzdCBiZSBudW1iZXJzJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICB2YXIgbiA9IGZyb207XG4gICAgICAgIHdoaWxlIChuIDwgdG8pIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG4pO1xuICAgICAgICAgICAgbiArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc2luZ2xlIGl0ZW0gYnkgaXRlcmF0aW5nIHRocm91Z2ggdGhlIGxpc3QsIHN1Y2Nlc3NpdmVseSBjYWxsaW5nIHRoZSBpdGVyYXRvclxuICAgICAqIGZ1bmN0aW9uIGFuZCBwYXNzaW5nIGl0IGFuIGFjY3VtdWxhdG9yIHZhbHVlIGFuZCB0aGUgY3VycmVudCB2YWx1ZSBmcm9tIHRoZSBhcnJheSwgYW5kXG4gICAgICogdGhlbiBwYXNzaW5nIHRoZSByZXN1bHQgdG8gdGhlIG5leHQgY2FsbC5cbiAgICAgKlxuICAgICAqIFNpbWlsYXIgdG8gYHJlZHVjZWAsIGV4Y2VwdCBtb3ZlcyB0aHJvdWdoIHRoZSBpbnB1dCBsaXN0IGZyb20gdGhlIHJpZ2h0IHRvIHRoZSBsZWZ0LlxuICAgICAqXG4gICAgICogVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIHJlY2VpdmVzIHR3byB2YWx1ZXM6ICooYWNjLCB2YWx1ZSkqXG4gICAgICpcbiAgICAgKiBOb3RlOiBgUi5yZWR1Y2VSaWdodGAgZG9lcyBub3Qgc2tpcCBkZWxldGVkIG9yIHVuYXNzaWduZWQgaW5kaWNlcyAoc3BhcnNlIGFycmF5cyksIHVubGlrZVxuICAgICAqIHRoZSBuYXRpdmUgYEFycmF5LnByb3RvdHlwZS5yZWR1Y2VgIG1ldGhvZC4gRm9yIG1vcmUgZGV0YWlscyBvbiB0aGlzIGJlaGF2aW9yLCBzZWU6XG4gICAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvcmVkdWNlUmlnaHQjRGVzY3JpcHRpb25cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEsYiAtPiBhKSAtPiBhIC0+IFtiXSAtPiBhXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLiBSZWNlaXZlcyB0d28gdmFsdWVzLCB0aGUgYWNjdW11bGF0b3IgYW5kIHRoZVxuICAgICAqICAgICAgICBjdXJyZW50IGVsZW1lbnQgZnJvbSB0aGUgYXJyYXkuXG4gICAgICogQHBhcmFtIHsqfSBhY2MgVGhlIGFjY3VtdWxhdG9yIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEByZXR1cm4geyp9IFRoZSBmaW5hbCwgYWNjdW11bGF0ZWQgdmFsdWUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHBhaXJzID0gWyBbJ2EnLCAxXSwgWydiJywgMl0sIFsnYycsIDNdIF07XG4gICAgICogICAgICB2YXIgZmxhdHRlblBhaXJzID0gZnVuY3Rpb24oYWNjLCBwYWlyKSB7XG4gICAgICogICAgICAgIHJldHVybiBhY2MuY29uY2F0KHBhaXIpO1xuICAgICAqICAgICAgfTtcbiAgICAgKlxuICAgICAqICAgICAgUi5yZWR1Y2VSaWdodChmbGF0dGVuUGFpcnMsIFtdLCBwYWlycyk7IC8vPT4gWyAnYycsIDMsICdiJywgMiwgJ2EnLCAxIF1cbiAgICAgKi9cbiAgICB2YXIgcmVkdWNlUmlnaHQgPSBfY3VycnkzKGZ1bmN0aW9uIHJlZHVjZVJpZ2h0KGZuLCBhY2MsIGxpc3QpIHtcbiAgICAgICAgdmFyIGlkeCA9IGxpc3QubGVuZ3RoIC0gMTtcbiAgICAgICAgd2hpbGUgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICBhY2MgPSBmbihhY2MsIGxpc3RbaWR4XSk7XG4gICAgICAgICAgICBpZHggLT0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHZhbHVlIHdyYXBwZWQgdG8gaW5kaWNhdGUgdGhhdCBpdCBpcyB0aGUgZmluYWwgdmFsdWUgb2YgdGhlXG4gICAgICogcmVkdWNlIGFuZCB0cmFuc2R1Y2UgZnVuY3Rpb25zLiAgVGhlIHJldHVybmVkIHZhbHVlXG4gICAgICogc2hvdWxkIGJlIGNvbnNpZGVyZWQgYSBibGFjayBib3g6IHRoZSBpbnRlcm5hbCBzdHJ1Y3R1cmUgaXMgbm90XG4gICAgICogZ3VhcmFudGVlZCB0byBiZSBzdGFibGUuXG4gICAgICpcbiAgICAgKiBOb3RlOiB0aGlzIG9wdGltaXphdGlvbiBpcyB1bmF2YWlsYWJsZSB0byBmdW5jdGlvbnMgbm90IGV4cGxpY2l0bHkgbGlzdGVkXG4gICAgICogYWJvdmUuICBGb3IgaW5zdGFuY2UsIGl0IGlzIG5vdCBjdXJyZW50bHkgc3VwcG9ydGVkIGJ5IHJlZHVjZUluZGV4ZWQsXG4gICAgICogcmVkdWNlUmlnaHQsIG9yIHJlZHVjZVJpZ2h0SW5kZXhlZC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzZWUgUi5yZWR1Y2UsIFIudHJhbnNkdWNlXG4gICAgICogQHNpZyBhIC0+ICpcbiAgICAgKiBAcGFyYW0geyp9IHggVGhlIGZpbmFsIHZhbHVlIG9mIHRoZSByZWR1Y2UuXG4gICAgICogQHJldHVybiB7Kn0gVGhlIHdyYXBwZWQgdmFsdWUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5yZWR1Y2UoXG4gICAgICogICAgICAgIFIucGlwZShSLmFkZCwgUi5pZkVsc2UoUi5sdGUoMTApLCBSLnJlZHVjZWQsIFIuaWRlbnRpdHkpKSxcbiAgICAgKiAgICAgICAgMCxcbiAgICAgKiAgICAgICAgWzEsIDIsIDMsIDQsIDVdKSAvLyAxMFxuICAgICAqL1xuICAgIHZhciByZWR1Y2VkID0gX2N1cnJ5MShfcmVkdWNlZCk7XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBzdWItbGlzdCBvZiBgbGlzdGAgc3RhcnRpbmcgYXQgaW5kZXggYHN0YXJ0YCBhbmQgY29udGFpbmluZ1xuICAgICAqIGBjb3VudGAgZWxlbWVudHMuICBfTm90ZSB0aGF0IHRoaXMgaXMgbm90IGRlc3RydWN0aXZlXzogaXQgcmV0dXJucyBhXG4gICAgICogY29weSBvZiB0aGUgbGlzdCB3aXRoIHRoZSBjaGFuZ2VzLlxuICAgICAqIDxzbWFsbD5ObyBsaXN0cyBoYXZlIGJlZW4gaGFybWVkIGluIHRoZSBhcHBsaWNhdGlvbiBvZiB0aGlzIGZ1bmN0aW9uLjwvc21hbGw+XG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydCBUaGUgcG9zaXRpb24gdG8gc3RhcnQgcmVtb3ZpbmcgZWxlbWVudHNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gY291bnQgVGhlIG51bWJlciBvZiBlbGVtZW50cyB0byByZW1vdmVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIHJlbW92ZSBmcm9tXG4gICAgICogQHJldHVybiB7QXJyYXl9IEEgbmV3IEFycmF5IHdpdGggYGNvdW50YCBlbGVtZW50cyBmcm9tIGBzdGFydGAgcmVtb3ZlZC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnJlbW92ZSgyLCAzLCBbMSwyLDMsNCw1LDYsNyw4XSk7IC8vPT4gWzEsMiw2LDcsOF1cbiAgICAgKi9cbiAgICB2YXIgcmVtb3ZlID0gX2N1cnJ5MyhmdW5jdGlvbiByZW1vdmUoc3RhcnQsIGNvdW50LCBsaXN0KSB7XG4gICAgICAgIHJldHVybiBfY29uY2F0KF9zbGljZShsaXN0LCAwLCBNYXRoLm1pbihzdGFydCwgbGlzdC5sZW5ndGgpKSwgX3NsaWNlKGxpc3QsIE1hdGgubWluKGxpc3QubGVuZ3RoLCBzdGFydCArIGNvdW50KSkpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmVwbGFjZSBhIHN1YnN0cmluZyBvciByZWdleCBtYXRjaCBpbiBhIHN0cmluZyB3aXRoIGEgcmVwbGFjZW1lbnQuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IFN0cmluZ1xuICAgICAqIEBzaWcgUmVnRXhwfFN0cmluZyAtPiBTdHJpbmcgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICAgICAqIEBwYXJhbSB7UmVnRXhwfFN0cmluZ30gcGF0dGVybiBBIHJlZ3VsYXIgZXhwcmVzc2lvbiBvciBhIHN1YnN0cmluZyB0byBtYXRjaC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVwbGFjZW1lbnQgVGhlIHN0cmluZyB0byByZXBsYWNlIHRoZSBtYXRjaGVzIHdpdGguXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIGRvIHRoZSBzZWFyY2ggYW5kIHJlcGxhY2VtZW50IGluLlxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gVGhlIHJlc3VsdC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnJlcGxhY2UoJ2ZvbycsICdiYXInLCAnZm9vIGZvbyBmb28nKTsgLy89PiAnYmFyIGZvbyBmb28nXG4gICAgICogICAgICBSLnJlcGxhY2UoL2Zvby8sICdiYXInLCAnZm9vIGZvbyBmb28nKTsgLy89PiAnYmFyIGZvbyBmb28nXG4gICAgICpcbiAgICAgKiAgICAgIC8vIFVzZSB0aGUgXCJnXCIgKGdsb2JhbCkgZmxhZyB0byByZXBsYWNlIGFsbCBvY2N1cnJlbmNlczpcbiAgICAgKiAgICAgIFIucmVwbGFjZSgvZm9vL2csICdiYXInLCAnZm9vIGZvbyBmb28nKTsgLy89PiAnYmFyIGJhciBiYXInXG4gICAgICovXG4gICAgdmFyIHJlcGxhY2UgPSBfY3VycnkzKGZ1bmN0aW9uIHJlcGxhY2UocmVnZXgsIHJlcGxhY2VtZW50LCBzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlZ2V4LCByZXBsYWNlbWVudCk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3Qgd2l0aCB0aGUgc2FtZSBlbGVtZW50cyBhcyB0aGUgb3JpZ2luYWwgbGlzdCwganVzdFxuICAgICAqIGluIHRoZSByZXZlcnNlIG9yZGVyLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBbYV0gLT4gW2FdXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byByZXZlcnNlLlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBBIGNvcHkgb2YgdGhlIGxpc3QgaW4gcmV2ZXJzZSBvcmRlci5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnJldmVyc2UoWzEsIDIsIDNdKTsgIC8vPT4gWzMsIDIsIDFdXG4gICAgICogICAgICBSLnJldmVyc2UoWzEsIDJdKTsgICAgIC8vPT4gWzIsIDFdXG4gICAgICogICAgICBSLnJldmVyc2UoWzFdKTsgICAgICAgIC8vPT4gWzFdXG4gICAgICogICAgICBSLnJldmVyc2UoW10pOyAgICAgICAgIC8vPT4gW11cbiAgICAgKi9cbiAgICB2YXIgcmV2ZXJzZSA9IF9jdXJyeTEoZnVuY3Rpb24gcmV2ZXJzZShsaXN0KSB7XG4gICAgICAgIHJldHVybiBfc2xpY2UobGlzdCkucmV2ZXJzZSgpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogU2NhbiBpcyBzaW1pbGFyIHRvIHJlZHVjZSwgYnV0IHJldHVybnMgYSBsaXN0IG9mIHN1Y2Nlc3NpdmVseSByZWR1Y2VkIHZhbHVlcyBmcm9tIHRoZSBsZWZ0XG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhLGIgLT4gYSkgLT4gYSAtPiBbYl0gLT4gW2FdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLiBSZWNlaXZlcyB0d28gdmFsdWVzLCB0aGUgYWNjdW11bGF0b3IgYW5kIHRoZVxuICAgICAqICAgICAgICBjdXJyZW50IGVsZW1lbnQgZnJvbSB0aGUgYXJyYXlcbiAgICAgKiBAcGFyYW0geyp9IGFjYyBUaGUgYWNjdW11bGF0b3IgdmFsdWUuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHJldHVybiB7QXJyYXl9IEEgbGlzdCBvZiBhbGwgaW50ZXJtZWRpYXRlbHkgcmVkdWNlZCB2YWx1ZXMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIG51bWJlcnMgPSBbMSwgMiwgMywgNF07XG4gICAgICogICAgICB2YXIgZmFjdG9yaWFscyA9IFIuc2NhbihSLm11bHRpcGx5LCAxLCBudW1iZXJzKTsgLy89PiBbMSwgMSwgMiwgNiwgMjRdXG4gICAgICovXG4gICAgdmFyIHNjYW4gPSBfY3VycnkzKGZ1bmN0aW9uIHNjYW4oZm4sIGFjYywgbGlzdCkge1xuICAgICAgICB2YXIgaWR4ID0gMCwgbGVuID0gbGlzdC5sZW5ndGgsIHJlc3VsdCA9IFthY2NdO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBhY2MgPSBmbihhY2MsIGxpc3RbaWR4XSk7XG4gICAgICAgICAgICByZXN1bHRbaWR4ICsgMV0gPSBhY2M7XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcmVzdWx0IG9mIFwic2V0dGluZ1wiIHRoZSBwb3J0aW9uIG9mIHRoZSBnaXZlbiBkYXRhIHN0cnVjdHVyZVxuICAgICAqIGZvY3VzZWQgYnkgdGhlIGdpdmVuIGxlbnMgdG8gdGhlIGdpdmVuIHZhbHVlLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAdHlwZWRlZiBMZW5zIHMgYSA9IEZ1bmN0b3IgZiA9PiAoYSAtPiBmIGEpIC0+IHMgLT4gZiBzXG4gICAgICogQHNpZyBMZW5zIHMgYSAtPiBhIC0+IHMgLT4gc1xuICAgICAqIEBwYXJhbSB7TGVuc30gbGVuc1xuICAgICAqIEBwYXJhbSB7Kn0gdlxuICAgICAqIEBwYXJhbSB7Kn0geFxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICogQHNlZSBSLnByb3AsIFIubGVuc0luZGV4LCBSLmxlbnNQcm9wXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHhMZW5zID0gUi5sZW5zUHJvcCgneCcpO1xuICAgICAqXG4gICAgICogICAgICBSLnNldCh4TGVucywgNCwge3g6IDEsIHk6IDJ9KTsgIC8vPT4ge3g6IDQsIHk6IDJ9XG4gICAgICogICAgICBSLnNldCh4TGVucywgOCwge3g6IDEsIHk6IDJ9KTsgIC8vPT4ge3g6IDgsIHk6IDJ9XG4gICAgICovXG4gICAgdmFyIHNldCA9IF9jdXJyeTMoZnVuY3Rpb24gc2V0KGxlbnMsIHYsIHgpIHtcbiAgICAgICAgcmV0dXJuIG92ZXIobGVucywgYWx3YXlzKHYpLCB4KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBjb3B5IG9mIHRoZSBsaXN0LCBzb3J0ZWQgYWNjb3JkaW5nIHRvIHRoZSBjb21wYXJhdG9yIGZ1bmN0aW9uLCB3aGljaCBzaG91bGQgYWNjZXB0IHR3byB2YWx1ZXMgYXQgYVxuICAgICAqIHRpbWUgYW5kIHJldHVybiBhIG5lZ2F0aXZlIG51bWJlciBpZiB0aGUgZmlyc3QgdmFsdWUgaXMgc21hbGxlciwgYSBwb3NpdGl2ZSBudW1iZXIgaWYgaXQncyBsYXJnZXIsIGFuZCB6ZXJvXG4gICAgICogaWYgdGhleSBhcmUgZXF1YWwuICBQbGVhc2Ugbm90ZSB0aGF0IHRoaXMgaXMgYSAqKmNvcHkqKiBvZiB0aGUgbGlzdC4gIEl0IGRvZXMgbm90IG1vZGlmeSB0aGUgb3JpZ2luYWwuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhLGEgLT4gTnVtYmVyKSAtPiBbYV0gLT4gW2FdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGFyYXRvciBBIHNvcnRpbmcgZnVuY3Rpb24gOjogYSAtPiBiIC0+IEludFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gc29ydFxuICAgICAqIEByZXR1cm4ge0FycmF5fSBhIG5ldyBhcnJheSB3aXRoIGl0cyBlbGVtZW50cyBzb3J0ZWQgYnkgdGhlIGNvbXBhcmF0b3IgZnVuY3Rpb24uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGRpZmYgPSBmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhIC0gYjsgfTtcbiAgICAgKiAgICAgIFIuc29ydChkaWZmLCBbNCwyLDcsNV0pOyAvLz0+IFsyLCA0LCA1LCA3XVxuICAgICAqL1xuICAgIHZhciBzb3J0ID0gX2N1cnJ5MihmdW5jdGlvbiBzb3J0KGNvbXBhcmF0b3IsIGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIF9zbGljZShsaXN0KS5zb3J0KGNvbXBhcmF0b3IpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogU29ydHMgdGhlIGxpc3QgYWNjb3JkaW5nIHRvIHRoZSBzdXBwbGllZCBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAgICAgKiBAc2lnIE9yZCBiID0+IChhIC0+IGIpIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gc29ydC5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgbGlzdCBzb3J0ZWQgYnkgdGhlIGtleXMgZ2VuZXJhdGVkIGJ5IGBmbmAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHNvcnRCeUZpcnN0SXRlbSA9IFIuc29ydEJ5KHByb3AoMCkpO1xuICAgICAqICAgICAgdmFyIHNvcnRCeU5hbWVDYXNlSW5zZW5zaXRpdmUgPSBSLnNvcnRCeShSLmNvbXBvc2UoUi50b0xvd2VyLCBSLnByb3AoJ25hbWUnKSkpO1xuICAgICAqICAgICAgdmFyIHBhaXJzID0gW1stMSwgMV0sIFstMiwgMl0sIFstMywgM11dO1xuICAgICAqICAgICAgc29ydEJ5Rmlyc3RJdGVtKHBhaXJzKTsgLy89PiBbWy0zLCAzXSwgWy0yLCAyXSwgWy0xLCAxXV1cbiAgICAgKiAgICAgIHZhciBhbGljZSA9IHtcbiAgICAgKiAgICAgICAgbmFtZTogJ0FMSUNFJyxcbiAgICAgKiAgICAgICAgYWdlOiAxMDFcbiAgICAgKiAgICAgIH07XG4gICAgICogICAgICB2YXIgYm9iID0ge1xuICAgICAqICAgICAgICBuYW1lOiAnQm9iJyxcbiAgICAgKiAgICAgICAgYWdlOiAtMTBcbiAgICAgKiAgICAgIH07XG4gICAgICogICAgICB2YXIgY2xhcmEgPSB7XG4gICAgICogICAgICAgIG5hbWU6ICdjbGFyYScsXG4gICAgICogICAgICAgIGFnZTogMzE0LjE1OVxuICAgICAqICAgICAgfTtcbiAgICAgKiAgICAgIHZhciBwZW9wbGUgPSBbY2xhcmEsIGJvYiwgYWxpY2VdO1xuICAgICAqICAgICAgc29ydEJ5TmFtZUNhc2VJbnNlbnNpdGl2ZShwZW9wbGUpOyAvLz0+IFthbGljZSwgYm9iLCBjbGFyYV1cbiAgICAgKi9cbiAgICB2YXIgc29ydEJ5ID0gX2N1cnJ5MihmdW5jdGlvbiBzb3J0QnkoZm4sIGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIF9zbGljZShsaXN0KS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICB2YXIgYWEgPSBmbihhKTtcbiAgICAgICAgICAgIHZhciBiYiA9IGZuKGIpO1xuICAgICAgICAgICAgcmV0dXJuIGFhIDwgYmIgPyAtMSA6IGFhID4gYmIgPyAxIDogMDtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBTdWJ0cmFjdHMgdHdvIG51bWJlcnMuIEVxdWl2YWxlbnQgdG8gYGEgLSBiYCBidXQgY3VycmllZC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTWF0aFxuICAgICAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBOdW1iZXJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYSBUaGUgZmlyc3QgdmFsdWUuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGIgVGhlIHNlY29uZCB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSByZXN1bHQgb2YgYGEgLSBiYC5cbiAgICAgKiBAc2VlIFIuYWRkXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5zdWJ0cmFjdCgxMCwgOCk7IC8vPT4gMlxuICAgICAqXG4gICAgICogICAgICB2YXIgbWludXM1ID0gUi5zdWJ0cmFjdChSLl9fLCA1KTtcbiAgICAgKiAgICAgIG1pbnVzNSgxNyk7IC8vPT4gMTJcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGNvbXBsZW1lbnRhcnlBbmdsZSA9IFIuc3VidHJhY3QoOTApO1xuICAgICAqICAgICAgY29tcGxlbWVudGFyeUFuZ2xlKDMwKTsgLy89PiA2MFxuICAgICAqICAgICAgY29tcGxlbWVudGFyeUFuZ2xlKDcyKTsgLy89PiAxOFxuICAgICAqL1xuICAgIHZhciBzdWJ0cmFjdCA9IF9jdXJyeTIoZnVuY3Rpb24gc3VidHJhY3QoYSwgYikge1xuICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3QgY29udGFpbmluZyB0aGUgbGFzdCBgbmAgZWxlbWVudHMgb2YgYSBnaXZlbiBsaXN0LCBwYXNzaW5nIGVhY2ggdmFsdWVcbiAgICAgKiB0byB0aGUgc3VwcGxpZWQgcHJlZGljYXRlIGZ1bmN0aW9uLCBhbmQgdGVybWluYXRpbmcgd2hlbiB0aGUgcHJlZGljYXRlIGZ1bmN0aW9uIHJldHVybnNcbiAgICAgKiBgZmFsc2VgLiBFeGNsdWRlcyB0aGUgZWxlbWVudCB0aGF0IGNhdXNlZCB0aGUgcHJlZGljYXRlIGZ1bmN0aW9uIHRvIGZhaWwuIFRoZSBwcmVkaWNhdGVcbiAgICAgKiBmdW5jdGlvbiBpcyBwYXNzZWQgb25lIGFyZ3VtZW50OiAqKHZhbHVlKSouXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlciBpdGVyYXRpb24uXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGFycmF5LlxuICAgICAqIEBzZWUgUi5kcm9wTGFzdFdoaWxlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGlzTm90T25lID0gZnVuY3Rpb24oeCkge1xuICAgICAqICAgICAgICByZXR1cm4gISh4ID09PSAxKTtcbiAgICAgKiAgICAgIH07XG4gICAgICpcbiAgICAgKiAgICAgIFIudGFrZUxhc3RXaGlsZShpc05vdE9uZSwgWzEsIDIsIDMsIDRdKTsgLy89PiBbMiwgMywgNF1cbiAgICAgKi9cbiAgICB2YXIgdGFrZUxhc3RXaGlsZSA9IF9jdXJyeTIoZnVuY3Rpb24gdGFrZUxhc3RXaGlsZShmbiwgbGlzdCkge1xuICAgICAgICB2YXIgaWR4ID0gbGlzdC5sZW5ndGggLSAxO1xuICAgICAgICB3aGlsZSAoaWR4ID49IDAgJiYgZm4obGlzdFtpZHhdKSkge1xuICAgICAgICAgICAgaWR4IC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zbGljZShsaXN0LCBpZHggKyAxLCBJbmZpbml0eSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSdW5zIHRoZSBnaXZlbiBmdW5jdGlvbiB3aXRoIHRoZSBzdXBwbGllZCBvYmplY3QsIHRoZW4gcmV0dXJucyB0aGUgb2JqZWN0LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKGEgLT4gKikgLT4gYSAtPiBhXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2l0aCBgeGAuIFRoZSByZXR1cm4gdmFsdWUgb2YgYGZuYCB3aWxsIGJlIHRocm93biBhd2F5LlxuICAgICAqIEBwYXJhbSB7Kn0geFxuICAgICAqIEByZXR1cm4geyp9IGB4YC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgc2F5WCA9IGZ1bmN0aW9uKHgpIHsgY29uc29sZS5sb2coJ3ggaXMgJyArIHgpOyB9O1xuICAgICAqICAgICAgUi50YXAoc2F5WCwgMTAwKTsgLy89PiAxMDBcbiAgICAgKiAgICAgIC8vLT4gJ3ggaXMgMTAwJ1xuICAgICAqL1xuICAgIHZhciB0YXAgPSBfY3VycnkyKGZ1bmN0aW9uIHRhcChmbiwgeCkge1xuICAgICAgICBmbih4KTtcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBnaXZlbiBzdHJpbmcgbWF0Y2hlcyBhIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2VlIFIubWF0Y2hcbiAgICAgKiBAY2F0ZWdvcnkgU3RyaW5nXG4gICAgICogQHNpZyBSZWdFeHAgLT4gU3RyaW5nIC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0ge1JlZ0V4cH0gcGF0dGVyblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIudGVzdCgvXngvLCAneHl6Jyk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi50ZXN0KC9eeS8sICd4eXonKTsgLy89PiBmYWxzZVxuICAgICAqL1xuICAgIHZhciB0ZXN0ID0gX2N1cnJ5MihmdW5jdGlvbiB0ZXN0KHBhdHRlcm4sIHN0cikge1xuICAgICAgICByZXR1cm4gX2Nsb25lUmVnRXhwKHBhdHRlcm4pLnRlc3Qoc3RyKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENhbGxzIGFuIGlucHV0IGZ1bmN0aW9uIGBuYCB0aW1lcywgcmV0dXJuaW5nIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHJlc3VsdHMgb2YgdGhvc2VcbiAgICAgKiBmdW5jdGlvbiBjYWxscy5cbiAgICAgKlxuICAgICAqIGBmbmAgaXMgcGFzc2VkIG9uZSBhcmd1bWVudDogVGhlIGN1cnJlbnQgdmFsdWUgb2YgYG5gLCB3aGljaCBiZWdpbnMgYXQgYDBgIGFuZCBpc1xuICAgICAqIGdyYWR1YWxseSBpbmNyZW1lbnRlZCB0byBgbiAtIDFgLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyAoaSAtPiBhKSAtPiBpIC0+IFthXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuIFBhc3NlZCBvbmUgYXJndW1lbnQsIHRoZSBjdXJyZW50IHZhbHVlIG9mIGBuYC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbiBBIHZhbHVlIGJldHdlZW4gYDBgIGFuZCBgbiAtIDFgLiBJbmNyZW1lbnRzIGFmdGVyIGVhY2ggZnVuY3Rpb24gY2FsbC5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgY29udGFpbmluZyB0aGUgcmV0dXJuIHZhbHVlcyBvZiBhbGwgY2FsbHMgdG8gYGZuYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnRpbWVzKFIuaWRlbnRpdHksIDUpOyAvLz0+IFswLCAxLCAyLCAzLCA0XVxuICAgICAqL1xuICAgIHZhciB0aW1lcyA9IF9jdXJyeTIoZnVuY3Rpb24gdGltZXMoZm4sIG4pIHtcbiAgICAgICAgdmFyIGxlbiA9IE51bWJlcihuKTtcbiAgICAgICAgdmFyIGxpc3QgPSBuZXcgQXJyYXkobGVuKTtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgICAgICAgIGxpc3RbaWR4XSA9IGZuKGlkeCk7XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGFuIG9iamVjdCBpbnRvIGFuIGFycmF5IG9mIGtleSwgdmFsdWUgYXJyYXlzLlxuICAgICAqIE9ubHkgdGhlIG9iamVjdCdzIG93biBwcm9wZXJ0aWVzIGFyZSB1c2VkLlxuICAgICAqIE5vdGUgdGhhdCB0aGUgb3JkZXIgb2YgdGhlIG91dHB1dCBhcnJheSBpcyBub3QgZ3VhcmFudGVlZCB0byBiZVxuICAgICAqIGNvbnNpc3RlbnQgYWNyb3NzIGRpZmZlcmVudCBKUyBwbGF0Zm9ybXMuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcge1N0cmluZzogKn0gLT4gW1tTdHJpbmcsKl1dXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGV4dHJhY3QgZnJvbVxuICAgICAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSBvZiBrZXksIHZhbHVlIGFycmF5cyBmcm9tIHRoZSBvYmplY3QncyBvd24gcHJvcGVydGllcy5cbiAgICAgKiBAc2VlIFIuZnJvbVBhaXJzXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi50b1BhaXJzKHthOiAxLCBiOiAyLCBjOiAzfSk7IC8vPT4gW1snYScsIDFdLCBbJ2InLCAyXSwgWydjJywgM11dXG4gICAgICovXG4gICAgdmFyIHRvUGFpcnMgPSBfY3VycnkxKGZ1bmN0aW9uIHRvUGFpcnMob2JqKSB7XG4gICAgICAgIHZhciBwYWlycyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKF9oYXMocHJvcCwgb2JqKSkge1xuICAgICAgICAgICAgICAgIHBhaXJzW3BhaXJzLmxlbmd0aF0gPSBbXG4gICAgICAgICAgICAgICAgICAgIHByb3AsXG4gICAgICAgICAgICAgICAgICAgIG9ialtwcm9wXVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhaXJzO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYW4gb2JqZWN0IGludG8gYW4gYXJyYXkgb2Yga2V5LCB2YWx1ZSBhcnJheXMuXG4gICAgICogVGhlIG9iamVjdCdzIG93biBwcm9wZXJ0aWVzIGFuZCBwcm90b3R5cGUgcHJvcGVydGllcyBhcmUgdXNlZC5cbiAgICAgKiBOb3RlIHRoYXQgdGhlIG9yZGVyIG9mIHRoZSBvdXRwdXQgYXJyYXkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmVcbiAgICAgKiBjb25zaXN0ZW50IGFjcm9zcyBkaWZmZXJlbnQgSlMgcGxhdGZvcm1zLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIHtTdHJpbmc6ICp9IC0+IFtbU3RyaW5nLCpdXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBleHRyYWN0IGZyb21cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgb2Yga2V5LCB2YWx1ZSBhcnJheXMgZnJvbSB0aGUgb2JqZWN0J3Mgb3duXG4gICAgICogICAgICAgICBhbmQgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIEYgPSBmdW5jdGlvbigpIHsgdGhpcy54ID0gJ1gnOyB9O1xuICAgICAqICAgICAgRi5wcm90b3R5cGUueSA9ICdZJztcbiAgICAgKiAgICAgIHZhciBmID0gbmV3IEYoKTtcbiAgICAgKiAgICAgIFIudG9QYWlyc0luKGYpOyAvLz0+IFtbJ3gnLCdYJ10sIFsneScsJ1knXV1cbiAgICAgKi9cbiAgICB2YXIgdG9QYWlyc0luID0gX2N1cnJ5MShmdW5jdGlvbiB0b1BhaXJzSW4ob2JqKSB7XG4gICAgICAgIHZhciBwYWlycyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuICAgICAgICAgICAgcGFpcnNbcGFpcnMubGVuZ3RoXSA9IFtcbiAgICAgICAgICAgICAgICBwcm9wLFxuICAgICAgICAgICAgICAgIG9ialtwcm9wXVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFpcnM7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIChzdHJpcHMpIHdoaXRlc3BhY2UgZnJvbSBib3RoIGVuZHMgb2YgdGhlIHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgU3RyaW5nXG4gICAgICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIHRyaW0uXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBUcmltbWVkIHZlcnNpb24gb2YgYHN0cmAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi50cmltKCcgICB4eXogICcpOyAvLz0+ICd4eXonXG4gICAgICogICAgICBSLm1hcChSLnRyaW0sIFIuc3BsaXQoJywnLCAneCwgeSwgeicpKTsgLy89PiBbJ3gnLCAneScsICd6J11cbiAgICAgKi9cbiAgICB2YXIgdHJpbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdzID0gJ1xcdFxcblxceDBCXFxmXFxyIFxceEEwXFx1MTY4MFxcdTE4MEVcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzJyArICdcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUzMDAwXFx1MjAyOCcgKyAnXFx1MjAyOVxcdUZFRkYnO1xuICAgICAgICB2YXIgemVyb1dpZHRoID0gJ1xcdTIwMEInO1xuICAgICAgICB2YXIgaGFzUHJvdG9UcmltID0gdHlwZW9mIFN0cmluZy5wcm90b3R5cGUudHJpbSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgICAgaWYgKCFoYXNQcm90b1RyaW0gfHwgKHdzLnRyaW0oKSB8fCAhemVyb1dpZHRoLnRyaW0oKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBfY3VycnkxKGZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJlZ2luUnggPSBuZXcgUmVnRXhwKCdeWycgKyB3cyArICddWycgKyB3cyArICddKicpO1xuICAgICAgICAgICAgICAgIHZhciBlbmRSeCA9IG5ldyBSZWdFeHAoJ1snICsgd3MgKyAnXVsnICsgd3MgKyAnXSokJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKGJlZ2luUngsICcnKS5yZXBsYWNlKGVuZFJ4LCAnJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBfY3VycnkxKGZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0ci50cmltKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0oKTtcblxuICAgIC8qKlxuICAgICAqIEdpdmVzIGEgc2luZ2xlLXdvcmQgc3RyaW5nIGRlc2NyaXB0aW9uIG9mIHRoZSAobmF0aXZlKSB0eXBlIG9mIGEgdmFsdWUsIHJldHVybmluZyBzdWNoXG4gICAgICogYW5zd2VycyBhcyAnT2JqZWN0JywgJ051bWJlcicsICdBcnJheScsIG9yICdOdWxsJy4gIERvZXMgbm90IGF0dGVtcHQgdG8gZGlzdGluZ3Vpc2ggdXNlclxuICAgICAqIE9iamVjdCB0eXBlcyBhbnkgZnVydGhlciwgcmVwb3J0aW5nIHRoZW0gYWxsIGFzICdPYmplY3QnLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBUeXBlXG4gICAgICogQHNpZyAoKiAtPiB7Kn0pIC0+IFN0cmluZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIudHlwZSh7fSk7IC8vPT4gXCJPYmplY3RcIlxuICAgICAqICAgICAgUi50eXBlKDEpOyAvLz0+IFwiTnVtYmVyXCJcbiAgICAgKiAgICAgIFIudHlwZShmYWxzZSk7IC8vPT4gXCJCb29sZWFuXCJcbiAgICAgKiAgICAgIFIudHlwZSgncycpOyAvLz0+IFwiU3RyaW5nXCJcbiAgICAgKiAgICAgIFIudHlwZShudWxsKTsgLy89PiBcIk51bGxcIlxuICAgICAqICAgICAgUi50eXBlKFtdKTsgLy89PiBcIkFycmF5XCJcbiAgICAgKiAgICAgIFIudHlwZSgvW0Etel0vKTsgLy89PiBcIlJlZ0V4cFwiXG4gICAgICovXG4gICAgdmFyIHR5cGUgPSBfY3VycnkxKGZ1bmN0aW9uIHR5cGUodmFsKSB7XG4gICAgICAgIHJldHVybiB2YWwgPT09IG51bGwgPyAnTnVsbCcgOiB2YWwgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkuc2xpY2UoOCwgLTEpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogVGFrZXMgYSBmdW5jdGlvbiBgZm5gLCB3aGljaCB0YWtlcyBhIHNpbmdsZSBhcnJheSBhcmd1bWVudCwgYW5kIHJldHVybnNcbiAgICAgKiBhIGZ1bmN0aW9uIHdoaWNoOlxuICAgICAqXG4gICAgICogICAtIHRha2VzIGFueSBudW1iZXIgb2YgcG9zaXRpb25hbCBhcmd1bWVudHM7XG4gICAgICogICAtIHBhc3NlcyB0aGVzZSBhcmd1bWVudHMgdG8gYGZuYCBhcyBhbiBhcnJheTsgYW5kXG4gICAgICogICAtIHJldHVybnMgdGhlIHJlc3VsdC5cbiAgICAgKlxuICAgICAqIEluIG90aGVyIHdvcmRzLCBSLnVuYXBwbHkgZGVyaXZlcyBhIHZhcmlhZGljIGZ1bmN0aW9uIGZyb20gYSBmdW5jdGlvblxuICAgICAqIHdoaWNoIHRha2VzIGFuIGFycmF5LiBSLnVuYXBwbHkgaXMgdGhlIGludmVyc2Ugb2YgUi5hcHBseS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIChbKi4uLl0gLT4gYSkgLT4gKCouLi4gLT4gYSlcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAqIEBzZWUgUi5hcHBseVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIudW5hcHBseShKU09OLnN0cmluZ2lmeSkoMSwgMiwgMyk7IC8vPT4gJ1sxLDIsM10nXG4gICAgICovXG4gICAgdmFyIHVuYXBwbHkgPSBfY3VycnkxKGZ1bmN0aW9uIHVuYXBwbHkoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmbihfc2xpY2UoYXJndW1lbnRzKSk7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBXcmFwcyBhIGZ1bmN0aW9uIG9mIGFueSBhcml0eSAoaW5jbHVkaW5nIG51bGxhcnkpIGluIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGV4YWN0bHkgMVxuICAgICAqIHBhcmFtZXRlci4gQW55IGV4dHJhbmVvdXMgcGFyYW1ldGVycyB3aWxsIG5vdCBiZSBwYXNzZWQgdG8gdGhlIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKCogLT4gYikgLT4gKGEgLT4gYilcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gd3JhcHBpbmcgYGZuYC4gVGhlIG5ldyBmdW5jdGlvbiBpcyBndWFyYW50ZWVkIHRvIGJlIG9mXG4gICAgICogICAgICAgICBhcml0eSAxLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciB0YWtlc1R3b0FyZ3MgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgICogICAgICAgIHJldHVybiBbYSwgYl07XG4gICAgICogICAgICB9O1xuICAgICAqICAgICAgdGFrZXNUd29BcmdzLmxlbmd0aDsgLy89PiAyXG4gICAgICogICAgICB0YWtlc1R3b0FyZ3MoMSwgMik7IC8vPT4gWzEsIDJdXG4gICAgICpcbiAgICAgKiAgICAgIHZhciB0YWtlc09uZUFyZyA9IFIudW5hcnkodGFrZXNUd29BcmdzKTtcbiAgICAgKiAgICAgIHRha2VzT25lQXJnLmxlbmd0aDsgLy89PiAxXG4gICAgICogICAgICAvLyBPbmx5IDEgYXJndW1lbnQgaXMgcGFzc2VkIHRvIHRoZSB3cmFwcGVkIGZ1bmN0aW9uXG4gICAgICogICAgICB0YWtlc09uZUFyZygxLCAyKTsgLy89PiBbMSwgdW5kZWZpbmVkXVxuICAgICAqL1xuICAgIHZhciB1bmFyeSA9IF9jdXJyeTEoZnVuY3Rpb24gdW5hcnkoZm4pIHtcbiAgICAgICAgcmV0dXJuIG5BcnkoMSwgZm4pO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIG9mIGFyaXR5IGBuYCBmcm9tIGEgKG1hbnVhbGx5KSBjdXJyaWVkIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgTnVtYmVyIC0+IChhIC0+IGIpIC0+IChhIC0+IGMpXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgZm9yIHRoZSByZXR1cm5lZCBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gdW5jdXJyeS5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24uXG4gICAgICogQHNlZSBSLmN1cnJ5XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGFkZEZvdXIgPSBmdW5jdGlvbihhKSB7XG4gICAgICogICAgICAgIHJldHVybiBmdW5jdGlvbihiKSB7XG4gICAgICogICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGMpIHtcbiAgICAgKiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihkKSB7XG4gICAgICogICAgICAgICAgICAgIHJldHVybiBhICsgYiArIGMgKyBkO1xuICAgICAqICAgICAgICAgICAgfTtcbiAgICAgKiAgICAgICAgICB9O1xuICAgICAqICAgICAgICB9O1xuICAgICAqICAgICAgfTtcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHVuY3VycmllZEFkZEZvdXIgPSBSLnVuY3VycnlOKDQsIGFkZEZvdXIpO1xuICAgICAqICAgICAgY3VycmllZEFkZEZvdXIoMSwgMiwgMywgNCk7IC8vPT4gMTBcbiAgICAgKi9cbiAgICB2YXIgdW5jdXJyeU4gPSBfY3VycnkyKGZ1bmN0aW9uIHVuY3VycnlOKGRlcHRoLCBmbikge1xuICAgICAgICByZXR1cm4gY3VycnlOKGRlcHRoLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudERlcHRoID0gMTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGZuO1xuICAgICAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgICAgICB2YXIgZW5kSWR4O1xuICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnREZXB0aCA8PSBkZXB0aCAmJiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBlbmRJZHggPSBjdXJyZW50RGVwdGggPT09IGRlcHRoID8gYXJndW1lbnRzLmxlbmd0aCA6IGlkeCArIHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmFwcGx5KHRoaXMsIF9zbGljZShhcmd1bWVudHMsIGlkeCwgZW5kSWR4KSk7XG4gICAgICAgICAgICAgICAgY3VycmVudERlcHRoICs9IDE7XG4gICAgICAgICAgICAgICAgaWR4ID0gZW5kSWR4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEJ1aWxkcyBhIGxpc3QgZnJvbSBhIHNlZWQgdmFsdWUuIEFjY2VwdHMgYW4gaXRlcmF0b3IgZnVuY3Rpb24sIHdoaWNoIHJldHVybnMgZWl0aGVyIGZhbHNlXG4gICAgICogdG8gc3RvcCBpdGVyYXRpb24gb3IgYW4gYXJyYXkgb2YgbGVuZ3RoIDIgY29udGFpbmluZyB0aGUgdmFsdWUgdG8gYWRkIHRvIHRoZSByZXN1bHRpbmdcbiAgICAgKiBsaXN0IGFuZCB0aGUgc2VlZCB0byBiZSB1c2VkIGluIHRoZSBuZXh0IGNhbGwgdG8gdGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIHJlY2VpdmVzIG9uZSBhcmd1bWVudDogKihzZWVkKSouXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhIC0+IFtiXSkgLT4gKiAtPiBbYl1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24uIHJlY2VpdmVzIG9uZSBhcmd1bWVudCwgYHNlZWRgLCBhbmQgcmV0dXJuc1xuICAgICAqICAgICAgICBlaXRoZXIgZmFsc2UgdG8gcXVpdCBpdGVyYXRpb24gb3IgYW4gYXJyYXkgb2YgbGVuZ3RoIHR3byB0byBwcm9jZWVkLiBUaGUgZWxlbWVudFxuICAgICAqICAgICAgICBhdCBpbmRleCAwIG9mIHRoaXMgYXJyYXkgd2lsbCBiZSBhZGRlZCB0byB0aGUgcmVzdWx0aW5nIGFycmF5LCBhbmQgdGhlIGVsZW1lbnRcbiAgICAgKiAgICAgICAgYXQgaW5kZXggMSB3aWxsIGJlIHBhc3NlZCB0byB0aGUgbmV4dCBjYWxsIHRvIGBmbmAuXG4gICAgICogQHBhcmFtIHsqfSBzZWVkIFRoZSBzZWVkIHZhbHVlLlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBUaGUgZmluYWwgbGlzdC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgZiA9IGZ1bmN0aW9uKG4pIHsgcmV0dXJuIG4gPiA1MCA/IGZhbHNlIDogWy1uLCBuICsgMTBdIH07XG4gICAgICogICAgICBSLnVuZm9sZChmLCAxMCk7IC8vPT4gWy0xMCwgLTIwLCAtMzAsIC00MCwgLTUwXVxuICAgICAqL1xuICAgIHZhciB1bmZvbGQgPSBfY3VycnkyKGZ1bmN0aW9uIHVuZm9sZChmbiwgc2VlZCkge1xuICAgICAgICB2YXIgcGFpciA9IGZuKHNlZWQpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIHdoaWxlIChwYWlyICYmIHBhaXIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBwYWlyWzBdO1xuICAgICAgICAgICAgcGFpciA9IGZuKHBhaXJbMV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3QgY29udGFpbmluZyBvbmx5IG9uZSBjb3B5IG9mIGVhY2ggZWxlbWVudCBpbiB0aGUgb3JpZ2luYWwgbGlzdCwgYmFzZWRcbiAgICAgKiB1cG9uIHRoZSB2YWx1ZSByZXR1cm5lZCBieSBhcHBseWluZyB0aGUgc3VwcGxpZWQgcHJlZGljYXRlIHRvIHR3byBsaXN0IGVsZW1lbnRzLiBQcmVmZXJzXG4gICAgICogdGhlIGZpcnN0IGl0ZW0gaWYgdHdvIGl0ZW1zIGNvbXBhcmUgZXF1YWwgYmFzZWQgb24gdGhlIHByZWRpY2F0ZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEsIGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgQSBwcmVkaWNhdGUgdXNlZCB0byB0ZXN0IHdoZXRoZXIgdHdvIGl0ZW1zIGFyZSBlcXVhbC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3Qgb2YgdW5pcXVlIGl0ZW1zLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBzdHJFcSA9IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIFN0cmluZyhhKSA9PT0gU3RyaW5nKGIpOyB9O1xuICAgICAqICAgICAgUi51bmlxV2l0aChzdHJFcSkoWzEsICcxJywgMiwgMV0pOyAvLz0+IFsxLCAyXVxuICAgICAqICAgICAgUi51bmlxV2l0aChzdHJFcSkoW3t9LCB7fV0pOyAgICAgICAvLz0+IFt7fV1cbiAgICAgKiAgICAgIFIudW5pcVdpdGgoc3RyRXEpKFsxLCAnMScsIDFdKTsgICAgLy89PiBbMV1cbiAgICAgKiAgICAgIFIudW5pcVdpdGgoc3RyRXEpKFsnMScsIDEsIDFdKTsgICAgLy89PiBbJzEnXVxuICAgICAqL1xuICAgIHZhciB1bmlxV2l0aCA9IF9jdXJyeTIoZnVuY3Rpb24gdW5pcVdpdGgocHJlZCwgbGlzdCkge1xuICAgICAgICB2YXIgaWR4ID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXSwgaXRlbTtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgaXRlbSA9IGxpc3RbaWR4XTtcbiAgICAgICAgICAgIGlmICghX2NvbnRhaW5zV2l0aChwcmVkLCBpdGVtLCByZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGNvcHkgb2YgdGhlIGFycmF5IHdpdGggdGhlIGVsZW1lbnQgYXQgdGhlXG4gICAgICogcHJvdmlkZWQgaW5kZXggcmVwbGFjZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWUuXG4gICAgICogQHNlZSBSLmFkanVzdFxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBOdW1iZXIgLT4gYSAtPiBbYV0gLT4gW2FdXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGlkeCBUaGUgaW5kZXggdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSB7Kn0geCBUaGUgdmFsdWUgdG8gZXhpc3QgYXQgdGhlIGdpdmVuIGluZGV4IG9mIHRoZSByZXR1cm5lZCBhcnJheS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fEFyZ3VtZW50c30gbGlzdCBUaGUgc291cmNlIGFycmF5LWxpa2Ugb2JqZWN0IHRvIGJlIHVwZGF0ZWQuXG4gICAgICogQHJldHVybiB7QXJyYXl9IEEgY29weSBvZiBgbGlzdGAgd2l0aCB0aGUgdmFsdWUgYXQgaW5kZXggYGlkeGAgcmVwbGFjZWQgd2l0aCBgeGAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi51cGRhdGUoMSwgMTEsIFswLCAxLCAyXSk7ICAgICAvLz0+IFswLCAxMSwgMl1cbiAgICAgKiAgICAgIFIudXBkYXRlKDEpKDExKShbMCwgMSwgMl0pOyAgICAgLy89PiBbMCwgMTEsIDJdXG4gICAgICovXG4gICAgdmFyIHVwZGF0ZSA9IF9jdXJyeTMoZnVuY3Rpb24gdXBkYXRlKGlkeCwgeCwgbGlzdCkge1xuICAgICAgICByZXR1cm4gYWRqdXN0KGFsd2F5cyh4KSwgaWR4LCBsaXN0KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCB0aGUgZW51bWVyYWJsZSBvd24gcHJvcGVydGllcyBvZiB0aGUgc3VwcGxpZWQgb2JqZWN0LlxuICAgICAqIE5vdGUgdGhhdCB0aGUgb3JkZXIgb2YgdGhlIG91dHB1dCBhcnJheSBpcyBub3QgZ3VhcmFudGVlZCBhY3Jvc3NcbiAgICAgKiBkaWZmZXJlbnQgSlMgcGxhdGZvcm1zLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIHtrOiB2fSAtPiBbdl1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gZXh0cmFjdCB2YWx1ZXMgZnJvbVxuICAgICAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSBvZiB0aGUgdmFsdWVzIG9mIHRoZSBvYmplY3QncyBvd24gcHJvcGVydGllcy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnZhbHVlcyh7YTogMSwgYjogMiwgYzogM30pOyAvLz0+IFsxLCAyLCAzXVxuICAgICAqL1xuICAgIHZhciB2YWx1ZXMgPSBfY3VycnkxKGZ1bmN0aW9uIHZhbHVlcyhvYmopIHtcbiAgICAgICAgdmFyIHByb3BzID0ga2V5cyhvYmopO1xuICAgICAgICB2YXIgbGVuID0gcHJvcHMubGVuZ3RoO1xuICAgICAgICB2YXIgdmFscyA9IFtdO1xuICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgdmFsc1tpZHhdID0gb2JqW3Byb3BzW2lkeF1dO1xuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHM7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgdGhlIHByb3BlcnRpZXMsIGluY2x1ZGluZyBwcm90b3R5cGUgcHJvcGVydGllcyxcbiAgICAgKiBvZiB0aGUgc3VwcGxpZWQgb2JqZWN0LlxuICAgICAqIE5vdGUgdGhhdCB0aGUgb3JkZXIgb2YgdGhlIG91dHB1dCBhcnJheSBpcyBub3QgZ3VhcmFudGVlZCB0byBiZVxuICAgICAqIGNvbnNpc3RlbnQgYWNyb3NzIGRpZmZlcmVudCBKUyBwbGF0Zm9ybXMuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcge2s6IHZ9IC0+IFt2XVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBleHRyYWN0IHZhbHVlcyBmcm9tXG4gICAgICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIHRoZSB2YWx1ZXMgb2YgdGhlIG9iamVjdCdzIG93biBhbmQgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIEYgPSBmdW5jdGlvbigpIHsgdGhpcy54ID0gJ1gnOyB9O1xuICAgICAqICAgICAgRi5wcm90b3R5cGUueSA9ICdZJztcbiAgICAgKiAgICAgIHZhciBmID0gbmV3IEYoKTtcbiAgICAgKiAgICAgIFIudmFsdWVzSW4oZik7IC8vPT4gWydYJywgJ1knXVxuICAgICAqL1xuICAgIHZhciB2YWx1ZXNJbiA9IF9jdXJyeTEoZnVuY3Rpb24gdmFsdWVzSW4ob2JqKSB7XG4gICAgICAgIHZhciBwcm9wLCB2cyA9IFtdO1xuICAgICAgICBmb3IgKHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICB2c1t2cy5sZW5ndGhdID0gb2JqW3Byb3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2cztcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBcInZpZXdcIiBvZiB0aGUgZ2l2ZW4gZGF0YSBzdHJ1Y3R1cmUsIGRldGVybWluZWQgYnkgdGhlIGdpdmVuIGxlbnMuXG4gICAgICogVGhlIGxlbnMncyBmb2N1cyBkZXRlcm1pbmVzIHdoaWNoIHBvcnRpb24gb2YgdGhlIGRhdGEgc3RydWN0dXJlIGlzIHZpc2libGUuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEB0eXBlZGVmIExlbnMgcyBhID0gRnVuY3RvciBmID0+IChhIC0+IGYgYSkgLT4gcyAtPiBmIHNcbiAgICAgKiBAc2lnIExlbnMgcyBhIC0+IHMgLT4gYVxuICAgICAqIEBwYXJhbSB7TGVuc30gbGVuc1xuICAgICAqIEBwYXJhbSB7Kn0geFxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICogQHNlZSBSLnByb3AsIFIubGVuc0luZGV4LCBSLmxlbnNQcm9wXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHhMZW5zID0gUi5sZW5zUHJvcCgneCcpO1xuICAgICAqXG4gICAgICogICAgICBSLnZpZXcoeExlbnMsIHt4OiAxLCB5OiAyfSk7ICAvLz0+IDFcbiAgICAgKiAgICAgIFIudmlldyh4TGVucywge3g6IDQsIHk6IDJ9KTsgIC8vPT4gNFxuICAgICAqL1xuICAgIHZhciB2aWV3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgQ29uc3QgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogeCxcbiAgICAgICAgICAgICAgICBtYXA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gdmlldyhsZW5zLCB4KSB7XG4gICAgICAgICAgICByZXR1cm4gbGVucyhDb25zdCkoeCkudmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH0oKTtcblxuICAgIC8qKlxuICAgICAqIFRha2VzIGEgc3BlYyBvYmplY3QgYW5kIGEgdGVzdCBvYmplY3Q7IHJldHVybnMgdHJ1ZSBpZiB0aGUgdGVzdCBzYXRpc2ZpZXNcbiAgICAgKiB0aGUgc3BlYy4gRWFjaCBvZiB0aGUgc3BlYydzIG93biBwcm9wZXJ0aWVzIG11c3QgYmUgYSBwcmVkaWNhdGUgZnVuY3Rpb24uXG4gICAgICogRWFjaCBwcmVkaWNhdGUgaXMgYXBwbGllZCB0byB0aGUgdmFsdWUgb2YgdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgb2ZcbiAgICAgKiB0aGUgdGVzdCBvYmplY3QuIGB3aGVyZWAgcmV0dXJucyB0cnVlIGlmIGFsbCB0aGUgcHJlZGljYXRlcyByZXR1cm4gdHJ1ZSxcbiAgICAgKiBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBgd2hlcmVgIGlzIHdlbGwgc3VpdGVkIHRvIGRlY2xhcmF0aXZlbHkgZXhwcmVzc2luZyBjb25zdHJhaW50cyBmb3Igb3RoZXJcbiAgICAgKiBmdW5jdGlvbnMgc3VjaCBhcyBgZmlsdGVyYCBhbmQgYGZpbmRgLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIHtTdHJpbmc6ICgqIC0+IEJvb2xlYW4pfSAtPiB7U3RyaW5nOiAqfSAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNwZWNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdGVzdE9ialxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgLy8gcHJlZCA6OiBPYmplY3QgLT4gQm9vbGVhblxuICAgICAqICAgICAgdmFyIHByZWQgPSBSLndoZXJlKHtcbiAgICAgKiAgICAgICAgYTogUi5lcXVhbHMoJ2ZvbycpLFxuICAgICAqICAgICAgICBiOiBSLmNvbXBsZW1lbnQoUi5lcXVhbHMoJ2JhcicpKSxcbiAgICAgKiAgICAgICAgeDogUi5ndChfLCAxMCksXG4gICAgICogICAgICAgIHk6IFIubHQoXywgMjApXG4gICAgICogICAgICB9KTtcbiAgICAgKlxuICAgICAqICAgICAgcHJlZCh7YTogJ2ZvbycsIGI6ICd4eHgnLCB4OiAxMSwgeTogMTl9KTsgLy89PiB0cnVlXG4gICAgICogICAgICBwcmVkKHthOiAneHh4JywgYjogJ3h4eCcsIHg6IDExLCB5OiAxOX0pOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBwcmVkKHthOiAnZm9vJywgYjogJ2JhcicsIHg6IDExLCB5OiAxOX0pOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBwcmVkKHthOiAnZm9vJywgYjogJ3h4eCcsIHg6IDEwLCB5OiAxOX0pOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBwcmVkKHthOiAnZm9vJywgYjogJ3h4eCcsIHg6IDExLCB5OiAyMH0pOyAvLz0+IGZhbHNlXG4gICAgICovXG4gICAgdmFyIHdoZXJlID0gX2N1cnJ5MihmdW5jdGlvbiB3aGVyZShzcGVjLCB0ZXN0T2JqKSB7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gc3BlYykge1xuICAgICAgICAgICAgaWYgKF9oYXMocHJvcCwgc3BlYykgJiYgIXNwZWNbcHJvcF0odGVzdE9ialtwcm9wXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBXcmFwIGEgZnVuY3Rpb24gaW5zaWRlIGFub3RoZXIgdG8gYWxsb3cgeW91IHRvIG1ha2UgYWRqdXN0bWVudHMgdG8gdGhlIHBhcmFtZXRlcnMsIG9yIGRvXG4gICAgICogb3RoZXIgcHJvY2Vzc2luZyBlaXRoZXIgYmVmb3JlIHRoZSBpbnRlcm5hbCBmdW5jdGlvbiBpcyBjYWxsZWQgb3Igd2l0aCBpdHMgcmVzdWx0cy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIChhLi4uIC0+IGIpIC0+ICgoYS4uLiAtPiBiKSAtPiBhLi4uIC0+IGMpIC0+IChhLi4uIC0+IGMpXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gd3JhcHBlciBUaGUgd3JhcHBlciBmdW5jdGlvbi5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIHdyYXBwZWQgZnVuY3Rpb24uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGdyZWV0ID0gZnVuY3Rpb24obmFtZSkge3JldHVybiAnSGVsbG8gJyArIG5hbWU7fTtcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHNob3V0ZWRHcmVldCA9IFIud3JhcChncmVldCwgZnVuY3Rpb24oZ3IsIG5hbWUpIHtcbiAgICAgKiAgICAgICAgcmV0dXJuIGdyKG5hbWUpLnRvVXBwZXJDYXNlKCk7XG4gICAgICogICAgICB9KTtcbiAgICAgKiAgICAgIHNob3V0ZWRHcmVldChcIkthdGh5XCIpOyAvLz0+IFwiSEVMTE8gS0FUSFlcIlxuICAgICAqXG4gICAgICogICAgICB2YXIgc2hvcnRlbmVkR3JlZXQgPSBSLndyYXAoZ3JlZXQsIGZ1bmN0aW9uKGdyLCBuYW1lKSB7XG4gICAgICogICAgICAgIHJldHVybiBncihuYW1lLnN1YnN0cmluZygwLCAzKSk7XG4gICAgICogICAgICB9KTtcbiAgICAgKiAgICAgIHNob3J0ZW5lZEdyZWV0KFwiUm9iZXJ0XCIpOyAvLz0+IFwiSGVsbG8gUm9iXCJcbiAgICAgKi9cbiAgICB2YXIgd3JhcCA9IF9jdXJyeTIoZnVuY3Rpb24gd3JhcChmbiwgd3JhcHBlcikge1xuICAgICAgICByZXR1cm4gY3VycnlOKGZuLmxlbmd0aCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdyYXBwZXIuYXBwbHkodGhpcywgX2NvbmNhdChbZm5dLCBhcmd1bWVudHMpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGxpc3Qgb3V0IG9mIHRoZSB0d28gc3VwcGxpZWQgYnkgY3JlYXRpbmcgZWFjaCBwb3NzaWJsZVxuICAgICAqIHBhaXIgZnJvbSB0aGUgbGlzdHMuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIFthXSAtPiBbYl0gLT4gW1thLGJdXVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFzIFRoZSBmaXJzdCBsaXN0LlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGJzIFRoZSBzZWNvbmQgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3QgbWFkZSBieSBjb21iaW5pbmcgZWFjaCBwb3NzaWJsZSBwYWlyIGZyb21cbiAgICAgKiAgICAgICAgIGBhc2AgYW5kIGBic2AgaW50byBwYWlycyAoYFthLCBiXWApLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIueHByb2QoWzEsIDJdLCBbJ2EnLCAnYiddKTsgLy89PiBbWzEsICdhJ10sIFsxLCAnYiddLCBbMiwgJ2EnXSwgWzIsICdiJ11dXG4gICAgICovXG4gICAgLy8gPSB4cHJvZFdpdGgocHJlcGVuZCk7ICh0YWtlcyBhYm91dCAzIHRpbWVzIGFzIGxvbmcuLi4pXG4gICAgdmFyIHhwcm9kID0gX2N1cnJ5MihmdW5jdGlvbiB4cHJvZChhLCBiKSB7XG4gICAgICAgIC8vID0geHByb2RXaXRoKHByZXBlbmQpOyAodGFrZXMgYWJvdXQgMyB0aW1lcyBhcyBsb25nLi4uKVxuICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgdmFyIGlsZW4gPSBhLmxlbmd0aDtcbiAgICAgICAgdmFyIGo7XG4gICAgICAgIHZhciBqbGVuID0gYi5sZW5ndGg7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGlsZW4pIHtcbiAgICAgICAgICAgIGogPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGogPCBqbGVuKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gW1xuICAgICAgICAgICAgICAgICAgICBhW2lkeF0sXG4gICAgICAgICAgICAgICAgICAgIGJbal1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGogKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGxpc3Qgb3V0IG9mIHRoZSB0d28gc3VwcGxpZWQgYnkgcGFpcmluZyB1cFxuICAgICAqIGVxdWFsbHktcG9zaXRpb25lZCBpdGVtcyBmcm9tIGJvdGggbGlzdHMuICBUaGUgcmV0dXJuZWQgbGlzdCBpc1xuICAgICAqIHRydW5jYXRlZCB0byB0aGUgbGVuZ3RoIG9mIHRoZSBzaG9ydGVyIG9mIHRoZSB0d28gaW5wdXQgbGlzdHMuXG4gICAgICogTm90ZTogYHppcGAgaXMgZXF1aXZhbGVudCB0byBgemlwV2l0aChmdW5jdGlvbihhLCBiKSB7IHJldHVybiBbYSwgYl0gfSlgLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBbYV0gLT4gW2JdIC0+IFtbYSxiXV1cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0MSBUaGUgZmlyc3QgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdDIgVGhlIHNlY29uZCBhcnJheSB0byBjb25zaWRlci5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3QgbWFkZSBieSBwYWlyaW5nIHVwIHNhbWUtaW5kZXhlZCBlbGVtZW50cyBvZiBgbGlzdDFgIGFuZCBgbGlzdDJgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuemlwKFsxLCAyLCAzXSwgWydhJywgJ2InLCAnYyddKTsgLy89PiBbWzEsICdhJ10sIFsyLCAnYiddLCBbMywgJ2MnXV1cbiAgICAgKi9cbiAgICB2YXIgemlwID0gX2N1cnJ5MihmdW5jdGlvbiB6aXAoYSwgYikge1xuICAgICAgICB2YXIgcnYgPSBbXTtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHZhciBsZW4gPSBNYXRoLm1pbihhLmxlbmd0aCwgYi5sZW5ndGgpO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBydltpZHhdID0gW1xuICAgICAgICAgICAgICAgIGFbaWR4XSxcbiAgICAgICAgICAgICAgICBiW2lkeF1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcnY7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IG9iamVjdCBvdXQgb2YgYSBsaXN0IG9mIGtleXMgYW5kIGEgbGlzdCBvZiB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIFtTdHJpbmddIC0+IFsqXSAtPiB7U3RyaW5nOiAqfVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGtleXMgVGhlIGFycmF5IHRoYXQgd2lsbCBiZSBwcm9wZXJ0aWVzIG9uIHRoZSBvdXRwdXQgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgbGlzdCBvZiB2YWx1ZXMgb24gdGhlIG91dHB1dCBvYmplY3QuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgb2JqZWN0IG1hZGUgYnkgcGFpcmluZyB1cCBzYW1lLWluZGV4ZWQgZWxlbWVudHMgb2YgYGtleXNgIGFuZCBgdmFsdWVzYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnppcE9iaihbJ2EnLCAnYicsICdjJ10sIFsxLCAyLCAzXSk7IC8vPT4ge2E6IDEsIGI6IDIsIGM6IDN9XG4gICAgICovXG4gICAgdmFyIHppcE9iaiA9IF9jdXJyeTIoZnVuY3Rpb24gemlwT2JqKGtleXMsIHZhbHVlcykge1xuICAgICAgICB2YXIgaWR4ID0gMCwgbGVuID0ga2V5cy5sZW5ndGgsIG91dCA9IHt9O1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBvdXRba2V5c1tpZHhdXSA9IHZhbHVlc1tpZHhdO1xuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgbGlzdCBvdXQgb2YgdGhlIHR3byBzdXBwbGllZCBieSBhcHBseWluZyB0aGUgZnVuY3Rpb24gdG9cbiAgICAgKiBlYWNoIGVxdWFsbHktcG9zaXRpb25lZCBwYWlyIGluIHRoZSBsaXN0cy4gVGhlIHJldHVybmVkIGxpc3QgaXNcbiAgICAgKiB0cnVuY2F0ZWQgdG8gdGhlIGxlbmd0aCBvZiB0aGUgc2hvcnRlciBvZiB0aGUgdHdvIGlucHV0IGxpc3RzLlxuICAgICAqXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEsYiAtPiBjKSAtPiBbYV0gLT4gW2JdIC0+IFtjXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB1c2VkIHRvIGNvbWJpbmUgdGhlIHR3byBlbGVtZW50cyBpbnRvIG9uZSB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0MSBUaGUgZmlyc3QgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdDIgVGhlIHNlY29uZCBhcnJheSB0byBjb25zaWRlci5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3QgbWFkZSBieSBjb21iaW5pbmcgc2FtZS1pbmRleGVkIGVsZW1lbnRzIG9mIGBsaXN0MWAgYW5kIGBsaXN0MmBcbiAgICAgKiAgICAgICAgIHVzaW5nIGBmbmAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGYgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICogICAgICAgIC8vIC4uLlxuICAgICAqICAgICAgfTtcbiAgICAgKiAgICAgIFIuemlwV2l0aChmLCBbMSwgMiwgM10sIFsnYScsICdiJywgJ2MnXSk7XG4gICAgICogICAgICAvLz0+IFtmKDEsICdhJyksIGYoMiwgJ2InKSwgZigzLCAnYycpXVxuICAgICAqL1xuICAgIHZhciB6aXBXaXRoID0gX2N1cnJ5MyhmdW5jdGlvbiB6aXBXaXRoKGZuLCBhLCBiKSB7XG4gICAgICAgIHZhciBydiA9IFtdLCBpZHggPSAwLCBsZW4gPSBNYXRoLm1pbihhLmxlbmd0aCwgYi5sZW5ndGgpO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBydltpZHhdID0gZm4oYVtpZHhdLCBiW2lkeF0pO1xuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJ2O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQSBmdW5jdGlvbiB0aGF0IGFsd2F5cyByZXR1cm5zIGBmYWxzZWAuIEFueSBwYXNzZWQgaW4gcGFyYW1ldGVycyBhcmUgaWdub3JlZC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnICogLT4gZmFsc2VcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBmYWxzZVxuICAgICAqIEBzZWUgUi5hbHdheXMsIFIuVFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuRigpOyAvLz0+IGZhbHNlXG4gICAgICovXG4gICAgdmFyIEYgPSBhbHdheXMoZmFsc2UpO1xuXG4gICAgLyoqXG4gICAgICogQSBmdW5jdGlvbiB0aGF0IGFsd2F5cyByZXR1cm5zIGB0cnVlYC4gQW55IHBhc3NlZCBpbiBwYXJhbWV0ZXJzIGFyZSBpZ25vcmVkLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKiAtPiB0cnVlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgLlxuICAgICAqIEBzZWUgUi5hbHdheXMsIFIuRlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuVCgpOyAvLz0+IHRydWVcbiAgICAgKi9cbiAgICB2YXIgVCA9IGFsd2F5cyh0cnVlKTtcblxuICAgIC8qKlxuICAgICAqIFNpbWlsYXIgdG8gaGFzTWV0aG9kLCB0aGlzIGNoZWNrcyB3aGV0aGVyIGEgZnVuY3Rpb24gaGFzIGEgW21ldGhvZG5hbWVdXG4gICAgICogZnVuY3Rpb24uIElmIGl0IGlzbid0IGFuIGFycmF5IGl0IHdpbGwgZXhlY3V0ZSB0aGF0IGZ1bmN0aW9uIG90aGVyd2lzZSBpdCB3aWxsXG4gICAgICogZGVmYXVsdCB0byB0aGUgcmFtZGEgaW1wbGVtZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIHJhbWRhIGltcGxlbXRhdGlvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RuYW1lIHByb3BlcnR5IHRvIGNoZWNrIGZvciBhIGN1c3RvbSBpbXBsZW1lbnRhdGlvblxuICAgICAqIEByZXR1cm4ge09iamVjdH0gV2hhdGV2ZXIgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgbWV0aG9kIGlzLlxuICAgICAqL1xuICAgIHZhciBfY2hlY2tGb3JNZXRob2QgPSBmdW5jdGlvbiBfY2hlY2tGb3JNZXRob2QobWV0aG9kbmFtZSwgZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9iaiA9IGFyZ3VtZW50c1tsZW5ndGggLSAxXTtcbiAgICAgICAgICAgIHJldHVybiBfaXNBcnJheShvYmopIHx8IHR5cGVvZiBvYmpbbWV0aG9kbmFtZV0gIT09ICdmdW5jdGlvbicgPyBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDogb2JqW21ldGhvZG5hbWVdLmFwcGx5KG9iaiwgX3NsaWNlKGFyZ3VtZW50cywgMCwgbGVuZ3RoIC0gMSkpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb3BpZXMgYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBiZSBjb3BpZWRcbiAgICAgKiBAcGFyYW0ge0FycmF5fSByZWZGcm9tIEFycmF5IGNvbnRhaW5pbmcgdGhlIHNvdXJjZSByZWZlcmVuY2VzXG4gICAgICogQHBhcmFtIHtBcnJheX0gcmVmVG8gQXJyYXkgY29udGFpbmluZyB0aGUgY29waWVkIHNvdXJjZSByZWZlcmVuY2VzXG4gICAgICogQHJldHVybiB7Kn0gVGhlIGNvcGllZCB2YWx1ZS5cbiAgICAgKi9cbiAgICB2YXIgX2Nsb25lID0gZnVuY3Rpb24gX2Nsb25lKHZhbHVlLCByZWZGcm9tLCByZWZUbykge1xuICAgICAgICB2YXIgY29weSA9IGZ1bmN0aW9uIGNvcHkoY29waWVkVmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBsZW4gPSByZWZGcm9tLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gcmVmRnJvbVtpZHhdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWZUb1tpZHhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlZkZyb21baWR4ICsgMV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJlZlRvW2lkeCArIDFdID0gY29waWVkVmFsdWU7XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb3BpZWRWYWx1ZVtrZXldID0gX2Nsb25lKHZhbHVlW2tleV0sIHJlZkZyb20sIHJlZlRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb3BpZWRWYWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgc3dpdGNoICh0eXBlKHZhbHVlKSkge1xuICAgICAgICBjYXNlICdPYmplY3QnOlxuICAgICAgICAgICAgcmV0dXJuIGNvcHkoe30pO1xuICAgICAgICBjYXNlICdBcnJheSc6XG4gICAgICAgICAgICByZXR1cm4gY29weShbXSk7XG4gICAgICAgIGNhc2UgJ0RhdGUnOlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgICAgY2FzZSAnUmVnRXhwJzpcbiAgICAgICAgICAgIHJldHVybiBfY2xvbmVSZWdFeHAodmFsdWUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBfY3JlYXRlUGFydGlhbEFwcGxpY2F0b3IgPSBmdW5jdGlvbiBfY3JlYXRlUGFydGlhbEFwcGxpY2F0b3IoY29uY2F0KSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gX3NsaWNlKGFyZ3VtZW50cywgMSk7XG4gICAgICAgICAgICByZXR1cm4gX2FyaXR5KE1hdGgubWF4KDAsIGZuLmxlbmd0aCAtIGFyZ3MubGVuZ3RoKSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBjb25jYXQoYXJncywgYXJndW1lbnRzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgZGlzcGF0Y2hlcyB3aXRoIGRpZmZlcmVudCBzdHJhdGVnaWVzIGJhc2VkIG9uIHRoZVxuICAgICAqIG9iamVjdCBpbiBsaXN0IHBvc2l0aW9uIChsYXN0IGFyZ3VtZW50KS4gSWYgaXQgaXMgYW4gYXJyYXksIGV4ZWN1dGVzIFtmbl0uXG4gICAgICogT3RoZXJ3aXNlLCBpZiBpdCBoYXMgYSAgZnVuY3Rpb24gd2l0aCBbbWV0aG9kbmFtZV0sIGl0IHdpbGwgZXhlY3V0ZSB0aGF0XG4gICAgICogZnVuY3Rpb24gKGZ1bmN0b3IgY2FzZSkuIE90aGVyd2lzZSwgaWYgaXQgaXMgYSB0cmFuc2Zvcm1lciwgdXNlcyB0cmFuc2R1Y2VyXG4gICAgICogW3hmXSB0byByZXR1cm4gYSBuZXcgdHJhbnNmb3JtZXIgKHRyYW5zZHVjZXIgY2FzZSkuIE90aGVyd2lzZSwgaXQgd2lsbFxuICAgICAqIGRlZmF1bHQgdG8gZXhlY3V0aW5nIFtmbl0uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RuYW1lIHByb3BlcnR5IHRvIGNoZWNrIGZvciBhIGN1c3RvbSBpbXBsZW1lbnRhdGlvblxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHhmIHRyYW5zZHVjZXIgdG8gaW5pdGlhbGl6ZSBpZiBvYmplY3QgaXMgdHJhbnNmb3JtZXJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBkZWZhdWx0IHJhbWRhIGltcGxlbWVudGF0aW9uXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCBkaXNwYXRjaGVzIG9uIG9iamVjdCBpbiBsaXN0IHBvc2l0aW9uXG4gICAgICovXG4gICAgdmFyIF9kaXNwYXRjaGFibGUgPSBmdW5jdGlvbiBfZGlzcGF0Y2hhYmxlKG1ldGhvZG5hbWUsIHhmLCBmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICBpZiAobGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgb2JqID0gYXJndW1lbnRzW2xlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKCFfaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBfc2xpY2UoYXJndW1lbnRzLCAwLCBsZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialttZXRob2RuYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqW21ldGhvZG5hbWVdLmFwcGx5KG9iaiwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChfaXNUcmFuc2Zvcm1lcihvYmopKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2R1Y2VyID0geGYuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2R1Y2VyKG9iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIC8vIFRoZSBhbGdvcml0aG0gdXNlZCB0byBoYW5kbGUgY3ljbGljIHN0cnVjdHVyZXMgaXNcbiAgICAvLyBpbnNwaXJlZCBieSB1bmRlcnNjb3JlJ3MgaXNFcXVhbFxuICAgIC8vIFJlZ0V4cCBlcXVhbGl0eSBhbGdvcml0aG06IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEwNzc2NjM1XG4gICAgdmFyIF9lcXVhbHMgPSBmdW5jdGlvbiBfZXF1YWxzKGEsIGIsIHN0YWNrQSwgc3RhY2tCKSB7XG4gICAgICAgIHZhciB0eXBlQSA9IHR5cGUoYSk7XG4gICAgICAgIGlmICh0eXBlQSAhPT0gdHlwZShiKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlQSA9PT0gJ0Jvb2xlYW4nIHx8IHR5cGVBID09PSAnTnVtYmVyJyB8fCB0eXBlQSA9PT0gJ1N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgYSA9PT0gJ29iamVjdCcgPyB0eXBlb2YgYiA9PT0gJ29iamVjdCcgJiYgaWRlbnRpY2FsKGEudmFsdWVPZigpLCBiLnZhbHVlT2YoKSkgOiBpZGVudGljYWwoYSwgYik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlkZW50aWNhbChhLCBiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVBID09PSAnUmVnRXhwJykge1xuICAgICAgICAgICAgLy8gUmVnRXhwIGVxdWFsaXR5IGFsZ29yaXRobTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTA3NzY2MzVcbiAgICAgICAgICAgIHJldHVybiBhLnNvdXJjZSA9PT0gYi5zb3VyY2UgJiYgYS5nbG9iYWwgPT09IGIuZ2xvYmFsICYmIGEuaWdub3JlQ2FzZSA9PT0gYi5pZ25vcmVDYXNlICYmIGEubXVsdGlsaW5lID09PSBiLm11bHRpbGluZSAmJiBhLnN0aWNreSA9PT0gYi5zdGlja3kgJiYgYS51bmljb2RlID09PSBiLnVuaWNvZGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE9iamVjdChhKSA9PT0gYSkge1xuICAgICAgICAgICAgaWYgKHR5cGVBID09PSAnRGF0ZScgJiYgYS5nZXRUaW1lKCkgIT09IGIuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGtleXNBID0ga2V5cyhhKTtcbiAgICAgICAgICAgIGlmIChrZXlzQS5sZW5ndGggIT09IGtleXMoYikubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGlkeCA9IHN0YWNrQS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgd2hpbGUgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YWNrQVtpZHhdID09PSBhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGFja0JbaWR4XSA9PT0gYjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWR4IC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGFja0Fbc3RhY2tBLmxlbmd0aF0gPSBhO1xuICAgICAgICAgICAgc3RhY2tCW3N0YWNrQi5sZW5ndGhdID0gYjtcbiAgICAgICAgICAgIGlkeCA9IGtleXNBLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5c0FbaWR4XTtcbiAgICAgICAgICAgICAgICBpZiAoIV9oYXMoa2V5LCBiKSB8fCAhX2VxdWFscyhiW2tleV0sIGFba2V5XSwgc3RhY2tBLCBzdGFja0IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWR4IC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGFja0EucG9wKCk7XG4gICAgICAgICAgICBzdGFja0IucG9wKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IGEgcHJvdmlkZWQgb2JqZWN0IGhhcyBhIGdpdmVuIG1ldGhvZC5cbiAgICAgKiBEb2VzIG5vdCBpZ25vcmUgbWV0aG9kcyBzdG9yZWQgb24gdGhlIG9iamVjdCdzIHByb3RvdHlwZSBjaGFpbi4gVXNlZCBmb3IgZHluYW1pY2FsbHlcbiAgICAgKiBkaXNwYXRjaGluZyBSYW1kYSBtZXRob2RzIHRvIG5vbi1BcnJheSBvYmplY3RzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kTmFtZSBUaGUgbmFtZSBvZiB0aGUgbWV0aG9kIHRvIGNoZWNrIGZvci5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gdGVzdC5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaGFzIGEgZ2l2ZW4gbWV0aG9kLCBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgcGVyc29uID0geyBuYW1lOiAnSm9obicgfTtcbiAgICAgKiAgICAgIHBlcnNvbi5zaG91dCA9IGZ1bmN0aW9uKCkgeyBhbGVydCh0aGlzLm5hbWUpOyB9O1xuICAgICAqXG4gICAgICogICAgICBfaGFzTWV0aG9kKCdzaG91dCcsIHBlcnNvbik7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgX2hhc01ldGhvZCgnZm9vJywgcGVyc29uKTsgLy89PiBmYWxzZVxuICAgICAqL1xuICAgIHZhciBfaGFzTWV0aG9kID0gZnVuY3Rpb24gX2hhc01ldGhvZChtZXRob2ROYW1lLCBvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAhPSBudWxsICYmICFfaXNBcnJheShvYmopICYmIHR5cGVvZiBvYmpbbWV0aG9kTmFtZV0gPT09ICdmdW5jdGlvbic7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGBfbWFrZUZsYXRgIGlzIGEgaGVscGVyIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIG9uZS1sZXZlbCBvciBmdWxseSByZWN1cnNpdmUgZnVuY3Rpb25cbiAgICAgKiBiYXNlZCBvbiB0aGUgZmxhZyBwYXNzZWQgaW4uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHZhciBfbWFrZUZsYXQgPSBmdW5jdGlvbiBfbWFrZUZsYXQocmVjdXJzaXZlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBmbGF0dChsaXN0KSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUsIHJlc3VsdCA9IFtdLCBpZHggPSAwLCBqLCBpbGVuID0gbGlzdC5sZW5ndGgsIGpsZW47XG4gICAgICAgICAgICB3aGlsZSAoaWR4IDwgaWxlbikge1xuICAgICAgICAgICAgICAgIGlmIChpc0FycmF5TGlrZShsaXN0W2lkeF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcmVjdXJzaXZlID8gZmxhdHQobGlzdFtpZHhdKSA6IGxpc3RbaWR4XTtcbiAgICAgICAgICAgICAgICAgICAgaiA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGpsZW4gPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChqIDwgamxlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gdmFsdWVbal07XG4gICAgICAgICAgICAgICAgICAgICAgICBqICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBsaXN0W2lkeF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIF9yZWR1Y2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIF9hcnJheVJlZHVjZSh4ZiwgYWNjLCBsaXN0KSB7XG4gICAgICAgICAgICB2YXIgaWR4ID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgYWNjID0geGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10oYWNjLCBsaXN0W2lkeF0pO1xuICAgICAgICAgICAgICAgIGlmIChhY2MgJiYgYWNjWydAQHRyYW5zZHVjZXIvcmVkdWNlZCddKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYyA9IGFjY1snQEB0cmFuc2R1Y2VyL3ZhbHVlJ107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB4ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKGFjYyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2l0ZXJhYmxlUmVkdWNlKHhmLCBhY2MsIGl0ZXIpIHtcbiAgICAgICAgICAgIHZhciBzdGVwID0gaXRlci5uZXh0KCk7XG4gICAgICAgICAgICB3aGlsZSAoIXN0ZXAuZG9uZSkge1xuICAgICAgICAgICAgICAgIGFjYyA9IHhmWydAQHRyYW5zZHVjZXIvc3RlcCddKGFjYywgc3RlcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGFjYyAmJiBhY2NbJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjID0gYWNjWydAQHRyYW5zZHVjZXIvdmFsdWUnXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0ZXAgPSBpdGVyLm5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB4ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKGFjYyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX21ldGhvZFJlZHVjZSh4ZiwgYWNjLCBvYmopIHtcbiAgICAgICAgICAgIHJldHVybiB4ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKG9iai5yZWR1Y2UoYmluZCh4ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSwgeGYpLCBhY2MpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3ltSXRlcmF0b3IgPSB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyA/IFN5bWJvbC5pdGVyYXRvciA6ICdAQGl0ZXJhdG9yJztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIF9yZWR1Y2UoZm4sIGFjYywgbGlzdCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGZuID0gX3h3cmFwKGZuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0FycmF5TGlrZShsaXN0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfYXJyYXlSZWR1Y2UoZm4sIGFjYywgbGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGxpc3QucmVkdWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9tZXRob2RSZWR1Y2UoZm4sIGFjYywgbGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGlzdFtzeW1JdGVyYXRvcl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfaXRlcmFibGVSZWR1Y2UoZm4sIGFjYywgbGlzdFtzeW1JdGVyYXRvcl0oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGxpc3QubmV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBfaXRlcmFibGVSZWR1Y2UoZm4sIGFjYywgbGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdyZWR1Y2U6IGxpc3QgbXVzdCBiZSBhcnJheSBvciBpdGVyYWJsZScpO1xuICAgICAgICB9O1xuICAgIH0oKTtcblxuICAgIHZhciBfc3RlcENhdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9zdGVwQ2F0QXJyYXkgPSB7XG4gICAgICAgICAgICAnQEB0cmFuc2R1Y2VyL2luaXQnOiBBcnJheSxcbiAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvc3RlcCc6IGZ1bmN0aW9uICh4cywgeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29uY2F0KHhzLCBbeF0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvcmVzdWx0JzogX2lkZW50aXR5XG4gICAgICAgIH07XG4gICAgICAgIHZhciBfc3RlcENhdFN0cmluZyA9IHtcbiAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvaW5pdCc6IFN0cmluZyxcbiAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvc3RlcCc6IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvcmVzdWx0JzogX2lkZW50aXR5XG4gICAgICAgIH07XG4gICAgICAgIHZhciBfc3RlcENhdE9iamVjdCA9IHtcbiAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvaW5pdCc6IE9iamVjdCxcbiAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvc3RlcCc6IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lcmdlKHJlc3VsdCwgaXNBcnJheUxpa2UoaW5wdXQpID8gY3JlYXRlTWFwRW50cnkoaW5wdXRbMF0sIGlucHV0WzFdKSA6IGlucHV0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnQEB0cmFuc2R1Y2VyL3Jlc3VsdCc6IF9pZGVudGl0eVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gX3N0ZXBDYXQob2JqKSB7XG4gICAgICAgICAgICBpZiAoX2lzVHJhbnNmb3JtZXIob2JqKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNBcnJheUxpa2Uob2JqKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfc3RlcENhdEFycmF5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zdGVwQ2F0U3RyaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zdGVwQ2F0T2JqZWN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY3JlYXRlIHRyYW5zZm9ybWVyIGZvciAnICsgb2JqKTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG5cbiAgICB2YXIgX3hhbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFhBbGwoZiwgeGYpIHtcbiAgICAgICAgICAgIHRoaXMueGYgPSB4ZjtcbiAgICAgICAgICAgIHRoaXMuZiA9IGY7XG4gICAgICAgICAgICB0aGlzLmFsbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgWEFsbC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gICAgICAgIFhBbGwucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIFhBbGwucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5mKGlucHV0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gX3JlZHVjZWQodGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGZhbHNlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeGFsbChmLCB4Zikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYQWxsKGYsIHhmKTtcbiAgICAgICAgfSk7XG4gICAgfSgpO1xuXG4gICAgdmFyIF94YW55ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBYQW55KGYsIHhmKSB7XG4gICAgICAgICAgICB0aGlzLnhmID0geGY7XG4gICAgICAgICAgICB0aGlzLmYgPSBmO1xuICAgICAgICAgICAgdGhpcy5hbnkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBYQW55LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgICAgICAgWEFueS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5hbnkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICAgICAgICB9O1xuICAgICAgICBYQW55LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mKGlucHV0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW55ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBfcmVkdWNlZCh0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgdHJ1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gX3hhbnkoZiwgeGYpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgWEFueShmLCB4Zik7XG4gICAgICAgIH0pO1xuICAgIH0oKTtcblxuICAgIHZhciBfeGRyb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFhEcm9wKG4sIHhmKSB7XG4gICAgICAgICAgICB0aGlzLnhmID0geGY7XG4gICAgICAgICAgICB0aGlzLm4gPSBuO1xuICAgICAgICB9XG4gICAgICAgIFhEcm9wLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgICAgICAgWERyb3AucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBfeGZCYXNlLnJlc3VsdDtcbiAgICAgICAgWERyb3AucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm4gPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uIC09IDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeGRyb3AobiwgeGYpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgWERyb3AobiwgeGYpO1xuICAgICAgICB9KTtcbiAgICB9KCk7XG5cbiAgICB2YXIgX3hkcm9wV2hpbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFhEcm9wV2hpbGUoZiwgeGYpIHtcbiAgICAgICAgICAgIHRoaXMueGYgPSB4ZjtcbiAgICAgICAgICAgIHRoaXMuZiA9IGY7XG4gICAgICAgIH1cbiAgICAgICAgWERyb3BXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gICAgICAgIFhEcm9wV2hpbGUucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBfeGZCYXNlLnJlc3VsdDtcbiAgICAgICAgWERyb3BXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmYoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZiA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gX3hkcm9wV2hpbGUoZiwgeGYpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgWERyb3BXaGlsZShmLCB4Zik7XG4gICAgICAgIH0pO1xuICAgIH0oKTtcblxuICAgIHZhciBfeGdyb3VwQnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFhHcm91cEJ5KGYsIHhmKSB7XG4gICAgICAgICAgICB0aGlzLnhmID0geGY7XG4gICAgICAgICAgICB0aGlzLmYgPSBmO1xuICAgICAgICAgICAgdGhpcy5pbnB1dHMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBYR3JvdXBCeS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gICAgICAgIFhHcm91cEJ5LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgdmFyIGtleTtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIHRoaXMuaW5wdXRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9oYXMoa2V5LCB0aGlzLmlucHV0cykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIHRoaXMuaW5wdXRzW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0WydAQHRyYW5zZHVjZXIvcmVkdWNlZCddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHRbJ0BAdHJhbnNkdWNlci92YWx1ZSddO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIFhHcm91cEJ5LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gdGhpcy5mKGlucHV0KTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRzW2tleV0gPSB0aGlzLmlucHV0c1trZXldIHx8IFtcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgW11cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICB0aGlzLmlucHV0c1trZXldWzFdID0gYXBwZW5kKGlucHV0LCB0aGlzLmlucHV0c1trZXldWzFdKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIF94Z3JvdXBCeShmLCB4Zikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYR3JvdXBCeShmLCB4Zik7XG4gICAgICAgIH0pO1xuICAgIH0oKTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgbGlzdCBpdGVyYXRpb24gZnVuY3Rpb24gZnJvbSBhbiBleGlzdGluZyBvbmUgYnkgYWRkaW5nIHR3byBuZXcgcGFyYW1ldGVyc1xuICAgICAqIHRvIGl0cyBjYWxsYmFjayBmdW5jdGlvbjogdGhlIGN1cnJlbnQgaW5kZXgsIGFuZCB0aGUgZW50aXJlIGxpc3QuXG4gICAgICpcbiAgICAgKiBUaGlzIHdvdWxkIHR1cm4sIGZvciBpbnN0YW5jZSwgUmFtZGEncyBzaW1wbGUgYG1hcGAgZnVuY3Rpb24gaW50byBvbmUgdGhhdCBtb3JlIGNsb3NlbHlcbiAgICAgKiByZXNlbWJsZXMgYEFycmF5LnByb3RvdHlwZS5tYXBgLiAgTm90ZSB0aGF0IHRoaXMgd2lsbCBvbmx5IHdvcmsgZm9yIGZ1bmN0aW9ucyBpbiB3aGljaFxuICAgICAqIHRoZSBpdGVyYXRpb24gY2FsbGJhY2sgZnVuY3Rpb24gaXMgdGhlIGZpcnN0IHBhcmFtZXRlciwgYW5kIHdoZXJlIHRoZSBsaXN0IGlzIHRoZSBsYXN0XG4gICAgICogcGFyYW1ldGVyLiAgKFRoaXMgbGF0dGVyIG1pZ2h0IGJlIHVuaW1wb3J0YW50IGlmIHRoZSBsaXN0IHBhcmFtZXRlciBpcyBub3QgdXNlZC4pXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnICgoYSAuLi4gLT4gYikgLi4uIC0+IFthXSAtPiAqKSAtPiAoYSAuLi4sIEludCwgW2FdIC0+IGIpIC4uLiAtPiBbYV0gLT4gKilcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBBIGxpc3QgaXRlcmF0aW9uIGZ1bmN0aW9uIHRoYXQgZG9lcyBub3QgcGFzcyBpbmRleCBvciBsaXN0IHRvIGl0cyBjYWxsYmFja1xuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBbiBhbHRlcmVkIGxpc3QgaXRlcmF0aW9uIGZ1bmN0aW9uIHRoYXQgcGFzc2VzIChpdGVtLCBpbmRleCwgbGlzdCkgdG8gaXRzIGNhbGxiYWNrXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIG1hcEluZGV4ZWQgPSBSLmFkZEluZGV4KFIubWFwKTtcbiAgICAgKiAgICAgIG1hcEluZGV4ZWQoZnVuY3Rpb24odmFsLCBpZHgpIHtyZXR1cm4gaWR4ICsgJy0nICsgdmFsO30sIFsnZicsICdvJywgJ28nLCAnYicsICdhJywgJ3InXSk7XG4gICAgICogICAgICAvLz0+IFsnMC1mJywgJzEtbycsICcyLW8nLCAnMy1iJywgJzQtYScsICc1LXInXVxuICAgICAqL1xuICAgIHZhciBhZGRJbmRleCA9IF9jdXJyeTEoZnVuY3Rpb24gYWRkSW5kZXgoZm4pIHtcbiAgICAgICAgcmV0dXJuIGN1cnJ5Tihmbi5sZW5ndGgsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICAgICAgdmFyIG9yaWdGbiA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIHZhciBsaXN0ID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIHZhciBhcmdzID0gX3NsaWNlKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBhcmdzWzBdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBvcmlnRm4uYXBwbHkodGhpcywgX2NvbmNhdChhcmd1bWVudHMsIFtcbiAgICAgICAgICAgICAgICAgICAgaWR4LFxuICAgICAgICAgICAgICAgICAgICBsaXN0XG4gICAgICAgICAgICAgICAgXSkpO1xuICAgICAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIGFsbCBlbGVtZW50cyBvZiB0aGUgbGlzdCBtYXRjaCB0aGUgcHJlZGljYXRlLCBgZmFsc2VgIGlmIHRoZXJlIGFyZSBhbnlcbiAgICAgKiB0aGF0IGRvbid0LlxuICAgICAqXG4gICAgICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICAgICAqIEBzZWUgUi50cmFuc2R1Y2VcbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgcHJlZGljYXRlIGlzIHNhdGlzZmllZCBieSBldmVyeSBlbGVtZW50LCBgZmFsc2VgXG4gICAgICogICAgICAgICBvdGhlcndpc2UuXG4gICAgICogQHNlZSBSLmFueSwgUi5ub25lXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGxlc3NUaGFuMiA9IFIuZmxpcChSLmx0KSgyKTtcbiAgICAgKiAgICAgIHZhciBsZXNzVGhhbjMgPSBSLmZsaXAoUi5sdCkoMyk7XG4gICAgICogICAgICBSLmFsbChsZXNzVGhhbjIpKFsxLCAyXSk7IC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIuYWxsKGxlc3NUaGFuMykoWzEsIDJdKTsgLy89PiB0cnVlXG4gICAgICovXG4gICAgdmFyIGFsbCA9IF9jdXJyeTIoX2Rpc3BhdGNoYWJsZSgnYWxsJywgX3hhbGwsIGZ1bmN0aW9uIGFsbChmbiwgbGlzdCkge1xuICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoIWZuKGxpc3RbaWR4XSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KSk7XG5cbiAgICAvKipcbiAgICAgKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaWYgaXQncyBmYWxzeSBvdGhlcndpc2UgdGhlIHNlY29uZFxuICAgICAqIGFyZ3VtZW50LiBOb3RlIHRoYXQgdGhpcyBpcyBOT1Qgc2hvcnQtY2lyY3VpdGVkLCBtZWFuaW5nIHRoYXQgaWYgZXhwcmVzc2lvbnNcbiAgICAgKiBhcmUgcGFzc2VkIHRoZXkgYXJlIGJvdGggZXZhbHVhdGVkLlxuICAgICAqXG4gICAgICogRGlzcGF0Y2hlcyB0byB0aGUgYGFuZGAgbWV0aG9kIG9mIHRoZSBmaXJzdCBhcmd1bWVudCBpZiBhcHBsaWNhYmxlLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMb2dpY1xuICAgICAqIEBzaWcgKiAtPiAqIC0+ICpcbiAgICAgKiBAcGFyYW0geyp9IGEgYW55IHZhbHVlXG4gICAgICogQHBhcmFtIHsqfSBiIGFueSBvdGhlciB2YWx1ZVxuICAgICAqIEByZXR1cm4geyp9IHRoZSBmaXJzdCBhcmd1bWVudCBpZiBmYWxzeSBvdGhlcndpc2UgdGhlIHNlY29uZCBhcmd1bWVudC5cbiAgICAgKiBAc2VlIFIuYm90aFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuYW5kKGZhbHNlLCB0cnVlKTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5hbmQoMCwgW10pOyAvLz0+IDBcbiAgICAgKiAgICAgIFIuYW5kKG51bGwsICcnKTsgPT4gbnVsbFxuICAgICAqL1xuICAgIHZhciBhbmQgPSBfY3VycnkyKGZ1bmN0aW9uIGFuZChhLCBiKSB7XG4gICAgICAgIHJldHVybiBfaGFzTWV0aG9kKCdhbmQnLCBhKSA/IGEuYW5kKGIpIDogYSAmJiBiO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgYXQgbGVhc3Qgb25lIG9mIGVsZW1lbnRzIG9mIHRoZSBsaXN0IG1hdGNoIHRoZSBwcmVkaWNhdGUsIGBmYWxzZWBcbiAgICAgKiBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gICAgICogQHNlZSBSLnRyYW5zZHVjZVxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gQm9vbGVhblxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBwcmVkaWNhdGUgaXMgc2F0aXNmaWVkIGJ5IGF0IGxlYXN0IG9uZSBlbGVtZW50LCBgZmFsc2VgXG4gICAgICogICAgICAgICBvdGhlcndpc2UuXG4gICAgICogQHNlZSBSLmFsbCwgUi5ub25lXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGxlc3NUaGFuMCA9IFIuZmxpcChSLmx0KSgwKTtcbiAgICAgKiAgICAgIHZhciBsZXNzVGhhbjIgPSBSLmZsaXAoUi5sdCkoMik7XG4gICAgICogICAgICBSLmFueShsZXNzVGhhbjApKFsxLCAyXSk7IC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIuYW55KGxlc3NUaGFuMikoWzEsIDJdKTsgLy89PiB0cnVlXG4gICAgICovXG4gICAgdmFyIGFueSA9IF9jdXJyeTIoX2Rpc3BhdGNoYWJsZSgnYW55JywgX3hhbnksIGZ1bmN0aW9uIGFueShmbiwgbGlzdCkge1xuICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoZm4obGlzdFtpZHhdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pKTtcblxuICAgIC8qKlxuICAgICAqIFdyYXBzIGEgZnVuY3Rpb24gb2YgYW55IGFyaXR5IChpbmNsdWRpbmcgbnVsbGFyeSkgaW4gYSBmdW5jdGlvbiB0aGF0IGFjY2VwdHMgZXhhY3RseSAyXG4gICAgICogcGFyYW1ldGVycy4gQW55IGV4dHJhbmVvdXMgcGFyYW1ldGVycyB3aWxsIG5vdCBiZSBwYXNzZWQgdG8gdGhlIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKCogLT4gYykgLT4gKGEsIGIgLT4gYylcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gd3JhcHBpbmcgYGZuYC4gVGhlIG5ldyBmdW5jdGlvbiBpcyBndWFyYW50ZWVkIHRvIGJlIG9mXG4gICAgICogICAgICAgICBhcml0eSAyLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciB0YWtlc1RocmVlQXJncyA9IGZ1bmN0aW9uKGEsIGIsIGMpIHtcbiAgICAgKiAgICAgICAgcmV0dXJuIFthLCBiLCBjXTtcbiAgICAgKiAgICAgIH07XG4gICAgICogICAgICB0YWtlc1RocmVlQXJncy5sZW5ndGg7IC8vPT4gM1xuICAgICAqICAgICAgdGFrZXNUaHJlZUFyZ3MoMSwgMiwgMyk7IC8vPT4gWzEsIDIsIDNdXG4gICAgICpcbiAgICAgKiAgICAgIHZhciB0YWtlc1R3b0FyZ3MgPSBSLmJpbmFyeSh0YWtlc1RocmVlQXJncyk7XG4gICAgICogICAgICB0YWtlc1R3b0FyZ3MubGVuZ3RoOyAvLz0+IDJcbiAgICAgKiAgICAgIC8vIE9ubHkgMiBhcmd1bWVudHMgYXJlIHBhc3NlZCB0byB0aGUgd3JhcHBlZCBmdW5jdGlvblxuICAgICAqICAgICAgdGFrZXNUd29BcmdzKDEsIDIsIDMpOyAvLz0+IFsxLCAyLCB1bmRlZmluZWRdXG4gICAgICovXG4gICAgdmFyIGJpbmFyeSA9IF9jdXJyeTEoZnVuY3Rpb24gYmluYXJ5KGZuKSB7XG4gICAgICAgIHJldHVybiBuQXJ5KDIsIGZuKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBkZWVwIGNvcHkgb2YgdGhlIHZhbHVlIHdoaWNoIG1heSBjb250YWluIChuZXN0ZWQpIGBBcnJheWBzIGFuZFxuICAgICAqIGBPYmplY3RgcywgYE51bWJlcmBzLCBgU3RyaW5nYHMsIGBCb29sZWFuYHMgYW5kIGBEYXRlYHMuIGBGdW5jdGlvbmBzIGFyZVxuICAgICAqIG5vdCBjb3BpZWQsIGJ1dCBhc3NpZ25lZCBieSB0aGVpciByZWZlcmVuY2UuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcgeyp9IC0+IHsqfVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIG9iamVjdCBvciBhcnJheSB0byBjbG9uZVxuICAgICAqIEByZXR1cm4geyp9IEEgbmV3IG9iamVjdCBvciBhcnJheS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgb2JqZWN0cyA9IFt7fSwge30sIHt9XTtcbiAgICAgKiAgICAgIHZhciBvYmplY3RzQ2xvbmUgPSBSLmNsb25lKG9iamVjdHMpO1xuICAgICAqICAgICAgb2JqZWN0c1swXSA9PT0gb2JqZWN0c0Nsb25lWzBdOyAvLz0+IGZhbHNlXG4gICAgICovXG4gICAgdmFyIGNsb25lID0gX2N1cnJ5MShmdW5jdGlvbiBjbG9uZSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gX2Nsb25lKHZhbHVlLCBbXSwgW10pO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG5ldyBsaXN0IGNvbnNpc3Rpbmcgb2YgdGhlIGVsZW1lbnRzIG9mIHRoZSBmaXJzdCBsaXN0IGZvbGxvd2VkIGJ5IHRoZSBlbGVtZW50c1xuICAgICAqIG9mIHRoZSBzZWNvbmQuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIFthXSAtPiBbYV0gLT4gW2FdXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdDEgVGhlIGZpcnN0IGxpc3QgdG8gbWVyZ2UuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdDIgVGhlIHNlY29uZCBzZXQgdG8gbWVyZ2UuXG4gICAgICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGFycmF5IGNvbnNpc3Rpbmcgb2YgdGhlIGNvbnRlbnRzIG9mIGBsaXN0MWAgZm9sbG93ZWQgYnkgdGhlXG4gICAgICogICAgICAgICBjb250ZW50cyBvZiBgbGlzdDJgLiBJZiwgaW5zdGVhZCBvZiBhbiBBcnJheSBmb3IgYGxpc3QxYCwgeW91IHBhc3MgYW5cbiAgICAgKiAgICAgICAgIG9iamVjdCB3aXRoIGEgYGNvbmNhdGAgbWV0aG9kIG9uIGl0LCBgY29uY2F0YCB3aWxsIGNhbGwgYGxpc3QxLmNvbmNhdGBcbiAgICAgKiAgICAgICAgIGFuZCBwYXNzIGl0IHRoZSB2YWx1ZSBvZiBgbGlzdDJgLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5jb25jYXQoW10sIFtdKTsgLy89PiBbXVxuICAgICAqICAgICAgUi5jb25jYXQoWzQsIDUsIDZdLCBbMSwgMiwgM10pOyAvLz0+IFs0LCA1LCA2LCAxLCAyLCAzXVxuICAgICAqICAgICAgUi5jb25jYXQoJ0FCQycsICdERUYnKTsgLy8gJ0FCQ0RFRidcbiAgICAgKi9cbiAgICB2YXIgY29uY2F0ID0gX2N1cnJ5MihmdW5jdGlvbiBjb25jYXQoc2V0MSwgc2V0Mikge1xuICAgICAgICBpZiAoX2lzQXJyYXkoc2V0MikpIHtcbiAgICAgICAgICAgIHJldHVybiBfY29uY2F0KHNldDEsIHNldDIpO1xuICAgICAgICB9IGVsc2UgaWYgKF9oYXNNZXRob2QoJ2NvbmNhdCcsIHNldDEpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2V0MS5jb25jYXQoc2V0Mik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjYW5cXCd0IGNvbmNhdCAnICsgdHlwZW9mIHNldDEpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgY3VycmllZCBlcXVpdmFsZW50IG9mIHRoZSBwcm92aWRlZCBmdW5jdGlvbi4gVGhlIGN1cnJpZWRcbiAgICAgKiBmdW5jdGlvbiBoYXMgdHdvIHVudXN1YWwgY2FwYWJpbGl0aWVzLiBGaXJzdCwgaXRzIGFyZ3VtZW50cyBuZWVkbid0XG4gICAgICogYmUgcHJvdmlkZWQgb25lIGF0IGEgdGltZS4gSWYgYGZgIGlzIGEgdGVybmFyeSBmdW5jdGlvbiBhbmQgYGdgIGlzXG4gICAgICogYFIuY3VycnkoZilgLCB0aGUgZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICAgICAqXG4gICAgICogICAtIGBnKDEpKDIpKDMpYFxuICAgICAqICAgLSBgZygxKSgyLCAzKWBcbiAgICAgKiAgIC0gYGcoMSwgMikoMylgXG4gICAgICogICAtIGBnKDEsIDIsIDMpYFxuICAgICAqXG4gICAgICogU2Vjb25kbHksIHRoZSBzcGVjaWFsIHBsYWNlaG9sZGVyIHZhbHVlIGBSLl9fYCBtYXkgYmUgdXNlZCB0byBzcGVjaWZ5XG4gICAgICogXCJnYXBzXCIsIGFsbG93aW5nIHBhcnRpYWwgYXBwbGljYXRpb24gb2YgYW55IGNvbWJpbmF0aW9uIG9mIGFyZ3VtZW50cyxcbiAgICAgKiByZWdhcmRsZXNzIG9mIHRoZWlyIHBvc2l0aW9ucy4gSWYgYGdgIGlzIGFzIGFib3ZlIGFuZCBgX2AgaXMgYFIuX19gLFxuICAgICAqIHRoZSBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gICAgICpcbiAgICAgKiAgIC0gYGcoMSwgMiwgMylgXG4gICAgICogICAtIGBnKF8sIDIsIDMpKDEpYFxuICAgICAqICAgLSBgZyhfLCBfLCAzKSgxKSgyKWBcbiAgICAgKiAgIC0gYGcoXywgXywgMykoMSwgMilgXG4gICAgICogICAtIGBnKF8sIDIpKDEpKDMpYFxuICAgICAqICAgLSBgZyhfLCAyKSgxLCAzKWBcbiAgICAgKiAgIC0gYGcoXywgMikoXywgMykoMSlgXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHNpZyAoKiAtPiBhKSAtPiAoKiAtPiBhKVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcsIGN1cnJpZWQgZnVuY3Rpb24uXG4gICAgICogQHNlZSBSLmN1cnJ5TlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBhZGRGb3VyTnVtYmVycyA9IGZ1bmN0aW9uKGEsIGIsIGMsIGQpIHtcbiAgICAgKiAgICAgICAgcmV0dXJuIGEgKyBiICsgYyArIGQ7XG4gICAgICogICAgICB9O1xuICAgICAqXG4gICAgICogICAgICB2YXIgY3VycmllZEFkZEZvdXJOdW1iZXJzID0gUi5jdXJyeShhZGRGb3VyTnVtYmVycyk7XG4gICAgICogICAgICB2YXIgZiA9IGN1cnJpZWRBZGRGb3VyTnVtYmVycygxLCAyKTtcbiAgICAgKiAgICAgIHZhciBnID0gZigzKTtcbiAgICAgKiAgICAgIGcoNCk7IC8vPT4gMTBcbiAgICAgKi9cbiAgICB2YXIgY3VycnkgPSBfY3VycnkxKGZ1bmN0aW9uIGN1cnJ5KGZuKSB7XG4gICAgICAgIHJldHVybiBjdXJyeU4oZm4ubGVuZ3RoLCBmbik7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3QgY29udGFpbmluZyB0aGUgbGFzdCBgbmAgZWxlbWVudHMgb2YgYSBnaXZlbiBsaXN0LCBwYXNzaW5nIGVhY2ggdmFsdWVcbiAgICAgKiB0byB0aGUgc3VwcGxpZWQgcHJlZGljYXRlIGZ1bmN0aW9uLCBza2lwcGluZyBlbGVtZW50cyB3aGlsZSB0aGUgcHJlZGljYXRlIGZ1bmN0aW9uIHJldHVybnNcbiAgICAgKiBgdHJ1ZWAuIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gaXMgcGFzc2VkIG9uZSBhcmd1bWVudDogKih2YWx1ZSkqLlxuICAgICAqXG4gICAgICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICAgICAqIEBzZWUgUi50cmFuc2R1Y2VcbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgYXJyYXkuXG4gICAgICogQHNlZSBSLnRha2VXaGlsZVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBsdGVUd28gPSBmdW5jdGlvbih4KSB7XG4gICAgICogICAgICAgIHJldHVybiB4IDw9IDI7XG4gICAgICogICAgICB9O1xuICAgICAqXG4gICAgICogICAgICBSLmRyb3BXaGlsZShsdGVUd28sIFsxLCAyLCAzLCA0LCAzLCAyLCAxXSk7IC8vPT4gWzMsIDQsIDMsIDIsIDFdXG4gICAgICovXG4gICAgdmFyIGRyb3BXaGlsZSA9IF9jdXJyeTIoX2Rpc3BhdGNoYWJsZSgnZHJvcFdoaWxlJywgX3hkcm9wV2hpbGUsIGZ1bmN0aW9uIGRyb3BXaGlsZShwcmVkLCBsaXN0KSB7XG4gICAgICAgIHZhciBpZHggPSAwLCBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxlbiAmJiBwcmVkKGxpc3RbaWR4XSkpIHtcbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfc2xpY2UobGlzdCwgaWR4KTtcbiAgICB9KSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiBpdHMgYXJndW1lbnRzIGFyZSBlcXVpdmFsZW50LCBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKiBEaXNwYXRjaGVzIHRvIGFuIGBlcXVhbHNgIG1ldGhvZCBpZiBwcmVzZW50LiBIYW5kbGVzIGN5Y2xpY2FsIGRhdGFcbiAgICAgKiBzdHJ1Y3R1cmVzLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICAgICAqIEBzaWcgYSAtPiBiIC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0geyp9IGFcbiAgICAgKiBAcGFyYW0geyp9IGJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuZXF1YWxzKDEsIDEpOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIuZXF1YWxzKDEsICcxJyk7IC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIuZXF1YWxzKFsxLCAyLCAzXSwgWzEsIDIsIDNdKTsgLy89PiB0cnVlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBhID0ge307IGEudiA9IGE7XG4gICAgICogICAgICB2YXIgYiA9IHt9OyBiLnYgPSBiO1xuICAgICAqICAgICAgUi5lcXVhbHMoYSwgYik7IC8vPT4gdHJ1ZVxuICAgICAqL1xuICAgIHZhciBlcXVhbHMgPSBfY3VycnkyKGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gICAgICAgIHJldHVybiBfaGFzTWV0aG9kKCdlcXVhbHMnLCBhKSA/IGEuZXF1YWxzKGIpIDogX2hhc01ldGhvZCgnZXF1YWxzJywgYikgPyBiLmVxdWFscyhhKSA6IF9lcXVhbHMoYSwgYiwgW10sIFtdKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgbGlzdCBjb250YWluaW5nIG9ubHkgdGhvc2UgaXRlbXMgdGhhdCBtYXRjaCBhIGdpdmVuIHByZWRpY2F0ZSBmdW5jdGlvbi5cbiAgICAgKiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uIGlzIHBhc3NlZCBvbmUgYXJndW1lbnQ6ICoodmFsdWUpKi5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCBgUi5maWx0ZXJgIGRvZXMgbm90IHNraXAgZGVsZXRlZCBvciB1bmFzc2lnbmVkIGluZGljZXMsIHVubGlrZSB0aGUgbmF0aXZlXG4gICAgICogYEFycmF5LnByb3RvdHlwZS5maWx0ZXJgIG1ldGhvZC4gRm9yIG1vcmUgZGV0YWlscyBvbiB0aGlzIGJlaGF2aW9yLCBzZWU6XG4gICAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZmlsdGVyI0Rlc2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gICAgICogQHNlZSBSLnRyYW5zZHVjZVxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gW2FdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXIgaXRlcmF0aW9uLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBUaGUgbmV3IGZpbHRlcmVkIGFycmF5LlxuICAgICAqIEBzZWUgUi5yZWplY3RcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgaXNFdmVuID0gZnVuY3Rpb24obikge1xuICAgICAqICAgICAgICByZXR1cm4gbiAlIDIgPT09IDA7XG4gICAgICogICAgICB9O1xuICAgICAqICAgICAgUi5maWx0ZXIoaXNFdmVuLCBbMSwgMiwgMywgNF0pOyAvLz0+IFsyLCA0XVxuICAgICAqL1xuICAgIHZhciBmaWx0ZXIgPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoJ2ZpbHRlcicsIF94ZmlsdGVyLCBfZmlsdGVyKSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBsaXN0IHdoaWNoIG1hdGNoZXMgdGhlIHByZWRpY2F0ZSwgb3IgYHVuZGVmaW5lZGAgaWYgbm9cbiAgICAgKiBlbGVtZW50IG1hdGNoZXMuXG4gICAgICpcbiAgICAgKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gICAgICogQHNlZSBSLnRyYW5zZHVjZVxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gYSB8IHVuZGVmaW5lZFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gdXNlZCB0byBkZXRlcm1pbmUgaWYgdGhlIGVsZW1lbnQgaXMgdGhlXG4gICAgICogICAgICAgIGRlc2lyZWQgb25lLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGVsZW1lbnQgZm91bmQsIG9yIGB1bmRlZmluZWRgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciB4cyA9IFt7YTogMX0sIHthOiAyfSwge2E6IDN9XTtcbiAgICAgKiAgICAgIFIuZmluZChSLnByb3BFcSgnYScsIDIpKSh4cyk7IC8vPT4ge2E6IDJ9XG4gICAgICogICAgICBSLmZpbmQoUi5wcm9wRXEoJ2EnLCA0KSkoeHMpOyAvLz0+IHVuZGVmaW5lZFxuICAgICAqL1xuICAgIHZhciBmaW5kID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKCdmaW5kJywgX3hmaW5kLCBmdW5jdGlvbiBmaW5kKGZuLCBsaXN0KSB7XG4gICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChmbihsaXN0W2lkeF0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RbaWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgfSkpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGxpc3Qgd2hpY2ggbWF0Y2hlcyB0aGUgcHJlZGljYXRlLCBvciBgLTFgXG4gICAgICogaWYgbm8gZWxlbWVudCBtYXRjaGVzLlxuICAgICAqXG4gICAgICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICAgICAqIEBzZWUgUi50cmFuc2R1Y2VcbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IE51bWJlclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gdXNlZCB0byBkZXRlcm1pbmUgaWYgdGhlIGVsZW1lbnQgaXMgdGhlXG4gICAgICogZGVzaXJlZCBvbmUuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgZm91bmQsIG9yIGAtMWAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHhzID0gW3thOiAxfSwge2E6IDJ9LCB7YTogM31dO1xuICAgICAqICAgICAgUi5maW5kSW5kZXgoUi5wcm9wRXEoJ2EnLCAyKSkoeHMpOyAvLz0+IDFcbiAgICAgKiAgICAgIFIuZmluZEluZGV4KFIucHJvcEVxKCdhJywgNCkpKHhzKTsgLy89PiAtMVxuICAgICAqL1xuICAgIHZhciBmaW5kSW5kZXggPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoJ2ZpbmRJbmRleCcsIF94ZmluZEluZGV4LCBmdW5jdGlvbiBmaW5kSW5kZXgoZm4sIGxpc3QpIHtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGZuKGxpc3RbaWR4XSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWR4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH0pKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxhc3QgZWxlbWVudCBvZiB0aGUgbGlzdCB3aGljaCBtYXRjaGVzIHRoZSBwcmVkaWNhdGUsIG9yIGB1bmRlZmluZWRgIGlmIG5vXG4gICAgICogZWxlbWVudCBtYXRjaGVzLlxuICAgICAqXG4gICAgICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICAgICAqIEBzZWUgUi50cmFuc2R1Y2VcbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IGEgfCB1bmRlZmluZWRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHRoZSBlbGVtZW50IGlzIHRoZVxuICAgICAqIGRlc2lyZWQgb25lLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGVsZW1lbnQgZm91bmQsIG9yIGB1bmRlZmluZWRgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciB4cyA9IFt7YTogMSwgYjogMH0sIHthOjEsIGI6IDF9XTtcbiAgICAgKiAgICAgIFIuZmluZExhc3QoUi5wcm9wRXEoJ2EnLCAxKSkoeHMpOyAvLz0+IHthOiAxLCBiOiAxfVxuICAgICAqICAgICAgUi5maW5kTGFzdChSLnByb3BFcSgnYScsIDQpKSh4cyk7IC8vPT4gdW5kZWZpbmVkXG4gICAgICovXG4gICAgdmFyIGZpbmRMYXN0ID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKCdmaW5kTGFzdCcsIF94ZmluZExhc3QsIGZ1bmN0aW9uIGZpbmRMYXN0KGZuLCBsaXN0KSB7XG4gICAgICAgIHZhciBpZHggPSBsaXN0Lmxlbmd0aCAtIDE7XG4gICAgICAgIHdoaWxlIChpZHggPj0gMCkge1xuICAgICAgICAgICAgaWYgKGZuKGxpc3RbaWR4XSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdFtpZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4IC09IDE7XG4gICAgICAgIH1cbiAgICB9KSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbGFzdCBlbGVtZW50IG9mIHRoZSBsaXN0IHdoaWNoIG1hdGNoZXMgdGhlIHByZWRpY2F0ZSwgb3JcbiAgICAgKiBgLTFgIGlmIG5vIGVsZW1lbnQgbWF0Y2hlcy5cbiAgICAgKlxuICAgICAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAgICAgKiBAc2VlIFIudHJhbnNkdWNlXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBOdW1iZXJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHRoZSBlbGVtZW50IGlzIHRoZVxuICAgICAqIGRlc2lyZWQgb25lLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IGZvdW5kLCBvciBgLTFgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciB4cyA9IFt7YTogMSwgYjogMH0sIHthOjEsIGI6IDF9XTtcbiAgICAgKiAgICAgIFIuZmluZExhc3RJbmRleChSLnByb3BFcSgnYScsIDEpKSh4cyk7IC8vPT4gMVxuICAgICAqICAgICAgUi5maW5kTGFzdEluZGV4KFIucHJvcEVxKCdhJywgNCkpKHhzKTsgLy89PiAtMVxuICAgICAqL1xuICAgIHZhciBmaW5kTGFzdEluZGV4ID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKCdmaW5kTGFzdEluZGV4JywgX3hmaW5kTGFzdEluZGV4LCBmdW5jdGlvbiBmaW5kTGFzdEluZGV4KGZuLCBsaXN0KSB7XG4gICAgICAgIHZhciBpZHggPSBsaXN0Lmxlbmd0aCAtIDE7XG4gICAgICAgIHdoaWxlIChpZHggPj0gMCkge1xuICAgICAgICAgICAgaWYgKGZuKGxpc3RbaWR4XSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWR4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4IC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH0pKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgbGlzdCBieSBwdWxsaW5nIGV2ZXJ5IGl0ZW0gb3V0IG9mIGl0IChhbmQgYWxsIGl0cyBzdWItYXJyYXlzKSBhbmQgcHV0dGluZ1xuICAgICAqIHRoZW0gaW4gYSBuZXcgYXJyYXksIGRlcHRoLWZpcnN0LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBbYV0gLT4gW2JdXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHJldHVybiB7QXJyYXl9IFRoZSBmbGF0dGVuZWQgbGlzdC5cbiAgICAgKiBAc2VlIFIudW5uZXN0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5mbGF0dGVuKFsxLCAyLCBbMywgNF0sIDUsIFs2LCBbNywgOCwgWzksIFsxMCwgMTFdLCAxMl1dXV0pO1xuICAgICAqICAgICAgLy89PiBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMl1cbiAgICAgKi9cbiAgICB2YXIgZmxhdHRlbiA9IF9jdXJyeTEoX21ha2VGbGF0KHRydWUpKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgZnVuY3Rpb24gbXVjaCBsaWtlIHRoZSBzdXBwbGllZCBvbmUsIGV4Y2VwdCB0aGF0IHRoZSBmaXJzdCB0d28gYXJndW1lbnRzJ1xuICAgICAqIG9yZGVyIGlzIHJldmVyc2VkLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKGEgLT4gYiAtPiBjIC0+IC4uLiAtPiB6KSAtPiAoYiAtPiBhIC0+IGMgLT4gLi4uIC0+IHopXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGludm9rZSB3aXRoIGl0cyBmaXJzdCB0d28gcGFyYW1ldGVycyByZXZlcnNlZC5cbiAgICAgKiBAcmV0dXJuIHsqfSBUaGUgcmVzdWx0IG9mIGludm9raW5nIGBmbmAgd2l0aCBpdHMgZmlyc3QgdHdvIHBhcmFtZXRlcnMnIG9yZGVyIHJldmVyc2VkLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBtZXJnZVRocmVlID0gZnVuY3Rpb24oYSwgYiwgYykge1xuICAgICAqICAgICAgICByZXR1cm4gKFtdKS5jb25jYXQoYSwgYiwgYyk7XG4gICAgICogICAgICB9O1xuICAgICAqXG4gICAgICogICAgICBtZXJnZVRocmVlKDEsIDIsIDMpOyAvLz0+IFsxLCAyLCAzXVxuICAgICAqXG4gICAgICogICAgICBSLmZsaXAobWVyZ2VUaHJlZSkoMSwgMiwgMyk7IC8vPT4gWzIsIDEsIDNdXG4gICAgICovXG4gICAgdmFyIGZsaXAgPSBfY3VycnkxKGZ1bmN0aW9uIGZsaXAoZm4pIHtcbiAgICAgICAgcmV0dXJuIGN1cnJ5KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IF9zbGljZShhcmd1bWVudHMpO1xuICAgICAgICAgICAgYXJnc1swXSA9IGI7XG4gICAgICAgICAgICBhcmdzWzFdID0gYTtcbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlIG92ZXIgYW4gaW5wdXQgYGxpc3RgLCBjYWxsaW5nIGEgcHJvdmlkZWQgZnVuY3Rpb24gYGZuYCBmb3IgZWFjaCBlbGVtZW50IGluIHRoZVxuICAgICAqIGxpc3QuXG4gICAgICpcbiAgICAgKiBgZm5gIHJlY2VpdmVzIG9uZSBhcmd1bWVudDogKih2YWx1ZSkqLlxuICAgICAqXG4gICAgICogTm90ZTogYFIuZm9yRWFjaGAgZG9lcyBub3Qgc2tpcCBkZWxldGVkIG9yIHVuYXNzaWduZWQgaW5kaWNlcyAoc3BhcnNlIGFycmF5cyksIHVubGlrZVxuICAgICAqIHRoZSBuYXRpdmUgYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2QuIEZvciBtb3JlIGRldGFpbHMgb24gdGhpcyBiZWhhdmlvciwgc2VlOlxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2ZvckVhY2gjRGVzY3JpcHRpb25cbiAgICAgKlxuICAgICAqIEFsc28gbm90ZSB0aGF0LCB1bmxpa2UgYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCwgUmFtZGEncyBgZm9yRWFjaGAgcmV0dXJucyB0aGUgb3JpZ2luYWxcbiAgICAgKiBhcnJheS4gSW4gc29tZSBsaWJyYXJpZXMgdGhpcyBmdW5jdGlvbiBpcyBuYW1lZCBgZWFjaGAuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhIC0+ICopIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLiBSZWNlaXZlcyBvbmUgYXJndW1lbnQsIGB2YWx1ZWAuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHJldHVybiB7QXJyYXl9IFRoZSBvcmlnaW5hbCBsaXN0LlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBwcmludFhQbHVzRml2ZSA9IGZ1bmN0aW9uKHgpIHsgY29uc29sZS5sb2coeCArIDUpOyB9O1xuICAgICAqICAgICAgUi5mb3JFYWNoKHByaW50WFBsdXNGaXZlLCBbMSwgMiwgM10pOyAvLz0+IFsxLCAyLCAzXVxuICAgICAqICAgICAgLy8tPiA2XG4gICAgICogICAgICAvLy0+IDdcbiAgICAgKiAgICAgIC8vLT4gOFxuICAgICAqL1xuICAgIHZhciBmb3JFYWNoID0gX2N1cnJ5MihfY2hlY2tGb3JNZXRob2QoJ2ZvckVhY2gnLCBmdW5jdGlvbiBmb3JFYWNoKGZuLCBsaXN0KSB7XG4gICAgICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgICAgICAgIGZuKGxpc3RbaWR4XSk7XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9KSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBmdW5jdGlvbiBuYW1lcyBvZiBvYmplY3QncyBvd24gZnVuY3Rpb25zXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcgeyp9IC0+IFtTdHJpbmddXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0cyB3aXRoIGZ1bmN0aW9ucyBpbiBpdFxuICAgICAqIEByZXR1cm4ge0FycmF5fSBBIGxpc3Qgb2YgdGhlIG9iamVjdCdzIG93biBwcm9wZXJ0aWVzIHRoYXQgbWFwIHRvIGZ1bmN0aW9ucy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmZ1bmN0aW9ucyhSKTsgLy8gcmV0dXJucyBsaXN0IG9mIHJhbWRhJ3Mgb3duIGZ1bmN0aW9uIG5hbWVzXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBGID0gZnVuY3Rpb24oKSB7IHRoaXMueCA9IGZ1bmN0aW9uKCl7fTsgdGhpcy55ID0gMTsgfVxuICAgICAqICAgICAgRi5wcm90b3R5cGUueiA9IGZ1bmN0aW9uKCkge307XG4gICAgICogICAgICBGLnByb3RvdHlwZS5hID0gMTAwO1xuICAgICAqICAgICAgUi5mdW5jdGlvbnMobmV3IEYoKSk7IC8vPT4gW1wieFwiXVxuICAgICAqL1xuICAgIHZhciBmdW5jdGlvbnMgPSBfY3VycnkxKF9mdW5jdGlvbnNXaXRoKGtleXMpKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGZ1bmN0aW9uIG5hbWVzIG9mIG9iamVjdCdzIG93biBhbmQgcHJvdG90eXBlIGZ1bmN0aW9uc1xuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIHsqfSAtPiBbU3RyaW5nXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdHMgd2l0aCBmdW5jdGlvbnMgaW4gaXRcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQSBsaXN0IG9mIHRoZSBvYmplY3QncyBvd24gcHJvcGVydGllcyBhbmQgcHJvdG90eXBlXG4gICAgICogICAgICAgICBwcm9wZXJ0aWVzIHRoYXQgbWFwIHRvIGZ1bmN0aW9ucy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmZ1bmN0aW9uc0luKFIpOyAvLyByZXR1cm5zIGxpc3Qgb2YgcmFtZGEncyBvd24gYW5kIHByb3RvdHlwZSBmdW5jdGlvbiBuYW1lc1xuICAgICAqXG4gICAgICogICAgICB2YXIgRiA9IGZ1bmN0aW9uKCkgeyB0aGlzLnggPSBmdW5jdGlvbigpe307IHRoaXMueSA9IDE7IH1cbiAgICAgKiAgICAgIEYucHJvdG90eXBlLnogPSBmdW5jdGlvbigpIHt9O1xuICAgICAqICAgICAgRi5wcm90b3R5cGUuYSA9IDEwMDtcbiAgICAgKiAgICAgIFIuZnVuY3Rpb25zSW4obmV3IEYoKSk7IC8vPT4gW1wieFwiLCBcInpcIl1cbiAgICAgKi9cbiAgICB2YXIgZnVuY3Rpb25zSW4gPSBfY3VycnkxKF9mdW5jdGlvbnNXaXRoKGtleXNJbikpO1xuXG4gICAgLyoqXG4gICAgICogU3BsaXRzIGEgbGlzdCBpbnRvIHN1Yi1saXN0cyBzdG9yZWQgaW4gYW4gb2JqZWN0LCBiYXNlZCBvbiB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgYSBTdHJpbmctcmV0dXJuaW5nIGZ1bmN0aW9uXG4gICAgICogb24gZWFjaCBlbGVtZW50LCBhbmQgZ3JvdXBpbmcgdGhlIHJlc3VsdHMgYWNjb3JkaW5nIHRvIHZhbHVlcyByZXR1cm5lZC5cbiAgICAgKlxuICAgICAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAgICAgKiBAc2VlIFIudHJhbnNkdWNlXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhIC0+IFN0cmluZykgLT4gW2FdIC0+IHtTdHJpbmc6IFthXX1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiA6OiBhIC0+IFN0cmluZ1xuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGdyb3VwXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3Qgd2l0aCB0aGUgb3V0cHV0IG9mIGBmbmAgZm9yIGtleXMsIG1hcHBlZCB0byBhcnJheXMgb2YgZWxlbWVudHNcbiAgICAgKiAgICAgICAgIHRoYXQgcHJvZHVjZWQgdGhhdCBrZXkgd2hlbiBwYXNzZWQgdG8gYGZuYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgYnlHcmFkZSA9IFIuZ3JvdXBCeShmdW5jdGlvbihzdHVkZW50KSB7XG4gICAgICogICAgICAgIHZhciBzY29yZSA9IHN0dWRlbnQuc2NvcmU7XG4gICAgICogICAgICAgIHJldHVybiBzY29yZSA8IDY1ID8gJ0YnIDpcbiAgICAgKiAgICAgICAgICAgICAgIHNjb3JlIDwgNzAgPyAnRCcgOlxuICAgICAqICAgICAgICAgICAgICAgc2NvcmUgPCA4MCA/ICdDJyA6XG4gICAgICogICAgICAgICAgICAgICBzY29yZSA8IDkwID8gJ0InIDogJ0EnO1xuICAgICAqICAgICAgfSk7XG4gICAgICogICAgICB2YXIgc3R1ZGVudHMgPSBbe25hbWU6ICdBYmJ5Jywgc2NvcmU6IDg0fSxcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB7bmFtZTogJ0VkZHknLCBzY29yZTogNTh9LFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIC8vIC4uLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHtuYW1lOiAnSmFjaycsIHNjb3JlOiA2OX1dO1xuICAgICAqICAgICAgYnlHcmFkZShzdHVkZW50cyk7XG4gICAgICogICAgICAvLyB7XG4gICAgICogICAgICAvLyAgICdBJzogW3tuYW1lOiAnRGlhbm5lJywgc2NvcmU6IDk5fV0sXG4gICAgICogICAgICAvLyAgICdCJzogW3tuYW1lOiAnQWJieScsIHNjb3JlOiA4NH1dXG4gICAgICogICAgICAvLyAgIC8vIC4uLixcbiAgICAgKiAgICAgIC8vICAgJ0YnOiBbe25hbWU6ICdFZGR5Jywgc2NvcmU6IDU4fV1cbiAgICAgKiAgICAgIC8vIH1cbiAgICAgKi9cbiAgICB2YXIgZ3JvdXBCeSA9IF9jdXJyeTIoX2Rpc3BhdGNoYWJsZSgnZ3JvdXBCeScsIF94Z3JvdXBCeSwgZnVuY3Rpb24gZ3JvdXBCeShmbiwgbGlzdCkge1xuICAgICAgICByZXR1cm4gX3JlZHVjZShmdW5jdGlvbiAoYWNjLCBlbHQpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBmbihlbHQpO1xuICAgICAgICAgICAgYWNjW2tleV0gPSBhcHBlbmQoZWx0LCBhY2Nba2V5XSB8fCAoYWNjW2tleV0gPSBbXSkpO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30sIGxpc3QpO1xuICAgIH0pKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGdpdmVuIGxpc3Qgb3Igc3RyaW5nLiBJbiBzb21lIGxpYnJhcmllc1xuICAgICAqIHRoaXMgZnVuY3Rpb24gaXMgbmFtZWQgYGZpcnN0YC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzZWUgUi50YWlsLCBSLmluaXQsIFIubGFzdFxuICAgICAqIEBzaWcgW2FdIC0+IGEgfCBVbmRlZmluZWRcbiAgICAgKiBAc2lnIFN0cmluZyAtPiBTdHJpbmdcbiAgICAgKiBAcGFyYW0geyp9IGxpc3RcbiAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuaGVhZChbJ2ZpJywgJ2ZvJywgJ2Z1bSddKTsgLy89PiAnZmknXG4gICAgICogICAgICBSLmhlYWQoW10pOyAvLz0+IHVuZGVmaW5lZFxuICAgICAqXG4gICAgICogICAgICBSLmhlYWQoJ2FiYycpOyAvLz0+ICdhJ1xuICAgICAqICAgICAgUi5oZWFkKCcnKTsgLy89PiAnJ1xuICAgICAqL1xuICAgIHZhciBoZWFkID0gbnRoKDApO1xuXG4gICAgLyoqXG4gICAgICogQ29tYmluZXMgdHdvIGxpc3RzIGludG8gYSBzZXQgKGkuZS4gbm8gZHVwbGljYXRlcykgY29tcG9zZWQgb2YgdGhvc2VcbiAgICAgKiBlbGVtZW50cyBjb21tb24gdG8gYm90aCBsaXN0cy4gIER1cGxpY2F0aW9uIGlzIGRldGVybWluZWQgYWNjb3JkaW5nXG4gICAgICogdG8gdGhlIHZhbHVlIHJldHVybmVkIGJ5IGFwcGx5aW5nIHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgdG8gdHdvIGxpc3RcbiAgICAgKiBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAgICAgKiBAc2lnIChhLGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkIEEgcHJlZGljYXRlIGZ1bmN0aW9uIHRoYXQgZGV0ZXJtaW5lcyB3aGV0aGVyXG4gICAgICogICAgICAgIHRoZSB0d28gc3VwcGxpZWQgZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QxIE9uZSBsaXN0IG9mIGl0ZW1zIHRvIGNvbXBhcmVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0MiBBIHNlY29uZCBsaXN0IG9mIGl0ZW1zIHRvIGNvbXBhcmVcbiAgICAgKiBAc2VlIFIuaW50ZXJzZWN0aW9uXG4gICAgICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGxpc3QgY29udGFpbmluZyB0aG9zZSBlbGVtZW50cyBjb21tb24gdG8gYm90aCBsaXN0cy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgYnVmZmFsb1NwcmluZ2ZpZWxkID0gW1xuICAgICAqICAgICAgICB7aWQ6IDgyNCwgbmFtZTogJ1JpY2hpZSBGdXJheSd9LFxuICAgICAqICAgICAgICB7aWQ6IDk1NiwgbmFtZTogJ0Rld2V5IE1hcnRpbid9LFxuICAgICAqICAgICAgICB7aWQ6IDMxMywgbmFtZTogJ0JydWNlIFBhbG1lcid9LFxuICAgICAqICAgICAgICB7aWQ6IDQ1NiwgbmFtZTogJ1N0ZXBoZW4gU3RpbGxzJ30sXG4gICAgICogICAgICAgIHtpZDogMTc3LCBuYW1lOiAnTmVpbCBZb3VuZyd9XG4gICAgICogICAgICBdO1xuICAgICAqICAgICAgdmFyIGNzbnkgPSBbXG4gICAgICogICAgICAgIHtpZDogMjA0LCBuYW1lOiAnRGF2aWQgQ3Jvc2J5J30sXG4gICAgICogICAgICAgIHtpZDogNDU2LCBuYW1lOiAnU3RlcGhlbiBTdGlsbHMnfSxcbiAgICAgKiAgICAgICAge2lkOiA1MzksIG5hbWU6ICdHcmFoYW0gTmFzaCd9LFxuICAgICAqICAgICAgICB7aWQ6IDE3NywgbmFtZTogJ05laWwgWW91bmcnfVxuICAgICAqICAgICAgXTtcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHNhbWVJZCA9IGZ1bmN0aW9uKG8xLCBvMikge3JldHVybiBvMS5pZCA9PT0gbzIuaWQ7fTtcbiAgICAgKlxuICAgICAqICAgICAgUi5pbnRlcnNlY3Rpb25XaXRoKHNhbWVJZCwgYnVmZmFsb1NwcmluZ2ZpZWxkLCBjc255KTtcbiAgICAgKiAgICAgIC8vPT4gW3tpZDogNDU2LCBuYW1lOiAnU3RlcGhlbiBTdGlsbHMnfSwge2lkOiAxNzcsIG5hbWU6ICdOZWlsIFlvdW5nJ31dXG4gICAgICovXG4gICAgdmFyIGludGVyc2VjdGlvbldpdGggPSBfY3VycnkzKGZ1bmN0aW9uIGludGVyc2VjdGlvbldpdGgocHJlZCwgbGlzdDEsIGxpc3QyKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gW10sIGlkeCA9IDA7XG4gICAgICAgIHdoaWxlIChpZHggPCBsaXN0MS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChfY29udGFpbnNXaXRoKHByZWQsIGxpc3QxW2lkeF0sIGxpc3QyKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbcmVzdWx0cy5sZW5ndGhdID0gbGlzdDFbaWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmlxV2l0aChwcmVkLCByZXN1bHRzKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgbGlzdCB3aXRoIHRoZSBzZXBhcmF0b3IgaW50ZXJwb3NlZCBiZXR3ZWVuIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBhIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0geyp9IHNlcGFyYXRvciBUaGUgZWxlbWVudCB0byBhZGQgdG8gdGhlIGxpc3QuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBiZSBpbnRlcnBvc2VkLlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBUaGUgbmV3IGxpc3QuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5pbnRlcnNwZXJzZSgnbicsIFsnYmEnLCAnYScsICdhJ10pOyAvLz0+IFsnYmEnLCAnbicsICdhJywgJ24nLCAnYSddXG4gICAgICovXG4gICAgdmFyIGludGVyc3BlcnNlID0gX2N1cnJ5MihfY2hlY2tGb3JNZXRob2QoJ2ludGVyc3BlcnNlJywgZnVuY3Rpb24gaW50ZXJzcGVyc2Uoc2VwYXJhdG9yLCBsaXN0KSB7XG4gICAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHZhciBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGlkeCA9PT0gbGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIG91dC5wdXNoKGxpc3RbaWR4XSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG91dC5wdXNoKGxpc3RbaWR4XSwgc2VwYXJhdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSkpO1xuXG4gICAgLyoqXG4gICAgICogVHJhbnNmb3JtcyB0aGUgaXRlbXMgb2YgdGhlIGxpc3Qgd2l0aCB0aGUgdHJhbnNkdWNlciBhbmQgYXBwZW5kcyB0aGUgdHJhbnNmb3JtZWQgaXRlbXMgdG9cbiAgICAgKiB0aGUgYWNjdW11bGF0b3IgdXNpbmcgYW4gYXBwcm9wcmlhdGUgaXRlcmF0b3IgZnVuY3Rpb24gYmFzZWQgb24gdGhlIGFjY3VtdWxhdG9yIHR5cGUuXG4gICAgICpcbiAgICAgKiBUaGUgYWNjdW11bGF0b3IgY2FuIGJlIGFuIGFycmF5LCBzdHJpbmcsIG9iamVjdCBvciBhIHRyYW5zZm9ybWVyLiBJdGVyYXRlZCBpdGVtcyB3aWxsXG4gICAgICogYmUgYXBwZW5kZWQgdG8gYXJyYXlzIGFuZCBjb25jYXRlbmF0ZWQgdG8gc3RyaW5ncy4gT2JqZWN0cyB3aWxsIGJlIG1lcmdlZCBkaXJlY3RseSBvciAyLWl0ZW1cbiAgICAgKiBhcnJheXMgd2lsbCBiZSBtZXJnZWQgYXMga2V5LCB2YWx1ZSBwYWlycy5cbiAgICAgKlxuICAgICAqIFRoZSBhY2N1bXVsYXRvciBjYW4gYWxzbyBiZSBhIHRyYW5zZm9ybWVyIG9iamVjdCB0aGF0IHByb3ZpZGVzIGEgMi1hcml0eSByZWR1Y2luZyBpdGVyYXRvclxuICAgICAqIGZ1bmN0aW9uLCBzdGVwLCAwLWFyaXR5IGluaXRpYWwgdmFsdWUgZnVuY3Rpb24sIGluaXQsIGFuZCAxLWFyaXR5IHJlc3VsdCBleHRyYWN0aW9uIGZ1bmN0aW9uXG4gICAgICogcmVzdWx0LiBUaGUgc3RlcCBmdW5jdGlvbiBpcyB1c2VkIGFzIHRoZSBpdGVyYXRvciBmdW5jdGlvbiBpbiByZWR1Y2UuIFRoZSByZXN1bHQgZnVuY3Rpb24gaXNcbiAgICAgKiB1c2VkIHRvIGNvbnZlcnQgdGhlIGZpbmFsIGFjY3VtdWxhdG9yIGludG8gdGhlIHJldHVybiB0eXBlIGFuZCBpbiBtb3N0IGNhc2VzIGlzIFIuaWRlbnRpdHkuXG4gICAgICogVGhlIGluaXQgZnVuY3Rpb24gaXMgdXNlZCB0byBwcm92aWRlIHRoZSBpbml0aWFsIGFjY3VtdWxhdG9yLlxuICAgICAqXG4gICAgICogVGhlIGl0ZXJhdGlvbiBpcyBwZXJmb3JtZWQgd2l0aCBSLnJlZHVjZSBhZnRlciBpbml0aWFsaXppbmcgdGhlIHRyYW5zZHVjZXIuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIGEgLT4gKGIgLT4gYikgLT4gW2NdIC0+IGFcbiAgICAgKiBAcGFyYW0geyp9IGFjYyBUaGUgaW5pdGlhbCBhY2N1bXVsYXRvciB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB4ZiBUaGUgdHJhbnNkdWNlciBmdW5jdGlvbi4gUmVjZWl2ZXMgYSB0cmFuc2Zvcm1lciBhbmQgcmV0dXJucyBhIHRyYW5zZm9ybWVyLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEByZXR1cm4geyp9IFRoZSBmaW5hbCwgYWNjdW11bGF0ZWQgdmFsdWUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIG51bWJlcnMgPSBbMSwgMiwgMywgNF07XG4gICAgICogICAgICB2YXIgdHJhbnNkdWNlciA9IFIuY29tcG9zZShSLm1hcChSLmFkZCgxKSksIFIudGFrZSgyKSk7XG4gICAgICpcbiAgICAgKiAgICAgIFIuaW50byhbXSwgdHJhbnNkdWNlciwgbnVtYmVycyk7IC8vPT4gWzIsIDNdXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBpbnRvQXJyYXkgPSBSLmludG8oW10pO1xuICAgICAqICAgICAgaW50b0FycmF5KHRyYW5zZHVjZXIsIG51bWJlcnMpOyAvLz0+IFsyLCAzXVxuICAgICAqL1xuICAgIHZhciBpbnRvID0gX2N1cnJ5MyhmdW5jdGlvbiBpbnRvKGFjYywgeGYsIGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIF9pc1RyYW5zZm9ybWVyKGFjYykgPyBfcmVkdWNlKHhmKGFjYyksIGFjY1snQEB0cmFuc2R1Y2VyL2luaXQnXSgpLCBsaXN0KSA6IF9yZWR1Y2UoeGYoX3N0ZXBDYXQoYWNjKSksIGFjYywgbGlzdCk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBTYW1lIGFzIFIuaW52ZXJ0T2JqLCBob3dldmVyIHRoaXMgYWNjb3VudHMgZm9yIG9iamVjdHNcbiAgICAgKiB3aXRoIGR1cGxpY2F0ZSB2YWx1ZXMgYnkgcHV0dGluZyB0aGUgdmFsdWVzIGludG8gYW5cbiAgICAgKiBhcnJheS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNpZyB7czogeH0gLT4ge3g6IFsgcywgLi4uIF19XG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IG9yIGFycmF5IHRvIGludmVydFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gb3V0IEEgbmV3IG9iamVjdCB3aXRoIGtleXNcbiAgICAgKiBpbiBhbiBhcnJheS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgcmFjZVJlc3VsdHNCeUZpcnN0TmFtZSA9IHtcbiAgICAgKiAgICAgICAgZmlyc3Q6ICdhbGljZScsXG4gICAgICogICAgICAgIHNlY29uZDogJ2pha2UnLFxuICAgICAqICAgICAgICB0aGlyZDogJ2FsaWNlJyxcbiAgICAgKiAgICAgIH07XG4gICAgICogICAgICBSLmludmVydChyYWNlUmVzdWx0c0J5Rmlyc3ROYW1lKTtcbiAgICAgKiAgICAgIC8vPT4geyAnYWxpY2UnOiBbJ2ZpcnN0JywgJ3RoaXJkJ10sICdqYWtlJzpbJ3NlY29uZCddIH1cbiAgICAgKi9cbiAgICB2YXIgaW52ZXJ0ID0gX2N1cnJ5MShmdW5jdGlvbiBpbnZlcnQob2JqKSB7XG4gICAgICAgIHZhciBwcm9wcyA9IGtleXMob2JqKTtcbiAgICAgICAgdmFyIGxlbiA9IHByb3BzLmxlbmd0aDtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHZhciBvdXQgPSB7fTtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgdmFyIGtleSA9IHByb3BzW2lkeF07XG4gICAgICAgICAgICB2YXIgdmFsID0gb2JqW2tleV07XG4gICAgICAgICAgICB2YXIgbGlzdCA9IF9oYXModmFsLCBvdXQpID8gb3V0W3ZhbF0gOiBvdXRbdmFsXSA9IFtdO1xuICAgICAgICAgICAgbGlzdFtsaXN0Lmxlbmd0aF0gPSBrZXk7XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG5ldyBvYmplY3Qgd2l0aCB0aGUga2V5cyBvZiB0aGUgZ2l2ZW4gb2JqZWN0XG4gICAgICogYXMgdmFsdWVzLCBhbmQgdGhlIHZhbHVlcyBvZiB0aGUgZ2l2ZW4gb2JqZWN0IGFzIGtleXMuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcge3M6IHh9IC0+IHt4OiBzfVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCBvciBhcnJheSB0byBpbnZlcnRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IG91dCBBIG5ldyBvYmplY3RcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgcmFjZVJlc3VsdHMgPSB7XG4gICAgICogICAgICAgIGZpcnN0OiAnYWxpY2UnLFxuICAgICAqICAgICAgICBzZWNvbmQ6ICdqYWtlJ1xuICAgICAqICAgICAgfTtcbiAgICAgKiAgICAgIFIuaW52ZXJ0T2JqKHJhY2VSZXN1bHRzKTtcbiAgICAgKiAgICAgIC8vPT4geyAnYWxpY2UnOiAnZmlyc3QnLCAnamFrZSc6J3NlY29uZCcgfVxuICAgICAqXG4gICAgICogICAgICAvLyBBbHRlcm5hdGl2ZWx5OlxuICAgICAqICAgICAgdmFyIHJhY2VSZXN1bHRzID0gWydhbGljZScsICdqYWtlJ107XG4gICAgICogICAgICBSLmludmVydE9iaihyYWNlUmVzdWx0cyk7XG4gICAgICogICAgICAvLz0+IHsgJ2FsaWNlJzogJzAnLCAnamFrZSc6JzEnIH1cbiAgICAgKi9cbiAgICB2YXIgaW52ZXJ0T2JqID0gX2N1cnJ5MShmdW5jdGlvbiBpbnZlcnRPYmoob2JqKSB7XG4gICAgICAgIHZhciBwcm9wcyA9IGtleXMob2JqKTtcbiAgICAgICAgdmFyIGxlbiA9IHByb3BzLmxlbmd0aDtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHZhciBvdXQgPSB7fTtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgdmFyIGtleSA9IHByb3BzW2lkeF07XG4gICAgICAgICAgICBvdXRbb2JqW2tleV1dID0ga2V5O1xuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxhc3QgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2VlIFIuaW5pdCwgUi5oZWFkLCBSLnRhaWxcbiAgICAgKiBAc2lnIFthXSAtPiBhIHwgVW5kZWZpbmVkXG4gICAgICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gICAgICogQHBhcmFtIHsqfSBsaXN0XG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmxhc3QoWydmaScsICdmbycsICdmdW0nXSk7IC8vPT4gJ2Z1bSdcbiAgICAgKiAgICAgIFIubGFzdChbXSk7IC8vPT4gdW5kZWZpbmVkXG4gICAgICpcbiAgICAgKiAgICAgIFIubGFzdCgnYWJjJyk7IC8vPT4gJ2MnXG4gICAgICogICAgICBSLmxhc3QoJycpOyAvLz0+ICcnXG4gICAgICovXG4gICAgdmFyIGxhc3QgPSBudGgoLTEpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiBhbiBpdGVtIGluXG4gICAgICogYW4gYXJyYXksIG9yIC0xIGlmIHRoZSBpdGVtIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgYXJyYXkuXG4gICAgICogYFIuZXF1YWxzYCBpcyB1c2VkIHRvIGRldGVybWluZSBlcXVhbGl0eS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgYSAtPiBbYV0gLT4gTnVtYmVyXG4gICAgICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIGl0ZW0gdG8gZmluZC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSB4cyBUaGUgYXJyYXkgdG8gc2VhcmNoIGluLlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gdGhlIGluZGV4IG9mIHRoZSB0YXJnZXQsIG9yIC0xIGlmIHRoZSB0YXJnZXQgaXMgbm90IGZvdW5kLlxuICAgICAqIEBzZWUgUi5pbmRleE9mXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5sYXN0SW5kZXhPZigzLCBbLTEsMywzLDAsMSwyLDMsNF0pOyAvLz0+IDZcbiAgICAgKiAgICAgIFIubGFzdEluZGV4T2YoMTAsIFsxLDIsMyw0XSk7IC8vPT4gLTFcbiAgICAgKi9cbiAgICB2YXIgbGFzdEluZGV4T2YgPSBfY3VycnkyKGZ1bmN0aW9uIGxhc3RJbmRleE9mKHRhcmdldCwgeHMpIHtcbiAgICAgICAgaWYgKF9oYXNNZXRob2QoJ2xhc3RJbmRleE9mJywgeHMpKSB7XG4gICAgICAgICAgICByZXR1cm4geHMubGFzdEluZGV4T2YodGFyZ2V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBpZHggPSB4cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgd2hpbGUgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVxdWFscyh4c1tpZHhdLCB0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpZHg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlkeCAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3QsIGNvbnN0cnVjdGVkIGJ5IGFwcGx5aW5nIHRoZSBzdXBwbGllZCBmdW5jdGlvbiB0byBldmVyeSBlbGVtZW50IG9mIHRoZVxuICAgICAqIHN1cHBsaWVkIGxpc3QuXG4gICAgICpcbiAgICAgKiBOb3RlOiBgUi5tYXBgIGRvZXMgbm90IHNraXAgZGVsZXRlZCBvciB1bmFzc2lnbmVkIGluZGljZXMgKHNwYXJzZSBhcnJheXMpLCB1bmxpa2UgdGhlXG4gICAgICogbmF0aXZlIGBBcnJheS5wcm90b3R5cGUubWFwYCBtZXRob2QuIEZvciBtb3JlIGRldGFpbHMgb24gdGhpcyBiZWhhdmlvciwgc2VlOlxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L21hcCNEZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICAgICAqIEBzZWUgUi50cmFuc2R1Y2VcbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEgLT4gYikgLT4gW2FdIC0+IFtiXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gZXZlcnkgZWxlbWVudCBvZiB0aGUgaW5wdXQgYGxpc3RgLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gYmUgaXRlcmF0ZWQgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIG5ldyBsaXN0LlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBkb3VibGUgPSBmdW5jdGlvbih4KSB7XG4gICAgICogICAgICAgIHJldHVybiB4ICogMjtcbiAgICAgKiAgICAgIH07XG4gICAgICpcbiAgICAgKiAgICAgIFIubWFwKGRvdWJsZSwgWzEsIDIsIDNdKTsgLy89PiBbMiwgNCwgNl1cbiAgICAgKi9cbiAgICB2YXIgbWFwID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKCdtYXAnLCBfeG1hcCwgX21hcCkpO1xuXG4gICAgLyoqXG4gICAgICogTWFwLCBidXQgZm9yIG9iamVjdHMuIENyZWF0ZXMgYW4gb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhcyBgb2JqYCBhbmQgdmFsdWVzXG4gICAgICogZ2VuZXJhdGVkIGJ5IHJ1bm5pbmcgZWFjaCBwcm9wZXJ0eSBvZiBgb2JqYCB0aHJvdWdoIGBmbmAuIGBmbmAgaXMgcGFzc2VkIG9uZSBhcmd1bWVudDpcbiAgICAgKiAqKHZhbHVlKSouXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcgKHYgLT4gdikgLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEEgZnVuY3Rpb24gY2FsbGVkIGZvciBlYWNoIHByb3BlcnR5IGluIGBvYmpgLiBJdHMgcmV0dXJuIHZhbHVlIHdpbGxcbiAgICAgKiBiZWNvbWUgYSBuZXcgcHJvcGVydHkgb24gdGhlIHJldHVybiBvYmplY3QuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEEgbmV3IG9iamVjdCB3aXRoIHRoZSBzYW1lIGtleXMgYXMgYG9iamAgYW5kIHZhbHVlcyB0aGF0IGFyZSB0aGUgcmVzdWx0XG4gICAgICogICAgICAgICBvZiBydW5uaW5nIGVhY2ggcHJvcGVydHkgdGhyb3VnaCBgZm5gLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciB2YWx1ZXMgPSB7IHg6IDEsIHk6IDIsIHo6IDMgfTtcbiAgICAgKiAgICAgIHZhciBkb3VibGUgPSBmdW5jdGlvbihudW0pIHtcbiAgICAgKiAgICAgICAgcmV0dXJuIG51bSAqIDI7XG4gICAgICogICAgICB9O1xuICAgICAqXG4gICAgICogICAgICBSLm1hcE9iaihkb3VibGUsIHZhbHVlcyk7IC8vPT4geyB4OiAyLCB5OiA0LCB6OiA2IH1cbiAgICAgKi9cbiAgICB2YXIgbWFwT2JqID0gX2N1cnJ5MihmdW5jdGlvbiBtYXBPYmooZm4sIG9iaikge1xuICAgICAgICByZXR1cm4gX3JlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gZm4ob2JqW2tleV0pO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30sIGtleXMob2JqKSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBMaWtlIGBtYXBPYmpgLCBidXQgYnV0IHBhc3NlcyBhZGRpdGlvbmFsIGFyZ3VtZW50cyB0byB0aGUgcHJlZGljYXRlIGZ1bmN0aW9uLiBUaGVcbiAgICAgKiBwcmVkaWNhdGUgZnVuY3Rpb24gaXMgcGFzc2VkIHRocmVlIGFyZ3VtZW50czogKih2YWx1ZSwga2V5LCBvYmopKi5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNpZyAodiwgaywge2s6IHZ9IC0+IHYpIC0+IHtrOiB2fSAtPiB7azogdn1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBBIGZ1bmN0aW9uIGNhbGxlZCBmb3IgZWFjaCBwcm9wZXJ0eSBpbiBgb2JqYC4gSXRzIHJldHVybiB2YWx1ZSB3aWxsXG4gICAgICogICAgICAgIGJlY29tZSBhIG5ldyBwcm9wZXJ0eSBvbiB0aGUgcmV0dXJuIG9iamVjdC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQSBuZXcgb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhcyBgb2JqYCBhbmQgdmFsdWVzIHRoYXQgYXJlIHRoZSByZXN1bHRcbiAgICAgKiAgICAgICAgIG9mIHJ1bm5pbmcgZWFjaCBwcm9wZXJ0eSB0aHJvdWdoIGBmbmAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHZhbHVlcyA9IHsgeDogMSwgeTogMiwgejogMyB9O1xuICAgICAqICAgICAgdmFyIHByZXBlbmRLZXlBbmREb3VibGUgPSBmdW5jdGlvbihudW0sIGtleSwgb2JqKSB7XG4gICAgICogICAgICAgIHJldHVybiBrZXkgKyAobnVtICogMik7XG4gICAgICogICAgICB9O1xuICAgICAqXG4gICAgICogICAgICBSLm1hcE9iakluZGV4ZWQocHJlcGVuZEtleUFuZERvdWJsZSwgdmFsdWVzKTsgLy89PiB7IHg6ICd4MicsIHk6ICd5NCcsIHo6ICd6NicgfVxuICAgICAqL1xuICAgIHZhciBtYXBPYmpJbmRleGVkID0gX2N1cnJ5MihmdW5jdGlvbiBtYXBPYmpJbmRleGVkKGZuLCBvYmopIHtcbiAgICAgICAgcmV0dXJuIF9yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IGZuKG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSwga2V5cyhvYmopKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIG5vIGVsZW1lbnRzIG9mIHRoZSBsaXN0IG1hdGNoIHRoZSBwcmVkaWNhdGUsXG4gICAgICogYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIHByZWRpY2F0ZSBpcyBub3Qgc2F0aXNmaWVkIGJ5IGV2ZXJ5IGVsZW1lbnQsIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgICAqIEBzZWUgUi5hbGwsIFIuYW55XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5ub25lKFIuaXNOYU4sIFsxLCAyLCAzXSk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5ub25lKFIuaXNOYU4sIFsxLCAyLCAzLCBOYU5dKTsgLy89PiBmYWxzZVxuICAgICAqL1xuICAgIHZhciBub25lID0gX2N1cnJ5MihfY29tcGxlbWVudChfZGlzcGF0Y2hhYmxlKCdhbnknLCBfeGFueSwgYW55KSkpO1xuXG4gICAgLyoqXG4gICAgICogQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGZpcnN0IHRydXRoeSBvZiB0d28gYXJndW1lbnRzIG90aGVyd2lzZSB0aGVcbiAgICAgKiBsYXN0IGFyZ3VtZW50LiBOb3RlIHRoYXQgdGhpcyBpcyBOT1Qgc2hvcnQtY2lyY3VpdGVkLCBtZWFuaW5nIHRoYXQgaWZcbiAgICAgKiBleHByZXNzaW9ucyBhcmUgcGFzc2VkIHRoZXkgYXJlIGJvdGggZXZhbHVhdGVkLlxuICAgICAqXG4gICAgICogRGlzcGF0Y2hlcyB0byB0aGUgYG9yYCBtZXRob2Qgb2YgdGhlIGZpcnN0IGFyZ3VtZW50IGlmIGFwcGxpY2FibGUuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExvZ2ljXG4gICAgICogQHNpZyAqIC0+ICogLT4gKlxuICAgICAqIEBwYXJhbSB7Kn0gYSBhbnkgdmFsdWVcbiAgICAgKiBAcGFyYW0geyp9IGIgYW55IG90aGVyIHZhbHVlXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGZpcnN0IHRydXRoeSBhcmd1bWVudCwgb3RoZXJ3aXNlIHRoZSBsYXN0IGFyZ3VtZW50LlxuICAgICAqIEBzZWUgUi5laXRoZXJcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLm9yKGZhbHNlLCB0cnVlKTsgLy89PiB0cnVlXG4gICAgICogICAgICBSLm9yKDAsIFtdKTsgLy89PiBbXVxuICAgICAqICAgICAgUi5vcihudWxsLCAnJyk7ID0+ICcnXG4gICAgICovXG4gICAgdmFyIG9yID0gX2N1cnJ5MihmdW5jdGlvbiBvcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBfaGFzTWV0aG9kKCdvcicsIGEpID8gYS5vcihiKSA6IGEgfHwgYjtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEFjY2VwdHMgYXMgaXRzIGFyZ3VtZW50cyBhIGZ1bmN0aW9uIGFuZCBhbnkgbnVtYmVyIG9mIHZhbHVlcyBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQsXG4gICAgICogd2hlbiBpbnZva2VkLCBjYWxscyB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gd2l0aCBhbGwgb2YgdGhlIHZhbHVlcyBwcmVwZW5kZWQgdG8gdGhlXG4gICAgICogb3JpZ2luYWwgZnVuY3Rpb24ncyBhcmd1bWVudHMgbGlzdC4gSW4gc29tZSBsaWJyYXJpZXMgdGhpcyBmdW5jdGlvbiBpcyBuYW1lZCBgYXBwbHlMZWZ0YC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIChhIC0+IGIgLT4gLi4uIC0+IGkgLT4gaiAtPiAuLi4gLT4gbSAtPiBuKSAtPiBhIC0+IGItPiAuLi4gLT4gaSAtPiAoaiAtPiAuLi4gLT4gbSAtPiBuKVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gICAgICogQHBhcmFtIHsuLi4qfSBbYXJnc10gQXJndW1lbnRzIHRvIHByZXBlbmQgdG8gYGZuYCB3aGVuIHRoZSByZXR1cm5lZCBmdW5jdGlvbiBpcyBpbnZva2VkLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB3cmFwcGluZyBgZm5gLiBXaGVuIGludm9rZWQsIGl0IHdpbGwgY2FsbCBgZm5gXG4gICAgICogICAgICAgICB3aXRoIGBhcmdzYCBwcmVwZW5kZWQgdG8gYGZuYCdzIGFyZ3VtZW50cyBsaXN0LlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBtdWx0aXBseSA9IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEgKiBiOyB9O1xuICAgICAqICAgICAgdmFyIGRvdWJsZSA9IFIucGFydGlhbChtdWx0aXBseSwgMik7XG4gICAgICogICAgICBkb3VibGUoMik7IC8vPT4gNFxuICAgICAqXG4gICAgICogICAgICB2YXIgZ3JlZXQgPSBmdW5jdGlvbihzYWx1dGF0aW9uLCB0aXRsZSwgZmlyc3ROYW1lLCBsYXN0TmFtZSkge1xuICAgICAqICAgICAgICByZXR1cm4gc2FsdXRhdGlvbiArICcsICcgKyB0aXRsZSArICcgJyArIGZpcnN0TmFtZSArICcgJyArIGxhc3ROYW1lICsgJyEnO1xuICAgICAqICAgICAgfTtcbiAgICAgKiAgICAgIHZhciBzYXlIZWxsbyA9IFIucGFydGlhbChncmVldCwgJ0hlbGxvJyk7XG4gICAgICogICAgICB2YXIgc2F5SGVsbG9Ub01zID0gUi5wYXJ0aWFsKHNheUhlbGxvLCAnTXMuJyk7XG4gICAgICogICAgICBzYXlIZWxsb1RvTXMoJ0phbmUnLCAnSm9uZXMnKTsgLy89PiAnSGVsbG8sIE1zLiBKYW5lIEpvbmVzISdcbiAgICAgKi9cbiAgICB2YXIgcGFydGlhbCA9IGN1cnJ5KF9jcmVhdGVQYXJ0aWFsQXBwbGljYXRvcihfY29uY2F0KSk7XG5cbiAgICAvKipcbiAgICAgKiBBY2NlcHRzIGFzIGl0cyBhcmd1bWVudHMgYSBmdW5jdGlvbiBhbmQgYW55IG51bWJlciBvZiB2YWx1ZXMgYW5kIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0LFxuICAgICAqIHdoZW4gaW52b2tlZCwgY2FsbHMgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIHdpdGggYWxsIG9mIHRoZSB2YWx1ZXMgYXBwZW5kZWQgdG8gdGhlIG9yaWdpbmFsXG4gICAgICogZnVuY3Rpb24ncyBhcmd1bWVudHMgbGlzdC5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCBgcGFydGlhbFJpZ2h0YCBpcyB0aGUgb3Bwb3NpdGUgb2YgYHBhcnRpYWxgOiBgcGFydGlhbFJpZ2h0YCBmaWxscyBgZm5gJ3MgYXJndW1lbnRzXG4gICAgICogZnJvbSB0aGUgcmlnaHQgdG8gdGhlIGxlZnQuICBJbiBzb21lIGxpYnJhcmllcyB0aGlzIGZ1bmN0aW9uIGlzIG5hbWVkIGBhcHBseVJpZ2h0YC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIChhIC0+IGItPiAuLi4gLT4gaSAtPiBqIC0+IC4uLiAtPiBtIC0+IG4pIC0+IGogLT4gLi4uIC0+IG0gLT4gbiAtPiAoYSAtPiBiLT4gLi4uIC0+IGkpXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAgICAgKiBAcGFyYW0gey4uLip9IFthcmdzXSBBcmd1bWVudHMgdG8gYXBwZW5kIHRvIGBmbmAgd2hlbiB0aGUgcmV0dXJuZWQgZnVuY3Rpb24gaXMgaW52b2tlZC5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gd3JhcHBpbmcgYGZuYC4gV2hlbiBpbnZva2VkLCBpdCB3aWxsIGNhbGwgYGZuYCB3aXRoXG4gICAgICogICAgICAgICBgYXJnc2AgYXBwZW5kZWQgdG8gYGZuYCdzIGFyZ3VtZW50cyBsaXN0LlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBncmVldCA9IGZ1bmN0aW9uKHNhbHV0YXRpb24sIHRpdGxlLCBmaXJzdE5hbWUsIGxhc3ROYW1lKSB7XG4gICAgICogICAgICAgIHJldHVybiBzYWx1dGF0aW9uICsgJywgJyArIHRpdGxlICsgJyAnICsgZmlyc3ROYW1lICsgJyAnICsgbGFzdE5hbWUgKyAnISc7XG4gICAgICogICAgICB9O1xuICAgICAqICAgICAgdmFyIGdyZWV0TXNKYW5lSm9uZXMgPSBSLnBhcnRpYWxSaWdodChncmVldCwgJ01zLicsICdKYW5lJywgJ0pvbmVzJyk7XG4gICAgICpcbiAgICAgKiAgICAgIGdyZWV0TXNKYW5lSm9uZXMoJ0hlbGxvJyk7IC8vPT4gJ0hlbGxvLCBNcy4gSmFuZSBKb25lcyEnXG4gICAgICovXG4gICAgdmFyIHBhcnRpYWxSaWdodCA9IGN1cnJ5KF9jcmVhdGVQYXJ0aWFsQXBwbGljYXRvcihmbGlwKF9jb25jYXQpKSk7XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhIHByZWRpY2F0ZSBhbmQgYSBsaXN0IGFuZCByZXR1cm5zIHRoZSBwYWlyIG9mIGxpc3RzIG9mXG4gICAgICogZWxlbWVudHMgd2hpY2ggZG8gYW5kIGRvIG5vdCBzYXRpc2Z5IHRoZSBwcmVkaWNhdGUsIHJlc3BlY3RpdmVseS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFtbYV0sW2FdXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgQSBwcmVkaWNhdGUgdG8gZGV0ZXJtaW5lIHdoaWNoIGFycmF5IHRoZSBlbGVtZW50IGJlbG9uZ3MgdG8uXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gcGFydGl0aW9uLlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBBIG5lc3RlZCBhcnJheSwgY29udGFpbmluZyBmaXJzdCBhbiBhcnJheSBvZiBlbGVtZW50cyB0aGF0IHNhdGlzZmllZCB0aGUgcHJlZGljYXRlLFxuICAgICAqICAgICAgICAgYW5kIHNlY29uZCBhbiBhcnJheSBvZiBlbGVtZW50cyB0aGF0IGRpZCBub3Qgc2F0aXNmeS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnBhcnRpdGlvbihSLmNvbnRhaW5zKCdzJyksIFsnc3NzJywgJ3R0dCcsICdmb28nLCAnYmFycyddKTtcbiAgICAgKiAgICAgIC8vPT4gWyBbICdzc3MnLCAnYmFycycgXSwgIFsgJ3R0dCcsICdmb28nIF0gXVxuICAgICAqL1xuICAgIHZhciBwYXJ0aXRpb24gPSBfY3VycnkyKGZ1bmN0aW9uIHBhcnRpdGlvbihwcmVkLCBsaXN0KSB7XG4gICAgICAgIHJldHVybiBfcmVkdWNlKGZ1bmN0aW9uIChhY2MsIGVsdCkge1xuICAgICAgICAgICAgdmFyIHhzID0gYWNjW3ByZWQoZWx0KSA/IDAgOiAxXTtcbiAgICAgICAgICAgIHhzW3hzLmxlbmd0aF0gPSBlbHQ7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCBbXG4gICAgICAgICAgICBbXSxcbiAgICAgICAgICAgIFtdXG4gICAgICAgIF0sIGxpc3QpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgbmVzdGVkIHBhdGggb24gYW4gb2JqZWN0IGhhcyBhIHNwZWNpZmljIHZhbHVlLFxuICAgICAqIGluIGBSLmVxdWFsc2AgdGVybXMuIE1vc3QgbGlrZWx5IHVzZWQgdG8gZmlsdGVyIGEgbGlzdC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAgICAgKiBAc2lnIFtTdHJpbmddIC0+ICogLT4ge1N0cmluZzogKn0gLT4gQm9vbGVhblxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhdGggVGhlIHBhdGggb2YgdGhlIG5lc3RlZCBwcm9wZXJ0eSB0byB1c2VcbiAgICAgKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gY29tcGFyZSB0aGUgbmVzdGVkIHByb3BlcnR5IHdpdGhcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2sgdGhlIG5lc3RlZCBwcm9wZXJ0eSBpblxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgdmFsdWUgZXF1YWxzIHRoZSBuZXN0ZWQgb2JqZWN0IHByb3BlcnR5LFxuICAgICAqICAgICAgICAgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHVzZXIxID0geyBhZGRyZXNzOiB7IHppcENvZGU6IDkwMjEwIH0gfTtcbiAgICAgKiAgICAgIHZhciB1c2VyMiA9IHsgYWRkcmVzczogeyB6aXBDb2RlOiA1NTU1NSB9IH07XG4gICAgICogICAgICB2YXIgdXNlcjMgPSB7IG5hbWU6ICdCb2InIH07XG4gICAgICogICAgICB2YXIgdXNlcnMgPSBbIHVzZXIxLCB1c2VyMiwgdXNlcjMgXTtcbiAgICAgKiAgICAgIHZhciBpc0ZhbW91cyA9IFIucGF0aEVxKFsnYWRkcmVzcycsICd6aXBDb2RlJ10sIDkwMjEwKTtcbiAgICAgKiAgICAgIFIuZmlsdGVyKGlzRmFtb3VzLCB1c2Vycyk7IC8vPT4gWyB1c2VyMSBdXG4gICAgICovXG4gICAgdmFyIHBhdGhFcSA9IF9jdXJyeTMoZnVuY3Rpb24gcGF0aEVxKF9wYXRoLCB2YWwsIG9iaikge1xuICAgICAgICByZXR1cm4gZXF1YWxzKHBhdGgoX3BhdGgsIG9iaiksIHZhbCk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3QgYnkgcGx1Y2tpbmcgdGhlIHNhbWUgbmFtZWQgcHJvcGVydHkgb2ZmIGFsbCBvYmplY3RzIGluIHRoZSBsaXN0IHN1cHBsaWVkLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBrIC0+IFt7azogdn1dIC0+IFt2XVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30ga2V5IFRoZSBrZXkgbmFtZSB0byBwbHVjayBvZmYgb2YgZWFjaCBvYmplY3QuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHJldHVybiB7QXJyYXl9IFRoZSBsaXN0IG9mIHZhbHVlcyBmb3IgdGhlIGdpdmVuIGtleS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnBsdWNrKCdhJykoW3thOiAxfSwge2E6IDJ9XSk7IC8vPT4gWzEsIDJdXG4gICAgICogICAgICBSLnBsdWNrKDApKFtbMSwgMl0sIFszLCA0XV0pOyAgIC8vPT4gWzEsIDNdXG4gICAgICovXG4gICAgdmFyIHBsdWNrID0gX2N1cnJ5MihmdW5jdGlvbiBwbHVjayhwLCBsaXN0KSB7XG4gICAgICAgIHJldHVybiBtYXAocHJvcChwKSwgbGlzdCk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgc3BlY2lmaWVkIG9iamVjdCBwcm9wZXJ0eSBpcyBlcXVhbCwgaW4gYFIuZXF1YWxzYFxuICAgICAqIHRlcm1zLCB0byB0aGUgZ2l2ZW4gdmFsdWU7IGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICAgICAqIEBzaWcgU3RyaW5nIC0+IGEgLT4gT2JqZWN0IC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsXG4gICAgICogQHBhcmFtIHsqfSBvYmpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqIEBzZWUgUi5lcXVhbHMsIFIucHJvcFNhdGlzZmllc1xuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBhYmJ5ID0ge25hbWU6ICdBYmJ5JywgYWdlOiA3LCBoYWlyOiAnYmxvbmQnfTtcbiAgICAgKiAgICAgIHZhciBmcmVkID0ge25hbWU6ICdGcmVkJywgYWdlOiAxMiwgaGFpcjogJ2Jyb3duJ307XG4gICAgICogICAgICB2YXIgcnVzdHkgPSB7bmFtZTogJ1J1c3R5JywgYWdlOiAxMCwgaGFpcjogJ2Jyb3duJ307XG4gICAgICogICAgICB2YXIgYWxvaXMgPSB7bmFtZTogJ0Fsb2lzJywgYWdlOiAxNSwgZGlzcG9zaXRpb246ICdzdXJseSd9O1xuICAgICAqICAgICAgdmFyIGtpZHMgPSBbYWJieSwgZnJlZCwgcnVzdHksIGFsb2lzXTtcbiAgICAgKiAgICAgIHZhciBoYXNCcm93bkhhaXIgPSBSLnByb3BFcSgnaGFpcicsICdicm93bicpO1xuICAgICAqICAgICAgUi5maWx0ZXIoaGFzQnJvd25IYWlyLCBraWRzKTsgLy89PiBbZnJlZCwgcnVzdHldXG4gICAgICovXG4gICAgdmFyIHByb3BFcSA9IF9jdXJyeTMoZnVuY3Rpb24gcHJvcEVxKG5hbWUsIHZhbCwgb2JqKSB7XG4gICAgICAgIHJldHVybiBwcm9wU2F0aXNmaWVzKGVxdWFscyh2YWwpLCBuYW1lLCBvYmopO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHNwZWNpZmllZCBvYmplY3QgcHJvcGVydHkgaXMgb2YgdGhlIGdpdmVuIHR5cGU7XG4gICAgICogYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IFR5cGVcbiAgICAgKiBAc2lnIFR5cGUgLT4gU3RyaW5nIC0+IE9iamVjdCAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gdHlwZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHsqfSBvYmpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqIEBzZWUgUi5pc1xuICAgICAqIEBzZWUgUi5wcm9wU2F0aXNmaWVzXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5wcm9wSXMoTnVtYmVyLCAneCcsIHt4OiAxLCB5OiAyfSk7ICAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIucHJvcElzKE51bWJlciwgJ3gnLCB7eDogJ2Zvbyd9KTsgICAgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5wcm9wSXMoTnVtYmVyLCAneCcsIHt9KTsgICAgICAgICAgICAvLz0+IGZhbHNlXG4gICAgICovXG4gICAgdmFyIHByb3BJcyA9IF9jdXJyeTMoZnVuY3Rpb24gcHJvcElzKHR5cGUsIG5hbWUsIG9iaikge1xuICAgICAgICByZXR1cm4gcHJvcFNhdGlzZmllcyhpcyh0eXBlKSwgbmFtZSwgb2JqKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzaW5nbGUgaXRlbSBieSBpdGVyYXRpbmcgdGhyb3VnaCB0aGUgbGlzdCwgc3VjY2Vzc2l2ZWx5IGNhbGxpbmcgdGhlIGl0ZXJhdG9yXG4gICAgICogZnVuY3Rpb24gYW5kIHBhc3NpbmcgaXQgYW4gYWNjdW11bGF0b3IgdmFsdWUgYW5kIHRoZSBjdXJyZW50IHZhbHVlIGZyb20gdGhlIGFycmF5LCBhbmRcbiAgICAgKiB0aGVuIHBhc3NpbmcgdGhlIHJlc3VsdCB0byB0aGUgbmV4dCBjYWxsLlxuICAgICAqXG4gICAgICogVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIHJlY2VpdmVzIHR3byB2YWx1ZXM6ICooYWNjLCB2YWx1ZSkqLiAgSXQgbWF5IHVzZSBgUi5yZWR1Y2VkYCB0b1xuICAgICAqIHNob3J0Y3V0IHRoZSBpdGVyYXRpb24uXG4gICAgICpcbiAgICAgKiBOb3RlOiBgUi5yZWR1Y2VgIGRvZXMgbm90IHNraXAgZGVsZXRlZCBvciB1bmFzc2lnbmVkIGluZGljZXMgKHNwYXJzZSBhcnJheXMpLCB1bmxpa2VcbiAgICAgKiB0aGUgbmF0aXZlIGBBcnJheS5wcm90b3R5cGUucmVkdWNlYCBtZXRob2QuIEZvciBtb3JlIGRldGFpbHMgb24gdGhpcyBiZWhhdmlvciwgc2VlOlxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3JlZHVjZSNEZXNjcmlwdGlvblxuICAgICAqIEBzZWUgUi5yZWR1Y2VkXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhLGIgLT4gYSkgLT4gYSAtPiBbYl0gLT4gYVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBpdGVyYXRvciBmdW5jdGlvbi4gUmVjZWl2ZXMgdHdvIHZhbHVlcywgdGhlIGFjY3VtdWxhdG9yIGFuZCB0aGVcbiAgICAgKiAgICAgICAgY3VycmVudCBlbGVtZW50IGZyb20gdGhlIGFycmF5LlxuICAgICAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBhY2N1bXVsYXRvciB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHsqfSBUaGUgZmluYWwsIGFjY3VtdWxhdGVkIHZhbHVlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBudW1iZXJzID0gWzEsIDIsIDNdO1xuICAgICAqICAgICAgdmFyIGFkZCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgKiAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgICAqICAgICAgfTtcbiAgICAgKlxuICAgICAqICAgICAgUi5yZWR1Y2UoYWRkLCAxMCwgbnVtYmVycyk7IC8vPT4gMTZcbiAgICAgKi9cbiAgICB2YXIgcmVkdWNlID0gX2N1cnJ5MyhfcmVkdWNlKTtcblxuICAgIC8qKlxuICAgICAqIFNpbWlsYXIgdG8gYGZpbHRlcmAsIGV4Y2VwdCB0aGF0IGl0IGtlZXBzIG9ubHkgdmFsdWVzIGZvciB3aGljaCB0aGUgZ2l2ZW4gcHJlZGljYXRlXG4gICAgICogZnVuY3Rpb24gcmV0dXJucyBmYWxzeS4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiBpcyBwYXNzZWQgb25lIGFyZ3VtZW50OiAqKHZhbHVlKSouXG4gICAgICpcbiAgICAgKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gICAgICogQHNlZSBSLnRyYW5zZHVjZVxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gW2FdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXIgaXRlcmF0aW9uLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBUaGUgbmV3IGZpbHRlcmVkIGFycmF5LlxuICAgICAqIEBzZWUgUi5maWx0ZXJcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgaXNPZGQgPSBmdW5jdGlvbihuKSB7XG4gICAgICogICAgICAgIHJldHVybiBuICUgMiA9PT0gMTtcbiAgICAgKiAgICAgIH07XG4gICAgICogICAgICBSLnJlamVjdChpc09kZCwgWzEsIDIsIDMsIDRdKTsgLy89PiBbMiwgNF1cbiAgICAgKi9cbiAgICB2YXIgcmVqZWN0ID0gX2N1cnJ5MihmdW5jdGlvbiByZWplY3QoZm4sIGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIGZpbHRlcihfY29tcGxlbWVudChmbiksIGxpc3QpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZpeGVkIGxpc3Qgb2Ygc2l6ZSBgbmAgY29udGFpbmluZyBhIHNwZWNpZmllZCBpZGVudGljYWwgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIGEgLT4gbiAtPiBbYV1cbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byByZXBlYXQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG4gVGhlIGRlc2lyZWQgc2l6ZSBvZiB0aGUgb3V0cHV0IGxpc3QuXG4gICAgICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGFycmF5IGNvbnRhaW5pbmcgYG5gIGB2YWx1ZWBzLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIucmVwZWF0KCdoaScsIDUpOyAvLz0+IFsnaGknLCAnaGknLCAnaGknLCAnaGknLCAnaGknXVxuICAgICAqXG4gICAgICogICAgICB2YXIgb2JqID0ge307XG4gICAgICogICAgICB2YXIgcmVwZWF0ZWRPYmpzID0gUi5yZXBlYXQob2JqLCA1KTsgLy89PiBbe30sIHt9LCB7fSwge30sIHt9XVxuICAgICAqICAgICAgcmVwZWF0ZWRPYmpzWzBdID09PSByZXBlYXRlZE9ianNbMV07IC8vPT4gdHJ1ZVxuICAgICAqL1xuICAgIHZhciByZXBlYXQgPSBfY3VycnkyKGZ1bmN0aW9uIHJlcGVhdCh2YWx1ZSwgbikge1xuICAgICAgICByZXR1cm4gdGltZXMoYWx3YXlzKHZhbHVlKSwgbik7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcgKG9yIG9iamVjdCB3aXRoIGEgYHNsaWNlYFxuICAgICAqIG1ldGhvZCkgZnJvbSBgZnJvbUluZGV4YCAoaW5jbHVzaXZlKSB0byBgdG9JbmRleGAgKGV4Y2x1c2l2ZSkuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gW2FdIC0+IFthXVxuICAgICAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBTdHJpbmcgLT4gU3RyaW5nXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGZyb21JbmRleCBUaGUgc3RhcnQgaW5kZXggKGluY2x1c2l2ZSkuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRvSW5kZXggVGhlIGVuZCBpbmRleCAoZXhjbHVzaXZlKS5cbiAgICAgKiBAcGFyYW0geyp9IGxpc3RcbiAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuc2xpY2UoMSwgMywgWydhJywgJ2InLCAnYycsICdkJ10pOyAgICAgICAgLy89PiBbJ2InLCAnYyddXG4gICAgICogICAgICBSLnNsaWNlKDEsIEluZmluaXR5LCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7IC8vPT4gWydiJywgJ2MnLCAnZCddXG4gICAgICogICAgICBSLnNsaWNlKDAsIC0xLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7ICAgICAgIC8vPT4gWydhJywgJ2InLCAnYyddXG4gICAgICogICAgICBSLnNsaWNlKC0zLCAtMSwgWydhJywgJ2InLCAnYycsICdkJ10pOyAgICAgIC8vPT4gWydiJywgJ2MnXVxuICAgICAqICAgICAgUi5zbGljZSgwLCAzLCAncmFtZGEnKTsgICAgICAgICAgICAgICAgICAgICAvLz0+ICdyYW0nXG4gICAgICovXG4gICAgdmFyIHNsaWNlID0gX2N1cnJ5MyhfY2hlY2tGb3JNZXRob2QoJ3NsaWNlJywgZnVuY3Rpb24gc2xpY2UoZnJvbUluZGV4LCB0b0luZGV4LCBsaXN0KSB7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCBmcm9tSW5kZXgsIHRvSW5kZXgpO1xuICAgIH0pKTtcblxuICAgIC8qKlxuICAgICAqIFNwbGl0cyBhIGNvbGxlY3Rpb24gaW50byBzbGljZXMgb2YgdGhlIHNwZWNpZmllZCBsZW5ndGguXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIE51bWJlciAtPiBbYV0gLT4gW1thXV1cbiAgICAgKiBAc2lnIE51bWJlciAtPiBTdHJpbmcgLT4gW1N0cmluZ11cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gblxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3RcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnNwbGl0RXZlcnkoMywgWzEsIDIsIDMsIDQsIDUsIDYsIDddKTsgLy89PiBbWzEsIDIsIDNdLCBbNCwgNSwgNl0sIFs3XV1cbiAgICAgKiAgICAgIFIuc3BsaXRFdmVyeSgzLCAnZm9vYmFyYmF6Jyk7IC8vPT4gWydmb28nLCAnYmFyJywgJ2JheiddXG4gICAgICovXG4gICAgdmFyIHNwbGl0RXZlcnkgPSBfY3VycnkyKGZ1bmN0aW9uIHNwbGl0RXZlcnkobiwgbGlzdCkge1xuICAgICAgICBpZiAobiA8PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IHRvIHNwbGl0RXZlcnkgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXInKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHNsaWNlKGlkeCwgaWR4ICs9IG4sIGxpc3QpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQWRkcyB0b2dldGhlciBhbGwgdGhlIGVsZW1lbnRzIG9mIGEgbGlzdC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTWF0aFxuICAgICAqIEBzaWcgW051bWJlcl0gLT4gTnVtYmVyXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBBbiBhcnJheSBvZiBudW1iZXJzXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgc3VtIG9mIGFsbCB0aGUgbnVtYmVycyBpbiB0aGUgbGlzdC5cbiAgICAgKiBAc2VlIFIucmVkdWNlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5zdW0oWzIsNCw2LDgsMTAwLDFdKTsgLy89PiAxMjFcbiAgICAgKi9cbiAgICB2YXIgc3VtID0gcmVkdWNlKGFkZCwgMCk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBidXQgdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGdpdmVuIGxpc3Qgb3Igc3RyaW5nIChvciBvYmplY3RcbiAgICAgKiB3aXRoIGEgYHRhaWxgIG1ldGhvZCkuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2VlIFIuaGVhZCwgUi5pbml0LCBSLmxhc3RcbiAgICAgKiBAc2lnIFthXSAtPiBbYV1cbiAgICAgKiBAc2lnIFN0cmluZyAtPiBTdHJpbmdcbiAgICAgKiBAcGFyYW0geyp9IGxpc3RcbiAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIudGFpbChbMSwgMiwgM10pOyAgLy89PiBbMiwgM11cbiAgICAgKiAgICAgIFIudGFpbChbMSwgMl0pOyAgICAgLy89PiBbMl1cbiAgICAgKiAgICAgIFIudGFpbChbMV0pOyAgICAgICAgLy89PiBbXVxuICAgICAqICAgICAgUi50YWlsKFtdKTsgICAgICAgICAvLz0+IFtdXG4gICAgICpcbiAgICAgKiAgICAgIFIudGFpbCgnYWJjJyk7ICAvLz0+ICdiYydcbiAgICAgKiAgICAgIFIudGFpbCgnYWInKTsgICAvLz0+ICdiJ1xuICAgICAqICAgICAgUi50YWlsKCdhJyk7ICAgIC8vPT4gJydcbiAgICAgKiAgICAgIFIudGFpbCgnJyk7ICAgICAvLz0+ICcnXG4gICAgICovXG4gICAgdmFyIHRhaWwgPSBfY2hlY2tGb3JNZXRob2QoJ3RhaWwnLCBzbGljZSgxLCBJbmZpbml0eSkpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZmlyc3QgYG5gIGVsZW1lbnRzIG9mIHRoZSBnaXZlbiBsaXN0LCBzdHJpbmcsIG9yXG4gICAgICogdHJhbnNkdWNlci90cmFuc2Zvcm1lciAob3Igb2JqZWN0IHdpdGggYSBgdGFrZWAgbWV0aG9kKS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgTnVtYmVyIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAc2lnIE51bWJlciAtPiBTdHJpbmcgLT4gU3RyaW5nXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAgICAgKiBAcGFyYW0geyp9IGxpc3RcbiAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAqIEBzZWUgUi5kcm9wXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi50YWtlKDEsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydmb28nXVxuICAgICAqICAgICAgUi50YWtlKDIsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydmb28nLCAnYmFyJ11cbiAgICAgKiAgICAgIFIudGFrZSgzLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnZm9vJywgJ2JhcicsICdiYXonXVxuICAgICAqICAgICAgUi50YWtlKDQsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydmb28nLCAnYmFyJywgJ2JheiddXG4gICAgICogICAgICBSLnRha2UoMywgJ3JhbWRhJyk7ICAgICAgICAgICAgICAgLy89PiAncmFtJ1xuICAgICAqXG4gICAgICogICAgICB2YXIgcGVyc29ubmVsID0gW1xuICAgICAqICAgICAgICAnRGF2ZSBCcnViZWNrJyxcbiAgICAgKiAgICAgICAgJ1BhdWwgRGVzbW9uZCcsXG4gICAgICogICAgICAgICdFdWdlbmUgV3JpZ2h0JyxcbiAgICAgKiAgICAgICAgJ0pvZSBNb3JlbGxvJyxcbiAgICAgKiAgICAgICAgJ0dlcnJ5IE11bGxpZ2FuJyxcbiAgICAgKiAgICAgICAgJ0JvYiBCYXRlcycsXG4gICAgICogICAgICAgICdKb2UgRG9kZ2UnLFxuICAgICAqICAgICAgICAnUm9uIENyb3R0eSdcbiAgICAgKiAgICAgIF07XG4gICAgICpcbiAgICAgKiAgICAgIHZhciB0YWtlRml2ZSA9IFIudGFrZSg1KTtcbiAgICAgKiAgICAgIHRha2VGaXZlKHBlcnNvbm5lbCk7XG4gICAgICogICAgICAvLz0+IFsnRGF2ZSBCcnViZWNrJywgJ1BhdWwgRGVzbW9uZCcsICdFdWdlbmUgV3JpZ2h0JywgJ0pvZSBNb3JlbGxvJywgJ0dlcnJ5IE11bGxpZ2FuJ11cbiAgICAgKi9cbiAgICB2YXIgdGFrZSA9IF9jdXJyeTIoX2Rpc3BhdGNoYWJsZSgndGFrZScsIF94dGFrZSwgZnVuY3Rpb24gdGFrZShuLCB4cykge1xuICAgICAgICByZXR1cm4gc2xpY2UoMCwgbiA8IDAgPyBJbmZpbml0eSA6IG4sIHhzKTtcbiAgICB9KSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3QgY29udGFpbmluZyB0aGUgZmlyc3QgYG5gIGVsZW1lbnRzIG9mIGEgZ2l2ZW4gbGlzdCwgcGFzc2luZyBlYWNoIHZhbHVlXG4gICAgICogdG8gdGhlIHN1cHBsaWVkIHByZWRpY2F0ZSBmdW5jdGlvbiwgYW5kIHRlcm1pbmF0aW5nIHdoZW4gdGhlIHByZWRpY2F0ZSBmdW5jdGlvbiByZXR1cm5zXG4gICAgICogYGZhbHNlYC4gRXhjbHVkZXMgdGhlIGVsZW1lbnQgdGhhdCBjYXVzZWQgdGhlIHByZWRpY2F0ZSBmdW5jdGlvbiB0byBmYWlsLiBUaGUgcHJlZGljYXRlXG4gICAgICogZnVuY3Rpb24gaXMgcGFzc2VkIG9uZSBhcmd1bWVudDogKih2YWx1ZSkqLlxuICAgICAqXG4gICAgICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICAgICAqIEBzZWUgUi50cmFuc2R1Y2VcbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgYXJyYXkuXG4gICAgICogQHNlZSBSLmRyb3BXaGlsZVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBpc05vdEZvdXIgPSBmdW5jdGlvbih4KSB7XG4gICAgICogICAgICAgIHJldHVybiAhKHggPT09IDQpO1xuICAgICAqICAgICAgfTtcbiAgICAgKlxuICAgICAqICAgICAgUi50YWtlV2hpbGUoaXNOb3RGb3VyLCBbMSwgMiwgMywgNF0pOyAvLz0+IFsxLCAyLCAzXVxuICAgICAqL1xuICAgIHZhciB0YWtlV2hpbGUgPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoJ3Rha2VXaGlsZScsIF94dGFrZVdoaWxlLCBmdW5jdGlvbiB0YWtlV2hpbGUoZm4sIGxpc3QpIHtcbiAgICAgICAgdmFyIGlkeCA9IDAsIGxlbiA9IGxpc3QubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGVuICYmIGZuKGxpc3RbaWR4XSkpIHtcbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfc2xpY2UobGlzdCwgMCwgaWR4KTtcbiAgICB9KSk7XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIHRyYW5zZHVjZXIgdXNpbmcgc3VwcGxpZWQgaXRlcmF0b3IgZnVuY3Rpb24uIFJldHVybnMgYSBzaW5nbGUgaXRlbSBieVxuICAgICAqIGl0ZXJhdGluZyB0aHJvdWdoIHRoZSBsaXN0LCBzdWNjZXNzaXZlbHkgY2FsbGluZyB0aGUgdHJhbnNmb3JtZWQgaXRlcmF0b3IgZnVuY3Rpb24gYW5kXG4gICAgICogcGFzc2luZyBpdCBhbiBhY2N1bXVsYXRvciB2YWx1ZSBhbmQgdGhlIGN1cnJlbnQgdmFsdWUgZnJvbSB0aGUgYXJyYXksIGFuZCB0aGVuIHBhc3NpbmdcbiAgICAgKiB0aGUgcmVzdWx0IHRvIHRoZSBuZXh0IGNhbGwuXG4gICAgICpcbiAgICAgKiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gcmVjZWl2ZXMgdHdvIHZhbHVlczogKihhY2MsIHZhbHVlKSouIEl0IHdpbGwgYmUgd3JhcHBlZCBhcyBhXG4gICAgICogdHJhbnNmb3JtZXIgdG8gaW5pdGlhbGl6ZSB0aGUgdHJhbnNkdWNlci4gQSB0cmFuc2Zvcm1lciBjYW4gYmUgcGFzc2VkIGRpcmVjdGx5IGluIHBsYWNlXG4gICAgICogb2YgYW4gaXRlcmF0b3IgZnVuY3Rpb24uICBJbiBib3RoIGNhc2VzLCBpdGVyYXRpb24gbWF5IGJlIHN0b3BwZWQgZWFybHkgd2l0aCB0aGVcbiAgICAgKiBgUi5yZWR1Y2VkYCBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEEgdHJhbnNkdWNlciBpcyBhIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyBhIHRyYW5zZm9ybWVyIGFuZCByZXR1cm5zIGEgdHJhbnNmb3JtZXIgYW5kIGNhblxuICAgICAqIGJlIGNvbXBvc2VkIGRpcmVjdGx5LlxuICAgICAqXG4gICAgICogQSB0cmFuc2Zvcm1lciBpcyBhbiBhbiBvYmplY3QgdGhhdCBwcm92aWRlcyBhIDItYXJpdHkgcmVkdWNpbmcgaXRlcmF0b3IgZnVuY3Rpb24sIHN0ZXAsXG4gICAgICogMC1hcml0eSBpbml0aWFsIHZhbHVlIGZ1bmN0aW9uLCBpbml0LCBhbmQgMS1hcml0eSByZXN1bHQgZXh0cmFjdGlvbiBmdW5jdGlvbiwgcmVzdWx0LlxuICAgICAqIFRoZSBzdGVwIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIGluIHJlZHVjZS4gVGhlIHJlc3VsdCBmdW5jdGlvbiBpcyB1c2VkXG4gICAgICogdG8gY29udmVydCB0aGUgZmluYWwgYWNjdW11bGF0b3IgaW50byB0aGUgcmV0dXJuIHR5cGUgYW5kIGluIG1vc3QgY2FzZXMgaXMgUi5pZGVudGl0eS5cbiAgICAgKiBUaGUgaW5pdCBmdW5jdGlvbiBjYW4gYmUgdXNlZCB0byBwcm92aWRlIGFuIGluaXRpYWwgYWNjdW11bGF0b3IsIGJ1dCBpcyBpZ25vcmVkIGJ5IHRyYW5zZHVjZS5cbiAgICAgKlxuICAgICAqIFRoZSBpdGVyYXRpb24gaXMgcGVyZm9ybWVkIHdpdGggUi5yZWR1Y2UgYWZ0ZXIgaW5pdGlhbGl6aW5nIHRoZSB0cmFuc2R1Y2VyLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNlZSBSLnJlZHVjZSwgUi5yZWR1Y2VkLCBSLmludG9cbiAgICAgKiBAc2lnIChjIC0+IGMpIC0+IChhLGIgLT4gYSkgLT4gYSAtPiBbYl0gLT4gYVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHhmIFRoZSB0cmFuc2R1Y2VyIGZ1bmN0aW9uLiBSZWNlaXZlcyBhIHRyYW5zZm9ybWVyIGFuZCByZXR1cm5zIGEgdHJhbnNmb3JtZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLiBSZWNlaXZlcyB0d28gdmFsdWVzLCB0aGUgYWNjdW11bGF0b3IgYW5kIHRoZVxuICAgICAqICAgICAgICBjdXJyZW50IGVsZW1lbnQgZnJvbSB0aGUgYXJyYXkuIFdyYXBwZWQgYXMgdHJhbnNmb3JtZXIsIGlmIG5lY2Vzc2FyeSwgYW5kIHVzZWQgdG9cbiAgICAgKiAgICAgICAgaW5pdGlhbGl6ZSB0aGUgdHJhbnNkdWNlclxuICAgICAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBpbml0aWFsIGFjY3VtdWxhdG9yIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEByZXR1cm4geyp9IFRoZSBmaW5hbCwgYWNjdW11bGF0ZWQgdmFsdWUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIG51bWJlcnMgPSBbMSwgMiwgMywgNF07XG4gICAgICogICAgICB2YXIgdHJhbnNkdWNlciA9IFIuY29tcG9zZShSLm1hcChSLmFkZCgxKSksIFIudGFrZSgyKSk7XG4gICAgICpcbiAgICAgKiAgICAgIFIudHJhbnNkdWNlKHRyYW5zZHVjZXIsIFIuZmxpcChSLmFwcGVuZCksIFtdLCBudW1iZXJzKTsgLy89PiBbMiwgM11cbiAgICAgKi9cbiAgICB2YXIgdHJhbnNkdWNlID0gY3VycnlOKDQsIGZ1bmN0aW9uIHRyYW5zZHVjZSh4ZiwgZm4sIGFjYywgbGlzdCkge1xuICAgICAgICByZXR1cm4gX3JlZHVjZSh4Zih0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgPyBfeHdyYXAoZm4pIDogZm4pLCBhY2MsIGxpc3QpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ29tYmluZXMgdHdvIGxpc3RzIGludG8gYSBzZXQgKGkuZS4gbm8gZHVwbGljYXRlcykgY29tcG9zZWQgb2YgdGhlIGVsZW1lbnRzIG9mIGVhY2ggbGlzdC4gIER1cGxpY2F0aW9uIGlzXG4gICAgICogZGV0ZXJtaW5lZCBhY2NvcmRpbmcgdG8gdGhlIHZhbHVlIHJldHVybmVkIGJ5IGFwcGx5aW5nIHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgdG8gdHdvIGxpc3QgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gICAgICogQHNpZyAoYSxhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBbYV0gLT4gW2FdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSB1c2VkIHRvIHRlc3Qgd2hldGhlciB0d28gaXRlbXMgYXJlIGVxdWFsLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QxIFRoZSBmaXJzdCBsaXN0LlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QyIFRoZSBzZWNvbmQgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIGZpcnN0IGFuZCBzZWNvbmQgbGlzdHMgY29uY2F0ZW5hdGVkLCB3aXRoXG4gICAgICogICAgICAgICBkdXBsaWNhdGVzIHJlbW92ZWQuXG4gICAgICogQHNlZSBSLnVuaW9uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgZnVuY3Rpb24gY21wKHgsIHkpIHsgcmV0dXJuIHguYSA9PT0geS5hOyB9XG4gICAgICogICAgICB2YXIgbDEgPSBbe2E6IDF9LCB7YTogMn1dO1xuICAgICAqICAgICAgdmFyIGwyID0gW3thOiAxfSwge2E6IDR9XTtcbiAgICAgKiAgICAgIFIudW5pb25XaXRoKGNtcCwgbDEsIGwyKTsgLy89PiBbe2E6IDF9LCB7YTogMn0sIHthOiA0fV1cbiAgICAgKi9cbiAgICB2YXIgdW5pb25XaXRoID0gX2N1cnJ5MyhmdW5jdGlvbiB1bmlvbldpdGgocHJlZCwgbGlzdDEsIGxpc3QyKSB7XG4gICAgICAgIHJldHVybiB1bmlxV2l0aChwcmVkLCBfY29uY2F0KGxpc3QxLCBsaXN0MikpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG5ldyBsaXN0IGNvbnRhaW5pbmcgb25seSBvbmUgY29weSBvZiBlYWNoIGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsIGxpc3QuXG4gICAgICogYFIuZXF1YWxzYCBpcyB1c2VkIHRvIGRldGVybWluZSBlcXVhbGl0eS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBUaGUgbGlzdCBvZiB1bmlxdWUgaXRlbXMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi51bmlxKFsxLCAxLCAyLCAxXSk7IC8vPT4gWzEsIDJdXG4gICAgICogICAgICBSLnVuaXEoWzEsICcxJ10pOyAgICAgLy89PiBbMSwgJzEnXVxuICAgICAqICAgICAgUi51bmlxKFtbNDJdLCBbNDJdXSk7IC8vPT4gW1s0Ml1dXG4gICAgICovXG4gICAgdmFyIHVuaXEgPSB1bmlxV2l0aChlcXVhbHMpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG5ldyBsaXN0IGJ5IHB1bGxpbmcgZXZlcnkgaXRlbSBhdCB0aGUgZmlyc3QgbGV2ZWwgb2YgbmVzdGluZyBvdXQsIGFuZCBwdXR0aW5nXG4gICAgICogdGhlbSBpbiBhIG5ldyBhcnJheS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgW2FdIC0+IFtiXVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBUaGUgZmxhdHRlbmVkIGxpc3QuXG4gICAgICogQHNlZSBSLmZsYXR0ZW5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnVubmVzdChbMSwgWzJdLCBbWzNdXV0pOyAvLz0+IFsxLCAyLCBbM11dXG4gICAgICogICAgICBSLnVubmVzdChbWzEsIDJdLCBbMywgNF0sIFs1LCA2XV0pOyAvLz0+IFsxLCAyLCAzLCA0LCA1LCA2XVxuICAgICAqL1xuICAgIHZhciB1bm5lc3QgPSBfY3VycnkxKF9tYWtlRmxhdChmYWxzZSkpO1xuXG4gICAgLyoqXG4gICAgICogQWNjZXB0cyBhIGZ1bmN0aW9uIGBmbmAgYW5kIGFueSBudW1iZXIgb2YgdHJhbnNmb3JtZXIgZnVuY3Rpb25zIGFuZCByZXR1cm5zIGEgbmV3XG4gICAgICogZnVuY3Rpb24uIFdoZW4gdGhlIG5ldyBmdW5jdGlvbiBpcyBpbnZva2VkLCBpdCBjYWxscyB0aGUgZnVuY3Rpb24gYGZuYCB3aXRoIHBhcmFtZXRlcnNcbiAgICAgKiBjb25zaXN0aW5nIG9mIHRoZSByZXN1bHQgb2YgY2FsbGluZyBlYWNoIHN1cHBsaWVkIGhhbmRsZXIgb24gc3VjY2Vzc2l2ZSBhcmd1bWVudHMgdG8gdGhlXG4gICAgICogbmV3IGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogSWYgbW9yZSBhcmd1bWVudHMgYXJlIHBhc3NlZCB0byB0aGUgcmV0dXJuZWQgZnVuY3Rpb24gdGhhbiB0cmFuc2Zvcm1lciBmdW5jdGlvbnMsIHRob3NlXG4gICAgICogYXJndW1lbnRzIGFyZSBwYXNzZWQgZGlyZWN0bHkgdG8gYGZuYCBhcyBhZGRpdGlvbmFsIHBhcmFtZXRlcnMuIElmIHlvdSBleHBlY3QgYWRkaXRpb25hbFxuICAgICAqIGFyZ3VtZW50cyB0aGF0IGRvbid0IG5lZWQgdG8gYmUgdHJhbnNmb3JtZWQsIGFsdGhvdWdoIHlvdSBjYW4gaWdub3JlIHRoZW0sIGl0J3MgYmVzdCB0b1xuICAgICAqIHBhc3MgYW4gaWRlbnRpdHkgZnVuY3Rpb24gc28gdGhhdCB0aGUgbmV3IGZ1bmN0aW9uIHJlcG9ydHMgdGhlIGNvcnJlY3QgYXJpdHkuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHNpZyAoeDEgLT4geDIgLT4gLi4uIC0+IHopIC0+ICgoYSAtPiB4MSksIChiIC0+IHgyKSwgLi4uKSAtPiAoYSAtPiBiIC0+IC4uLiAtPiB6KVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICAgICAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IHRyYW5zZm9ybWVycyBBIHZhcmlhYmxlIG51bWJlciBvZiB0cmFuc2Zvcm1lciBmdW5jdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIHdyYXBwZWQgZnVuY3Rpb24uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGRvdWJsZSA9IGZ1bmN0aW9uKHkpIHsgcmV0dXJuIHkgKiAyOyB9O1xuICAgICAqICAgICAgdmFyIHNxdWFyZSA9IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHggKiB4OyB9O1xuICAgICAqICAgICAgdmFyIGFkZCA9IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEgKyBiOyB9O1xuICAgICAqICAgICAgLy8gQWRkcyBhbnkgbnVtYmVyIG9mIGFyZ3VtZW50cyB0b2dldGhlclxuICAgICAqICAgICAgdmFyIGFkZEFsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICByZXR1cm4gUi5yZWR1Y2UoYWRkLCAwLCBhcmd1bWVudHMpO1xuICAgICAqICAgICAgfTtcbiAgICAgKlxuICAgICAqICAgICAgLy8gQmFzaWMgZXhhbXBsZVxuICAgICAqICAgICAgdmFyIGFkZERvdWJsZUFuZFNxdWFyZSA9IFIudXNlV2l0aChhZGRBbGwsIGRvdWJsZSwgc3F1YXJlKTtcbiAgICAgKlxuICAgICAqICAgICAgLy/iiYUgYWRkQWxsKGRvdWJsZSgxMCksIHNxdWFyZSg1KSk7XG4gICAgICogICAgICBhZGREb3VibGVBbmRTcXVhcmUoMTAsIDUpOyAvLz0+IDQ1XG4gICAgICpcbiAgICAgKiAgICAgIC8vIEV4YW1wbGUgb2YgcGFzc2luZyBtb3JlIGFyZ3VtZW50cyB0aGFuIHRyYW5zZm9ybWVyc1xuICAgICAqICAgICAgLy/iiYUgYWRkQWxsKGRvdWJsZSgxMCksIHNxdWFyZSg1KSwgMTAwKTtcbiAgICAgKiAgICAgIGFkZERvdWJsZUFuZFNxdWFyZSgxMCwgNSwgMTAwKTsgLy89PiAxNDVcbiAgICAgKlxuICAgICAqICAgICAgLy8gSWYgdGhlcmUgYXJlIGV4dHJhIF9leHBlY3RlZF8gYXJndW1lbnRzIHRoYXQgZG9uJ3QgbmVlZCB0byBiZSB0cmFuc2Zvcm1lZCwgYWx0aG91Z2hcbiAgICAgKiAgICAgIC8vIHlvdSBjYW4gaWdub3JlIHRoZW0sIGl0IG1pZ2h0IGJlIGJlc3QgdG8gcGFzcyBpbiB0aGUgaWRlbnRpdHkgZnVuY3Rpb24gc28gdGhhdCB0aGUgbmV3XG4gICAgICogICAgICAvLyBmdW5jdGlvbiBjb3JyZWN0bHkgcmVwb3J0cyBhcml0eS5cbiAgICAgKiAgICAgIHZhciBhZGREb3VibGVBbmRTcXVhcmVXaXRoRXh0cmFQYXJhbXMgPSBSLnVzZVdpdGgoYWRkQWxsLCBkb3VibGUsIHNxdWFyZSwgUi5pZGVudGl0eSk7XG4gICAgICogICAgICAvLyBhZGREb3VibGVBbmRTcXVhcmVXaXRoRXh0cmFQYXJhbXMubGVuZ3RoIC8vPT4gM1xuICAgICAqICAgICAgLy/iiYUgYWRkQWxsKGRvdWJsZSgxMCksIHNxdWFyZSg1KSwgUi5pZGVudGl0eSgxMDApKTtcbiAgICAgKiAgICAgIGFkZERvdWJsZUFuZFNxdWFyZSgxMCwgNSwgMTAwKTsgLy89PiAxNDVcbiAgICAgKi9cbiAgICAvKiwgdHJhbnNmb3JtZXJzICovXG4gICAgdmFyIHVzZVdpdGggPSBjdXJyeShmdW5jdGlvbiB1c2VXaXRoKGZuKSB7XG4gICAgICAgIHZhciB0cmFuc2Zvcm1lcnMgPSBfc2xpY2UoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgdmFyIHRsZW4gPSB0cmFuc2Zvcm1lcnMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gY3VycnkoX2FyaXR5KHRsZW4sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10sIGlkeCA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaWR4IDwgdGxlbikge1xuICAgICAgICAgICAgICAgIGFyZ3NbaWR4XSA9IHRyYW5zZm9ybWVyc1tpZHhdKGFyZ3VtZW50c1tpZHhdKTtcbiAgICAgICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmdzLmNvbmNhdChfc2xpY2UoYXJndW1lbnRzLCB0bGVuKSkpO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhIHNwZWMgb2JqZWN0IGFuZCBhIHRlc3Qgb2JqZWN0OyByZXR1cm5zIHRydWUgaWYgdGhlIHRlc3Qgc2F0aXNmaWVzXG4gICAgICogdGhlIHNwZWMsIGZhbHNlIG90aGVyd2lzZS4gQW4gb2JqZWN0IHNhdGlzZmllcyB0aGUgc3BlYyBpZiwgZm9yIGVhY2ggb2YgdGhlXG4gICAgICogc3BlYydzIG93biBwcm9wZXJ0aWVzLCBhY2Nlc3NpbmcgdGhhdCBwcm9wZXJ0eSBvZiB0aGUgb2JqZWN0IGdpdmVzIHRoZSBzYW1lXG4gICAgICogdmFsdWUgKGluIGBSLmVxdWFsc2AgdGVybXMpIGFzIGFjY2Vzc2luZyB0aGF0IHByb3BlcnR5IG9mIHRoZSBzcGVjLlxuICAgICAqXG4gICAgICogYHdoZXJlRXFgIGlzIGEgc3BlY2lhbGl6YXRpb24gb2YgW2B3aGVyZWBdKCN3aGVyZSkuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcge1N0cmluZzogKn0gLT4ge1N0cmluZzogKn0gLT4gQm9vbGVhblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzcGVjXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRlc3RPYmpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqIEBzZWUgUi53aGVyZVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIC8vIHByZWQgOjogT2JqZWN0IC0+IEJvb2xlYW5cbiAgICAgKiAgICAgIHZhciBwcmVkID0gUi53aGVyZUVxKHthOiAxLCBiOiAyfSk7XG4gICAgICpcbiAgICAgKiAgICAgIHByZWQoe2E6IDF9KTsgICAgICAgICAgICAgIC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIHByZWQoe2E6IDEsIGI6IDJ9KTsgICAgICAgIC8vPT4gdHJ1ZVxuICAgICAqICAgICAgcHJlZCh7YTogMSwgYjogMiwgYzogM30pOyAgLy89PiB0cnVlXG4gICAgICogICAgICBwcmVkKHthOiAxLCBiOiAxfSk7ICAgICAgICAvLz0+IGZhbHNlXG4gICAgICovXG4gICAgdmFyIHdoZXJlRXEgPSBfY3VycnkyKGZ1bmN0aW9uIHdoZXJlRXEoc3BlYywgdGVzdE9iaikge1xuICAgICAgICByZXR1cm4gd2hlcmUobWFwT2JqKGVxdWFscywgc3BlYyksIHRlc3RPYmopO1xuICAgIH0pO1xuXG4gICAgdmFyIF9mbGF0Q2F0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJlc2VydmluZ1JlZHVjZWQgPSBmdW5jdGlvbiAoeGYpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgJ0BAdHJhbnNkdWNlci9pbml0JzogX3hmQmFzZS5pbml0LFxuICAgICAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvcmVzdWx0JzogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ0BAdHJhbnNkdWNlci9zdGVwJzogZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldCA9IHhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0WydAQHRyYW5zZHVjZXIvcmVkdWNlZCddID8gX2ZvcmNlUmVkdWNlZChyZXQpIDogcmV0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBfeGNhdCh4Zikge1xuICAgICAgICAgICAgdmFyIHJ4ZiA9IHByZXNlcnZpbmdSZWR1Y2VkKHhmKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgJ0BAdHJhbnNkdWNlci9pbml0JzogX3hmQmFzZS5pbml0LFxuICAgICAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvcmVzdWx0JzogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvc3RlcCc6IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNBcnJheUxpa2UoaW5wdXQpID8gX3JlZHVjZShyeGYsIHJlc3VsdCwgW2lucHV0XSkgOiBfcmVkdWNlKHJ4ZiwgcmVzdWx0LCBpbnB1dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG5cbiAgICB2YXIgX2luZGV4T2YgPSBmdW5jdGlvbiBfaW5kZXhPZihsaXN0LCBpdGVtLCBmcm9tKSB7XG4gICAgICAgIHZhciBpZHggPSBmcm9tO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChlcXVhbHMobGlzdFtpZHhdLCBpdGVtKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpZHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHByZWRpY2F0ZSB3cmFwcGVyIHdoaWNoIHdpbGwgY2FsbCBhIHBpY2sgZnVuY3Rpb24gKGFsbC9hbnkpIGZvciBlYWNoIHByZWRpY2F0ZVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAc2VlIFIuYWxsXG4gICAgICogQHNlZSBSLmFueVxuICAgICAqL1xuICAgIC8vIENhbGwgZnVuY3Rpb24gaW1tZWRpYXRlbHkgaWYgZ2l2ZW4gYXJndW1lbnRzXG4gICAgLy8gUmV0dXJuIGEgZnVuY3Rpb24gd2hpY2ggd2lsbCBjYWxsIHRoZSBwcmVkaWNhdGVzIHdpdGggdGhlIHByb3ZpZGVkIGFyZ3VtZW50c1xuICAgIHZhciBfcHJlZGljYXRlV3JhcCA9IGZ1bmN0aW9uIF9wcmVkaWNhdGVXcmFwKHByZWRQaWNrZXIpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChwcmVkcykge1xuICAgICAgICAgICAgdmFyIHByZWRJdGVyYXRvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJlZFBpY2tlcihmdW5jdGlvbiAocHJlZGljYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmVkaWNhdGUuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfSwgcHJlZHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMSA/IC8vIENhbGwgZnVuY3Rpb24gaW1tZWRpYXRlbHkgaWYgZ2l2ZW4gYXJndW1lbnRzXG4gICAgICAgICAgICBwcmVkSXRlcmF0b3IuYXBwbHkobnVsbCwgX3NsaWNlKGFyZ3VtZW50cywgMSkpIDogLy8gUmV0dXJuIGEgZnVuY3Rpb24gd2hpY2ggd2lsbCBjYWxsIHRoZSBwcmVkaWNhdGVzIHdpdGggdGhlIHByb3ZpZGVkIGFyZ3VtZW50c1xuICAgICAgICAgICAgX2FyaXR5KE1hdGgubWF4LmFwcGx5KE1hdGgsIHBsdWNrKCdsZW5ndGgnLCBwcmVkcykpLCBwcmVkSXRlcmF0b3IpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgX3hjaGFpbiA9IF9jdXJyeTIoZnVuY3Rpb24gX3hjaGFpbihmLCB4Zikge1xuICAgICAgICByZXR1cm4gbWFwKGYsIF9mbGF0Q2F0KHhmKSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBHaXZlbiBhIGxpc3Qgb2YgcHJlZGljYXRlcywgcmV0dXJucyBhIG5ldyBwcmVkaWNhdGUgdGhhdCB3aWxsIGJlIHRydWUgZXhhY3RseSB3aGVuIGFsbCBvZiB0aGVtIGFyZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTG9naWNcbiAgICAgKiBAc2lnIFsoKi4uLiAtPiBCb29sZWFuKV0gLT4gKCouLi4gLT4gQm9vbGVhbilcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IEFuIGFycmF5IG9mIHByZWRpY2F0ZSBmdW5jdGlvbnNcbiAgICAgKiBAcGFyYW0geyp9IG9wdGlvbmFsIEFueSBhcmd1bWVudHMgdG8gcGFzcyBpbnRvIHRoZSBwcmVkaWNhdGVzXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IGEgZnVuY3Rpb24gdGhhdCBhcHBsaWVzIGl0cyBhcmd1bWVudHMgdG8gZWFjaCBvZlxuICAgICAqICAgICAgICAgdGhlIHByZWRpY2F0ZXMsIHJldHVybmluZyBgdHJ1ZWAgaWYgYWxsIGFyZSBzYXRpc2ZpZWQuXG4gICAgICogQHNlZSBSLmFueVBhc3NcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgZ3QxMCA9IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHggPiAxMDsgfTtcbiAgICAgKiAgICAgIHZhciBldmVuID0gZnVuY3Rpb24oeCkgeyByZXR1cm4geCAlIDIgPT09IDB9O1xuICAgICAqICAgICAgdmFyIGYgPSBSLmFsbFBhc3MoW2d0MTAsIGV2ZW5dKTtcbiAgICAgKiAgICAgIGYoMTEpOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBmKDEyKTsgLy89PiB0cnVlXG4gICAgICovXG4gICAgdmFyIGFsbFBhc3MgPSBfY3VycnkxKF9wcmVkaWNhdGVXcmFwKGFsbCkpO1xuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSBsaXN0IG9mIHByZWRpY2F0ZXMgcmV0dXJucyBhIG5ldyBwcmVkaWNhdGUgdGhhdCB3aWxsIGJlIHRydWUgZXhhY3RseSB3aGVuIGFueSBvbmUgb2YgdGhlbSBpcy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTG9naWNcbiAgICAgKiBAc2lnIFsoKi4uLiAtPiBCb29sZWFuKV0gLT4gKCouLi4gLT4gQm9vbGVhbilcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IEFuIGFycmF5IG9mIHByZWRpY2F0ZSBmdW5jdGlvbnNcbiAgICAgKiBAcGFyYW0geyp9IG9wdGlvbmFsIEFueSBhcmd1bWVudHMgdG8gcGFzcyBpbnRvIHRoZSBwcmVkaWNhdGVzXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCBhcHBsaWVzIGl0cyBhcmd1bWVudHMgdG8gZWFjaCBvZiB0aGUgcHJlZGljYXRlcywgcmV0dXJuaW5nXG4gICAgICogICAgICAgICBgdHJ1ZWAgaWYgYWxsIGFyZSBzYXRpc2ZpZWQuXG4gICAgICogQHNlZSBSLmFsbFBhc3NcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgZ3QxMCA9IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHggPiAxMDsgfTtcbiAgICAgKiAgICAgIHZhciBldmVuID0gZnVuY3Rpb24oeCkgeyByZXR1cm4geCAlIDIgPT09IDB9O1xuICAgICAqICAgICAgdmFyIGYgPSBSLmFueVBhc3MoW2d0MTAsIGV2ZW5dKTtcbiAgICAgKiAgICAgIGYoMTEpOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIGYoOCk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgZig5KTsgLy89PiBmYWxzZVxuICAgICAqL1xuICAgIHZhciBhbnlQYXNzID0gX2N1cnJ5MShfcHJlZGljYXRlV3JhcChhbnkpKTtcblxuICAgIC8qKlxuICAgICAqIGFwIGFwcGxpZXMgYSBsaXN0IG9mIGZ1bmN0aW9ucyB0byBhIGxpc3Qgb2YgdmFsdWVzLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgW2ZdIC0+IFthXSAtPiBbZiBhXVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGZucyBBbiBhcnJheSBvZiBmdW5jdGlvbnNcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB2cyBBbiBhcnJheSBvZiB2YWx1ZXNcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgb2YgcmVzdWx0cyBvZiBhcHBseWluZyBlYWNoIG9mIGBmbnNgIHRvIGFsbCBvZiBgdnNgIGluIHR1cm4uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5hcChbUi5tdWx0aXBseSgyKSwgUi5hZGQoMyldLCBbMSwyLDNdKTsgLy89PiBbMiwgNCwgNiwgNCwgNSwgNl1cbiAgICAgKi9cbiAgICB2YXIgYXAgPSBfY3VycnkyKGZ1bmN0aW9uIGFwKGZucywgdnMpIHtcbiAgICAgICAgcmV0dXJuIF9oYXNNZXRob2QoJ2FwJywgZm5zKSA/IGZucy5hcCh2cykgOiBfcmVkdWNlKGZ1bmN0aW9uIChhY2MsIGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NvbmNhdChhY2MsIG1hcChmbiwgdnMpKTtcbiAgICAgICAgfSwgW10sIGZucyk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSByZXN1bHQgb2YgY2FsbGluZyBpdHMgZmlyc3QgYXJndW1lbnQgd2l0aCB0aGUgcmVtYWluaW5nXG4gICAgICogYXJndW1lbnRzLiBUaGlzIGlzIG9jY2FzaW9uYWxseSB1c2VmdWwgYXMgYSBjb252ZXJnaW5nIGZ1bmN0aW9uIGZvclxuICAgICAqIGBSLmNvbnZlcmdlYDogdGhlIGxlZnQgYnJhbmNoIGNhbiBwcm9kdWNlIGEgZnVuY3Rpb24gd2hpbGUgdGhlIHJpZ2h0XG4gICAgICogYnJhbmNoIHByb2R1Y2VzIGEgdmFsdWUgdG8gYmUgcGFzc2VkIHRvIHRoYXQgZnVuY3Rpb24gYXMgYW4gYXJndW1lbnQuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHNpZyAoKi4uLiAtPiBhKSwqLi4uIC0+IGFcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgdG8gdGhlIHJlbWFpbmluZyBhcmd1bWVudHMuXG4gICAgICogQHBhcmFtIHsuLi4qfSBhcmdzIEFueSBudW1iZXIgb2YgcG9zaXRpb25hbCBhcmd1bWVudHMuXG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKiBAc2VlIFIuYXBwbHlcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgaW5kZW50TiA9IFIucGlwZShSLnRpbWVzKFIuYWx3YXlzKCcgJykpLFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgUi5qb2luKCcnKSxcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIFIucmVwbGFjZSgvXig/ISQpL2dtKSk7XG4gICAgICpcbiAgICAgKiAgICAgIHZhciBmb3JtYXQgPSBSLmNvbnZlcmdlKFIuY2FsbCxcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFIucGlwZShSLnByb3AoJ2luZGVudCcpLCBpbmRlbnROKSxcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFIucHJvcCgndmFsdWUnKSk7XG4gICAgICpcbiAgICAgKiAgICAgIGZvcm1hdCh7aW5kZW50OiAyLCB2YWx1ZTogJ2Zvb1xcbmJhclxcbmJhelxcbid9KTsgLy89PiAnICBmb29cXG4gIGJhclxcbiAgYmF6XFxuJ1xuICAgICAqL1xuICAgIHZhciBjYWxsID0gY3VycnkoZnVuY3Rpb24gY2FsbChmbikge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgX3NsaWNlKGFyZ3VtZW50cywgMSkpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogYGNoYWluYCBtYXBzIGEgZnVuY3Rpb24gb3ZlciBhIGxpc3QgYW5kIGNvbmNhdGVuYXRlcyB0aGUgcmVzdWx0cy5cbiAgICAgKiBUaGlzIGltcGxlbWVudGF0aW9uIGlzIGNvbXBhdGlibGUgd2l0aCB0aGVcbiAgICAgKiBGYW50YXN5LWxhbmQgQ2hhaW4gc3BlYywgYW5kIHdpbGwgd29yayB3aXRoIHR5cGVzIHRoYXQgaW1wbGVtZW50IHRoYXQgc3BlYy5cbiAgICAgKiBgY2hhaW5gIGlzIGFsc28ga25vd24gYXMgYGZsYXRNYXBgIGluIHNvbWUgbGlicmFyaWVzXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhIC0+IFtiXSkgLT4gW2FdIC0+IFtiXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdFxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBkdXBsaWNhdGUgPSBmdW5jdGlvbihuKSB7XG4gICAgICogICAgICAgIHJldHVybiBbbiwgbl07XG4gICAgICogICAgICB9O1xuICAgICAqICAgICAgUi5jaGFpbihkdXBsaWNhdGUsIFsxLCAyLCAzXSk7IC8vPT4gWzEsIDEsIDIsIDIsIDMsIDNdXG4gICAgICovXG4gICAgdmFyIGNoYWluID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKCdjaGFpbicsIF94Y2hhaW4sIGZ1bmN0aW9uIGNoYWluKGZuLCBsaXN0KSB7XG4gICAgICAgIHJldHVybiB1bm5lc3QobWFwKGZuLCBsaXN0KSk7XG4gICAgfSkpO1xuXG4gICAgLyoqXG4gICAgICogVHVybnMgYSBsaXN0IG9mIEZ1bmN0b3JzIGludG8gYSBGdW5jdG9yIG9mIGEgbGlzdCwgYXBwbHlpbmdcbiAgICAgKiBhIG1hcHBpbmcgZnVuY3Rpb24gdG8gdGhlIGVsZW1lbnRzIG9mIHRoZSBsaXN0IGFsb25nIHRoZSB3YXkuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2VlIFIuY29tbXV0ZVxuICAgICAqIEBzaWcgRnVuY3RvciBmID0+IChmIGEgLT4gZiBiKSAtPiAoeCAtPiBmIHgpIC0+IFtmIGFdIC0+IGYgW2JdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb2YgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGRhdGEgdHlwZSB0byByZXR1cm5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IEFuIGFycmF5IG9mIGZ1bmN0b3JzIG9mIHRoZSBzYW1lIHR5cGVcbiAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuY29tbXV0ZU1hcChSLm1hcChSLmFkZCgxMCkpLCBSLm9mLCBbWzFdLCBbMiwgM11dKTsgICAvLz0+IFtbMTEsIDEyXSwgWzExLCAxM11dXG4gICAgICogICAgICBSLmNvbW11dGVNYXAoUi5tYXAoUi5hZGQoMTApKSwgUi5vZiwgW1sxLCAyXSwgWzNdXSk7ICAgLy89PiBbWzExLCAxM10sIFsxMiwgMTNdXVxuICAgICAqICAgICAgUi5jb21tdXRlTWFwKFIubWFwKFIuYWRkKDEwKSksIFIub2YsIFtbMV0sIFsyXSwgWzNdXSk7IC8vPT4gW1sxMSwgMTIsIDEzXV1cbiAgICAgKiAgICAgIFIuY29tbXV0ZU1hcChSLm1hcChSLmFkZCgxMCkpLCBNYXliZS5vZiwgW0p1c3QoMSksIEp1c3QoMiksIEp1c3QoMyldKTsgICAvLz0+IEp1c3QoWzExLCAxMiwgMTNdKVxuICAgICAqICAgICAgUi5jb21tdXRlTWFwKFIubWFwKFIuYWRkKDEwKSksIE1heWJlLm9mLCBbSnVzdCgxKSwgSnVzdCgyKSwgTm90aGluZygpXSk7IC8vPT4gTm90aGluZygpXG4gICAgICovXG4gICAgdmFyIGNvbW11dGVNYXAgPSBfY3VycnkzKGZ1bmN0aW9uIGNvbW11dGVNYXAoZm4sIG9mLCBsaXN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGNvbnNGKGFjYywgZnRvcikge1xuICAgICAgICAgICAgcmV0dXJuIGFwKG1hcChhcHBlbmQsIGZuKGZ0b3IpKSwgYWNjKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3JlZHVjZShjb25zRiwgb2YoW10pLCBsaXN0KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFdyYXBzIGEgY29uc3RydWN0b3IgZnVuY3Rpb24gaW5zaWRlIGEgY3VycmllZCBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWQgd2l0aCB0aGUgc2FtZVxuICAgICAqIGFyZ3VtZW50cyBhbmQgcmV0dXJucyB0aGUgc2FtZSB0eXBlLiBUaGUgYXJpdHkgb2YgdGhlIGZ1bmN0aW9uIHJldHVybmVkIGlzIHNwZWNpZmllZFxuICAgICAqIHRvIGFsbG93IHVzaW5nIHZhcmlhZGljIGNvbnN0cnVjdG9yIGZ1bmN0aW9ucy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIE51bWJlciAtPiAoKiAtPiB7Kn0pIC0+ICgqIC0+IHsqfSlcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbiBUaGUgYXJpdHkgb2YgdGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IEZuIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byB3cmFwLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIHdyYXBwZWQsIGN1cnJpZWQgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgLy8gVmFyaWFkaWMgY29uc3RydWN0b3IgZnVuY3Rpb25cbiAgICAgKiAgICAgIHZhciBXaWRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICogICAgICAgIC8vIC4uLlxuICAgICAqICAgICAgfTtcbiAgICAgKiAgICAgIFdpZGdldC5wcm90b3R5cGUgPSB7XG4gICAgICogICAgICAgIC8vIC4uLlxuICAgICAqICAgICAgfTtcbiAgICAgKiAgICAgIHZhciBhbGxDb25maWdzID0gW1xuICAgICAqICAgICAgICAvLyAuLi5cbiAgICAgKiAgICAgIF07XG4gICAgICogICAgICBSLm1hcChSLmNvbnN0cnVjdE4oMSwgV2lkZ2V0KSwgYWxsQ29uZmlncyk7IC8vIGEgbGlzdCBvZiBXaWRnZXRzXG4gICAgICovXG4gICAgdmFyIGNvbnN0cnVjdE4gPSBfY3VycnkyKGZ1bmN0aW9uIGNvbnN0cnVjdE4obiwgRm4pIHtcbiAgICAgICAgaWYgKG4gPiAxMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb25zdHJ1Y3RvciB3aXRoIGdyZWF0ZXIgdGhhbiB0ZW4gYXJndW1lbnRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG4gPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBGbigpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycnkobkFyeShuLCBmdW5jdGlvbiAoJDAsICQxLCAkMiwgJDMsICQ0LCAkNSwgJDYsICQ3LCAkOCwgJDkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRm4oJDApO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRm4oJDAsICQxKTtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZuKCQwLCAkMSwgJDIpO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRm4oJDAsICQxLCAkMiwgJDMpO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRm4oJDAsICQxLCAkMiwgJDMsICQ0KTtcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZuKCQwLCAkMSwgJDIsICQzLCAkNCwgJDUpO1xuICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRm4oJDAsICQxLCAkMiwgJDMsICQ0LCAkNSwgJDYpO1xuICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRm4oJDAsICQxLCAkMiwgJDMsICQ0LCAkNSwgJDYsICQ3KTtcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZuKCQwLCAkMSwgJDIsICQzLCAkNCwgJDUsICQ2LCAkNywgJDgpO1xuICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZuKCQwLCAkMSwgJDIsICQzLCAkNCwgJDUsICQ2LCAkNywgJDgsICQ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQWNjZXB0cyBhdCBsZWFzdCB0aHJlZSBmdW5jdGlvbnMgYW5kIHJldHVybnMgYSBuZXcgZnVuY3Rpb24uIFdoZW4gaW52b2tlZCwgdGhpcyBuZXdcbiAgICAgKiBmdW5jdGlvbiB3aWxsIGludm9rZSB0aGUgZmlyc3QgZnVuY3Rpb24sIGBhZnRlcmAsIHBhc3NpbmcgYXMgaXRzIGFyZ3VtZW50cyB0aGVcbiAgICAgKiByZXN1bHRzIG9mIGludm9raW5nIHRoZSBzdWJzZXF1ZW50IGZ1bmN0aW9ucyB3aXRoIHdoYXRldmVyIGFyZ3VtZW50cyBhcmUgcGFzc2VkIHRvXG4gICAgICogdGhlIG5ldyBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnICh4MSAtPiB4MiAtPiAuLi4gLT4geikgLT4gKChhIC0+IGIgLT4gLi4uIC0+IHgxKSwgKGEgLT4gYiAtPiAuLi4gLT4geDIpLCAuLi4pIC0+IChhIC0+IGIgLT4gLi4uIC0+IHopXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYWZ0ZXIgQSBmdW5jdGlvbi4gYGFmdGVyYCB3aWxsIGJlIGludm9rZWQgd2l0aCB0aGUgcmV0dXJuIHZhbHVlcyBvZlxuICAgICAqICAgICAgICBgZm4xYCBhbmQgYGZuMmAgYXMgaXRzIGFyZ3VtZW50cy5cbiAgICAgKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBmdW5jdGlvbnMgQSB2YXJpYWJsZSBudW1iZXIgb2YgZnVuY3Rpb25zLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbi5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgYWRkID0gZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYSArIGI7IH07XG4gICAgICogICAgICB2YXIgbXVsdGlwbHkgPSBmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhICogYjsgfTtcbiAgICAgKiAgICAgIHZhciBzdWJ0cmFjdCA9IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEgLSBiOyB9O1xuICAgICAqXG4gICAgICogICAgICAvL+KJhSBtdWx0aXBseSggYWRkKDEsIDIpLCBzdWJ0cmFjdCgxLCAyKSApO1xuICAgICAqICAgICAgUi5jb252ZXJnZShtdWx0aXBseSwgYWRkLCBzdWJ0cmFjdCkoMSwgMik7IC8vPT4gLTNcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGFkZDMgPSBmdW5jdGlvbihhLCBiLCBjKSB7IHJldHVybiBhICsgYiArIGM7IH07XG4gICAgICogICAgICBSLmNvbnZlcmdlKGFkZDMsIG11bHRpcGx5LCBhZGQsIHN1YnRyYWN0KSgxLCAyKTsgLy89PiA0XG4gICAgICovXG4gICAgdmFyIGNvbnZlcmdlID0gY3VycnlOKDMsIGZ1bmN0aW9uIGNvbnZlcmdlKGFmdGVyKSB7XG4gICAgICAgIHZhciBmbnMgPSBfc2xpY2UoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgcmV0dXJuIGN1cnJ5TihNYXRoLm1heC5hcHBseShNYXRoLCBwbHVjaygnbGVuZ3RoJywgZm5zKSksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIGFmdGVyLmFwcGx5KGNvbnRleHQsIF9tYXAoZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgfSwgZm5zKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgYnV0IHRoZSBmaXJzdCBgbmAgZWxlbWVudHMgb2YgdGhlIGdpdmVuIGxpc3QsIHN0cmluZywgb3JcbiAgICAgKiB0cmFuc2R1Y2VyL3RyYW5zZm9ybWVyIChvciBvYmplY3Qgd2l0aCBhIGBkcm9wYCBtZXRob2QpLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNlZSBSLnRyYW5zZHVjZVxuICAgICAqIEBzaWcgTnVtYmVyIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAc2lnIE51bWJlciAtPiBTdHJpbmcgLT4gU3RyaW5nXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAgICAgKiBAcGFyYW0geyp9IGxpc3RcbiAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAqIEBzZWUgUi50YWtlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5kcm9wKDEsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydiYXInLCAnYmF6J11cbiAgICAgKiAgICAgIFIuZHJvcCgyLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnYmF6J11cbiAgICAgKiAgICAgIFIuZHJvcCgzLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFtdXG4gICAgICogICAgICBSLmRyb3AoNCwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbXVxuICAgICAqICAgICAgUi5kcm9wKDMsICdyYW1kYScpOyAgICAgICAgICAgICAgIC8vPT4gJ2RhJ1xuICAgICAqL1xuICAgIHZhciBkcm9wID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKCdkcm9wJywgX3hkcm9wLCBmdW5jdGlvbiBkcm9wKG4sIHhzKSB7XG4gICAgICAgIHJldHVybiBzbGljZShNYXRoLm1heCgwLCBuKSwgSW5maW5pdHksIHhzKTtcbiAgICB9KSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBjb250YWluaW5nIGFsbCBidXQgdGhlIGxhc3QgYG5gIGVsZW1lbnRzIG9mIHRoZSBnaXZlbiBgbGlzdGAuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIE51bWJlciAtPiBbYV0gLT4gW2FdXG4gICAgICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgZWxlbWVudHMgb2YgYHhzYCB0byBza2lwLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHhzIFRoZSBjb2xsZWN0aW9uIHRvIGNvbnNpZGVyLlxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqIEBzZWUgUi50YWtlTGFzdFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuZHJvcExhc3QoMSwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ2ZvbycsICdiYXInXVxuICAgICAqICAgICAgUi5kcm9wTGFzdCgyLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnZm9vJ11cbiAgICAgKiAgICAgIFIuZHJvcExhc3QoMywgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbXVxuICAgICAqICAgICAgUi5kcm9wTGFzdCg0LCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFtdXG4gICAgICogICAgICBSLmRyb3BMYXN0KDMsICdyYW1kYScpOyAgICAgICAgICAgICAgIC8vPT4gJ3JhJ1xuICAgICAqL1xuICAgIHZhciBkcm9wTGFzdCA9IF9jdXJyeTIoZnVuY3Rpb24gZHJvcExhc3QobiwgeHMpIHtcbiAgICAgICAgcmV0dXJuIHRha2UobiA8IHhzLmxlbmd0aCA/IHhzLmxlbmd0aCAtIG4gOiAwLCB4cyk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3Qgd2l0aG91dCBhbnkgY29uc2VjdXRpdmVseSByZXBlYXRpbmcgZWxlbWVudHMuIEVxdWFsaXR5IGlzXG4gICAgICogZGV0ZXJtaW5lZCBieSBhcHBseWluZyB0aGUgc3VwcGxpZWQgcHJlZGljYXRlIHR3byBjb25zZWN1dGl2ZSBlbGVtZW50cy5cbiAgICAgKiBUaGUgZmlyc3QgZWxlbWVudCBpbiBhIHNlcmllcyBvZiBlcXVhbCBlbGVtZW50IGlzIHRoZSBvbmUgYmVpbmcgcHJlc2VydmVkLlxuICAgICAqXG4gICAgICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICAgICAqIEBzZWUgUi50cmFuc2R1Y2VcbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEsIGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgQSBwcmVkaWNhdGUgdXNlZCB0byB0ZXN0IHdoZXRoZXIgdHdvIGl0ZW1zIGFyZSBlcXVhbC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gYGxpc3RgIHdpdGhvdXQgcmVwZWF0aW5nIGVsZW1lbnRzLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIGZ1bmN0aW9uIGxlbmd0aEVxKHgsIHkpIHsgcmV0dXJuIE1hdGguYWJzKHgpID09PSBNYXRoLmFicyh5KTsgfTtcbiAgICAgKiAgICAgIHZhciBsID0gWzEsIC0xLCAxLCAzLCA0LCAtNCwgLTQsIC01LCA1LCAzLCAzXTtcbiAgICAgKiAgICAgIFIuZHJvcFJlcGVhdHNXaXRoKGxlbmd0aEVxLCBsKTsgLy89PiBbMSwgMywgNCwgLTUsIDNdXG4gICAgICovXG4gICAgdmFyIGRyb3BSZXBlYXRzV2l0aCA9IF9jdXJyeTIoX2Rpc3BhdGNoYWJsZSgnZHJvcFJlcGVhdHNXaXRoJywgX3hkcm9wUmVwZWF0c1dpdGgsIGZ1bmN0aW9uIGRyb3BSZXBlYXRzV2l0aChwcmVkLCBsaXN0KSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgdmFyIGlkeCA9IDE7XG4gICAgICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiAhPT0gMCkge1xuICAgICAgICAgICAgcmVzdWx0WzBdID0gbGlzdFswXTtcbiAgICAgICAgICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIXByZWQobGFzdChyZXN1bHQpLCBsaXN0W2lkeF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IGxpc3RbaWR4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXBvcnRzIHdoZXRoZXIgdHdvIG9iamVjdHMgaGF2ZSB0aGUgc2FtZSB2YWx1ZSwgaW4gYFIuZXF1YWxzYCB0ZXJtcyxcbiAgICAgKiBmb3IgdGhlIHNwZWNpZmllZCBwcm9wZXJ0eS4gVXNlZnVsIGFzIGEgY3VycmllZCBwcmVkaWNhdGUuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcgayAtPiB7azogdn0gLT4ge2s6IHZ9IC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcCBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gY29tcGFyZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iajJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIG8xID0geyBhOiAxLCBiOiAyLCBjOiAzLCBkOiA0IH07XG4gICAgICogICAgICB2YXIgbzIgPSB7IGE6IDEwLCBiOiAyMCwgYzogMywgZDogNDAgfTtcbiAgICAgKiAgICAgIFIuZXFQcm9wcygnYScsIG8xLCBvMik7IC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIuZXFQcm9wcygnYycsIG8xLCBvMik7IC8vPT4gdHJ1ZVxuICAgICAqL1xuICAgIHZhciBlcVByb3BzID0gX2N1cnJ5MyhmdW5jdGlvbiBlcVByb3BzKHByb3AsIG9iajEsIG9iajIpIHtcbiAgICAgICAgcmV0dXJuIGVxdWFscyhvYmoxW3Byb3BdLCBvYmoyW3Byb3BdKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGFuIGl0ZW0gaW4gYW4gYXJyYXksXG4gICAgICogb3IgLTEgaWYgdGhlIGl0ZW0gaXMgbm90IGluY2x1ZGVkIGluIHRoZSBhcnJheS4gYFIuZXF1YWxzYCBpcyB1c2VkIHRvXG4gICAgICogZGV0ZXJtaW5lIGVxdWFsaXR5LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBhIC0+IFthXSAtPiBOdW1iZXJcbiAgICAgKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgaXRlbSB0byBmaW5kLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHhzIFRoZSBhcnJheSB0byBzZWFyY2ggaW4uXG4gICAgICogQHJldHVybiB7TnVtYmVyfSB0aGUgaW5kZXggb2YgdGhlIHRhcmdldCwgb3IgLTEgaWYgdGhlIHRhcmdldCBpcyBub3QgZm91bmQuXG4gICAgICogQHNlZSBSLmxhc3RJbmRleE9mXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5pbmRleE9mKDMsIFsxLDIsMyw0XSk7IC8vPT4gMlxuICAgICAqICAgICAgUi5pbmRleE9mKDEwLCBbMSwyLDMsNF0pOyAvLz0+IC0xXG4gICAgICovXG4gICAgdmFyIGluZGV4T2YgPSBfY3VycnkyKGZ1bmN0aW9uIGluZGV4T2YodGFyZ2V0LCB4cykge1xuICAgICAgICByZXR1cm4gX2hhc01ldGhvZCgnaW5kZXhPZicsIHhzKSA/IHhzLmluZGV4T2YodGFyZ2V0KSA6IF9pbmRleE9mKHhzLCB0YXJnZXQsIDApO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgYnV0IHRoZSBsYXN0IGVsZW1lbnQgb2YgdGhlIGdpdmVuIGxpc3Qgb3Igc3RyaW5nLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNlZSBSLmxhc3QsIFIuaGVhZCwgUi50YWlsXG4gICAgICogQHNpZyBbYV0gLT4gW2FdXG4gICAgICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gICAgICogQHBhcmFtIHsqfSBsaXN0XG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmluaXQoWzEsIDIsIDNdKTsgIC8vPT4gWzEsIDJdXG4gICAgICogICAgICBSLmluaXQoWzEsIDJdKTsgICAgIC8vPT4gWzFdXG4gICAgICogICAgICBSLmluaXQoWzFdKTsgICAgICAgIC8vPT4gW11cbiAgICAgKiAgICAgIFIuaW5pdChbXSk7ICAgICAgICAgLy89PiBbXVxuICAgICAqXG4gICAgICogICAgICBSLmluaXQoJ2FiYycpOyAgLy89PiAnYWInXG4gICAgICogICAgICBSLmluaXQoJ2FiJyk7ICAgLy89PiAnYSdcbiAgICAgKiAgICAgIFIuaW5pdCgnYScpOyAgICAvLz0+ICcnXG4gICAgICogICAgICBSLmluaXQoJycpOyAgICAgLy89PiAnJ1xuICAgICAqL1xuICAgIHZhciBpbml0ID0gc2xpY2UoMCwgLTEpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgYWxsIGVsZW1lbnRzIGFyZSB1bmlxdWUsIGluIGBSLmVxdWFsc2AgdGVybXMsXG4gICAgICogb3RoZXJ3aXNlIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIFthXSAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIGFsbCBlbGVtZW50cyBhcmUgdW5pcXVlLCBlbHNlIGBmYWxzZWAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5pc1NldChbJzEnLCAxXSk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5pc1NldChbMSwgMV0pOyAgIC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIuaXNTZXQoW1s0Ml0sIFs0Ml1dKTsgLy89PiBmYWxzZVxuICAgICAqL1xuICAgIHZhciBpc1NldCA9IF9jdXJyeTEoZnVuY3Rpb24gaXNTZXQobGlzdCkge1xuICAgICAgICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoX2luZGV4T2YobGlzdCwgbGlzdFtpZHhdLCBpZHggKyAxKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGVucyBmb3IgdGhlIGdpdmVuIGdldHRlciBhbmQgc2V0dGVyIGZ1bmN0aW9ucy4gVGhlIGdldHRlciBcImdldHNcIlxuICAgICAqIHRoZSB2YWx1ZSBvZiB0aGUgZm9jdXM7IHRoZSBzZXR0ZXIgXCJzZXRzXCIgdGhlIHZhbHVlIG9mIHRoZSBmb2N1cy4gVGhlIHNldHRlclxuICAgICAqIHNob3VsZCBub3QgbXV0YXRlIHRoZSBkYXRhIHN0cnVjdHVyZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHR5cGVkZWYgTGVucyBzIGEgPSBGdW5jdG9yIGYgPT4gKGEgLT4gZiBhKSAtPiBzIC0+IGYgc1xuICAgICAqIEBzaWcgKHMgLT4gYSkgLT4gKChhLCBzKSAtPiBzKSAtPiBMZW5zIHMgYVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGdldHRlclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHNldHRlclxuICAgICAqIEByZXR1cm4ge0xlbnN9XG4gICAgICogQHNlZSBSLnZpZXcsIFIuc2V0LCBSLm92ZXIsIFIubGVuc0luZGV4LCBSLmxlbnNQcm9wXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHhMZW5zID0gUi5sZW5zKFIucHJvcCgneCcpLCBSLmFzc29jKCd4JykpO1xuICAgICAqXG4gICAgICogICAgICBSLnZpZXcoeExlbnMsIHt4OiAxLCB5OiAyfSk7ICAgICAgICAgICAgLy89PiAxXG4gICAgICogICAgICBSLnNldCh4TGVucywgNCwge3g6IDEsIHk6IDJ9KTsgICAgICAgICAgLy89PiB7eDogNCwgeTogMn1cbiAgICAgKiAgICAgIFIub3Zlcih4TGVucywgUi5uZWdhdGUsIHt4OiAxLCB5OiAyfSk7ICAvLz0+IHt4OiAtMSwgeTogMn1cbiAgICAgKi9cbiAgICB2YXIgbGVucyA9IF9jdXJyeTIoZnVuY3Rpb24gbGVucyhnZXR0ZXIsIHNldHRlcikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAocykge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXAoZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldHRlcih2LCBzKTtcbiAgICAgICAgICAgICAgICB9LCBmKGdldHRlcihzKSkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsZW5zIHdob3NlIGZvY3VzIGlzIHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEB0eXBlZGVmIExlbnMgcyBhID0gRnVuY3RvciBmID0+IChhIC0+IGYgYSkgLT4gcyAtPiBmIHNcbiAgICAgKiBAc2lnIE51bWJlciAtPiBMZW5zIHMgYVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gICAgICogQHJldHVybiB7TGVuc31cbiAgICAgKiBAc2VlIFIudmlldywgUi5zZXQsIFIub3ZlclxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBoZWFkTGVucyA9IFIubGVuc0luZGV4KDApO1xuICAgICAqXG4gICAgICogICAgICBSLnZpZXcoaGVhZExlbnMsIFsnYScsICdiJywgJ2MnXSk7ICAgICAgICAgICAgLy89PiAnYSdcbiAgICAgKiAgICAgIFIuc2V0KGhlYWRMZW5zLCAneCcsIFsnYScsICdiJywgJ2MnXSk7ICAgICAgICAvLz0+IFsneCcsICdiJywgJ2MnXVxuICAgICAqICAgICAgUi5vdmVyKGhlYWRMZW5zLCBSLnRvVXBwZXIsIFsnYScsICdiJywgJ2MnXSk7IC8vPT4gWydBJywgJ2InLCAnYyddXG4gICAgICovXG4gICAgdmFyIGxlbnNJbmRleCA9IF9jdXJyeTEoZnVuY3Rpb24gbGVuc0luZGV4KG4pIHtcbiAgICAgICAgcmV0dXJuIGxlbnMobnRoKG4pLCB1cGRhdGUobikpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxlbnMgd2hvc2UgZm9jdXMgaXMgdGhlIHNwZWNpZmllZCBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHR5cGVkZWYgTGVucyBzIGEgPSBGdW5jdG9yIGYgPT4gKGEgLT4gZiBhKSAtPiBzIC0+IGYgc1xuICAgICAqIEBzaWcgU3RyaW5nIC0+IExlbnMgcyBhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtcbiAgICAgKiBAcmV0dXJuIHtMZW5zfVxuICAgICAqIEBzZWUgUi52aWV3LCBSLnNldCwgUi5vdmVyXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHhMZW5zID0gUi5sZW5zUHJvcCgneCcpO1xuICAgICAqXG4gICAgICogICAgICBSLnZpZXcoeExlbnMsIHt4OiAxLCB5OiAyfSk7ICAgICAgICAgICAgLy89PiAxXG4gICAgICogICAgICBSLnNldCh4TGVucywgNCwge3g6IDEsIHk6IDJ9KTsgICAgICAgICAgLy89PiB7eDogNCwgeTogMn1cbiAgICAgKiAgICAgIFIub3Zlcih4TGVucywgUi5uZWdhdGUsIHt4OiAxLCB5OiAyfSk7ICAvLz0+IHt4OiAtMSwgeTogMn1cbiAgICAgKi9cbiAgICB2YXIgbGVuc1Byb3AgPSBfY3VycnkxKGZ1bmN0aW9uIGxlbnNQcm9wKGspIHtcbiAgICAgICAgcmV0dXJuIGxlbnMocHJvcChrKSwgYXNzb2MoaykpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogXCJsaWZ0c1wiIGEgZnVuY3Rpb24gdG8gYmUgdGhlIHNwZWNpZmllZCBhcml0eSwgc28gdGhhdCBpdCBtYXkgXCJtYXAgb3ZlclwiIHRoYXQgbWFueVxuICAgICAqIGxpc3RzIChvciBvdGhlciBGdW5jdG9ycykuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNlZSBSLmxpZnRcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIE51bWJlciAtPiAoKi4uLiAtPiAqKSAtPiAoWypdLi4uIC0+IFsqXSlcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gbGlmdCBpbnRvIGhpZ2hlciBjb250ZXh0XG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBmdW5jdGlvbiBgZm5gIGFwcGxpY2FibGUgdG8gbWFwcGFibGUgb2JqZWN0cy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgbWFkZDMgPSBSLmxpZnROKDMsIFIuY3VycnlOKDMsIGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICByZXR1cm4gUi5yZWR1Y2UoUi5hZGQsIDAsIGFyZ3VtZW50cyk7XG4gICAgICogICAgICB9KSk7XG4gICAgICogICAgICBtYWRkMyhbMSwyLDNdLCBbMSwyLDNdLCBbMV0pOyAvLz0+IFszLCA0LCA1LCA0LCA1LCA2LCA1LCA2LCA3XVxuICAgICAqL1xuICAgIHZhciBsaWZ0TiA9IF9jdXJyeTIoZnVuY3Rpb24gbGlmdE4oYXJpdHksIGZuKSB7XG4gICAgICAgIHZhciBsaWZ0ZWQgPSBjdXJyeU4oYXJpdHksIGZuKTtcbiAgICAgICAgcmV0dXJuIGN1cnJ5Tihhcml0eSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9yZWR1Y2UoYXAsIG1hcChsaWZ0ZWQsIGFyZ3VtZW50c1swXSksIF9zbGljZShhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBtZWFuIG9mIHRoZSBnaXZlbiBsaXN0IG9mIG51bWJlcnMuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE1hdGhcbiAgICAgKiBAc2lnIFtOdW1iZXJdIC0+IE51bWJlclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3RcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5tZWFuKFsyLCA3LCA5XSk7IC8vPT4gNlxuICAgICAqICAgICAgUi5tZWFuKFtdKTsgLy89PiBOYU5cbiAgICAgKi9cbiAgICB2YXIgbWVhbiA9IF9jdXJyeTEoZnVuY3Rpb24gbWVhbihsaXN0KSB7XG4gICAgICAgIHJldHVybiBzdW0obGlzdCkgLyBsaXN0Lmxlbmd0aDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG1lZGlhbiBvZiB0aGUgZ2l2ZW4gbGlzdCBvZiBudW1iZXJzLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBNYXRoXG4gICAgICogQHNpZyBbTnVtYmVyXSAtPiBOdW1iZXJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0XG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIubWVkaWFuKFsyLCA5LCA3XSk7IC8vPT4gN1xuICAgICAqICAgICAgUi5tZWRpYW4oWzcsIDIsIDEwLCA5XSk7IC8vPT4gOFxuICAgICAqICAgICAgUi5tZWRpYW4oW10pOyAvLz0+IE5hTlxuICAgICAqL1xuICAgIHZhciBtZWRpYW4gPSBfY3VycnkxKGZ1bmN0aW9uIG1lZGlhbihsaXN0KSB7XG4gICAgICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgd2lkdGggPSAyIC0gbGVuICUgMjtcbiAgICAgICAgdmFyIGlkeCA9IChsZW4gLSB3aWR0aCkgLyAyO1xuICAgICAgICByZXR1cm4gbWVhbihfc2xpY2UobGlzdCkuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiAwO1xuICAgICAgICB9KS5zbGljZShpZHgsIGlkeCArIHdpZHRoKSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBNZXJnZXMgYSBsaXN0IG9mIG9iamVjdHMgdG9nZXRoZXIgaW50byBvbmUgb2JqZWN0LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBbe2s6IHZ9XSAtPiB7azogdn1cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IEFuIGFycmF5IG9mIG9iamVjdHNcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEEgbWVyZ2VkIG9iamVjdC5cbiAgICAgKiBAc2VlIFIucmVkdWNlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5tZXJnZUFsbChbe2ZvbzoxfSx7YmFyOjJ9LHtiYXo6M31dKTsgLy89PiB7Zm9vOjEsYmFyOjIsYmF6OjN9XG4gICAgICogICAgICBSLm1lcmdlQWxsKFt7Zm9vOjF9LHtmb286Mn0se2JhcjoyfV0pOyAvLz0+IHtmb286MixiYXI6Mn1cbiAgICAgKi9cbiAgICB2YXIgbWVyZ2VBbGwgPSBfY3VycnkxKGZ1bmN0aW9uIG1lcmdlQWxsKGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIHJlZHVjZShtZXJnZSwge30sIGxpc3QpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgbGVmdC10by1yaWdodCBmdW5jdGlvbiBjb21wb3NpdGlvbi4gVGhlIGxlZnRtb3N0IGZ1bmN0aW9uIG1heSBoYXZlXG4gICAgICogYW55IGFyaXR5OyB0aGUgcmVtYWluaW5nIGZ1bmN0aW9ucyBtdXN0IGJlIHVuYXJ5LlxuICAgICAqXG4gICAgICogSW4gc29tZSBsaWJyYXJpZXMgdGhpcyBmdW5jdGlvbiBpcyBuYW1lZCBgc2VxdWVuY2VgLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKCgoYSwgYiwgLi4uLCBuKSAtPiBvKSwgKG8gLT4gcCksIC4uLiwgKHggLT4geSksICh5IC0+IHopKSAtPiAoYSAtPiBiIC0+IC4uLiAtPiBuIC0+IHopXG4gICAgICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3Rpb25zXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAgICogQHNlZSBSLmNvbXBvc2VcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgZiA9IFIucGlwZShNYXRoLnBvdywgUi5uZWdhdGUsIFIuaW5jKTtcbiAgICAgKlxuICAgICAqICAgICAgZigzLCA0KTsgLy8gLSgzXjQpICsgMVxuICAgICAqL1xuICAgIHZhciBwaXBlID0gZnVuY3Rpb24gcGlwZSgpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncGlwZSByZXF1aXJlcyBhdCBsZWFzdCBvbmUgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycnlOKGFyZ3VtZW50c1swXS5sZW5ndGgsIHJlZHVjZShfcGlwZSwgYXJndW1lbnRzWzBdLCB0YWlsKGFyZ3VtZW50cykpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgbGVmdC10by1yaWdodCBjb21wb3NpdGlvbiBvZiBvbmUgb3IgbW9yZSBQcm9taXNlLXJldHVybmluZ1xuICAgICAqIGZ1bmN0aW9ucy4gVGhlIGxlZnRtb3N0IGZ1bmN0aW9uIG1heSBoYXZlIGFueSBhcml0eTsgdGhlIHJlbWFpbmluZ1xuICAgICAqIGZ1bmN0aW9ucyBtdXN0IGJlIHVuYXJ5LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKChhIC0+IFByb21pc2UgYiksIChiIC0+IFByb21pc2UgYyksIC4uLiwgKHkgLT4gUHJvbWlzZSB6KSkgLT4gKGEgLT4gUHJvbWlzZSB6KVxuICAgICAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmN0aW9uc1xuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAqIEBzZWUgUi5jb21wb3NlUFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIC8vICBmb2xsb3dlcnNGb3JVc2VyIDo6IFN0cmluZyAtPiBQcm9taXNlIFtVc2VyXVxuICAgICAqICAgICAgdmFyIGZvbGxvd2Vyc0ZvclVzZXIgPSBSLnBpcGVQKGRiLmdldFVzZXJCeUlkLCBkYi5nZXRGb2xsb3dlcnMpO1xuICAgICAqL1xuICAgIHZhciBwaXBlUCA9IGZ1bmN0aW9uIHBpcGVQKCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwaXBlUCByZXF1aXJlcyBhdCBsZWFzdCBvbmUgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycnlOKGFyZ3VtZW50c1swXS5sZW5ndGgsIHJlZHVjZShfcGlwZVAsIGFyZ3VtZW50c1swXSwgdGFpbChhcmd1bWVudHMpKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIE11bHRpcGxpZXMgdG9nZXRoZXIgYWxsIHRoZSBlbGVtZW50cyBvZiBhIGxpc3QuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE1hdGhcbiAgICAgKiBAc2lnIFtOdW1iZXJdIC0+IE51bWJlclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgQW4gYXJyYXkgb2YgbnVtYmVyc1xuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIHByb2R1Y3Qgb2YgYWxsIHRoZSBudW1iZXJzIGluIHRoZSBsaXN0LlxuICAgICAqIEBzZWUgUi5yZWR1Y2VcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnByb2R1Y3QoWzIsNCw2LDgsMTAwLDFdKTsgLy89PiAzODQwMFxuICAgICAqL1xuICAgIHZhciBwcm9kdWN0ID0gcmVkdWNlKG11bHRpcGx5LCAxKTtcblxuICAgIC8qKlxuICAgICAqIFJlYXNvbmFibGUgYW5hbG9nIHRvIFNRTCBgc2VsZWN0YCBzdGF0ZW1lbnQuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICAgICAqIEBzaWcgW2tdIC0+IFt7azogdn1dIC0+IFt7azogdn1dXG4gICAgICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIHByb2plY3RcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBvYmpzIFRoZSBvYmplY3RzIHRvIHF1ZXJ5XG4gICAgICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIG9iamVjdHMgd2l0aCBqdXN0IHRoZSBgcHJvcHNgIHByb3BlcnRpZXMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGFiYnkgPSB7bmFtZTogJ0FiYnknLCBhZ2U6IDcsIGhhaXI6ICdibG9uZCcsIGdyYWRlOiAyfTtcbiAgICAgKiAgICAgIHZhciBmcmVkID0ge25hbWU6ICdGcmVkJywgYWdlOiAxMiwgaGFpcjogJ2Jyb3duJywgZ3JhZGU6IDd9O1xuICAgICAqICAgICAgdmFyIGtpZHMgPSBbYWJieSwgZnJlZF07XG4gICAgICogICAgICBSLnByb2plY3QoWyduYW1lJywgJ2dyYWRlJ10sIGtpZHMpOyAvLz0+IFt7bmFtZTogJ0FiYnknLCBncmFkZTogMn0sIHtuYW1lOiAnRnJlZCcsIGdyYWRlOiA3fV1cbiAgICAgKi9cbiAgICAvLyBwYXNzaW5nIGBpZGVudGl0eWAgZ2l2ZXMgY29ycmVjdCBhcml0eVxuICAgIHZhciBwcm9qZWN0ID0gdXNlV2l0aChfbWFwLCBwaWNrQWxsLCBpZGVudGl0eSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3QgY29udGFpbmluZyB0aGUgbGFzdCBgbmAgZWxlbWVudHMgb2YgdGhlIGdpdmVuIGxpc3QuXG4gICAgICogSWYgYG4gPiBsaXN0Lmxlbmd0aGAsIHJldHVybnMgYSBsaXN0IG9mIGBsaXN0Lmxlbmd0aGAgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIE51bWJlciAtPiBbYV0gLT4gW2FdXG4gICAgICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgZWxlbWVudHMgdG8gcmV0dXJuLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHhzIFRoZSBjb2xsZWN0aW9uIHRvIGNvbnNpZGVyLlxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqIEBzZWUgUi5kcm9wTGFzdFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIudGFrZUxhc3QoMSwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ2JheiddXG4gICAgICogICAgICBSLnRha2VMYXN0KDIsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydmb3InLCAnYmF6J11cbiAgICAgKiAgICAgIFIudGFrZUxhc3QoMywgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ2ZvbycsICdiYXInLCAnYmF6J11cbiAgICAgKiAgICAgIFIudGFrZUxhc3QoNCwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ2ZvbycsICdiYXInLCAnYmF6J11cbiAgICAgKiAgICAgIFIudGFrZUxhc3QoMywgJ3JhbWRhJyk7ICAgICAgICAgICAgICAgLy89PiAnbWRhJ1xuICAgICAqL1xuICAgIHZhciB0YWtlTGFzdCA9IF9jdXJyeTIoZnVuY3Rpb24gdGFrZUxhc3QobiwgeHMpIHtcbiAgICAgICAgcmV0dXJuIGRyb3AobiA+PSAwID8geHMubGVuZ3RoIC0gbiA6IDAsIHhzKTtcbiAgICB9KTtcblxuICAgIHZhciBfY29udGFpbnMgPSBmdW5jdGlvbiBfY29udGFpbnMoYSwgbGlzdCkge1xuICAgICAgICByZXR1cm4gX2luZGV4T2YobGlzdCwgYSwgMCkgPj0gMDtcbiAgICB9O1xuXG4gICAgLy8gIG1hcFBhaXJzIDo6IChPYmplY3QsIFtTdHJpbmddKSAtPiBbU3RyaW5nXVxuICAgIC8vIEZ1bmN0aW9uLCBSZWdFeHAsIHVzZXItZGVmaW5lZCB0eXBlc1xuICAgIHZhciBfdG9TdHJpbmcgPSBmdW5jdGlvbiBfdG9TdHJpbmcoeCwgc2Vlbikge1xuICAgICAgICB2YXIgcmVjdXIgPSBmdW5jdGlvbiByZWN1cih5KSB7XG4gICAgICAgICAgICB2YXIgeHMgPSBzZWVuLmNvbmNhdChbeF0pO1xuICAgICAgICAgICAgcmV0dXJuIF9jb250YWlucyh5LCB4cykgPyAnPENpcmN1bGFyPicgOiBfdG9TdHJpbmcoeSwgeHMpO1xuICAgICAgICB9O1xuICAgICAgICAvLyAgbWFwUGFpcnMgOjogKE9iamVjdCwgW1N0cmluZ10pIC0+IFtTdHJpbmddXG4gICAgICAgIHZhciBtYXBQYWlycyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgICAgICAgICAgIHJldHVybiBfbWFwKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9xdW90ZShrKSArICc6ICcgKyByZWN1cihvYmpba10pO1xuICAgICAgICAgICAgfSwga2V5cy5zbGljZSgpLnNvcnQoKSk7XG4gICAgICAgIH07XG4gICAgICAgIHN3aXRjaCAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpKSB7XG4gICAgICAgIGNhc2UgJ1tvYmplY3QgQXJndW1lbnRzXSc6XG4gICAgICAgICAgICByZXR1cm4gJyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgnICsgX21hcChyZWN1ciwgeCkuam9pbignLCAnKSArICcpKSc7XG4gICAgICAgIGNhc2UgJ1tvYmplY3QgQXJyYXldJzpcbiAgICAgICAgICAgIHJldHVybiAnWycgKyBfbWFwKHJlY3VyLCB4KS5jb25jYXQobWFwUGFpcnMoeCwgcmVqZWN0KHRlc3QoL15cXGQrJC8pLCBrZXlzKHgpKSkpLmpvaW4oJywgJykgKyAnXSc7XG4gICAgICAgIGNhc2UgJ1tvYmplY3QgQm9vbGVhbl0nOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnb2JqZWN0JyA/ICduZXcgQm9vbGVhbignICsgcmVjdXIoeC52YWx1ZU9mKCkpICsgJyknIDogeC50b1N0cmluZygpO1xuICAgICAgICBjYXNlICdbb2JqZWN0IERhdGVdJzpcbiAgICAgICAgICAgIHJldHVybiAnbmV3IERhdGUoJyArIF9xdW90ZShfdG9JU09TdHJpbmcoeCkpICsgJyknO1xuICAgICAgICBjYXNlICdbb2JqZWN0IE51bGxdJzpcbiAgICAgICAgICAgIHJldHVybiAnbnVsbCc7XG4gICAgICAgIGNhc2UgJ1tvYmplY3QgTnVtYmVyXSc6XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdvYmplY3QnID8gJ25ldyBOdW1iZXIoJyArIHJlY3VyKHgudmFsdWVPZigpKSArICcpJyA6IDEgLyB4ID09PSAtSW5maW5pdHkgPyAnLTAnIDogeC50b1N0cmluZygxMCk7XG4gICAgICAgIGNhc2UgJ1tvYmplY3QgU3RyaW5nXSc6XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdvYmplY3QnID8gJ25ldyBTdHJpbmcoJyArIHJlY3VyKHgudmFsdWVPZigpKSArICcpJyA6IF9xdW90ZSh4KTtcbiAgICAgICAgY2FzZSAnW29iamVjdCBVbmRlZmluZWRdJzpcbiAgICAgICAgICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgeC5jb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyAmJiB4LmNvbnN0cnVjdG9yLm5hbWUgIT09ICdPYmplY3QnICYmIHR5cGVvZiB4LnRvU3RyaW5nID09PSAnZnVuY3Rpb24nICYmIHgudG9TdHJpbmcoKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScgPyB4LnRvU3RyaW5nKCkgOiAvLyBGdW5jdGlvbiwgUmVnRXhwLCB1c2VyLWRlZmluZWQgdHlwZXNcbiAgICAgICAgICAgICd7JyArIG1hcFBhaXJzKHgsIGtleXMoeCkpLmpvaW4oJywgJykgKyAnfSc7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVHVybnMgYSBsaXN0IG9mIEZ1bmN0b3JzIGludG8gYSBGdW5jdG9yIG9mIGEgbGlzdC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzZWUgUi5jb21tdXRlTWFwXG4gICAgICogQHNpZyBGdW5jdG9yIGYgPT4gKHggLT4gZiB4KSAtPiBbZiBhXSAtPiBmIFthXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9mIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBkYXRhIHR5cGUgdG8gcmV0dXJuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBBbiBhcnJheSBvZiBmdW5jdG9ycyBvZiB0aGUgc2FtZSB0eXBlXG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmNvbW11dGUoUi5vZiwgW1sxXSwgWzIsIDNdXSk7ICAgLy89PiBbWzEsIDJdLCBbMSwgM11dXG4gICAgICogICAgICBSLmNvbW11dGUoUi5vZiwgW1sxLCAyXSwgWzNdXSk7ICAgLy89PiBbWzEsIDNdLCBbMiwgM11dXG4gICAgICogICAgICBSLmNvbW11dGUoUi5vZiwgW1sxXSwgWzJdLCBbM11dKTsgLy89PiBbWzEsIDIsIDNdXVxuICAgICAqICAgICAgUi5jb21tdXRlKE1heWJlLm9mLCBbSnVzdCgxKSwgSnVzdCgyKSwgSnVzdCgzKV0pOyAgIC8vPT4gSnVzdChbMSwgMiwgM10pXG4gICAgICogICAgICBSLmNvbW11dGUoTWF5YmUub2YsIFtKdXN0KDEpLCBKdXN0KDIpLCBOb3RoaW5nKCldKTsgLy89PiBOb3RoaW5nKClcbiAgICAgKi9cbiAgICB2YXIgY29tbXV0ZSA9IGNvbW11dGVNYXAoaWRlbnRpdHkpO1xuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgcmlnaHQtdG8tbGVmdCBmdW5jdGlvbiBjb21wb3NpdGlvbi4gVGhlIHJpZ2h0bW9zdCBmdW5jdGlvbiBtYXkgaGF2ZVxuICAgICAqIGFueSBhcml0eTsgdGhlIHJlbWFpbmluZyBmdW5jdGlvbnMgbXVzdCBiZSB1bmFyeS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnICgoeSAtPiB6KSwgKHggLT4geSksIC4uLiwgKG8gLT4gcCksICgoYSwgYiwgLi4uLCBuKSAtPiBvKSkgLT4gKGEgLT4gYiAtPiAuLi4gLT4gbiAtPiB6KVxuICAgICAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmN0aW9uc1xuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAqIEBzZWUgUi5waXBlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGYgPSBSLmNvbXBvc2UoUi5pbmMsIFIubmVnYXRlLCBNYXRoLnBvdyk7XG4gICAgICpcbiAgICAgKiAgICAgIGYoMywgNCk7IC8vIC0oM140KSArIDFcbiAgICAgKi9cbiAgICB2YXIgY29tcG9zZSA9IGZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvbXBvc2UgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIGFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBpcGUuYXBwbHkodGhpcywgcmV2ZXJzZShhcmd1bWVudHMpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcmlnaHQtdG8tbGVmdCBLbGVpc2xpIGNvbXBvc2l0aW9uIG9mIHRoZSBwcm92aWRlZCBmdW5jdGlvbnMsXG4gICAgICogZWFjaCBvZiB3aGljaCBtdXN0IHJldHVybiBhIHZhbHVlIG9mIGEgdHlwZSBzdXBwb3J0ZWQgYnkgW2BjaGFpbmBdKCNjaGFpbikuXG4gICAgICpcbiAgICAgKiBgUi5jb21wb3NlSyhoLCBnLCBmKWAgaXMgZXF1aXZhbGVudCB0byBgUi5jb21wb3NlKFIuY2hhaW4oaCksIFIuY2hhaW4oZyksIFIuY2hhaW4oZikpYC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2VlIFIucGlwZUtcbiAgICAgKiBAc2lnIENoYWluIG0gPT4gKCh5IC0+IG0geiksICh4IC0+IG0geSksIC4uLiwgKGEgLT4gbSBiKSkgLT4gKG0gYSAtPiBtIHopXG4gICAgICogQHBhcmFtIHsuLi5GdW5jdGlvbn1cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICAvLyAgcGFyc2VKc29uIDo6IFN0cmluZyAtPiBNYXliZSAqXG4gICAgICogICAgICAvLyAgZ2V0IDo6IFN0cmluZyAtPiBPYmplY3QgLT4gTWF5YmUgKlxuICAgICAqXG4gICAgICogICAgICAvLyAgZ2V0U3RhdGVDb2RlIDo6IE1heWJlIFN0cmluZyAtPiBNYXliZSBTdHJpbmdcbiAgICAgKiAgICAgIHZhciBnZXRTdGF0ZUNvZGUgPSBSLmNvbXBvc2VLKFxuICAgICAqICAgICAgICBSLmNvbXBvc2UoTWF5YmUub2YsIFIudG9VcHBlciksXG4gICAgICogICAgICAgIGdldCgnc3RhdGUnKSxcbiAgICAgKiAgICAgICAgZ2V0KCdhZGRyZXNzJyksXG4gICAgICogICAgICAgIGdldCgndXNlcicpLFxuICAgICAqICAgICAgICBwYXJzZUpzb25cbiAgICAgKiAgICAgICk7XG4gICAgICpcbiAgICAgKiAgICAgIGdldFN0YXRlQ29kZShNYXliZS5vZigne1widXNlclwiOntcImFkZHJlc3NcIjp7XCJzdGF0ZVwiOlwibnlcIn19fScpKTtcbiAgICAgKiAgICAgIC8vPT4gSnVzdCgnTlknKVxuICAgICAqICAgICAgZ2V0U3RhdGVDb2RlKE1heWJlLm9mKCdbSW52YWxpZCBKU09OXScpKTtcbiAgICAgKiAgICAgIC8vPT4gTm90aGluZygpXG4gICAgICovXG4gICAgdmFyIGNvbXBvc2VLID0gZnVuY3Rpb24gY29tcG9zZUsoKSB7XG4gICAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAwID8gaWRlbnRpdHkgOiBjb21wb3NlLmFwcGx5KHRoaXMsIG1hcChjaGFpbiwgYXJndW1lbnRzKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHJpZ2h0LXRvLWxlZnQgY29tcG9zaXRpb24gb2Ygb25lIG9yIG1vcmUgUHJvbWlzZS1yZXR1cm5pbmdcbiAgICAgKiBmdW5jdGlvbnMuIFRoZSByaWdodG1vc3QgZnVuY3Rpb24gbWF5IGhhdmUgYW55IGFyaXR5OyB0aGUgcmVtYWluaW5nXG4gICAgICogZnVuY3Rpb25zIG11c3QgYmUgdW5hcnkuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHNpZyAoKHkgLT4gUHJvbWlzZSB6KSwgKHggLT4gUHJvbWlzZSB5KSwgLi4uLCAoYSAtPiBQcm9taXNlIGIpKSAtPiAoYSAtPiBQcm9taXNlIHopXG4gICAgICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3Rpb25zXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAgICogQHNlZSBSLnBpcGVQXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgLy8gIGZvbGxvd2Vyc0ZvclVzZXIgOjogU3RyaW5nIC0+IFByb21pc2UgW1VzZXJdXG4gICAgICogICAgICB2YXIgZm9sbG93ZXJzRm9yVXNlciA9IFIuY29tcG9zZVAoZGIuZ2V0Rm9sbG93ZXJzLCBkYi5nZXRVc2VyQnlJZCk7XG4gICAgICovXG4gICAgdmFyIGNvbXBvc2VQID0gZnVuY3Rpb24gY29tcG9zZVAoKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvbXBvc2VQIHJlcXVpcmVzIGF0IGxlYXN0IG9uZSBhcmd1bWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwaXBlUC5hcHBseSh0aGlzLCByZXZlcnNlKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBXcmFwcyBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGluc2lkZSBhIGN1cnJpZWQgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHdpdGggdGhlIHNhbWVcbiAgICAgKiBhcmd1bWVudHMgYW5kIHJldHVybnMgdGhlIHNhbWUgdHlwZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnICgqIC0+IHsqfSkgLT4gKCogLT4geyp9KVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IEZuIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byB3cmFwLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIHdyYXBwZWQsIGN1cnJpZWQgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgLy8gQ29uc3RydWN0b3IgZnVuY3Rpb25cbiAgICAgKiAgICAgIHZhciBXaWRnZXQgPSBmdW5jdGlvbihjb25maWcpIHtcbiAgICAgKiAgICAgICAgLy8gLi4uXG4gICAgICogICAgICB9O1xuICAgICAqICAgICAgV2lkZ2V0LnByb3RvdHlwZSA9IHtcbiAgICAgKiAgICAgICAgLy8gLi4uXG4gICAgICogICAgICB9O1xuICAgICAqICAgICAgdmFyIGFsbENvbmZpZ3MgPSBbXG4gICAgICogICAgICAgIC8vIC4uLlxuICAgICAqICAgICAgXTtcbiAgICAgKiAgICAgIFIubWFwKFIuY29uc3RydWN0KFdpZGdldCksIGFsbENvbmZpZ3MpOyAvLyBhIGxpc3Qgb2YgV2lkZ2V0c1xuICAgICAqL1xuICAgIHZhciBjb25zdHJ1Y3QgPSBfY3VycnkxKGZ1bmN0aW9uIGNvbnN0cnVjdChGbikge1xuICAgICAgICByZXR1cm4gY29uc3RydWN0TihGbi5sZW5ndGgsIEZuKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgZXF1YWwsIGluIGBSLmVxdWFsc2AgdGVybXMsXG4gICAgICogdG8gYXQgbGVhc3Qgb25lIGVsZW1lbnQgb2YgdGhlIGdpdmVuIGxpc3Q7IGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBhIC0+IFthXSAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIGl0ZW0gdG8gY29tcGFyZSBhZ2FpbnN0LlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgaXRlbSBpcyBpbiB0aGUgbGlzdCwgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmNvbnRhaW5zKDMsIFsxLCAyLCAzXSk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5jb250YWlucyg0LCBbMSwgMiwgM10pOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmNvbnRhaW5zKFs0Ml0sIFtbNDJdXSk7IC8vPT4gdHJ1ZVxuICAgICAqL1xuICAgIHZhciBjb250YWlucyA9IF9jdXJyeTIoX2NvbnRhaW5zKTtcblxuICAgIC8qKlxuICAgICAqIEZpbmRzIHRoZSBzZXQgKGkuZS4gbm8gZHVwbGljYXRlcykgb2YgYWxsIGVsZW1lbnRzIGluIHRoZSBmaXJzdCBsaXN0IG5vdCBjb250YWluZWQgaW4gdGhlIHNlY29uZCBsaXN0LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICAgICAqIEBzaWcgW2FdIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0MSBUaGUgZmlyc3QgbGlzdC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0MiBUaGUgc2Vjb25kIGxpc3QuXG4gICAgICogQHJldHVybiB7QXJyYXl9IFRoZSBlbGVtZW50cyBpbiBgbGlzdDFgIHRoYXQgYXJlIG5vdCBpbiBgbGlzdDJgLlxuICAgICAqIEBzZWUgUi5kaWZmZXJlbmNlV2l0aFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuZGlmZmVyZW5jZShbMSwyLDMsNF0sIFs3LDYsNSw0LDNdKTsgLy89PiBbMSwyXVxuICAgICAqICAgICAgUi5kaWZmZXJlbmNlKFs3LDYsNSw0LDNdLCBbMSwyLDMsNF0pOyAvLz0+IFs3LDYsNV1cbiAgICAgKi9cbiAgICB2YXIgZGlmZmVyZW5jZSA9IF9jdXJyeTIoZnVuY3Rpb24gZGlmZmVyZW5jZShmaXJzdCwgc2Vjb25kKSB7XG4gICAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHZhciBmaXJzdExlbiA9IGZpcnN0Lmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGZpcnN0TGVuKSB7XG4gICAgICAgICAgICBpZiAoIV9jb250YWlucyhmaXJzdFtpZHhdLCBzZWNvbmQpICYmICFfY29udGFpbnMoZmlyc3RbaWR4XSwgb3V0KSkge1xuICAgICAgICAgICAgICAgIG91dFtvdXQubGVuZ3RoXSA9IGZpcnN0W2lkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG5ldyBsaXN0IHdpdGhvdXQgYW55IGNvbnNlY3V0aXZlbHkgcmVwZWF0aW5nIGVsZW1lbnRzLlxuICAgICAqIGBSLmVxdWFsc2AgaXMgdXNlZCB0byBkZXRlcm1pbmUgZXF1YWxpdHkuXG4gICAgICpcbiAgICAgKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gICAgICogQHNlZSBSLnRyYW5zZHVjZVxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBbYV0gLT4gW2FdXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHJldHVybiB7QXJyYXl9IGBsaXN0YCB3aXRob3V0IHJlcGVhdGluZyBlbGVtZW50cy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgIFIuZHJvcFJlcGVhdHMoWzEsIDEsIDEsIDIsIDMsIDQsIDQsIDIsIDJdKTsgLy89PiBbMSwgMiwgMywgNCwgMl1cbiAgICAgKi9cbiAgICB2YXIgZHJvcFJlcGVhdHMgPSBfY3VycnkxKF9kaXNwYXRjaGFibGUoJ2Ryb3BSZXBlYXRzJywgX3hkcm9wUmVwZWF0c1dpdGgoZXF1YWxzKSwgZHJvcFJlcGVhdHNXaXRoKGVxdWFscykpKTtcblxuICAgIC8qKlxuICAgICAqIENvbWJpbmVzIHR3byBsaXN0cyBpbnRvIGEgc2V0IChpLmUuIG5vIGR1cGxpY2F0ZXMpIGNvbXBvc2VkIG9mIHRob3NlIGVsZW1lbnRzIGNvbW1vbiB0byBib3RoIGxpc3RzLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICAgICAqIEBzaWcgW2FdIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0MSBUaGUgZmlyc3QgbGlzdC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0MiBUaGUgc2Vjb25kIGxpc3QuXG4gICAgICogQHNlZSBSLmludGVyc2VjdGlvbldpdGhcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3Qgb2YgZWxlbWVudHMgZm91bmQgaW4gYm90aCBgbGlzdDFgIGFuZCBgbGlzdDJgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuaW50ZXJzZWN0aW9uKFsxLDIsMyw0XSwgWzcsNiw1LDQsM10pOyAvLz0+IFs0LCAzXVxuICAgICAqL1xuICAgIHZhciBpbnRlcnNlY3Rpb24gPSBfY3VycnkyKGZ1bmN0aW9uIGludGVyc2VjdGlvbihsaXN0MSwgbGlzdDIpIHtcbiAgICAgICAgcmV0dXJuIHVuaXEoX2ZpbHRlcihmbGlwKF9jb250YWlucykobGlzdDEpLCBsaXN0MikpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogXCJsaWZ0c1wiIGEgZnVuY3Rpb24gb2YgYXJpdHkgPiAxIHNvIHRoYXQgaXQgbWF5IFwibWFwIG92ZXJcIiBhbiBBcnJheSBvclxuICAgICAqIG90aGVyIEZ1bmN0b3IuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNlZSBSLmxpZnROXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHNpZyAoKi4uLiAtPiAqKSAtPiAoWypdLi4uIC0+IFsqXSlcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gbGlmdCBpbnRvIGhpZ2hlciBjb250ZXh0XG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBmdW5jdGlvbiBgZm5gIGFwcGxpY2FibGUgdG8gbWFwcGFibGUgb2JqZWN0cy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgbWFkZDMgPSBSLmxpZnQoUi5jdXJyeShmdW5jdGlvbihhLCBiLCBjKSB7XG4gICAgICogICAgICAgIHJldHVybiBhICsgYiArIGM7XG4gICAgICogICAgICB9KSk7XG4gICAgICogICAgICBtYWRkMyhbMSwyLDNdLCBbMSwyLDNdLCBbMV0pOyAvLz0+IFszLCA0LCA1LCA0LCA1LCA2LCA1LCA2LCA3XVxuICAgICAqXG4gICAgICogICAgICB2YXIgbWFkZDUgPSBSLmxpZnQoUi5jdXJyeShmdW5jdGlvbihhLCBiLCBjLCBkLCBlKSB7XG4gICAgICogICAgICAgIHJldHVybiBhICsgYiArIGMgKyBkICsgZTtcbiAgICAgKiAgICAgIH0pKTtcbiAgICAgKiAgICAgIG1hZGQ1KFsxLDJdLCBbM10sIFs0LCA1XSwgWzZdLCBbNywgOF0pOyAvLz0+IFsyMSwgMjIsIDIyLCAyMywgMjIsIDIzLCAyMywgMjRdXG4gICAgICovXG4gICAgdmFyIGxpZnQgPSBfY3VycnkxKGZ1bmN0aW9uIGxpZnQoZm4pIHtcbiAgICAgICAgcmV0dXJuIGxpZnROKGZuLmxlbmd0aCwgZm4pO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHBhcnRpYWwgY29weSBvZiBhbiBvYmplY3Qgb21pdHRpbmcgdGhlIGtleXMgc3BlY2lmaWVkLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIFtTdHJpbmddIC0+IHtTdHJpbmc6ICp9IC0+IHtTdHJpbmc6ICp9XG4gICAgICogQHBhcmFtIHtBcnJheX0gbmFtZXMgYW4gYXJyYXkgb2YgU3RyaW5nIHByb3BlcnR5IG5hbWVzIHRvIG9taXQgZnJvbSB0aGUgbmV3IG9iamVjdFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBjb3B5IGZyb21cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEEgbmV3IG9iamVjdCB3aXRoIHByb3BlcnRpZXMgZnJvbSBgbmFtZXNgIG5vdCBvbiBpdC5cbiAgICAgKiBAc2VlIFIucGlja1xuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIub21pdChbJ2EnLCAnZCddLCB7YTogMSwgYjogMiwgYzogMywgZDogNH0pOyAvLz0+IHtiOiAyLCBjOiAzfVxuICAgICAqL1xuICAgIHZhciBvbWl0ID0gX2N1cnJ5MihmdW5jdGlvbiBvbWl0KG5hbWVzLCBvYmopIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKCFfY29udGFpbnMocHJvcCwgbmFtZXMpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W3Byb3BdID0gb2JqW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsZWZ0LXRvLXJpZ2h0IEtsZWlzbGkgY29tcG9zaXRpb24gb2YgdGhlIHByb3ZpZGVkIGZ1bmN0aW9ucyxcbiAgICAgKiBlYWNoIG9mIHdoaWNoIG11c3QgcmV0dXJuIGEgdmFsdWUgb2YgYSB0eXBlIHN1cHBvcnRlZCBieSBbYGNoYWluYF0oI2NoYWluKS5cbiAgICAgKlxuICAgICAqIGBSLnBpcGVLKGYsIGcsIGgpYCBpcyBlcXVpdmFsZW50IHRvIGBSLnBpcGUoUi5jaGFpbihmKSwgUi5jaGFpbihnKSwgUi5jaGFpbihoKSlgLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzZWUgUi5jb21wb3NlS1xuICAgICAqIEBzaWcgQ2hhaW4gbSA9PiAoKGEgLT4gbSBiKSwgKGIgLT4gbSBjKSwgLi4uLCAoeSAtPiBtIHopKSAtPiAobSBhIC0+IG0geilcbiAgICAgKiBAcGFyYW0gey4uLkZ1bmN0aW9ufVxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIC8vICBwYXJzZUpzb24gOjogU3RyaW5nIC0+IE1heWJlICpcbiAgICAgKiAgICAgIC8vICBnZXQgOjogU3RyaW5nIC0+IE9iamVjdCAtPiBNYXliZSAqXG4gICAgICpcbiAgICAgKiAgICAgIC8vICBnZXRTdGF0ZUNvZGUgOjogTWF5YmUgU3RyaW5nIC0+IE1heWJlIFN0cmluZ1xuICAgICAqICAgICAgdmFyIGdldFN0YXRlQ29kZSA9IFIucGlwZUsoXG4gICAgICogICAgICAgIHBhcnNlSnNvbixcbiAgICAgKiAgICAgICAgZ2V0KCd1c2VyJyksXG4gICAgICogICAgICAgIGdldCgnYWRkcmVzcycpLFxuICAgICAqICAgICAgICBnZXQoJ3N0YXRlJyksXG4gICAgICogICAgICAgIFIuY29tcG9zZShNYXliZS5vZiwgUi50b1VwcGVyKVxuICAgICAqICAgICAgKTtcbiAgICAgKlxuICAgICAqICAgICAgZ2V0U3RhdGVDb2RlKE1heWJlLm9mKCd7XCJ1c2VyXCI6e1wiYWRkcmVzc1wiOntcInN0YXRlXCI6XCJueVwifX19JykpO1xuICAgICAqICAgICAgLy89PiBKdXN0KCdOWScpXG4gICAgICogICAgICBnZXRTdGF0ZUNvZGUoTWF5YmUub2YoJ1tJbnZhbGlkIEpTT05dJykpO1xuICAgICAqICAgICAgLy89PiBOb3RoaW5nKClcbiAgICAgKi9cbiAgICB2YXIgcGlwZUsgPSBmdW5jdGlvbiBwaXBlSygpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvc2VLLmFwcGx5KHRoaXMsIHJldmVyc2UoYXJndW1lbnRzKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gdmFsdWUuIGBldmFsYCdpbmcgdGhlIG91dHB1dFxuICAgICAqIHNob3VsZCByZXN1bHQgaW4gYSB2YWx1ZSBlcXVpdmFsZW50IHRvIHRoZSBpbnB1dCB2YWx1ZS4gTWFueSBvZiB0aGUgYnVpbHQtaW5cbiAgICAgKiBgdG9TdHJpbmdgIG1ldGhvZHMgZG8gbm90IHNhdGlzZnkgdGhpcyByZXF1aXJlbWVudC5cbiAgICAgKlxuICAgICAqIElmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBgW29iamVjdCBPYmplY3RdYCB3aXRoIGEgYHRvU3RyaW5nYCBtZXRob2Qgb3RoZXJcbiAgICAgKiB0aGFuIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCwgdGhpcyBtZXRob2QgaXMgaW52b2tlZCB3aXRoIG5vIGFyZ3VtZW50c1xuICAgICAqIHRvIHByb2R1Y2UgdGhlIHJldHVybiB2YWx1ZS4gVGhpcyBtZWFucyB1c2VyLWRlZmluZWQgY29uc3RydWN0b3IgZnVuY3Rpb25zXG4gICAgICogY2FuIHByb3ZpZGUgYSBzdWl0YWJsZSBgdG9TdHJpbmdgIG1ldGhvZC4gRm9yIGV4YW1wbGU6XG4gICAgICpcbiAgICAgKiAgICAgZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuICAgICAqICAgICAgIHRoaXMueCA9IHg7XG4gICAgICogICAgICAgdGhpcy55ID0geTtcbiAgICAgKiAgICAgfVxuICAgICAqXG4gICAgICogICAgIFBvaW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgIHJldHVybiAnbmV3IFBvaW50KCcgKyB0aGlzLnggKyAnLCAnICsgdGhpcy55ICsgJyknO1xuICAgICAqICAgICB9O1xuICAgICAqXG4gICAgICogICAgIFIudG9TdHJpbmcobmV3IFBvaW50KDEsIDIpKTsgLy89PiAnbmV3IFBvaW50KDEsIDIpJ1xuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBTdHJpbmdcbiAgICAgKiBAc2lnICogLT4gU3RyaW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWxcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi50b1N0cmluZyg0Mik7IC8vPT4gJzQyJ1xuICAgICAqICAgICAgUi50b1N0cmluZygnYWJjJyk7IC8vPT4gJ1wiYWJjXCInXG4gICAgICogICAgICBSLnRvU3RyaW5nKFsxLCAyLCAzXSk7IC8vPT4gJ1sxLCAyLCAzXSdcbiAgICAgKiAgICAgIFIudG9TdHJpbmcoe2ZvbzogMSwgYmFyOiAyLCBiYXo6IDN9KTsgLy89PiAne1wiYmFyXCI6IDIsIFwiYmF6XCI6IDMsIFwiZm9vXCI6IDF9J1xuICAgICAqICAgICAgUi50b1N0cmluZyhuZXcgRGF0ZSgnMjAwMS0wMi0wM1QwNDowNTowNlonKSk7IC8vPT4gJ25ldyBEYXRlKFwiMjAwMS0wMi0wM1QwNDowNTowNi4wMDBaXCIpJ1xuICAgICAqL1xuICAgIHZhciB0b1N0cmluZyA9IF9jdXJyeTEoZnVuY3Rpb24gdG9TdHJpbmcodmFsKSB7XG4gICAgICAgIHJldHVybiBfdG9TdHJpbmcodmFsLCBbXSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDb21iaW5lcyB0d28gbGlzdHMgaW50byBhIHNldCAoaS5lLiBubyBkdXBsaWNhdGVzKSBjb21wb3NlZCBvZiB0aGVcbiAgICAgKiBlbGVtZW50cyBvZiBlYWNoIGxpc3QuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gICAgICogQHNpZyBbYV0gLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFzIFRoZSBmaXJzdCBsaXN0LlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGJzIFRoZSBzZWNvbmQgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIGZpcnN0IGFuZCBzZWNvbmQgbGlzdHMgY29uY2F0ZW5hdGVkLCB3aXRoXG4gICAgICogICAgICAgICBkdXBsaWNhdGVzIHJlbW92ZWQuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi51bmlvbihbMSwgMiwgM10sIFsyLCAzLCA0XSk7IC8vPT4gWzEsIDIsIDMsIDRdXG4gICAgICovXG4gICAgdmFyIHVuaW9uID0gX2N1cnJ5Mihjb21wb3NlKHVuaXEsIF9jb25jYXQpKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgbGlzdCBjb250YWluaW5nIG9ubHkgb25lIGNvcHkgb2YgZWFjaCBlbGVtZW50IGluIHRoZVxuICAgICAqIG9yaWdpbmFsIGxpc3QsIGJhc2VkIHVwb24gdGhlIHZhbHVlIHJldHVybmVkIGJ5IGFwcGx5aW5nIHRoZSBzdXBwbGllZFxuICAgICAqIGZ1bmN0aW9uIHRvIGVhY2ggbGlzdCBlbGVtZW50LiBQcmVmZXJzIHRoZSBmaXJzdCBpdGVtIGlmIHRoZSBzdXBwbGllZFxuICAgICAqIGZ1bmN0aW9uIHByb2R1Y2VzIHRoZSBzYW1lIHZhbHVlIG9uIHR3byBpdGVtcy4gYFIuZXF1YWxzYCBpcyB1c2VkIGZvclxuICAgICAqIGNvbXBhcmlzb24uXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhIC0+IGIpIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBBIGZ1bmN0aW9uIHVzZWQgdG8gcHJvZHVjZSBhIHZhbHVlIHRvIHVzZSBkdXJpbmcgY29tcGFyaXNvbnMuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHJldHVybiB7QXJyYXl9IFRoZSBsaXN0IG9mIHVuaXF1ZSBpdGVtcy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnVuaXFCeShNYXRoLmFicywgWy0xLCAtNSwgMiwgMTAsIDEsIDJdKTsgLy89PiBbLTEsIC01LCAyLCAxMF1cbiAgICAgKi9cbiAgICB2YXIgdW5pcUJ5ID0gX2N1cnJ5MihmdW5jdGlvbiB1bmlxQnkoZm4sIGxpc3QpIHtcbiAgICAgICAgdmFyIGlkeCA9IDAsIGFwcGxpZWQgPSBbXSwgcmVzdWx0ID0gW10sIGFwcGxpZWRJdGVtLCBpdGVtO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZW0gPSBsaXN0W2lkeF07XG4gICAgICAgICAgICBhcHBsaWVkSXRlbSA9IGZuKGl0ZW0pO1xuICAgICAgICAgICAgaWYgKCFfY29udGFpbnMoYXBwbGllZEl0ZW0sIGFwcGxpZWQpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgYXBwbGllZC5wdXNoKGFwcGxpZWRJdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBUdXJucyBhIG5hbWVkIG1ldGhvZCB3aXRoIGEgc3BlY2lmaWVkIGFyaXR5IGludG8gYSBmdW5jdGlvblxuICAgICAqIHRoYXQgY2FuIGJlIGNhbGxlZCBkaXJlY3RseSBzdXBwbGllZCB3aXRoIGFyZ3VtZW50cyBhbmQgYSB0YXJnZXQgb2JqZWN0LlxuICAgICAqXG4gICAgICogVGhlIHJldHVybmVkIGZ1bmN0aW9uIGlzIGN1cnJpZWQgYW5kIGFjY2VwdHMgYGFyaXR5ICsgMWAgcGFyYW1ldGVycyB3aGVyZVxuICAgICAqIHRoZSBmaW5hbCBwYXJhbWV0ZXIgaXMgdGhlIHRhcmdldCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IChhIC0+IGIgLT4gLi4uIC0+IG4gLT4gT2JqZWN0IC0+ICopXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGFyaXR5IE51bWJlciBvZiBhcmd1bWVudHMgdGhlIHJldHVybmVkIGZ1bmN0aW9uIHNob3VsZCB0YWtlXG4gICAgICogICAgICAgIGJlZm9yZSB0aGUgdGFyZ2V0IG9iamVjdC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXRob2QgTmFtZSBvZiB0aGUgbWV0aG9kIHRvIGNhbGwuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3IGN1cnJpZWQgZnVuY3Rpb24uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHNsaWNlRnJvbSA9IFIuaW52b2tlcigxLCAnc2xpY2UnKTtcbiAgICAgKiAgICAgIHNsaWNlRnJvbSg2LCAnYWJjZGVmZ2hpamtsbScpOyAvLz0+ICdnaGlqa2xtJ1xuICAgICAqICAgICAgdmFyIHNsaWNlRnJvbTYgPSBSLmludm9rZXIoMiwgJ3NsaWNlJykoNik7XG4gICAgICogICAgICBzbGljZUZyb202KDgsICdhYmNkZWZnaGlqa2xtJyk7IC8vPT4gJ2doJ1xuICAgICAqL1xuICAgIHZhciBpbnZva2VyID0gX2N1cnJ5MihmdW5jdGlvbiBpbnZva2VyKGFyaXR5LCBtZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGN1cnJ5Tihhcml0eSArIDEsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBhcmd1bWVudHNbYXJpdHldO1xuICAgICAgICAgICAgaWYgKHRhcmdldCAhPSBudWxsICYmIGlzKEZ1bmN0aW9uLCB0YXJnZXRbbWV0aG9kXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0W21ldGhvZF0uYXBwbHkodGFyZ2V0LCBfc2xpY2UoYXJndW1lbnRzLCAwLCBhcml0eSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcih0b1N0cmluZyh0YXJnZXQpICsgJyBkb2VzIG5vdCBoYXZlIGEgbWV0aG9kIG5hbWVkIFwiJyArIG1ldGhvZCArICdcIicpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgbWFkZSBieSBpbnNlcnRpbmcgdGhlIGBzZXBhcmF0b3JgIGJldHdlZW4gZWFjaFxuICAgICAqIGVsZW1lbnQgYW5kIGNvbmNhdGVuYXRpbmcgYWxsIHRoZSBlbGVtZW50cyBpbnRvIGEgc2luZ2xlIHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgU3RyaW5nIC0+IFthXSAtPiBTdHJpbmdcbiAgICAgKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IHNlcGFyYXRvciBUaGUgc3RyaW5nIHVzZWQgdG8gc2VwYXJhdGUgdGhlIGVsZW1lbnRzLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHhzIFRoZSBlbGVtZW50cyB0byBqb2luIGludG8gYSBzdHJpbmcuXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyBtYWRlIGJ5IGNvbmNhdGVuYXRpbmcgYHhzYCB3aXRoIGBzZXBhcmF0b3JgLlxuICAgICAqIEBzZWUgUi5zcGxpdFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBzcGFjZXIgPSBSLmpvaW4oJyAnKTtcbiAgICAgKiAgICAgIHNwYWNlcihbJ2EnLCAyLCAzLjRdKTsgICAvLz0+ICdhIDIgMy40J1xuICAgICAqICAgICAgUi5qb2luKCd8JywgWzEsIDIsIDNdKTsgICAgLy89PiAnMXwyfDMnXG4gICAgICovXG4gICAgdmFyIGpvaW4gPSBpbnZva2VyKDEsICdqb2luJyk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGZ1bmN0aW9uIHRoYXQsIHdoZW4gaW52b2tlZCwgY2FjaGVzIHRoZSByZXN1bHQgb2YgY2FsbGluZyBgZm5gIGZvciBhIGdpdmVuXG4gICAgICogYXJndW1lbnQgc2V0IGFuZCByZXR1cm5zIHRoZSByZXN1bHQuIFN1YnNlcXVlbnQgY2FsbHMgdG8gdGhlIG1lbW9pemVkIGBmbmAgd2l0aCB0aGUgc2FtZVxuICAgICAqIGFyZ3VtZW50IHNldCB3aWxsIG5vdCByZXN1bHQgaW4gYW4gYWRkaXRpb25hbCBjYWxsIHRvIGBmbmA7IGluc3RlYWQsIHRoZSBjYWNoZWQgcmVzdWx0XG4gICAgICogZm9yIHRoYXQgc2V0IG9mIGFyZ3VtZW50cyB3aWxsIGJlIHJldHVybmVkLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKCouLi4gLT4gYSkgLT4gKCouLi4gLT4gYSlcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gbWVtb2l6ZS5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gTWVtb2l6ZWQgdmVyc2lvbiBvZiBgZm5gLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBjb3VudCA9IDA7XG4gICAgICogICAgICB2YXIgZmFjdG9yaWFsID0gUi5tZW1vaXplKGZ1bmN0aW9uKG4pIHtcbiAgICAgKiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgKiAgICAgICAgcmV0dXJuIFIucHJvZHVjdChSLnJhbmdlKDEsIG4gKyAxKSk7XG4gICAgICogICAgICB9KTtcbiAgICAgKiAgICAgIGZhY3RvcmlhbCg1KTsgLy89PiAxMjBcbiAgICAgKiAgICAgIGZhY3RvcmlhbCg1KTsgLy89PiAxMjBcbiAgICAgKiAgICAgIGZhY3RvcmlhbCg1KTsgLy89PiAxMjBcbiAgICAgKiAgICAgIGNvdW50OyAvLz0+IDFcbiAgICAgKi9cbiAgICB2YXIgbWVtb2l6ZSA9IF9jdXJyeTEoZnVuY3Rpb24gbWVtb2l6ZShmbikge1xuICAgICAgICB2YXIgY2FjaGUgPSB7fTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSB0b1N0cmluZyhhcmd1bWVudHMpO1xuICAgICAgICAgICAgaWYgKCFfaGFzKGtleSwgY2FjaGUpKSB7XG4gICAgICAgICAgICAgICAgY2FjaGVba2V5XSA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVba2V5XTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFNwbGl0cyBhIHN0cmluZyBpbnRvIGFuIGFycmF5IG9mIHN0cmluZ3MgYmFzZWQgb24gdGhlIGdpdmVuXG4gICAgICogc2VwYXJhdG9yLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBjYXRlZ29yeSBTdHJpbmdcbiAgICAgKiBAc2lnIFN0cmluZyAtPiBTdHJpbmcgLT4gW1N0cmluZ11cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2VwIFRoZSBzZXBhcmF0b3Igc3RyaW5nLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byBzZXBhcmF0ZSBpbnRvIGFuIGFycmF5LlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBUaGUgYXJyYXkgb2Ygc3RyaW5ncyBmcm9tIGBzdHJgIHNlcGFyYXRlZCBieSBgc3RyYC5cbiAgICAgKiBAc2VlIFIuam9pblxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBwYXRoQ29tcG9uZW50cyA9IFIuc3BsaXQoJy8nKTtcbiAgICAgKiAgICAgIFIudGFpbChwYXRoQ29tcG9uZW50cygnL3Vzci9sb2NhbC9iaW4vbm9kZScpKTsgLy89PiBbJ3VzcicsICdsb2NhbCcsICdiaW4nLCAnbm9kZSddXG4gICAgICpcbiAgICAgKiAgICAgIFIuc3BsaXQoJy4nLCAnYS5iLmMueHl6LmQnKTsgLy89PiBbJ2EnLCAnYicsICdjJywgJ3h5eicsICdkJ11cbiAgICAgKi9cbiAgICB2YXIgc3BsaXQgPSBpbnZva2VyKDEsICdzcGxpdCcpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGxvd2VyIGNhc2UgdmVyc2lvbiBvZiBhIHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAY2F0ZWdvcnkgU3RyaW5nXG4gICAgICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIGxvd2VyIGNhc2UuXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBUaGUgbG93ZXIgY2FzZSB2ZXJzaW9uIG9mIGBzdHJgLlxuICAgICAqIEBzZWUgUi50b1VwcGVyXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi50b0xvd2VyKCdYWVonKTsgLy89PiAneHl6J1xuICAgICAqL1xuICAgIHZhciB0b0xvd2VyID0gaW52b2tlcigwLCAndG9Mb3dlckNhc2UnKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSB1cHBlciBjYXNlIHZlcnNpb24gb2YgYSBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQGNhdGVnb3J5IFN0cmluZ1xuICAgICAqIEBzaWcgU3RyaW5nIC0+IFN0cmluZ1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byB1cHBlciBjYXNlLlxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gVGhlIHVwcGVyIGNhc2UgdmVyc2lvbiBvZiBgc3RyYC5cbiAgICAgKiBAc2VlIFIudG9Mb3dlclxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIudG9VcHBlcignYWJjJyk7IC8vPT4gJ0FCQydcbiAgICAgKi9cbiAgICB2YXIgdG9VcHBlciA9IGludm9rZXIoMCwgJ3RvVXBwZXJDYXNlJyk7XG5cbiAgICB2YXIgUiA9IHtcbiAgICAgICAgRjogRixcbiAgICAgICAgVDogVCxcbiAgICAgICAgX186IF9fLFxuICAgICAgICBhZGQ6IGFkZCxcbiAgICAgICAgYWRkSW5kZXg6IGFkZEluZGV4LFxuICAgICAgICBhZGp1c3Q6IGFkanVzdCxcbiAgICAgICAgYWxsOiBhbGwsXG4gICAgICAgIGFsbFBhc3M6IGFsbFBhc3MsXG4gICAgICAgIGFsd2F5czogYWx3YXlzLFxuICAgICAgICBhbmQ6IGFuZCxcbiAgICAgICAgYW55OiBhbnksXG4gICAgICAgIGFueVBhc3M6IGFueVBhc3MsXG4gICAgICAgIGFwOiBhcCxcbiAgICAgICAgYXBlcnR1cmU6IGFwZXJ0dXJlLFxuICAgICAgICBhcHBlbmQ6IGFwcGVuZCxcbiAgICAgICAgYXBwbHk6IGFwcGx5LFxuICAgICAgICBhc3NvYzogYXNzb2MsXG4gICAgICAgIGFzc29jUGF0aDogYXNzb2NQYXRoLFxuICAgICAgICBiaW5hcnk6IGJpbmFyeSxcbiAgICAgICAgYmluZDogYmluZCxcbiAgICAgICAgYm90aDogYm90aCxcbiAgICAgICAgY2FsbDogY2FsbCxcbiAgICAgICAgY2hhaW46IGNoYWluLFxuICAgICAgICBjbG9uZTogY2xvbmUsXG4gICAgICAgIGNvbW11dGU6IGNvbW11dGUsXG4gICAgICAgIGNvbW11dGVNYXA6IGNvbW11dGVNYXAsXG4gICAgICAgIGNvbXBhcmF0b3I6IGNvbXBhcmF0b3IsXG4gICAgICAgIGNvbXBsZW1lbnQ6IGNvbXBsZW1lbnQsXG4gICAgICAgIGNvbXBvc2U6IGNvbXBvc2UsXG4gICAgICAgIGNvbXBvc2VLOiBjb21wb3NlSyxcbiAgICAgICAgY29tcG9zZVA6IGNvbXBvc2VQLFxuICAgICAgICBjb25jYXQ6IGNvbmNhdCxcbiAgICAgICAgY29uZDogY29uZCxcbiAgICAgICAgY29uc3RydWN0OiBjb25zdHJ1Y3QsXG4gICAgICAgIGNvbnN0cnVjdE46IGNvbnN0cnVjdE4sXG4gICAgICAgIGNvbnRhaW5zOiBjb250YWlucyxcbiAgICAgICAgY29udGFpbnNXaXRoOiBjb250YWluc1dpdGgsXG4gICAgICAgIGNvbnZlcmdlOiBjb252ZXJnZSxcbiAgICAgICAgY291bnRCeTogY291bnRCeSxcbiAgICAgICAgY3JlYXRlTWFwRW50cnk6IGNyZWF0ZU1hcEVudHJ5LFxuICAgICAgICBjdXJyeTogY3VycnksXG4gICAgICAgIGN1cnJ5TjogY3VycnlOLFxuICAgICAgICBkZWM6IGRlYyxcbiAgICAgICAgZGVmYXVsdFRvOiBkZWZhdWx0VG8sXG4gICAgICAgIGRpZmZlcmVuY2U6IGRpZmZlcmVuY2UsXG4gICAgICAgIGRpZmZlcmVuY2VXaXRoOiBkaWZmZXJlbmNlV2l0aCxcbiAgICAgICAgZGlzc29jOiBkaXNzb2MsXG4gICAgICAgIGRpc3NvY1BhdGg6IGRpc3NvY1BhdGgsXG4gICAgICAgIGRpdmlkZTogZGl2aWRlLFxuICAgICAgICBkcm9wOiBkcm9wLFxuICAgICAgICBkcm9wTGFzdDogZHJvcExhc3QsXG4gICAgICAgIGRyb3BMYXN0V2hpbGU6IGRyb3BMYXN0V2hpbGUsXG4gICAgICAgIGRyb3BSZXBlYXRzOiBkcm9wUmVwZWF0cyxcbiAgICAgICAgZHJvcFJlcGVhdHNXaXRoOiBkcm9wUmVwZWF0c1dpdGgsXG4gICAgICAgIGRyb3BXaGlsZTogZHJvcFdoaWxlLFxuICAgICAgICBlaXRoZXI6IGVpdGhlcixcbiAgICAgICAgZW1wdHk6IGVtcHR5LFxuICAgICAgICBlcVByb3BzOiBlcVByb3BzLFxuICAgICAgICBlcXVhbHM6IGVxdWFscyxcbiAgICAgICAgZXZvbHZlOiBldm9sdmUsXG4gICAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgICBmaW5kOiBmaW5kLFxuICAgICAgICBmaW5kSW5kZXg6IGZpbmRJbmRleCxcbiAgICAgICAgZmluZExhc3Q6IGZpbmRMYXN0LFxuICAgICAgICBmaW5kTGFzdEluZGV4OiBmaW5kTGFzdEluZGV4LFxuICAgICAgICBmbGF0dGVuOiBmbGF0dGVuLFxuICAgICAgICBmbGlwOiBmbGlwLFxuICAgICAgICBmb3JFYWNoOiBmb3JFYWNoLFxuICAgICAgICBmcm9tUGFpcnM6IGZyb21QYWlycyxcbiAgICAgICAgZnVuY3Rpb25zOiBmdW5jdGlvbnMsXG4gICAgICAgIGZ1bmN0aW9uc0luOiBmdW5jdGlvbnNJbixcbiAgICAgICAgZ3JvdXBCeTogZ3JvdXBCeSxcbiAgICAgICAgZ3Q6IGd0LFxuICAgICAgICBndGU6IGd0ZSxcbiAgICAgICAgaGFzOiBoYXMsXG4gICAgICAgIGhhc0luOiBoYXNJbixcbiAgICAgICAgaGVhZDogaGVhZCxcbiAgICAgICAgaWRlbnRpY2FsOiBpZGVudGljYWwsXG4gICAgICAgIGlkZW50aXR5OiBpZGVudGl0eSxcbiAgICAgICAgaWZFbHNlOiBpZkVsc2UsXG4gICAgICAgIGluYzogaW5jLFxuICAgICAgICBpbmRleE9mOiBpbmRleE9mLFxuICAgICAgICBpbml0OiBpbml0LFxuICAgICAgICBpbnNlcnQ6IGluc2VydCxcbiAgICAgICAgaW5zZXJ0QWxsOiBpbnNlcnRBbGwsXG4gICAgICAgIGludGVyc2VjdGlvbjogaW50ZXJzZWN0aW9uLFxuICAgICAgICBpbnRlcnNlY3Rpb25XaXRoOiBpbnRlcnNlY3Rpb25XaXRoLFxuICAgICAgICBpbnRlcnNwZXJzZTogaW50ZXJzcGVyc2UsXG4gICAgICAgIGludG86IGludG8sXG4gICAgICAgIGludmVydDogaW52ZXJ0LFxuICAgICAgICBpbnZlcnRPYmo6IGludmVydE9iaixcbiAgICAgICAgaW52b2tlcjogaW52b2tlcixcbiAgICAgICAgaXM6IGlzLFxuICAgICAgICBpc0FycmF5TGlrZTogaXNBcnJheUxpa2UsXG4gICAgICAgIGlzRW1wdHk6IGlzRW1wdHksXG4gICAgICAgIGlzTmlsOiBpc05pbCxcbiAgICAgICAgaXNTZXQ6IGlzU2V0LFxuICAgICAgICBqb2luOiBqb2luLFxuICAgICAgICBrZXlzOiBrZXlzLFxuICAgICAgICBrZXlzSW46IGtleXNJbixcbiAgICAgICAgbGFzdDogbGFzdCxcbiAgICAgICAgbGFzdEluZGV4T2Y6IGxhc3RJbmRleE9mLFxuICAgICAgICBsZW5ndGg6IGxlbmd0aCxcbiAgICAgICAgbGVuczogbGVucyxcbiAgICAgICAgbGVuc0luZGV4OiBsZW5zSW5kZXgsXG4gICAgICAgIGxlbnNQcm9wOiBsZW5zUHJvcCxcbiAgICAgICAgbGlmdDogbGlmdCxcbiAgICAgICAgbGlmdE46IGxpZnROLFxuICAgICAgICBsdDogbHQsXG4gICAgICAgIGx0ZTogbHRlLFxuICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgbWFwQWNjdW06IG1hcEFjY3VtLFxuICAgICAgICBtYXBBY2N1bVJpZ2h0OiBtYXBBY2N1bVJpZ2h0LFxuICAgICAgICBtYXBPYmo6IG1hcE9iaixcbiAgICAgICAgbWFwT2JqSW5kZXhlZDogbWFwT2JqSW5kZXhlZCxcbiAgICAgICAgbWF0Y2g6IG1hdGNoLFxuICAgICAgICBtYXRoTW9kOiBtYXRoTW9kLFxuICAgICAgICBtYXg6IG1heCxcbiAgICAgICAgbWF4Qnk6IG1heEJ5LFxuICAgICAgICBtZWFuOiBtZWFuLFxuICAgICAgICBtZWRpYW46IG1lZGlhbixcbiAgICAgICAgbWVtb2l6ZTogbWVtb2l6ZSxcbiAgICAgICAgbWVyZ2U6IG1lcmdlLFxuICAgICAgICBtZXJnZUFsbDogbWVyZ2VBbGwsXG4gICAgICAgIG1pbjogbWluLFxuICAgICAgICBtaW5CeTogbWluQnksXG4gICAgICAgIG1vZHVsbzogbW9kdWxvLFxuICAgICAgICBtdWx0aXBseTogbXVsdGlwbHksXG4gICAgICAgIG5Bcnk6IG5BcnksXG4gICAgICAgIG5lZ2F0ZTogbmVnYXRlLFxuICAgICAgICBub25lOiBub25lLFxuICAgICAgICBub3Q6IG5vdCxcbiAgICAgICAgbnRoOiBudGgsXG4gICAgICAgIG50aEFyZzogbnRoQXJnLFxuICAgICAgICBudGhDaGFyOiBudGhDaGFyLFxuICAgICAgICBudGhDaGFyQ29kZTogbnRoQ2hhckNvZGUsXG4gICAgICAgIG9mOiBvZixcbiAgICAgICAgb21pdDogb21pdCxcbiAgICAgICAgb25jZTogb25jZSxcbiAgICAgICAgb3I6IG9yLFxuICAgICAgICBvdmVyOiBvdmVyLFxuICAgICAgICBwYXJ0aWFsOiBwYXJ0aWFsLFxuICAgICAgICBwYXJ0aWFsUmlnaHQ6IHBhcnRpYWxSaWdodCxcbiAgICAgICAgcGFydGl0aW9uOiBwYXJ0aXRpb24sXG4gICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgIHBhdGhFcTogcGF0aEVxLFxuICAgICAgICBwaWNrOiBwaWNrLFxuICAgICAgICBwaWNrQWxsOiBwaWNrQWxsLFxuICAgICAgICBwaWNrQnk6IHBpY2tCeSxcbiAgICAgICAgcGlwZTogcGlwZSxcbiAgICAgICAgcGlwZUs6IHBpcGVLLFxuICAgICAgICBwaXBlUDogcGlwZVAsXG4gICAgICAgIHBsdWNrOiBwbHVjayxcbiAgICAgICAgcHJlcGVuZDogcHJlcGVuZCxcbiAgICAgICAgcHJvZHVjdDogcHJvZHVjdCxcbiAgICAgICAgcHJvamVjdDogcHJvamVjdCxcbiAgICAgICAgcHJvcDogcHJvcCxcbiAgICAgICAgcHJvcEVxOiBwcm9wRXEsXG4gICAgICAgIHByb3BJczogcHJvcElzLFxuICAgICAgICBwcm9wT3I6IHByb3BPcixcbiAgICAgICAgcHJvcFNhdGlzZmllczogcHJvcFNhdGlzZmllcyxcbiAgICAgICAgcHJvcHM6IHByb3BzLFxuICAgICAgICByYW5nZTogcmFuZ2UsXG4gICAgICAgIHJlZHVjZTogcmVkdWNlLFxuICAgICAgICByZWR1Y2VSaWdodDogcmVkdWNlUmlnaHQsXG4gICAgICAgIHJlZHVjZWQ6IHJlZHVjZWQsXG4gICAgICAgIHJlamVjdDogcmVqZWN0LFxuICAgICAgICByZW1vdmU6IHJlbW92ZSxcbiAgICAgICAgcmVwZWF0OiByZXBlYXQsXG4gICAgICAgIHJlcGxhY2U6IHJlcGxhY2UsXG4gICAgICAgIHJldmVyc2U6IHJldmVyc2UsXG4gICAgICAgIHNjYW46IHNjYW4sXG4gICAgICAgIHNldDogc2V0LFxuICAgICAgICBzbGljZTogc2xpY2UsXG4gICAgICAgIHNvcnQ6IHNvcnQsXG4gICAgICAgIHNvcnRCeTogc29ydEJ5LFxuICAgICAgICBzcGxpdDogc3BsaXQsXG4gICAgICAgIHNwbGl0RXZlcnk6IHNwbGl0RXZlcnksXG4gICAgICAgIHN1YnRyYWN0OiBzdWJ0cmFjdCxcbiAgICAgICAgc3VtOiBzdW0sXG4gICAgICAgIHRhaWw6IHRhaWwsXG4gICAgICAgIHRha2U6IHRha2UsXG4gICAgICAgIHRha2VMYXN0OiB0YWtlTGFzdCxcbiAgICAgICAgdGFrZUxhc3RXaGlsZTogdGFrZUxhc3RXaGlsZSxcbiAgICAgICAgdGFrZVdoaWxlOiB0YWtlV2hpbGUsXG4gICAgICAgIHRhcDogdGFwLFxuICAgICAgICB0ZXN0OiB0ZXN0LFxuICAgICAgICB0aW1lczogdGltZXMsXG4gICAgICAgIHRvTG93ZXI6IHRvTG93ZXIsXG4gICAgICAgIHRvUGFpcnM6IHRvUGFpcnMsXG4gICAgICAgIHRvUGFpcnNJbjogdG9QYWlyc0luLFxuICAgICAgICB0b1N0cmluZzogdG9TdHJpbmcsXG4gICAgICAgIHRvVXBwZXI6IHRvVXBwZXIsXG4gICAgICAgIHRyYW5zZHVjZTogdHJhbnNkdWNlLFxuICAgICAgICB0cmltOiB0cmltLFxuICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICB1bmFwcGx5OiB1bmFwcGx5LFxuICAgICAgICB1bmFyeTogdW5hcnksXG4gICAgICAgIHVuY3VycnlOOiB1bmN1cnJ5TixcbiAgICAgICAgdW5mb2xkOiB1bmZvbGQsXG4gICAgICAgIHVuaW9uOiB1bmlvbixcbiAgICAgICAgdW5pb25XaXRoOiB1bmlvbldpdGgsXG4gICAgICAgIHVuaXE6IHVuaXEsXG4gICAgICAgIHVuaXFCeTogdW5pcUJ5LFxuICAgICAgICB1bmlxV2l0aDogdW5pcVdpdGgsXG4gICAgICAgIHVubmVzdDogdW5uZXN0LFxuICAgICAgICB1cGRhdGU6IHVwZGF0ZSxcbiAgICAgICAgdXNlV2l0aDogdXNlV2l0aCxcbiAgICAgICAgdmFsdWVzOiB2YWx1ZXMsXG4gICAgICAgIHZhbHVlc0luOiB2YWx1ZXNJbixcbiAgICAgICAgdmlldzogdmlldyxcbiAgICAgICAgd2hlcmU6IHdoZXJlLFxuICAgICAgICB3aGVyZUVxOiB3aGVyZUVxLFxuICAgICAgICB3cmFwOiB3cmFwLFxuICAgICAgICB4cHJvZDogeHByb2QsXG4gICAgICAgIHppcDogemlwLFxuICAgICAgICB6aXBPYmo6IHppcE9iaixcbiAgICAgICAgemlwV2l0aDogemlwV2l0aFxuICAgIH07XG5cbiAgLyogVEVTVF9FTlRSWV9QT0lOVCAqL1xuXG4gIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFI7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gUjsgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5SID0gUjtcbiAgfVxuXG59LmNhbGwodGhpcykpO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJ3b290LWpzXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC43XCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJDb3JlIGxpYnJhcnkgZm9yIGNyZWF0aW5nIHJlYWwgdGltZSBjb2xsYWJvcmF0aXZlIGRvY3VtZW50cyB3aXRob3V0IE9wZXJhdGlvbmFsIHRyYW5zZm9ybWF0aW9uIChXT09UKS4gVGhpcyBwYWNrYWdlIHByb3ZpZGVzIHRoZSBjb3JlIGxvZ2ljIGFuZCBkYXRhIHR5cGVzIGZvciBidWlsZGluZyBhIHNlcnZlciBjYXBhYmxlIGFuZCBoYW5kbGluZyByZWFsIHRpbWUgZWRpdGluZyB3aXRoIFdPT1QuXCIsXG4gIFwibWFpblwiOiBcImRpc3Qvd29vdC5qc1wiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwidGVzdFwiOiBcIi4vbm9kZV9tb2R1bGVzLy5iaW4vZ3VscCB0ZXN0XCJcbiAgfSxcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdCtodHRwczovL2dpdGh1Yi5jb20vVEdPbHNvbi93b290LWpzLmdpdFwiXG4gIH0sXG4gIFwiYXV0aG9yXCI6IFwiXCIsXG4gIFwibGljZW5zZVwiOiBcIklTQ1wiLFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL1RHT2xzb24vd29vdC1qcy9pc3N1ZXNcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL1RHT2xzb24vd29vdC1qcyNyZWFkbWVcIixcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiYmFiZWwtY29yZVwiOiBcIl42LjQuMFwiLFxuICAgIFwiYmFiZWwtZXNsaW50XCI6IFwiXjUuMC4wLWJldGE2XCIsXG4gICAgXCJiYWJlbC1wcmVzZXQtZXMyMDE1XCI6IFwiXjYuMy4xM1wiLFxuICAgIFwiYmFiZWwtcHJlc2V0LXJlYWN0XCI6IFwiXjYuMy4xM1wiLFxuICAgIFwiYmFiZWwtcHJlc2V0LXN0YWdlLTFcIjogXCJeNi4zLjEzXCIsXG4gICAgXCJiYWJlbC1yZWdpc3RlclwiOiBcIl42LjQuM1wiLFxuICAgIFwiYmFiZWxpZnlcIjogXCJeNy4yLjBcIixcbiAgICBcImJyb3dzZXJpZnlcIjogXCJeMTMuMC4wXCIsXG4gICAgXCJlc2xpbnRcIjogXCJeMS4xMC4zXCIsXG4gICAgXCJlc2xpbnQtY29uZmlnLWFpcmJuYlwiOiBcIl4zLjEuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1mbG93LXZhcnNcIjogXCJeMC4xLjNcIixcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3RcIjogXCJeMy43LjFcIixcbiAgICBcImZsb3ctYmluXCI6IFwiXjAuMjIuMVwiLFxuICAgIFwiZ3VscFwiOiBcIl4zLjkuMFwiLFxuICAgIFwiZ3VscC1zaGVsbFwiOiBcIl4wLjUuMVwiLFxuICAgIFwiZ3VscC11dGlsXCI6IFwiXjMuMC43XCIsXG4gICAgXCJqYXNtaW5lXCI6IFwiXjIuMy4yXCIsXG4gICAgXCJ2OC1wcm9maWxlclwiOiBcIl41LjMuMlwiLFxuICAgIFwidmlueWwtc291cmNlLXN0cmVhbVwiOiBcIl4xLjEuMFwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcInJhbWRhXCI6IFwiXjAuMTcuMVwiXG4gIH1cbn1cbiIsImltcG9ydCBSIGZyb20gJ3JhbWRhJztcblxuaW1wb3J0IFBhY2thZ2UgZnJvbSAnLi4vcGFja2FnZS5qc29uJztcblxuaW1wb3J0ICogYXMgQ29yZSBmcm9tICcuL3dvb3QvY29yZSc7XG5pbXBvcnQgKiBhcyBPcGVyYXRpb24gZnJvbSAnLi93b290L29wZXJhdGlvbic7XG5pbXBvcnQgKiBhcyBXQ2hhciBmcm9tICcuL3dvb3Qvd2NoYXInO1xuaW1wb3J0ICogYXMgV1N0cmluZyBmcm9tICcuL3dvb3Qvd3N0cmluZyc7XG5cbnR5cGUgQ2xpZW50SWQgPSBudW1iZXI7XG5cbmV4cG9ydCB0eXBlIFdvb3RDbGllbnQgPSB7XG4gIGNsaWVudElkOiBDbGllbnRJZDtcbiAgY2xvY2s6IG51bWJlcjtcbiAgd1N0cmluZzogV1N0cmluZy5XU3RyaW5nO1xuICBvcGVyYXRpb25RdWV1ZTogQXJyYXk8T3BlcmF0aW9uLk9wZXJhdGlvbj47XG59O1xuXG5jb25zdCBpbmNDbG9jayA9IChjbGllbnQ6IFdvb3RDbGllbnQpOiBXb290Q2xpZW50ID0+XG4gICh7IC4uLmNsaWVudCwgY2xvY2s6IGNsaWVudC5jbG9jayArIDEgfSk7XG5cblxuZXhwb3J0IGNvbnN0IHNob3dDbGllbnRTdHJpbmcgPSAoY2xpZW50OiBXb290Q2xpZW50KTogc3RyaW5nID0+XG4gIFdTdHJpbmcuc2hvdyhjbGllbnQud1N0cmluZyk7XG5cblxuLy8gVE9ETzogdGhpcyBjaGVjayBpZiB0aGUgY2xpZW50IGlkIGFscmVhZHkgZXhpc3RzIGluIHRoZSBwcm92aWRlZCBzdHJpbmdcbi8vIGFuZCB0aGVuIHN0YXJ0IHRoZSBjbGllbnQgY2xvY2sgYXQgdGhlIGNvcnJlY3QgdmFsdWUuXG5leHBvcnQgY29uc3QgbWFrZVdvb3RDbGllbnQgPSAod1N0cmluZzogV1N0cmluZy5XU3RyaW5nLCBjbGllbnRJZDogQ2xpZW50SWQpOiBXb290Q2xpZW50ID0+IHtcbiAgcmV0dXJuIHtcbiAgICBjbGllbnRJZCxcbiAgICBjbG9jazogMCxcbiAgICB3U3RyaW5nLFxuICAgIG9wZXJhdGlvblF1ZXVlOiBbXSxcbiAgfTtcbn07XG5cblxuZXhwb3J0IGNvbnN0IG1ha2VXb290Q2xpZW50RW1wdHkgPSAoY2xpZW50SWQ6IENsaWVudElkKTogV29vdENsaWVudCA9PlxuICBtYWtlV29vdENsaWVudChXU3RyaW5nLm1ha2VFbXB0eVdTdHJpbmcoKSwgY2xpZW50SWQpO1xuXG5cbmNvbnN0IHVwZGF0ZU9wZXJhdGlvblF1ZXVlID0gKFxuICBvcGVyYXRpb25zOiBBcnJheTxPcGVyYXRpb24uT3BlcmF0aW9uPixcbiAgY2xpZW50OiBXb290Q2xpZW50XG4pOiBXb290Q2xpZW50ID0+XG4gICh7IC4uLmNsaWVudCwgb3BlcmF0aW9uUXVldWU6IG9wZXJhdGlvbnMgfSk7XG5cbmNvbnN0IHVwZGF0ZVdTdHJpbmcgPSAod1N0cmluZzogV1N0cmluZy5XU3RyaW5nLCBjbGllbnQ6IFdvb3RDbGllbnQpOiBXb290Q2xpZW50ID0+XG4gICh7IC4uLmNsaWVudCwgd1N0cmluZyB9KTtcblxuXG4vLyBzZW5kcyBhbiBvcGVyYXRpb24gdG8gYSB3b290IGNsaWVudCwgcmV0dXJuaW5nIGEgbmV3IHdvb3QgY2xpZW50XG4vLyB0aGUgb3BlcmF0aW9uIHdpbGwgZWl0aGVyIGJlIGludGVncmF0ZWQgaW50byB0aGUgd29vdCBjbGllbnQncyBzdHJpbmdcbi8vIG9yIGl0IHdpbGwgYmUgYWRkZWQgdG8gdGhlIGNsaWVudCdzIGludGVyYWwgb3BlcmF0aW9uIHF1ZXVlIHRvIGJlIHRyaWVkIGFnYWluXG5leHBvcnQgY29uc3Qgc2VuZE9wZXJhdGlvbiA9IChjbGllbnQ6IFdvb3RDbGllbnQsIG9wZXJhdGlvbjogT3BlcmF0aW9uLk9wZXJhdGlvbik6IFdvb3RDbGllbnQgPT4ge1xuICBjb25zdCBvcGVyYXRpb25zID0gUi5hcHBlbmQob3BlcmF0aW9uLCBjbGllbnQub3BlcmF0aW9uUXVldWUpO1xuICBjb25zdCByZXN1bHQgPSBDb3JlLmludGVncmF0ZUFsbChvcGVyYXRpb25zLCBjbGllbnQud1N0cmluZyk7XG5cbiAgcmV0dXJuIHVwZGF0ZVdTdHJpbmcocmVzdWx0LndTdHJpbmcsXG4gICAgdXBkYXRlT3BlcmF0aW9uUXVldWUocmVzdWx0Lm9wZXJhdGlvbnMsIGNsaWVudClcbiAgKTtcbn07XG5cblxuLy8gc2VuZE9wZXJhdGlvbnMgOjogV29vdENsaWVudCAtPiBbT3BlcmF0aW9uXSAtPiBXb290Q2xpZW50XG5leHBvcnQgY29uc3Qgc2VuZE9wZXJhdGlvbnMgPSBSLnJlZHVjZShzZW5kT3BlcmF0aW9uKTtcblxuXG4vLyBpZGVudGljYWwgdG8gc2VuZE9wZXJhdGlvbiwgYnV0IGluY3JlbWVudHMgdGhlIGNsaWVudHMgaW50ZXJuYWwgY2xvY2tcbi8vIG5vdCBleHBvc2VkIC0gY29uc3VtZXJzIHNob3VsZCB1c2Ugc2VuZExvY2FsRGVsZXRlIG9yIHNlbmRMb2NhbEluc2VydFxuLy8gVE9ETzogcmVmYWN0b3Igd2l0aCBzZW5kT3BlcmF0aW9ucyAtIGxvdHMgb2Ygc2ltaWxhciBmdW5jdGlvbmFsaXR5XG5jb25zdCBzZW5kTG9jYWxPcGVyYXRpb24gPSAoY2xpZW50OiBXb290Q2xpZW50LCBvcGVyYXRpb246IE9wZXJhdGlvbi5PcGVyYXRpb24pID0+IHtcbiAgY29uc3Qgb3BlcmF0aW9ucyA9IFIuYXBwZW5kKG9wZXJhdGlvbiwgY2xpZW50Lm9wZXJhdGlvblF1ZXVlKTtcbiAgY29uc3QgcmVzdWx0ID0gQ29yZS5pbnRlZ3JhdGVBbGxMb2NhbChvcGVyYXRpb25zLCBjbGllbnQud1N0cmluZyk7XG5cbiAgcmV0dXJuIGluY0Nsb2NrKFxuICAgIHVwZGF0ZVdTdHJpbmcocmVzdWx0LndTdHJpbmcsXG4gICAgICB1cGRhdGVPcGVyYXRpb25RdWV1ZShyZXN1bHQub3BlcmF0aW9ucywgY2xpZW50KVxuICAgIClcbiAgKTtcbn07XG5cblxuLy8gLS0gbm90ZTogZmFpbGVkIGxvY2FsIG9wZXJhdGlvbnMgY2FuIHJlc3VsdCBpbiBuby1vcHMgaWYgdGhlIHVuZGVybHlpbmcgb3BlcmF0aW9uIGlzIGludmFsaWRcbi8vIC0tIHRoZXkgd2lsbCBub3QgYmUgYWRkZWQgdG8gYSBjbGllbnQncyBvcGVyYXRpb24gcXVldWVcbi8vIC0tIHRoZSBhc3N1bXB0aW9uIGlzIHRoYXQgYW55dGhpbmcgZG9uZSBsb2NhbGx5IHNob3VsZCBhbHJlYWR5IGJlIHZlcmlmaWVkXG4vLyAtLSBpZiB0aGUgbG9jYWwgb3BlcmF0aW9uIHdhcyBzdWNjZXNzZnVsLCB0aGUgb3BlcmF0aW9uIHNob3VsZCBiZSBicm9hZGNhc3RlZCB0byBvdGhlciBjbGllbnRzXG4vLyBzZW5kTG9jYWxEZWxldGUgOjogV29vdENsaWVudCAtPiBJbnQgLT4ge29wZXJhdGlvbjogT3BlcmF0aW9uIHwgbnVsbCwgY2xpZW50OiBXb290Q2xpZW50fVxuZXhwb3J0IGNvbnN0IHNlbmRMb2NhbERlbGV0ZSA9IChcbiAgY2xpZW50OiBXb290Q2xpZW50LFxuICBwb3NpdGlvbjogbnVtYmVyXG4pOiB7IG9wZXJhdGlvbjogP09wZXJhdGlvbi5PcGVyYXRpb24sIGNsaWVudDogV29vdENsaWVudCB9ID0+IHtcbiAgY29uc3QgbWF5YmVPcCA9IENvcmUubWFrZURlbGV0ZU9wZXJhdGlvbihjbGllbnQuY2xpZW50SWQsIHBvc2l0aW9uLCBjbGllbnQud1N0cmluZyk7XG5cbiAgcmV0dXJuIHtcbiAgICBvcGVyYXRpb246IG1heWJlT3AsXG4gICAgY2xpZW50OiBtYXliZU9wID8gc2VuZExvY2FsT3BlcmF0aW9uKGNsaWVudCwgbWF5YmVPcCkgOiBjbGllbnQsXG4gIH07XG59O1xuXG5cbmV4cG9ydCBjb25zdCBzZW5kTG9jYWxJbnNlcnQgPSAoXG4gIGNsaWVudDogV29vdENsaWVudCxcbiAgcG9zaXRpb246IG51bWJlcixcbiAgYWxwaGE6IHN0cmluZ1xuKTogeyBvcGVyYXRpb246ID9PcGVyYXRpb24uT3BlcmF0aW9uLCBjbGllbnQ6IFdvb3RDbGllbnQgfSA9PiB7XG4gIGNvbnN0IHdDaGFySWQgPSBXQ2hhci5tYWtlV0NoYXJJZChjbGllbnQuY2xpZW50SWQsIGNsaWVudC5jbG9jayk7XG4gIGNvbnN0IG1heWJlT3AgPSBDb3JlLm1ha2VJbnNlcnRPcGVyYXRpb24od0NoYXJJZCwgcG9zaXRpb24sIGFscGhhLCBjbGllbnQud1N0cmluZyk7XG5cbiAgcmV0dXJuIHtcbiAgICBvcGVyYXRpb246IG1heWJlT3AsXG4gICAgY2xpZW50OiBtYXliZU9wID8gc2VuZExvY2FsT3BlcmF0aW9uKGNsaWVudCwgbWF5YmVPcCkgOiBjbGllbnQsXG4gIH07XG59O1xuXG5leHBvcnQge1xuICBXU3RyaW5nLFxuICBXQ2hhcixcbiAgT3BlcmF0aW9uLFxufTtcblxuZXhwb3J0IGNvbnN0IF9fdmVyc2lvbiA9IFBhY2thZ2UudmVyc2lvbjtcblxuLy8gVE9ETzogbm8gZGVmYXVsdCBleHBvcnRcbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8gQ29uc3RydWN0aW9uXG4gIG1ha2VXb290Q2xpZW50LFxuICBtYWtlV29vdENsaWVudEVtcHR5LFxuXG4gIC8vIE9wZXJhdGlvbiBIYW5kbGluZ1xuICBzZW5kT3BlcmF0aW9uLFxuICBzZW5kT3BlcmF0aW9ucyxcbiAgc2VuZExvY2FsRGVsZXRlLFxuICBzZW5kTG9jYWxJbnNlcnQsXG5cbiAgLy8gVXRpbGl0eSBmdW5jdGlvbnNcbiAgc2hvd0NsaWVudFN0cmluZyxcblxuICAvLyBSZS1leHBvcnQgc3ViIG1vZHVsZXNcbiAgV1N0cmluZyxcbiAgV0NoYXIsXG4gIE9wZXJhdGlvbixcblxuICAvLyBtZXRhIG1ldGFcbiAgX192ZXJzaW9uOiBQYWNrYWdlLnZlcnNpb24sXG59O1xuIiwiaW1wb3J0IFIgZnJvbSAncmFtZGEnO1xuXG5cbmltcG9ydCAqIGFzIE9wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbic7XG5pbXBvcnQgKiBhcyBXQ2hhciBmcm9tICcuL3djaGFyJztcbmltcG9ydCAqIGFzIFdTdHJpbmcgZnJvbSAnLi93c3RyaW5nJztcblxudHlwZSBDbGllbnRJZCA9IG51bWJlcjtcblxuXG5jb25zdCBjYW5JbnRlZ3JhdGUgPSAob3BlcmF0aW9uOiBPcGVyYXRpb24uT3BlcmF0aW9uLCB3U3RyaW5nOiBXU3RyaW5nLldTdHJpbmcpOiBib29sZWFuID0+IHtcbiAgY29uc3QgeyB0eXBlLCB3Q2hhciB9ID0gb3BlcmF0aW9uO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdJTlNFUlQnOiB7XG4gICAgICBjb25zdCBjb250YWluc1ByZXYgPSBXU3RyaW5nLmNvbnRhaW5zKHdDaGFyLnByZXZJZCwgd1N0cmluZyk7XG4gICAgICBjb25zdCBjb250YWluc05leHQgPSBXU3RyaW5nLmNvbnRhaW5zKHdDaGFyLm5leHRJZCwgd1N0cmluZyk7XG4gICAgICByZXR1cm4gY29udGFpbnNQcmV2ICYmIGNvbnRhaW5zTmV4dDtcbiAgICB9XG5cbiAgICBjYXNlICdERUxFVEUnOiB7XG4gICAgICByZXR1cm4gV1N0cmluZy5jb250YWlucyh3Q2hhci5pZCwgd1N0cmluZyk7XG4gICAgfVxuXG4gICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIG9wZXJhdGlvbiB0eXBlOiAke3R5cGV9YCk7XG4gIH1cbn07XG5cblxuY29uc3QgaW50ZWdyYXRlSW5zZXJ0ID0gKFxuICBwcmV2SWQ6IFdDaGFyLldDaGFySWQsXG4gIG5leHRJZDogV0NoYXIuV0NoYXJJZCxcbiAgd0NoYXI6IFdDaGFyLldDaGFyLFxuICB3U3RyaW5nOiBXU3RyaW5nLldTdHJpbmdcbik6IFdTdHJpbmcuV1N0cmluZyA9PiB7XG4gIGlmIChXU3RyaW5nLmNvbnRhaW5zKHdDaGFyLmlkLCB3U3RyaW5nKSkge1xuICAgIHJldHVybiB3U3RyaW5nO1xuICB9XG5cbiAgY29uc3Qgc3Vic2VjdGlvbiA9IFdTdHJpbmcuc3Vic2VjdGlvbihwcmV2SWQsIG5leHRJZCwgd1N0cmluZyk7XG5cbiAgaWYgKHN1YnNlY3Rpb24ubGVuZ3RoID09PSAwKSB7XG4gICAgY29uc3QgaW5kZXggPSBXU3RyaW5nLmluZGV4T2YobmV4dElkLCB3U3RyaW5nKTtcbiAgICByZXR1cm4gV1N0cmluZy5pbnNlcnQoaW5kZXgsIHdDaGFyLCB3U3RyaW5nKTtcbiAgfVxuXG4gIGNvbnN0IG5ld1ByZXZJZCA9IHN1YnNlY3Rpb25bMF0uaWQ7XG5cbiAgLy8gaWYgdGhlIGN1cnJlbnQgY2hhciBpZCBpcyBsZXNzIHRoYW4gdGhlIHByZXZpb3VzIGlkXG4gIGlmIChXQ2hhci5jb21wYXJlV0NoYXJJZHMod0NoYXIuaWQsIG5ld1ByZXZJZCkgPT09IC0xKSB7XG4gICAgY29uc3QgaW5kZXggPSBXU3RyaW5nLmluZGV4T2YobmV3UHJldklkLCB3U3RyaW5nKTtcbiAgICByZXR1cm4gV1N0cmluZy5pbnNlcnQoaW5kZXgsIHdDaGFyLCB3U3RyaW5nKTtcbiAgfVxuXG4gIC8vIHJlY3Vyc2UgdG8gaW50ZWdyYXRlSW5zZXJ0IHdpdGggbmV4dCBpZCBpbiB0aGUgc3Vic2VjdGlvblxuICByZXR1cm4gaW50ZWdyYXRlSW5zZXJ0KG5ld1ByZXZJZCwgbmV4dElkLCB3Q2hhciwgd1N0cmluZyk7XG59O1xuXG5cbmNvbnN0IGludGVncmF0ZURlbGV0ZSA9ICh3Q2hhcjogV0NoYXIuV0NoYXIsIHdTdHJpbmc6IFdTdHJpbmcuV1N0cmluZykgPT4ge1xuICByZXR1cm4gV1N0cmluZy5oaWRlQ2hhcih3Q2hhci5pZCwgd1N0cmluZyk7XG59O1xuXG5jb25zdCBpbnRlZ3JhdGVPcCA9IChvcGVyYXRpb246IE9wZXJhdGlvbi5PcGVyYXRpb24sIHdTdHJpbmc6IFdTdHJpbmcuV1N0cmluZyk6IFdTdHJpbmcuV1N0cmluZyA9PiB7XG4gIGNvbnN0IHsgdHlwZSwgd0NoYXIgfSA9IG9wZXJhdGlvbjtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnSU5TRVJUJzoge1xuICAgICAgcmV0dXJuIGludGVncmF0ZUluc2VydCh3Q2hhci5wcmV2SWQsIHdDaGFyLm5leHRJZCwgd0NoYXIsIHdTdHJpbmcpO1xuICAgIH1cblxuICAgIGNhc2UgJ0RFTEVURSc6IHtcbiAgICAgIHJldHVybiBpbnRlZ3JhdGVEZWxldGUod0NoYXIsIHdTdHJpbmcpO1xuICAgIH1cblxuICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBvcGVyYXRpb24gdHlwZTogJHt0eXBlfWApO1xuICB9XG59O1xuXG5cbmNvbnN0IGludGVncmF0ZUFsbFdpdGggPSAoXG4gIGludGVncmF0aW9uRm46IChfOiBPcGVyYXRpb24uT3BlcmF0aW9uLCBfOiBXU3RyaW5nLldTdHJpbmcpID0+ID9XU3RyaW5nLldTdHJpbmcsXG4gIGluaXRpYWxPcHM6IEFycmF5PE9wZXJhdGlvbi5PcGVyYXRpb24+LFxuICBpbml0aWFsV1N0cmluZzogV1N0cmluZy5XU3RyaW5nXG4pOiB7b3BlcmF0aW9uczogQXJyYXk8T3BlcmF0aW9uLk9wZXJhdGlvbj4sIHdTdHJpbmc6IFdTdHJpbmcuV1N0cmluZ30gPT4ge1xuICAvLyBubyBvcGVyYXRpb25zIGhhdmUgYmVlbiBpbnRlZ3JhdGVkXG4gIC8vIGFuZCB3U3RyaW5nIGhhcyBpdHMgaW5pdGlhbCB2YWx1ZVxuICBjb25zdCBpbml0aWFsU3RhdGUgPSB7IG9wZXJhdGlvbnM6IFtdLCB3U3RyaW5nOiBpbml0aWFsV1N0cmluZyB9O1xuXG4gIGNvbnN0IGludGVncmF0ZV8gPSAoeyBvcGVyYXRpb25zLCB3U3RyaW5nIH0sIG9wKSA9PiB7XG4gICAgY29uc3QgbmV3U3RyaW5nID0gaW50ZWdyYXRpb25GbihvcCwgd1N0cmluZyk7XG4gICAgcmV0dXJuIG5ld1N0cmluZ1xuICAgICAgPyB7IG9wZXJhdGlvbnMsIHdTdHJpbmc6IG5ld1N0cmluZyB9XG4gICAgICA6IHsgb3BlcmF0aW9uczogUi5hcHBlbmQob3AsIG9wZXJhdGlvbnMpLCB3U3RyaW5nIH07XG4gIH07XG5cbiAgY29uc3QgeyBvcGVyYXRpb25zLCB3U3RyaW5nIH0gPSBSLnJlZHVjZShpbnRlZ3JhdGVfLCBpbml0aWFsU3RhdGUsIGluaXRpYWxPcHMpO1xuXG4gIGNvbnN0IG9wZXJhdGlvbnNBcmVTdGFibGUgPSBSLmxlbmd0aChpbml0aWFsT3BzKSA9PT0gUi5sZW5ndGgob3BlcmF0aW9ucyk7XG5cbiAgcmV0dXJuIG9wZXJhdGlvbnNBcmVTdGFibGVcbiAgICA/IHsgb3BlcmF0aW9ucywgd1N0cmluZyB9XG4gICAgOiBpbnRlZ3JhdGVBbGxXaXRoKGludGVncmF0aW9uRm4sIG9wZXJhdGlvbnMsIHdTdHJpbmcpO1xufTtcblxuXG5leHBvcnQgY29uc3QgaW50ZWdyYXRlID0gKFxuICBvcGVyYXRpb246IE9wZXJhdGlvbi5PcGVyYXRpb24sXG4gIHdTdHJpbmc6IFdTdHJpbmcuV1N0cmluZ1xuKTogP1dTdHJpbmcuV1N0cmluZyA9PiB7XG4gIHJldHVybiBjYW5JbnRlZ3JhdGUob3BlcmF0aW9uLCB3U3RyaW5nKSA/IGludGVncmF0ZU9wKG9wZXJhdGlvbiwgd1N0cmluZykgOiBudWxsO1xufTtcblxuXG4vLyBpdGVyYXRlIHRocm91Z2ggb3BlcmF0aW9uIGxpc3QgdW50aWwgc3RhYmxlXG4vLyByZXR1cm4gYW55IHJlbWFpbmluZyBvcGVyYXRpb25zLCBhbG9uZyB3aXRoIG5ldyBzdHJpbmdcbmV4cG9ydCBjb25zdCBpbnRlZ3JhdGVBbGwgPSAoXG4gIG9wZXJhdGlvbnM6IEFycmF5PE9wZXJhdGlvbi5PcGVyYXRpb24+LFxuICB3U3RyaW5nOiBXU3RyaW5nLldTdHJpbmdcbik6IHtvcGVyYXRpb25zOiBBcnJheTxPcGVyYXRpb24uT3BlcmF0aW9uPiwgd1N0cmluZzogV1N0cmluZy5XU3RyaW5nfSA9PlxuICBpbnRlZ3JhdGVBbGxXaXRoKGludGVncmF0ZSwgb3BlcmF0aW9ucywgd1N0cmluZyk7XG5cblxuLy8gdGhpcyBmdW5jdGlvbiBhY3RzIHVuZGVyIHRoZSBhc3N1bXB0aW9uIHRoYXQgbG9jYWwgb3BlcmF0aW9ucyBoYXZlIGFscmVhZHkgYmVlbiB2YWxpZGF0ZWRcbi8vIGludGVncmF0ZUxvY2FsIDo6IE9wZXJhdGlvbiAtPiBXU3RyaW5nIC0+IFdTdHJpbmdcbmV4cG9ydCBjb25zdCBpbnRlZ3JhdGVMb2NhbCA9IGludGVncmF0ZU9wO1xuXG5cbi8vIHRoaXMgZnVuY3Rpb24gYWN0cyB1bmRlciB0aGUgYXNzdW1wdGlvbiB0aGF0IGxvY2FsIG9wZXJhdGlvbnMgaGF2ZSBhbHJlYWR5IGJlZW4gdmFsaWRhdGVkXG5leHBvcnQgY29uc3QgaW50ZWdyYXRlQWxsTG9jYWwgPSAoXG4gIG9wZXJhdGlvbnM6IEFycmF5PE9wZXJhdGlvbi5PcGVyYXRpb24+LFxuICB3U3RyaW5nOiBXU3RyaW5nLldTdHJpbmdcbik6IHtvcGVyYXRpb25zOiBBcnJheTxPcGVyYXRpb24uT3BlcmF0aW9uPiwgd1N0cmluZzogV1N0cmluZy5XU3RyaW5nfSA9PlxuICBpbnRlZ3JhdGVBbGxXaXRoKGludGVncmF0ZUxvY2FsLCBvcGVyYXRpb25zLCB3U3RyaW5nKTtcblxuXG5leHBvcnQgY29uc3QgbWFrZURlbGV0ZU9wZXJhdGlvbiA9IChcbiAgY2xpZW50SWQ6IENsaWVudElkLFxuICBwb3NpdGlvbjogbnVtYmVyLFxuICB3U3RyaW5nOiBXU3RyaW5nLldTdHJpbmdcbik6ID9PcGVyYXRpb24uT3BlcmF0aW9uID0+IHtcbiAgY29uc3Qgd0NoYXIgPSBXU3RyaW5nLm50aFZpc2libGUocG9zaXRpb24sIHdTdHJpbmcpO1xuXG4gIHJldHVybiB3Q2hhciA/IE9wZXJhdGlvbi5tYWtlRGVsZXRlT3BlcmF0aW9uKGNsaWVudElkLCB3Q2hhcikgOiBudWxsO1xufTtcblxuXG4vLyBwb3NpdGlvbiBiYXNlZCBvZiBvZmYgdmlzaWJsZSBjaGFyYWN0ZXJzIG9ubHlcbi8vIG9wZXJhdGlvbnMgc2hvdWxkIG9ubHkgYmUgY29uY2VybmVkIHdpdGggdGhlIHZpc2libGUgc3RyaW5nXG5leHBvcnQgY29uc3QgbWFrZUluc2VydE9wZXJhdGlvbiA9IChcbiAgd0NoYXJJZDogV0NoYXIuV0NoYXJJZFxuICAsIHBvc2l0aW9uOiBudW1iZXJcbiAgLCBhbHBoYTogc3RyaW5nXG4gICwgd1N0cmluZzogV1N0cmluZy5XU3RyaW5nXG4pOiA/T3BlcmF0aW9uLk9wZXJhdGlvbiA9PiB7XG4gIGNvbnN0IG51bVZpc2libGUgPSBXU3RyaW5nLnNob3cod1N0cmluZykubGVuZ3RoO1xuXG4gIGNvbnN0IHByZXYgPSBwb3NpdGlvbiA9PT0gMFxuICAgID8gUi5oZWFkKHdTdHJpbmcpXG4gICAgOiBXU3RyaW5nLm50aFZpc2libGUocG9zaXRpb24gLSAxLCB3U3RyaW5nKTtcblxuICBjb25zdCBuZXh0ID0gcG9zaXRpb24gPT09IG51bVZpc2libGVcbiAgICA/IFIubGFzdCh3U3RyaW5nKVxuICAgIDogV1N0cmluZy5udGhWaXNpYmxlKHBvc2l0aW9uLCB3U3RyaW5nKTtcblxuICBpZiAocHJldiAmJiBuZXh0KSB7XG4gICAgY29uc3Qgd0NoYXIgPSBXQ2hhci5tYWtlV0NoYXIoe1xuICAgICAgaWQ6IHdDaGFySWQsXG4gICAgICBpc1Zpc2libGU6IHRydWUsXG4gICAgICBhbHBoYSxcbiAgICAgIHByZXZJZDogcHJldi5pZCxcbiAgICAgIG5leHRJZDogbmV4dC5pZCxcbiAgICB9KTtcblxuICAgIHJldHVybiBPcGVyYXRpb24ubWFrZUluc2VydE9wZXJhdGlvbih3Q2hhcklkLmNsaWVudElkLCB3Q2hhcik7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn07XG4iLCJpbXBvcnQgdHlwZSB7IFdDaGFyIH0gZnJvbSAnLi93Y2hhcic7XG5cbmV4cG9ydCB0eXBlIE9wZXJhdGlvblR5cGUgPSAnSU5TRVJUJyB8ICdERUxFVEUnO1xuXG5leHBvcnQgdHlwZSBPcGVyYXRpb24gPSB7XG4gIHR5cGU6IE9wZXJhdGlvblR5cGUsXG4gIGNsaWVudElkOiBudW1iZXIsXG4gIHdDaGFyOiBXQ2hhcixcbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VJbnNlcnRPcGVyYXRpb24gPSAoY2xpZW50SWQ6IG51bWJlciwgd0NoYXI6IFdDaGFyKTogT3BlcmF0aW9uID0+ICh7XG4gIHR5cGU6ICdJTlNFUlQnLFxuICBjbGllbnRJZCxcbiAgd0NoYXIsXG59KTtcblxuZXhwb3J0IGNvbnN0IG1ha2VEZWxldGVPcGVyYXRpb24gPSAoY2xpZW50SWQ6IG51bWJlciwgd0NoYXI6IFdDaGFyKTogT3BlcmF0aW9uID0+ICh7XG4gIHR5cGU6ICdERUxFVEUnLFxuICBjbGllbnRJZCxcbiAgd0NoYXIsXG59KTtcbiIsImltcG9ydCBSIGZyb20gJ3JhbWRhJztcblxuaW1wb3J0IHR5cGUgeyBPcmRlcmluZyB9IGZyb20gJy4uL3R5cGVzL29yZGVyaW5nJztcblxuZXhwb3J0IHR5cGUgV0NoYXJJZCA9IHtcbiAgY2xpZW50SWQ6IG51bWJlcjtcbiAgY2xvY2s6IG51bWJlcjtcbn07XG5cblxuZXhwb3J0IHR5cGUgV0NoYXIgPSB7XG4gIGlkOiBXQ2hhcklkLFxuICBpc1Zpc2libGU6IGJvb2xlYW4sXG4gIGFscGhhOiBzdHJpbmcsXG4gIG5leHRJZDogV0NoYXJJZCxcbiAgcHJldklkOiBXQ2hhcklkLFxufTtcblxuLy8gVE9ETzogcmVtb3ZlICdtYWtlPFg+IGZ1bmN0aW9ucycgb25jZSBldmVyeXRoaW5nIGlzIHR5cGVkXG5leHBvcnQgY29uc3QgbWFrZVdDaGFyOiAoXzpPYmplY3QpID0+IFdDaGFyXG49IFIuaWRlbnRpdHk7XG5cblxuZXhwb3J0IGNvbnN0IG1ha2VXQ2hhcklkID0gKGNsaWVudElkOiBudW1iZXIsIGNsb2NrIDpudW1iZXIpOiBXQ2hhcklkID0+ICh7IGNsaWVudElkLCBjbG9jayB9KTtcblxuXG5jb25zdCB3Q2hhcklkQmVnaW5uaW5nOiBXQ2hhcklkID0gbWFrZVdDaGFySWQoLTEsIDApO1xuY29uc3Qgd0NoYXJJZEVuZGluZzogV0NoYXJJZCA9IG1ha2VXQ2hhcklkKC0xLCAxKTtcblxuXG4vLyAtLSBzcGVjaWFsIGNoYXJhY3RlciB0byBtYXJrIHRoZSBiZWdpbm5pbmcgb2YgYSB3U3RyaW5nXG4vLyAtLSBub3RlOiBjbGllbnRJZCBvZiAtMSBkZW5vdGVzIGEgc3BlY2lhbCBjaGFyYWN0ZXIgZ2VuZXJhdGVkIGJ5IHRoaXMgbGlicmFyeVxuLy8gLS0gaW5jbHVkZXMgYSBzZWxmLXJlZmVyZW50aWFsICdwcmV2SWQnIGZpZWxkXG5leHBvcnQgY29uc3Qgd0NoYXJCZWdpbm5pbmcgPSB7XG4gIGlkOiB3Q2hhcklkQmVnaW5uaW5nLFxuICBpc1Zpc2libGU6IGZhbHNlLFxuICBhbHBoYTogJyAnLFxuICBwcmV2SWQ6IHdDaGFySWRCZWdpbm5pbmcsXG4gIG5leHRJZDogd0NoYXJJZEVuZGluZyxcbn07XG5cblxuLy8gLS0gc3BlY2lhbCBjaGFyYWN0ZXIgdG8gbWFyayB0aGUgZW5kaW5nIG9mIGEgd1N0cmluZ1xuLy8gLS0gbm90ZTogY2xpZW50SWQgb2YgLTEgZGVub3RlcyBhIHNwZWNpYWwgY2hhcmFjdGVyIGdlbmVyYXRlZCBieSB0aGlzIGxpYnJhcnlcbi8vIC0tIGluY2x1ZGVzIGEgc2VsZi1yZWZlcmVudGlhbCAnbmV4dElkJyBmaWVsZFxuZXhwb3J0IGNvbnN0IHdDaGFyRW5kaW5nID0ge1xuICBpZDogd0NoYXJJZEVuZGluZyxcbiAgaXNWaXNpYmxlOiBmYWxzZSxcbiAgYWxwaGE6ICcgJyxcbiAgcHJldklkOiB3Q2hhcklkQmVnaW5uaW5nLFxuICBuZXh0SWQ6IHdDaGFySWRFbmRpbmcsXG59O1xuXG5cbmV4cG9ydCBjb25zdCBoaWRlOiAoXzpXQ2hhcikgPT4gV0NoYXJcbj0gUi5hc3NvYygnaXNWaXNpYmxlJywgZmFsc2UpO1xuXG5cbi8vIGNvbXBhcmVDaGFySWRzIDo6IFdDaGFySWQgLT4gV0NoYXJJZCAtPiBPcmRlcmluZyAoLTEsIDAsIDEpXG5leHBvcnQgY29uc3QgY29tcGFyZVdDaGFySWRzID0gKGlkQTogV0NoYXJJZCwgaWRCOiBXQ2hhcklkKTogT3JkZXJpbmcgPT4ge1xuICBpZiAoaWRBLmNsaWVudElkID09PSBpZEIuY2xpZW50SWQpIHtcbiAgICBpZiAoaWRBLmNsb2NrID09PSBpZEIuY2xvY2spIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiBpZEEuY2xvY2sgPCBpZEIuY2xvY2sgPyAtMSA6IDE7XG4gIH1cblxuICByZXR1cm4gaWRBLmNsaWVudElkIDwgaWRCLmNsaWVudElkID8gLTEgOiAxO1xufTtcbiIsImltcG9ydCBSIGZyb20gJ3JhbWRhJztcblxuaW1wb3J0ICogYXMgV0NoYXIgZnJvbSAnLi93Y2hhcic7XG5cbmV4cG9ydCB0eXBlIFdTdHJpbmcgPSBBcnJheTxXQ2hhci5XQ2hhcj47XG5cbmV4cG9ydCBjb25zdCBtYWtlRW1wdHlXU3RyaW5nID0gKCk6IFdTdHJpbmcgPT4gW1dDaGFyLndDaGFyQmVnaW5uaW5nLCBXQ2hhci53Q2hhckVuZGluZ107XG5cblxuZXhwb3J0IGNvbnN0IHNob3cgPSAod1N0cmluZzogV1N0cmluZyk6IHN0cmluZyA9PiB7XG4gIGxldCBpID0gMDtcbiAgbGV0IHN0ciA9ICcnO1xuXG4gIGZvciAoOyBpIDwgd1N0cmluZy5sZW5ndGg7IGkrKykge1xuICAgIGlmICh3U3RyaW5nW2ldLmlzVmlzaWJsZSkge1xuICAgICAgc3RyICs9IHdTdHJpbmdbaV0uYWxwaGE7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn07XG5cblxuLy8gLS0gaW5zZXJ0IGJlZm9yZSBpbmRleCBpXG4vLyAtLSBpbnNlcnQgMiAneCcgXCJhYmNcIiAtPiBhYnhjXG4vLyBpbnNlcnQgOjogSW50IC0+IFdDaGFyIC0+IFdTdHJpbmcgLT4gV1N0cmluZ1xuZXhwb3J0IGNvbnN0IGluc2VydCA9IFIuaW5zZXJ0O1xuXG5cbmV4cG9ydCBjb25zdCBpbmRleE9mID0gKGlkOiBXQ2hhci5XQ2hhcklkLCB3U3RyaW5nOiBXU3RyaW5nKTogP251bWJlciA9PiB7XG4gIGNvbnN0IGluZGV4ID0gUi5maW5kSW5kZXgoKHdDaGFyKSA9PiB7XG4gICAgcmV0dXJuIFdDaGFyLmNvbXBhcmVXQ2hhcklkcyhpZCwgd0NoYXIuaWQpID09PSAwO1xuICB9LCB3U3RyaW5nKTtcblxuICByZXR1cm4gaW5kZXggPT09IC0xID8gbnVsbCA6IGluZGV4O1xufTtcblxuXG5leHBvcnQgY29uc3QgY29udGFpbnMgPSAoaWQ6IFdDaGFyLldDaGFySWQsIHdTdHJpbmc6IFdTdHJpbmcpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIGluZGV4T2YoaWQsIHdTdHJpbmcpICE9PSBudWxsO1xufTtcblxuXG5leHBvcnQgY29uc3Qgc3Vic2VjdGlvbiA9IChpZEE6IFdDaGFyLldDaGFySWQsIGlkQjogV0NoYXIuV0NoYXJJZCwgd1N0cmluZzogV1N0cmluZyk6IFdTdHJpbmcgPT4ge1xuICBjb25zdCBpbmRleEEgPSBpbmRleE9mKGlkQSwgd1N0cmluZyk7XG4gIGNvbnN0IGluZGV4QiA9IGluZGV4T2YoaWRCLCB3U3RyaW5nKTtcblxuICBpZiAoaW5kZXhBICYmIGluZGV4QiAmJiAoaW5kZXhBIDwgaW5kZXhCKSkge1xuICAgIHJldHVybiBSLnNsaWNlKGluZGV4QSArIDEsIGluZGV4Qiwgd1N0cmluZyk7XG4gIH1cblxuICByZXR1cm4gW107XG59O1xuXG5cbmV4cG9ydCBjb25zdCBudGhWaXNpYmxlID0gKGk6IG51bWJlciwgd1N0cmluZzogV1N0cmluZyk6ID9XQ2hhci5XQ2hhciA9PiB7XG4gIGxldCBudW1Gb3VuZCA9IDA7XG4gIGxldCBqID0gMDtcblxuICBpZiAoaSA+IHdTdHJpbmcubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmb3IgKDsgbnVtRm91bmQgPCBpICsgMTsgaisrKSB7XG4gICAgaWYgKCF3U3RyaW5nW2pdKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAod1N0cmluZ1tqXS5pc1Zpc2libGUpIHtcbiAgICAgIG51bUZvdW5kKys7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHdTdHJpbmdbaiAtIDFdO1xufTtcblxuXG5leHBvcnQgY29uc3QgaGlkZUNoYXIgPSAoaWQ6IFdDaGFyLldDaGFySWQsIHdTdHJpbmc6IFdTdHJpbmcpOiBXU3RyaW5nID0+IHtcbiAgY29uc3QgaW5kZXggPSBpbmRleE9mKGlkLCB3U3RyaW5nKTtcblxuICByZXR1cm4gaW5kZXggPyBSLnVwZGF0ZShpbmRleCwgV0NoYXIuaGlkZSh3U3RyaW5nW2luZGV4XSksIHdTdHJpbmcpIDogd1N0cmluZztcbn07XG4iXX0=
