(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./argon"), require("three"), require("threestrap"));
	else if(typeof define === 'function' && define.amd)
		define(["argon", , ], factory);
	else if(typeof exports === 'object')
		exports["Argon"] = factory(require("./argon")["Argon"], require(undefined), require(undefined));
	else
		root["Argon"] = factory(root["Argon"], root["THREE"], root["THREE"]["Bootstrap"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_143__, __WEBPACK_EXTERNAL_MODULE_144__, __WEBPACK_EXTERNAL_MODULE_220__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2015 Georgia Tech Research Corporation
	//
	// Licensed under the Apache License, Version 2.0 (the "License");
	// you may not use this file except in compliance with the License.
	// You may obtain a copy of the License at
	//
	//    http://www.apache.org/licenses/LICENSE-2.0
	//
	// Unless required by applicable law or agreed to in writing, software
	// distributed under the License is distributed on an "AS IS" BASIS,
	// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	// See the License for the specific language governing permissions and
	// limitations under the License.
	//
	// This software was created as part of a research project at the
	// Augmented Environments Lab at Georgia Tech.  To support our research, we
	// request that if you make use of this software, you let us know how
	// you used it by sending mail to Blair MacIntyre (blair@cc.gatech.edu).
	//

	'use strict';

	var Argon = module.exports = __webpack_require__(143);
	var THREE = __webpack_require__(144);
	THREE.Bootstrap = __webpack_require__(220);

	if (!THREE) throw new Error('three.js must be loaded before argon-three.js');
	if (!THREE.Bootstrap) throw new Error('threestrap.js must be loaded before argon-three.js');

	__webpack_require__(223);

	var _argonCorePlugins = ['bind', 'renderer', 'size', 'fill', 'time', 'scene', 'camera', 'render', /*'warmup',*/'argon'];
	THREE.Bootstrap.registerAlias('argon-core', _argonCorePlugins);

	if (!THREE.CSS3DRenderer) __webpack_require__(221);
	if (!THREE.MultiRenderer) __webpack_require__(222);

	THREE.Bootstrap.createArgonOptions = function (context) {
	  context = context || Argon.immersiveContext;

	  var options = {};

	  options.plugins = _argonCorePlugins.splice(0);

	  options.argon = {
	    context: context
	  };

	  // options.size = {
	  //   // maxRenderWidth: window.screen.width/3,
	  //   // maxRenderHeight: window.screen.height/3
	  //   scale: 1 / window.devicePixelRatio
	  // }

	  options.element = context.element;

	  options.renderer = {
	    klass: THREE.MultiRenderer,
	    parameters: {
	      renderers: [THREE.WebGLRenderer, THREE.CSS3DRenderer], // stacked back to front
	      parameters: [{
	        alpha: true,
	        depth: true,
	        stencil: true,
	        preserveDrawingBuffer: true,
	        antialias: true,
	        logarithmicDepthBuffer: true
	      }, {} // CSS3DRenderer doesn't have any parameters
	      ]
	    }
	  };

	  return options;
	};

/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global = typeof self != 'undefined' ? self : Function('return this')()
	  , core   = {}
	  , defineProperty = Object.defineProperty
	  , hasOwnProperty = {}.hasOwnProperty
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , max   = Math.max
	  , min   = Math.min;
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	  try {
	    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
	  } catch(e){ /* empty */ }
	}();
	var hide = createDefiner(1);
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	}
	function desc(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return $.setDesc(object, key, desc(bitmap, value));
	  } : simpleSet;
	}

	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	}

	var $ = module.exports = __webpack_require__(72)({
	  g: global,
	  core: core,
	  html: global.document && document.documentElement,
	  // http://jsperf.com/core-js-isobject
	  isObject:   isObject,
	  isFunction: isFunction,
	  it: function(it){
	    return it;
	  },
	  that: function(){
	    return this;
	  },
	  // 7.1.4 ToInteger
	  toInteger: toInteger,
	  // 7.1.15 ToLength
	  toLength: function(it){
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  },
	  toIndex: function(index, length){
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  },
	  has: function(it, key){
	    return hasOwnProperty.call(it, key);
	  },
	  create:     Object.create,
	  getProto:   Object.getPrototypeOf,
	  DESC:       DESC,
	  desc:       desc,
	  getDesc:    Object.getOwnPropertyDescriptor,
	  setDesc:    defineProperty,
	  setDescs:   Object.defineProperties,
	  getKeys:    Object.keys,
	  getNames:   Object.getOwnPropertyNames,
	  getSymbols: Object.getOwnPropertySymbols,
	  assertDefined: assertDefined,
	  // Dummy, fix for not array-like ES3 string in es5 module
	  ES5Object: Object,
	  toObject: function(it){
	    return $.ES5Object(assertDefined(it));
	  },
	  hide: hide,
	  def: createDefiner(0),
	  set: global.Symbol ? simpleSet : hide,
	  mix: function(target, src){
	    for(var key in src)hide(target, key, src[key]);
	    return target;
	  },
	  each: [].forEach
	});
	/* eslint-disable no-undef */
	if(typeof __e != 'undefined')__e = core;
	if(typeof __g != 'undefined')__g = global;

/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(5)
	  , cof               = __webpack_require__(30)
	  , assertObject      = __webpack_require__(20).obj
	  , SYMBOL_ITERATOR   = __webpack_require__(14)('iterator')
	  , FF_ITERATOR       = '@@iterator'
	  , Iterators         = {}
	  , IteratorPrototype = {};
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, $.that);
	function setIterator(O, value){
	  $.hide(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
	}

	module.exports = {
	  // Safari has buggy iterators w/o `next`
	  BUGGY: 'keys' in [] && !('next' in [].keys()),
	  Iterators: Iterators,
	  step: function(done, value){
	    return {value: value, done: !!done};
	  },
	  is: function(it){
	    var O      = Object(it)
	      , Symbol = $.g.Symbol
	      , SYM    = Symbol && Symbol.iterator || FF_ITERATOR;
	    return SYM in O || SYMBOL_ITERATOR in O || $.has(Iterators, cof.classof(O));
	  },
	  get: function(it){
	    var Symbol  = $.g.Symbol
	      , ext     = it[Symbol && Symbol.iterator || FF_ITERATOR]
	      , getIter = ext || it[SYMBOL_ITERATOR] || Iterators[cof.classof(it)];
	    return assertObject(getIter.call(it));
	  },
	  set: setIterator,
	  create: function(Constructor, NAME, next, proto){
	    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
	    cof.set(Constructor, NAME + ' Iterator');
	  }
	};

/***/ },

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(5).g
	  , store  = {};
	module.exports = function(name){
	  return store[name] || (store[name] =
	    global.Symbol && global.Symbol[name] || __webpack_require__(24).safe('Symbol.' + name));
	};

/***/ },

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	assert.def = $.assertDefined;
	assert.fn = function(it){
	  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
	  return it;
	};
	assert.obj = function(it){
	  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	assert.inst = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};
	module.exports = assert;

/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	var sid = 0;
	function uid(key){
	  return 'Symbol(' + key + ')_' + (++sid + Math.random()).toString(36);
	}
	uid.safe = __webpack_require__(5).g.Symbol || uid;
	module.exports = uid;

/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(5)
	  , global     = $.g
	  , core       = $.core
	  , isFunction = $.isFunction;
	function ctx(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	}
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	function $def(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {}).prototype
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && !isFunction(target[key]))exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp.prototype = C.prototype;
	    }(out);
	    else exp = type & $def.P && isFunction(out) ? ctx(Function.call, out) : out;
	    // export
	    $.hide(exports, key, exp);
	  }
	}
	module.exports = $def;

/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(5)
	  , TAG      = __webpack_require__(14)('toStringTag')
	  , toString = {}.toString;
	function cof(it){
	  return toString.call(it).slice(8, -1);
	}
	cof.classof = function(it){
	  var O, T;
	  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
	};
	cof.set = function(it, tag, stat){
	  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
	};
	module.exports = cof;

/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	var ctx  = __webpack_require__(41)
	  , get  = __webpack_require__(13).get
	  , call = __webpack_require__(105);
	module.exports = function(iterable, entries, fn, that){
	  var iterator = get(iterable)
	    , f        = ctx(fn, that, entries ? 2 : 1)
	    , step;
	  while(!(step = iterator.next()).done){
	    if(call(iterator, f, step.value, entries) === false){
	      return call.close(iterator);
	    }
	  }
	};

/***/ },

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	// Optional / simple context binding
	var assertFunction = __webpack_require__(20).fn;
	module.exports = function(fn, that, length){
	  assertFunction(fn);
	  if(~length && that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	var $def            = __webpack_require__(27)
	  , $               = __webpack_require__(5)
	  , cof             = __webpack_require__(30)
	  , $iter           = __webpack_require__(13)
	  , SYMBOL_ITERATOR = __webpack_require__(14)('iterator')
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values'
	  , Iterators       = $iter.Iterators;
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  $iter.create(Constructor, NAME, next);
	  function createMethod(kind){
	    function $$(that){
	      return new Constructor(that, kind);
	    }
	    switch(kind){
	      case KEYS: return function keys(){ return $$(this); };
	      case VALUES: return function values(){ return $$(this); };
	    } return function entries(){ return $$(this); };
	  }
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = $.getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    cof.set(IteratorPrototype, TAG, true);
	    // FF fix
	    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
	  }
	  // Define iterator
	  if($.FW)$iter.set(proto, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = $.that;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$.hide(proto, key, methods[key]);
	    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
	  }
	};

/***/ },

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $     = __webpack_require__(5)
	  , $def  = __webpack_require__(27)
	  , BUGGY = __webpack_require__(13).BUGGY
	  , forOf = __webpack_require__(31)
	  , species = __webpack_require__(107)
	  , assertInstance = __webpack_require__(20).inst;

	module.exports = function(NAME, methods, common, IS_MAP, IS_WEAK){
	  var Base  = $.g[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  function fixMethod(KEY, CHAIN){
	    var method = proto[KEY];
	    if($.FW)proto[KEY] = function(a, b){
	      var result = method.call(this, a === 0 ? 0 : a, b);
	      return CHAIN ? this : result;
	    };
	  }
	  if(!$.isFunction(C) || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)){
	    // create collection constructor
	    C = common.getConstructor(NAME, IS_MAP, ADDER);
	    $.mix(C.prototype, methods);
	  } else {
	    var inst  = new C
	      , chain = inst[ADDER](IS_WEAK ? {} : -0, 1)
	      , buggyZero;
	    // wrap for init collections from iterable
	    if(!__webpack_require__(106)(function(iter){ new C(iter); })){ // eslint-disable-line no-new
	      C = function(){
	        assertInstance(this, C, NAME);
	        var that     = new Base
	          , iterable = arguments[0];
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      };
	      C.prototype = proto;
	      if($.FW)proto.constructor = C;
	    }
	    IS_WEAK || inst.forEach(function(val, key){
	      buggyZero = 1 / key === -Infinity;
	    });
	    // fix converting -0 key to +0
	    if(buggyZero){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    // + fix .add & .set for chaining
	    if(buggyZero || chain !== inst)fixMethod(ADDER, true);
	  }

	  __webpack_require__(30).set(C, NAME);

	  O[NAME] = C;
	  $def($def.G + $def.W + $def.F * (C != Base), O);
	  species(C);
	  species($.core[NAME]); // for wrapper

	  if(!IS_WEAK)common.setIter(C, NAME, IS_MAP);

	  return C;
	};

/***/ },

/***/ 61:
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(5)
	  , setUnscope = __webpack_require__(109)
	  , ITER       = __webpack_require__(24).safe('iter')
	  , $iter      = __webpack_require__(13)
	  , step       = $iter.step
	  , Iterators  = $iter.Iterators;

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(42)(Array, 'Array', function(iterated, kind){
	  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , kind  = iter.k
	    , index = iter.i++;
	  if(!O || index >= O.length){
	    iter.o = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var $   = __webpack_require__(5)
	  , cof = __webpack_require__(30)
	  , src = String({}.toString)
	  , tmp = {};
	function toString(){
	  return '[object ' + cof.classof(this) + ']';
	}
	// lodash uses String(Object.prototype.toString) in isNative
	toString.toString = function(){
	  return src;
	};
	tmp[__webpack_require__(14)('toStringTag')] = 'z';
	if($.FW && cof(tmp) != 'z')$.hide(Object.prototype, 'toString', toString);

/***/ },

/***/ 63:
/***/ function(module, exports, __webpack_require__) {

	var set   = __webpack_require__(5).set
	  , $at   = __webpack_require__(108)(true)
	  , ITER  = __webpack_require__(24).safe('iter')
	  , $iter = __webpack_require__(13)
	  , step  = $iter.step;

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(42)(String, 'String', function(iterated){
	  set(this, ITER, {o: String(iterated), i: 0});
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , index = iter.i
	    , point;
	  if(index >= O.length)return step(1);
	  point = $at(O, index);
	  iter.i += point.length;
	  return step(0, point);
	});

/***/ },

/***/ 64:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	var $           = __webpack_require__(5)
	  , Iterators   = __webpack_require__(13).Iterators
	  , ITERATOR    = __webpack_require__(14)('iterator')
	  , ArrayValues = Iterators.Array
	  , NodeList    = $.g.NodeList;
	if($.FW && NodeList && !(ITERATOR in NodeList.prototype)){
	  $.hide(NodeList.prototype, ITERATOR, ArrayValues);
	}
	Iterators.NodeList = ArrayValues;

/***/ },

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(98), __esModule: true };

/***/ },

/***/ 68:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(71), __esModule: true };

/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },

/***/ 72:
/***/ function(module, exports, __webpack_require__) {

	module.exports = function($){
	  $.FW   = false;
	  $.path = $.core;
	  return $;
	};

/***/ },

/***/ 97:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ },

/***/ 98:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64);
	__webpack_require__(63);
	__webpack_require__(110);
	module.exports = __webpack_require__(5).core.getIterator;

/***/ },

/***/ 99:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(111);
	__webpack_require__(113);
	module.exports = __webpack_require__(5).core.Set;

/***/ },

/***/ 100:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	__webpack_require__(61);
	__webpack_require__(112);
	module.exports = __webpack_require__(5).core.WeakMap;

/***/ },

/***/ 101:
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var $   = __webpack_require__(5)
	  , ctx = __webpack_require__(41);
	module.exports = function(TYPE){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
	  return function($this, callbackfn, that){
	    var O      = Object($.assertDefined($this))
	      , self   = $.ES5Object(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = $.toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? Array(length) : IS_FILTER ? [] : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },

/***/ 102:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $        = __webpack_require__(5)
	  , ctx      = __webpack_require__(41)
	  , safe     = __webpack_require__(24).safe
	  , assert   = __webpack_require__(20)
	  , forOf    = __webpack_require__(31)
	  , step     = __webpack_require__(13).step
	  , has      = $.has
	  , set      = $.set
	  , isObject = $.isObject
	  , hide     = $.hide
	  , isFrozen = Object.isFrozen || $.core.Object.isFrozen
	  , ID       = safe('id')
	  , O1       = safe('O1')
	  , LAST     = safe('last')
	  , FIRST    = safe('first')
	  , ITER     = safe('iter')
	  , SIZE     = $.DESC ? safe('size') : 'size'
	  , id       = 0;

	function fastKey(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return (typeof it == 'string' ? 'S' : 'P') + it;
	  // can't set id to frozen object
	  if(isFrozen(it))return 'F';
	  if(!has(it, ID)){
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	}

	function getEntry(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index != 'F')return that[O1][index];
	  // frozen object case
	  for(entry = that[FIRST]; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	}

	module.exports = {
	  getConstructor: function(NAME, IS_MAP, ADDER){
	    function C(){
	      var that     = assert.inst(this, C, NAME)
	        , iterable = arguments[0];
	      set(that, O1, $.create(null));
	      set(that, SIZE, 0);
	      set(that, LAST, undefined);
	      set(that, FIRST, undefined);
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    }
	    $.mix(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that[FIRST] = that[LAST] = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that[O1][entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that[FIRST] == entry)that[FIRST] = next;
	          if(that[LAST] == entry)that[LAST] = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments[1], 3)
	          , entry;
	        while(entry = entry ? entry.n : this[FIRST]){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if($.DESC)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return assert.def(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that[LAST] = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that[LAST],          // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that[FIRST])that[FIRST] = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index != 'F')that[O1][index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  // add .keys, .values, .entries, [@@iterator]
	  // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	  setIter: function(C, NAME, IS_MAP){
	    __webpack_require__(42)(C, NAME, function(iterated, kind){
	      set(this, ITER, {o: iterated, k: kind});
	    }, function(){
	      var iter  = this[ITER]
	        , kind  = iter.k
	        , entry = iter.l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
	        // or finish the iteration
	        iter.o = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	  }
	};

/***/ },

/***/ 103:
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $def  = __webpack_require__(27)
	  , forOf = __webpack_require__(31);
	module.exports = function(NAME){
	  $def($def.P, NAME, {
	    toJSON: function toJSON(){
	      var arr = [];
	      forOf(this, false, arr.push, arr);
	      return arr;
	    }
	  });
	};

/***/ },

/***/ 104:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $         = __webpack_require__(5)
	  , safe      = __webpack_require__(24).safe
	  , assert    = __webpack_require__(20)
	  , forOf     = __webpack_require__(31)
	  , _has      = $.has
	  , isObject  = $.isObject
	  , hide      = $.hide
	  , isFrozen  = Object.isFrozen || $.core.Object.isFrozen
	  , id        = 0
	  , ID        = safe('id')
	  , WEAK      = safe('weak')
	  , LEAK      = safe('leak')
	  , method    = __webpack_require__(101)
	  , find      = method(5)
	  , findIndex = method(6);
	function findFrozen(store, key){
	  return find(store.array, function(it){
	    return it[0] === key;
	  });
	}
	// fallback for frozen keys
	function leakStore(that){
	  return that[LEAK] || hide(that, LEAK, {
	    array: [],
	    get: function(key){
	      var entry = findFrozen(this, key);
	      if(entry)return entry[1];
	    },
	    has: function(key){
	      return !!findFrozen(this, key);
	    },
	    set: function(key, value){
	      var entry = findFrozen(this, key);
	      if(entry)entry[1] = value;
	      else this.array.push([key, value]);
	    },
	    'delete': function(key){
	      var index = findIndex(this.array, function(it){
	        return it[0] === key;
	      });
	      if(~index)this.array.splice(index, 1);
	      return !!~index;
	    }
	  })[LEAK];
	}

	module.exports = {
	  getConstructor: function(NAME, IS_MAP, ADDER){
	    function C(){
	      $.set(assert.inst(this, C, NAME), ID, id++);
	      var iterable = arguments[0];
	      if(iterable != undefined)forOf(iterable, IS_MAP, this[ADDER], this);
	    }
	    $.mix(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        if(isFrozen(key))return leakStore(this)['delete'](key);
	        return _has(key, WEAK) && _has(key[WEAK], this[ID]) && delete key[WEAK][this[ID]];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        if(isFrozen(key))return leakStore(this).has(key);
	        return _has(key, WEAK) && _has(key[WEAK], this[ID]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    if(isFrozen(assert.obj(key))){
	      leakStore(that).set(key, value);
	    } else {
	      _has(key, WEAK) || hide(key, WEAK, {});
	      key[WEAK][that[ID]] = value;
	    } return that;
	  },
	  leakStore: leakStore,
	  WEAK: WEAK,
	  ID: ID
	};

/***/ },

/***/ 105:
/***/ function(module, exports, __webpack_require__) {

	var assertObject = __webpack_require__(20).obj;
	function close(iterator){
	  var ret = iterator['return'];
	  if(ret !== undefined)assertObject(ret.call(iterator));
	}
	function call(iterator, fn, value, entries){
	  try {
	    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
	  } catch(e){
	    close(iterator);
	    throw e;
	  }
	}
	call.close = close;
	module.exports = call;

/***/ },

/***/ 106:
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(14)('iterator')
	  , SAFE_CLOSING    = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	module.exports = function(exec){
	  if(!SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[SYMBOL_ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },

/***/ 107:
/***/ function(module, exports, __webpack_require__) {

	var $       = __webpack_require__(5)
	  , SPECIES = __webpack_require__(14)('species');
	module.exports = function(C){
	  if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: $.that
	  });
	};

/***/ },

/***/ 108:
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var $ = __webpack_require__(5);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String($.assertDefined(that))
	      , i = $.toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },

/***/ 109:
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var $           = __webpack_require__(5)
	  , UNSCOPABLES = __webpack_require__(14)('unscopables');
	if($.FW && !(UNSCOPABLES in []))$.hide(Array.prototype, UNSCOPABLES, {});
	module.exports = function(key){
	  if($.FW)[][UNSCOPABLES][key] = true;
	};

/***/ },

/***/ 110:
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(5).core
	  , $iter = __webpack_require__(13);
	core.isIterable  = $iter.is;
	core.getIterator = $iter.get;

/***/ },

/***/ 111:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(102);

	// 23.2 Set Objects
	__webpack_require__(60)('Set', {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },

/***/ 112:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $         = __webpack_require__(5)
	  , weak      = __webpack_require__(104)
	  , leakStore = weak.leakStore
	  , ID        = weak.ID
	  , WEAK      = weak.WEAK
	  , has       = $.has
	  , isObject  = $.isObject
	  , isFrozen  = Object.isFrozen || $.core.Object.isFrozen
	  , tmp       = {};

	// 23.3 WeakMap Objects
	var WeakMap = __webpack_require__(60)('WeakMap', {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      if(isFrozen(key))return leakStore(this).get(key);
	      if(has(key, WEAK))return key[WEAK][this[ID]];
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	}, weak, true, true);

	// IE11 WeakMap frozen keys fix
	if($.FW && new WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  $.each.call(['delete', 'has', 'get', 'set'], function(key){
	    var method = WeakMap.prototype[key];
	    WeakMap.prototype[key] = function(a, b){
	      // store frozen objects on leaky map
	      if(isObject(a) && isFrozen(a)){
	        var result = leakStore(this)[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    };
	  });
	}

/***/ },

/***/ 113:
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	__webpack_require__(103)('Set');

/***/ },

/***/ 143:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_143__;

/***/ },

/***/ 144:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_144__;

/***/ },

/***/ 220:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_220__;

/***/ },

/***/ 221:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$create = __webpack_require__(68)['default'];

	var THREE = __webpack_require__(144);

	/**
	 * Based on http://www.emagix.net/academic/mscs-project/item/camera-sync-with-css3-and-webgl-threejs
	 * @author mrdoob / http://mrdoob.com/
	 */

	THREE.CSS3DObject = function (element) {

		THREE.Object3D.call(this);

		this.element = element;
		this.element.style.position = 'absolute';

		this.addEventListener('removed', function (event) {

			if (this.element.parentNode !== null) {

				this.element.parentNode.removeChild(this.element);
			}
		});
	};

	THREE.CSS3DObject.prototype = _Object$create(THREE.Object3D.prototype);

	THREE.CSS3DSprite = function (element) {

		THREE.CSS3DObject.call(this, element);
	};

	THREE.CSS3DSprite.prototype = _Object$create(THREE.CSS3DObject.prototype);

	//

	THREE.CSS3DRenderer = function () {

		console.log('THREE.CSS3DRenderer', THREE.REVISION);

		var _width, _height;
		var _widthHalf, _heightHalf;

		var matrix = new THREE.Matrix4();

		var cache = {
			camera: { fov: 0, style: '' },
			objects: {}
		};

		var domElement = document.createElement('div');
		domElement.style.overflow = 'hidden';

		domElement.style.WebkitTransformStyle = 'preserve-3d';
		domElement.style.MozTransformStyle = 'preserve-3d';
		domElement.style.oTransformStyle = 'preserve-3d';
		domElement.style.transformStyle = 'preserve-3d';

		this.domElement = domElement;

		var cameraElement = document.createElement('div');

		cameraElement.style.WebkitTransformStyle = 'preserve-3d';
		cameraElement.style.MozTransformStyle = 'preserve-3d';
		cameraElement.style.oTransformStyle = 'preserve-3d';
		cameraElement.style.transformStyle = 'preserve-3d';

		domElement.appendChild(cameraElement);

		this.setClearColor = function () {};

		this.setSize = function (width, height) {

			_width = width;
			_height = height;

			_widthHalf = _width / 2;
			_heightHalf = _height / 2;

			domElement.style.width = width + 'px';
			domElement.style.height = height + 'px';

			cameraElement.style.width = width + 'px';
			cameraElement.style.height = height + 'px';
		};

		var epsilon = function epsilon(value) {

			return Math.abs(value) < 0.000001 ? 0 : value;
		};

		var getCameraCSSMatrix = function getCameraCSSMatrix(m) {

			if (matrix != m) matrix.copy(m);
			matrix.multiplyScalar(100);
			var elements = matrix.elements;

			return 'matrix3d(' + epsilon(elements[0]) + ',' + epsilon(-elements[1]) + ',' + epsilon(elements[2]) + ',' + epsilon(elements[3]) + ',' + epsilon(elements[4]) + ',' + epsilon(-elements[5]) + ',' + epsilon(elements[6]) + ',' + epsilon(elements[7]) + ',' + epsilon(elements[8]) + ',' + epsilon(-elements[9]) + ',' + epsilon(elements[10]) + ',' + epsilon(elements[11]) + ',' + epsilon(elements[12]) + ',' + epsilon(-elements[13]) + ',' + epsilon(elements[14]) + ',' + epsilon(elements[15]) + ')';
		};

		var getObjectCSSMatrix = function getObjectCSSMatrix(m) {

			if (matrix != m) matrix.copy(m);
			matrix.multiplyScalar(100);
			var elements = matrix.elements;

			return 'translate3d(-50%,-50%,0) matrix3d(' + epsilon(elements[0]) + ',' + epsilon(elements[1]) + ',' + epsilon(elements[2]) + ',' + epsilon(elements[3]) + ',' + epsilon(-elements[4]) + ',' + epsilon(-elements[5]) + ',' + epsilon(-elements[6]) + ',' + epsilon(-elements[7]) + ',' + epsilon(elements[8]) + ',' + epsilon(elements[9]) + ',' + epsilon(elements[10]) + ',' + epsilon(elements[11]) + ',' + epsilon(elements[12]) + ',' + epsilon(elements[13]) + ',' + epsilon(elements[14]) + ',' + epsilon(elements[15]) + ')';
		};

		var renderObject = function renderObject(object, camera) {

			if (object instanceof THREE.CSS3DObject) {

				var style;

				if (object instanceof THREE.CSS3DSprite) {

					// http://swiftcoder.wordpress.com/2008/11/25/constructing-a-billboard-matrix/

					matrix.copy(camera.matrixWorldInverse);
					matrix.transpose();
					matrix.copyPosition(object.matrixWorld);
					matrix.scale(object.scale);

					matrix.elements[3] = 0;
					matrix.elements[7] = 0;
					matrix.elements[11] = 0;
					matrix.elements[15] = 1;

					style = getObjectCSSMatrix(matrix);
				} else {

					style = getObjectCSSMatrix(object.matrixWorld);
				}

				var element = object.element;
				var cachedStyle = cache.objects[object.id];

				if (cachedStyle === undefined || cachedStyle !== style) {

					element.style.WebkitTransform = style;
					element.style.MozTransform = style;
					element.style.oTransform = style;
					element.style.transform = style;

					cache.objects[object.id] = style;
				}

				if (element.parentNode !== cameraElement) {

					cameraElement.appendChild(element);
				}
			}

			for (var i = 0, l = object.children.length; i < l; i++) {

				renderObject(object.children[i], camera);
			}
		};

		this.render = function (scene, camera) {

			var fov = 0.5 / Math.tan(THREE.Math.degToRad(camera.fov * 0.5)) * _height;

			if (cache.camera.fov !== fov) {

				domElement.style.WebkitPerspective = fov + 'px';
				domElement.style.MozPerspective = fov + 'px';
				domElement.style.oPerspective = fov + 'px';
				domElement.style.perspective = fov + 'px';

				cache.camera.fov = fov;
			}

			scene.updateMatrixWorld();

			if (camera.parent === undefined) camera.updateMatrixWorld();

			camera.matrixWorldInverse.getInverse(camera.matrixWorld);

			var style = 'translate3d(0,0,' + fov + 'px)' + getCameraCSSMatrix(camera.matrixWorldInverse) + ' translate3d(' + _widthHalf + 'px,' + _heightHalf + 'px, 0)';

			if (cache.camera.style !== style) {

				cameraElement.style.WebkitTransform = style;
				cameraElement.style.MozTransform = style;
				cameraElement.style.oTransform = style;
				cameraElement.style.transform = style;

				cache.camera.style = style;
			}

			renderObject(scene, camera);
		};
	};

/***/ },

/***/ 222:
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2015 Georgia Tech Research Corporation
	//
	// Licensed under the Apache License, Version 2.0 (the "License");
	// you may not use this file except in compliance with the License.
	// You may obtain a copy of the License at
	//
	//    http://www.apache.org/licenses/LICENSE-2.0
	//
	// Unless required by applicable law or agreed to in writing, software
	// distributed under the License is distributed on an "AS IS" BASIS,
	// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	// See the License for the specific language governing permissions and
	// limitations under the License.
	//
	// This software was created as part of a research project at the
	// Augmented Environments Lab at Georgia Tech.  To support our research, we
	// request that if you make use of this software, you let us know how
	// you used it by sending mail to Blair MacIntyre (blair@cc.gatech.edu).
	//

	'use strict';

	var THREE = __webpack_require__(144);

	/**
	 * Allows a stack of renderers to be treated as a single renderer.
	 * @author Gheric Speiginer
	 */

	THREE.MultiRenderer = function (parameters) {

	  console.log('THREE.MultiRenderer', THREE.REVISION);

	  this.domElement = document.createElement('div');
	  this.domElement.style.position = 'relative';

	  this.renderers = [];
	  this._renderSizeSet = false;

	  var rendererClasses = parameters.renderers || [];
	  var rendererParameters = parameters.parameters || [];

	  // elements are stacked back-to-front
	  for (var i = 0; i < rendererClasses.length; i++) {
	    var renderer = new rendererClasses[i](rendererParameters[i]);
	    renderer.domElement.style.position = 'absolute';
	    renderer.domElement.style.top = '0px';
	    renderer.domElement.style.left = '0px';
	    this.domElement.appendChild(renderer.domElement);
	    this.renderers.push(renderer);
	  }
	};

	THREE.MultiRenderer.prototype.setSize = function (w, h) {

	  this.domElement.style.width = w + 'px';
	  this.domElement.style.height = h + 'px';

	  for (var i = 0; i < this.renderers.length; i++) {
	    var renderer = this.renderers[i];
	    var el = renderer.domElement;

	    if (!this._renderSizeSet || el && el.tagName !== 'CANVAS') {
	      renderer.setSize(w, h);
	    }

	    el.style.width = w + 'px';
	    el.style.height = h + 'px';
	  }
	};

	THREE.MultiRenderer.prototype.setRenderSize = function (rw, rh) {

	  this._renderSizeSet = true;

	  for (var i = 0; i < this.renderers.length; i++) {
	    var renderer = this.renderers[i];
	    var el = renderer.domElement;

	    if (el && el.tagName === 'CANVAS') {
	      renderer.setSize(rw, rh, false);
	    }
	  }
	};

	THREE.MultiRenderer.prototype.render = function (scene, camera) {

	  for (var i = 0; i < this.renderers.length; i++) {
	    this.renderers[i].render(scene, camera);
	  }
	};

/***/ },

/***/ 223:
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2015 Georgia Tech Research Corporation
	//
	// Licensed under the Apache License, Version 2.0 (the "License");
	// you may not use this file except in compliance with the License.
	// You may obtain a copy of the License at
	//
	//    http://www.apache.org/licenses/LICENSE-2.0
	//
	// Unless required by applicable law or agreed to in writing, software
	// distributed under the License is distributed on an "AS IS" BASIS,
	// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	// See the License for the specific language governing permissions and
	// limitations under the License.
	//
	// This software was created as part of a research project at the
	// Augmented Environments Lab at Georgia Tech.  To support our research, we
	// request that if you make use of this software, you let us know how
	// you used it by sending mail to Blair MacIntyre (blair@cc.gatech.edu).
	//

	'use strict';

	var _Set = __webpack_require__(97)['default'];

	var _WeakMap = __webpack_require__(50)['default'];

	var _getIterator = __webpack_require__(67)['default'];

	var Argon = __webpack_require__(143);
	var THREE = __webpack_require__(144);
	THREE.Bootstrap = __webpack_require__(220);

	var Cesium = Argon.Cesium;
	var Matrix3 = Cesium.Matrix3;
	var Matrix4 = Cesium.Matrix4;
	var Quaternion = Cesium.Quaternion;
	var Cartesian3 = Cesium.Cartesian3;
	var Util = Argon.Util;

	var _v = new THREE.Vector3();
	var _q = new THREE.Quaternion();
	var _q2 = new THREE.Quaternion();
	var _mat = new THREE.Matrix4();
	var _mat2 = new THREE.Matrix4();
	var _matrixScratch = new Matrix4();

	var x90 = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, Math.PI / 2);
	var x90Rotation = Matrix3.fromQuaternion(x90);
	var x90Transform = Matrix4.fromRotationTranslation(x90Rotation, Cartesian3.ZERO);

	var scratchMatrix4 = Matrix4.clone(Matrix4.IDENTITY);
	var scratch2Matrix4 = Matrix4.clone(Matrix4.IDENTITY);
	var scratchQuaternion = Quaternion.clone(Quaternion.IDENTITY);
	var scratchCartesian3 = Cartesian3.clone(Cartesian3.ZERO);

	function setPose(object, position, orientation) {
	  if (!object.parent || object.parent.type === 'Scene') {
	    object.position.copy(position);
	    object.quaternion.copy(orientation);
	    object.updateMatrix();
	  } else {
	    var localPosition = object.parent.worldToLocal(_v.copy(position));
	    var parentWorldQuaternion = object.parent.getWorldQuaternion(_q);
	    var inverseParentWorldQuaternion = parentWorldQuaternion.conjugate();
	    var localQuaternion = inverseParentWorldQuaternion.multiply(_q2.copy(orientation));
	    object.position.copy(localPosition);
	    object.quaternion.copy(localQuaternion);
	    object.updateMatrix();
	  }
	  // need to update the matrixWorld in case the programmer wants to look at the world coordinates of objects
	  // attached to entities
	  object.updateMatrixWorld();
	}

	THREE.Bootstrap.registerPlugin('argon', {

	  defaults: {
	    start: true,
	    context: Argon.immersiveContext
	  },

	  listen: ['ready'],

	  install: function install(three) {

	    var argonContext = this.options.context;

	    var objects = new _Set();
	    var entityMap = new _WeakMap();

	    function _updateEntityFromObject(object, entity) {
	      var pos = object.getWorldPosition();
	      var objectPos = new Cesium.Cartesian3(pos.x, pos.y, pos.z);

	      entity.position.setValue(objectPos, argonContext.localOriginEastUpSouth);
	      entity.orientation.setValue(Cesium.Quaternion.clone(object.quaternion));

	      // use the last saved argon update time
	      var time = three.argon.time;

	      if (entity.isAvailable(time)) {
	        var cartesian = Util.getEntityPositionInReferenceFrame(entity, time, argonContext.eye.position.referenceFrame, scratchCartesian3);
	        if (cartesian) {
	          var quaternion = Util.getEntityOrientationInReferenceFrame(entity, time, argonContext.eye.position.referenceFrame, scratchQuaternion);

	          if (cartesian && quaternion) {
	            Quaternion.multiply(x90, quaternion, quaternion);
	            entity.position.setValue(cartesian, argonContext.eye.position.referenceFrame);
	            entity.orientation.setValue(quaternion);
	          }
	        }
	      }
	    }

	    function updateObjectFromEntity(object, entity, time) {
	      var position = undefined,
	          orientation = undefined;
	      if (entity.isAvailable(time)) {
	        position = Util.getEntityPositionInReferenceFrame(entity, time, argonContext.localOriginEastUpSouth, scratchCartesian3);
	        if (position) {
	          orientation = Util.getEntityOrientationInReferenceFrame(entity, time, argonContext.localOriginEastUpSouth, scratchQuaternion);
	        }
	      }

	      if (position && orientation) {
	        // rotate the transform so that Y means "local up"
	        Quaternion.multiply(orientation, x90, orientation);
	        setPose(object, position, orientation);
	        if (!object.__argonFound) {
	          object.__argonFound = true;
	          object.dispatchEvent({ type: 'argon:found' });
	        }
	      } else {
	        if (object.__argonFound) {
	          object.__argonFound = false;
	          object.dispatchEvent({ type: 'argon:lost' });
	        }
	      }
	    }

	    three.argon = {
	      time: Cesium.JulianDate.now, // we are going to save the time passed to update
	      deltaTime: 0, // time since last update

	      objectFromEntity: function objectFromEntity(entity, klass) {
	        if (!entity) throw new Error('entity is required');
	        if (!klass) klass = THREE.Object3D;
	        var object3D = new klass();
	        object3D.matrixAutoUpdate = false;
	        object3D.name = entity.name;
	        three.scene.add(object3D);

	        objects.add(object3D);
	        entityMap.set(object3D, entity);

	        // set the objects initial pose, just it case the programer wants to use it
	        updateObjectFromEntity(object3D, entity, three.argon.time);
	        return object3D;
	      },
	      entityFromObject: function entityFromObject(object) {
	        var context = argonContext;
	        var entity = entityMap.get(object);
	        if (entity) {
	          return entity;
	        }
	        // create a new one
	        entity = new Cesium.Entity({
	          name: object.name || object.uuid,
	          position: new Cesium.ConstantPositionProperty(),
	          orientation: new Cesium.ConstantProperty()
	        });

	        _updateEntityFromObject(object, entity);

	        objects.add(object);
	        entityMap.set(object, entity);
	        return entity;
	      },
	      updateEntityFromObject: function updateEntityFromObject(object) {
	        var entity = entityMap.get(object);
	        if (entity) {
	          _updateEntityFromObject(object, entity);
	        }
	      },
	      createObjectFromCartographicDegrees: function createObjectFromCartographicDegrees(name, lla, klass) {
	        var entity = new Cesium.Entity({
	          name: name,
	          position: Cesium.Cartesian3.fromDegrees(lla[0], lla[1], lla[2])
	        });
	        return three.argon.objectFromEntity(entity, klass);
	      },
	      createObjectFromCartesian: function createObjectFromCartesian(name, cart, klass) {
	        var entity = new Cesium.Entity({
	          name: name,
	          position: cart
	        });
	        return three.argon.objectFromEntity(entity, klass);
	      },
	      getCartographicDegreesFromEntity: function getCartographicDegreesFromEntity(entity) {
	        if (entity.isAvailable(three.argon.time)) {
	          var position = entity.position.getValue(three.argon.time);
	          if (position) {
	            var pos = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
	            if (pos) {
	              return [Cesium.Math.toDegrees(pos.longitude), Cesium.Math.toDegrees(pos.latitude), pos.height];
	            }
	          }
	        }
	        return undefined;
	      },
	      getEntity: function getEntity(object) {
	        return entityMap.get(object);
	      }
	    };

	    var trigger = three.trigger.bind(three);
	    var newReality = undefined;
	    var newOrigin = false;

	    argonContext.on('originChange', function () {
	      newOrigin = true;
	    });

	    argonContext.on('realityChange', function (state) {
	      newReality = state;
	    });

	    argonContext.on('update', function (state) {
	      var time = state.time;
	      var origin = argonContext.localOriginEastUpSouth;
	      var eye = argonContext.eye;
	      var frustum = argonContext.frustum;

	      // save a copy of argon time and compute delta time
	      three.argon.deltaTime = Cesium.JulianDate.secondsDifference(time, three.argon.time);
	      three.argon.time = state.time;

	      var eyePosition = Util.getEntityPositionInReferenceFrame(eye, time, origin, scratchCartesian3);
	      var eyeOrientation = Util.getEntityOrientationInReferenceFrame(eye, time, origin, scratchQuaternion);
	      setPose(three.camera, eyePosition, eyeOrientation);

	      three.camera.fov = frustum.fovy * 180 / Math.PI;
	      three.camera.aspect = frustum.aspectRatio;
	      // three.camera.updateProjectionMatrix()
	      three.camera.projectionMatrix.fromArray(frustum.infiniteProjectionMatrix);

	      // update all the objects
	      // BUG: at some point, we may want to optimize this, but checking if the Entity values have changed
	      // since the last time we updated the object.  For now, we'll just be safe and inefficient
	      for (var _iterator = objects, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
	        var _ref;

	        if (_isArray) {
	          if (_i >= _iterator.length) break;
	          _ref = _iterator[_i++];
	        } else {
	          _i = _iterator.next();
	          if (_i.done) break;
	          _ref = _i.value;
	        }

	        var o = _ref;

	        var e = entityMap.get(o);
	        updateObjectFromEntity(o, e, time);
	      }

	      // trigger the various threestrap events, plus any addition argon events
	      three.trigger({ type: 'pre' });

	      if (newOrigin) {
	        newOrigin = false;
	        three.trigger({ type: 'argon:originChange' });
	      }
	      if (newReality) {
	        three.trigger({ type: 'argon:realityChange', reality: newReality.reality, previousReality: newReality.previousReality });
	        newReality = undefined;
	      }
	      three.trigger({ type: 'update', argonState: state });
	      three.trigger({ type: 'render' });
	      three.trigger({ type: 'post' });
	    });
	  },

	  uninstall: function uninstall(three) {},

	  ready: function ready(event, three) {
	    three.camera.near = 0.5;
	    three.camera.far = 10000000000;
	    three.camera.updateProjectionMatrix();
	    three.scene.add(three.camera);
	  } });

/***/ }

/******/ })
});
;