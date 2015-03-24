(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("three"), require("./argon"), require("threestrap"));
	else if(typeof define === 'function' && define.amd)
		define([, "argon", ], factory);
	else if(typeof exports === 'object')
		exports["ARGON"] = factory(require(undefined), require("./argon")["ARGON"], require(undefined));
	else
		root["ARGON"] = factory(root["THREE"], root["ARGON"], root["THREE"]["Bootstrap"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_50__) {
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

	"use strict";

	var ARGON = module.exports = __webpack_require__(14);
	var THREE = __webpack_require__(13);
	THREE.Bootstrap = __webpack_require__(50);

	if (!THREE) throw new Error("three.js must be loaded before argon-three.js");
	if (!THREE.Bootstrap) throw new Error("threestrap.js must be loaded before argon-three.js");

	__webpack_require__(52);

	var _argonCorePlugins = ["bind", "renderer", "size", "fill", "time", "scene", "camera", "render", /*'warmup',*/"argon"];
	THREE.Bootstrap.registerAlias("argon-core", _argonCorePlugins);

	if (!THREE.CSS3DRenderer) __webpack_require__(51);

	/** These are deprecated. Remove later. **/
	var _bind = __webpack_require__(48);
	ARGON.THREE = {
	  MultiRenderer: __webpack_require__(47),
	  objectToContextMap: new WeakMap(),
	  bind: function (context, component, object) {
	    console.warn("ARGON.THREE.bind is deprecated. Use {threestrapObject}.argon.bindComponent(component, object) instead.");
	    return _bind(context, component, object);
	  }
	};

	/**
	 * Deprecated. Remove later.
	 */
	ARGON.THREE.Bootstrap = function (context, options) {
	  console.warn("ARGON.THREE.Bootstrap is deprecated. Use THREE.Bootstrap.createArgonOptions(context) with THREE.Bootstrap(options)");
	  options = options || {};
	  options.plugins = options.plugins || _argonCorePlugins;
	  options.element = context.element;

	  // options.size = options.size || {
	  //   maxRenderWidth: 800
	  // }

	  options.renderer = options.renderer || {
	    klass: THREE.MultiRenderer,
	    parameters: {
	      renderers: [THREE.WebGLRenderer, THREE.CSS3DRenderer], // stacked back to front
	      parameters: [{
	        alpha: true,
	        depth: true,
	        stencil: true,
	        preserveDrawingBuffer: true,
	        antialias: true
	      }, {} // CSS3DRenderer doesn't have any parameters
	      ]
	    }
	  };

	  var three = THREE.Bootstrap(options);

	  if (!three.scene) throw "Expected three.scene object";
	  if (!three.camera) throw "Expected three.camera object";

	  ARGON.THREE.objectToContextMap.set(three.scene, context);
	  ARGON.THREE.objectToContextMap.set(three.camera, context);

	  return three;
	};

	THREE.Bootstrap.createArgonOptions = function (context) {
	  var options = {};
	  options.plugins = options.plugins || _argonCorePlugins;

	  options.argon = {
	    context: context || ARGON.immersiveContext
	  };

	  options.size = options.size || {
	    maxRenderWidth: 800,
	    maxRenderHeight: 800
	  };

	  options.element = options.argon.context.element;

	  options.renderer = options.renderer || {
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

	THREE.MultiRenderer = THREE.MultiRenderer || __webpack_require__(47);

/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },

/***/ 47:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var THREE = __webpack_require__(13);

	/**
	 * Allows a stack of renderers to be treated as a single renderer.
	 * @author Gheric Speiginer
	 */

	THREE.MultiRenderer = function (parameters) {
	  console.log("THREE.MultiRenderer", THREE.REVISION);

	  this.domElement = document.createElement("div");
	  this.domElement.style.position = "relative";

	  this.renderers = [];
	  this._renderSizeSet = false;

	  var rendererClasses = parameters.renderers || [];
	  var rendererParameters = parameters.parameters || [];

	  // elements are stacked back-to-front
	  for (var i = 0; i < rendererClasses.length; i++) {
	    var renderer = new rendererClasses[i](rendererParameters[i]);
	    renderer.domElement.style.position = "absolute";
	    renderer.domElement.style.top = "0px";
	    renderer.domElement.style.left = "0px";
	    this.domElement.appendChild(renderer.domElement);
	    this.renderers.push(renderer);
	  }
	};

	THREE.MultiRenderer.prototype.setSize = function (w, h) {
	  this.domElement.style.width = w + "px";
	  this.domElement.style.height = h + "px";

	  for (var i = 0; i < this.renderers.length; i++) {
	    var renderer = this.renderers[i];
	    var el = renderer.domElement;

	    if (!this._renderSizeSet || el && el.tagName !== "CANVAS") {
	      renderer.setSize(w, h);
	    }

	    el.style.width = w + "px";
	    el.style.height = h + "px";
	  }
	};

	THREE.MultiRenderer.prototype.setRenderSize = function (rw, rh) {
	  this._renderSizeSet = true;

	  for (var i = 0; i < this.renderers.length; i++) {
	    var renderer = this.renderers[i];
	    var el = renderer.domElement;

	    if (el && el.tagName === "CANVAS") {
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

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var THREE = __webpack_require__(13);

	var _mat = new THREE.Matrix4();
	var _mat2 = new THREE.Matrix4();

	var bindObjectToContext = function (context, component, threeObject) {
	  var proxy = component.getProxy(context);
	  var hasTransform = false;

	  proxy.handler.on("update", function () {
	    var state = proxy.getState();
	    var finalTransform = proxy.getFinalTransform();

	    if (state && state.fov && threeObject instanceof THREE.Camera) {
	      threeObject.fov = state.fov;
	      threeObject.updateProjectionMatrix();
	    }

	    if (finalTransform) {
	      if (threeObject.parent) {
	        _mat.getInverse(threeObject.parent.matrixWorld);
	        _mat.multiply(_mat2.fromArray(finalTransform));
	        threeObject.matrix.copy(_mat);
	        threeObject.matrixWorldNeedsUpdate = true;
	      } else {
	        threeObject.matrix.fromArray(finalTransform);
	        threeObject.matrixWorld.fromArray(finalTransform);
	      }

	      if (!hasTransform) {
	        threeObject.dispatchEvent({ type: "found" });
	        hasTransform = true;
	      }
	    } else if (hasTransform) {
	      threeObject.dispatchEvent({ type: "lost" });
	      hasTransform = false;
	    }
	  });

	  threeObject.matrixAutoUpdate = false;
	};

	module.exports = function bind(context, argonComponent, threeObject) {
	  if (context instanceof ARGON.Component) {
	    threeObject = argonComponent;
	    argonComponent = context;
	    context = ARGON.immersiveContext;
	  }
	  if (!threeObject) threeObject = new THREE.Object3D();

	  // bind the object the scene's context
	  bindObjectToContext(context, argonComponent, threeObject);

	  return threeObject;
	};

/***/ },

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_50__;

/***/ },

/***/ 51:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var THREE = __webpack_require__(13);

	/**
	 * Based on http://www.emagix.net/academic/mscs-project/item/camera-sync-with-css3-and-webgl-threejs
	 * @author mrdoob / http://mrdoob.com/
	 */

	THREE.CSS3DObject = function (element) {
		THREE.Object3D.call(this);

		this.element = element;
		this.element.style.position = "absolute";

		this.addEventListener("removed", function (event) {
			if (this.element.parentNode !== null) {
				this.element.parentNode.removeChild(this.element);
			}
		});
	};

	THREE.CSS3DObject.prototype = Object.create(THREE.Object3D.prototype);

	THREE.CSS3DSprite = function (element) {
		THREE.CSS3DObject.call(this, element);
	};

	THREE.CSS3DSprite.prototype = Object.create(THREE.CSS3DObject.prototype);

	//

	THREE.CSS3DRenderer = function () {
		console.log("THREE.CSS3DRenderer", THREE.REVISION);

		var _width, _height;
		var _widthHalf, _heightHalf;

		var matrix = new THREE.Matrix4();

		var cache = {
			camera: { fov: 0, style: "" },
			objects: {}
		};

		var domElement = document.createElement("div");
		domElement.style.overflow = "hidden";

		domElement.style.WebkitTransformStyle = "preserve-3d";
		domElement.style.MozTransformStyle = "preserve-3d";
		domElement.style.oTransformStyle = "preserve-3d";
		domElement.style.transformStyle = "preserve-3d";

		this.domElement = domElement;

		var cameraElement = document.createElement("div");

		cameraElement.style.WebkitTransformStyle = "preserve-3d";
		cameraElement.style.MozTransformStyle = "preserve-3d";
		cameraElement.style.oTransformStyle = "preserve-3d";
		cameraElement.style.transformStyle = "preserve-3d";

		domElement.appendChild(cameraElement);

		this.setClearColor = function () {};

		this.setSize = function (width, height) {
			_width = width;
			_height = height;

			_widthHalf = _width / 2;
			_heightHalf = _height / 2;

			domElement.style.width = width + "px";
			domElement.style.height = height + "px";

			cameraElement.style.width = width + "px";
			cameraElement.style.height = height + "px";
		};

		var epsilon = function (value) {
			return Math.abs(value) < 0.000001 ? 0 : value;
		};

		var getCameraCSSMatrix = function (matrix) {
			var elements = matrix.elements;

			return "matrix3d(" + epsilon(elements[0]) + "," + epsilon(-elements[1]) + "," + epsilon(elements[2]) + "," + epsilon(elements[3]) + "," + epsilon(elements[4]) + "," + epsilon(-elements[5]) + "," + epsilon(elements[6]) + "," + epsilon(elements[7]) + "," + epsilon(elements[8]) + "," + epsilon(-elements[9]) + "," + epsilon(elements[10]) + "," + epsilon(elements[11]) + "," + epsilon(elements[12]) + "," + epsilon(-elements[13]) + "," + epsilon(elements[14]) + "," + epsilon(elements[15]) + ")";
		};

		var getObjectCSSMatrix = function (matrix) {
			var elements = matrix.elements;

			return "translate3d(-50%,-50%,0) matrix3d(" + epsilon(elements[0]) + "," + epsilon(elements[1]) + "," + epsilon(elements[2]) + "," + epsilon(elements[3]) + "," + epsilon(-elements[4]) + "," + epsilon(-elements[5]) + "," + epsilon(-elements[6]) + "," + epsilon(-elements[7]) + "," + epsilon(elements[8]) + "," + epsilon(elements[9]) + "," + epsilon(elements[10]) + "," + epsilon(elements[11]) + "," + epsilon(elements[12]) + "," + epsilon(elements[13]) + "," + epsilon(elements[14]) + "," + epsilon(elements[15]) + ")";
		};

		var renderObject = function (object, camera) {
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
				domElement.style.WebkitPerspective = fov + "px";
				domElement.style.MozPerspective = fov + "px";
				domElement.style.oPerspective = fov + "px";
				domElement.style.perspective = fov + "px";

				cache.camera.fov = fov;
			}

			scene.updateMatrixWorld();

			if (camera.parent === undefined) camera.updateMatrixWorld();

			camera.matrixWorldInverse.getInverse(camera.matrixWorld);

			var style = "translate3d(0,0," + fov + "px)" + getCameraCSSMatrix(camera.matrixWorldInverse) + " translate3d(" + _widthHalf + "px," + _heightHalf + "px, 0)";

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

/***/ 52:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var ARGON = __webpack_require__(14);
	var THREE = __webpack_require__(13);
	THREE.Bootstrap = __webpack_require__(50);

	var argonBind = __webpack_require__(48);

	THREE.Bootstrap.registerPlugin("argon", {

	  defaults: {
	    start: true,
	    context: ARGON.immersiveContext
	  },

	  listen: ["ready"],

	  install: function (three) {
	    var _this = this;


	    this.running = false;
	    this.argonSynced = false;

	    three.Loop = this.api({
	      start: this.start.bind(this),
	      stop: this.stop.bind(this),
	      running: false }, three);

	    three.argon = {
	      bindComponent: function (component, object) {
	        argonBind(_this.options.context, component, object);
	      }
	    };

	    this.events = ["pre", "update", "render", "post"].map(function (type) {
	      return { type: type };
	    });
	  },

	  uninstall: function (three) {
	    this.stop(three);
	  },

	  ready: function (event, three) {
	    if (this.options.start) this.start(three);

	    three.camera.near = 0.5;
	    three.camera.far = 10000000000;
	    three.camera.updateProjectionMatrix();

	    var trigger = three.trigger.bind(three);
	    ARGON.managerPort.on("SYNC", (function () {
	      this.argonSynced = true;
	      this.running && this.events.map(trigger);
	    }).bind(this));
	  },

	  start: function (three) {
	    if (this.running) return;

	    three.Loop.running = this.running = true;

	    var trigger = three.trigger.bind(three);
	    var loop = (function () {
	      if (!this.argonSynced) {
	        this.running && requestAnimationFrame(loop);
	        this.events.map(trigger);
	      }
	    }).bind(this);

	    requestAnimationFrame(loop);

	    three.trigger({ type: "start" });
	  },

	  stop: function (three) {
	    if (!this.running) return;
	    three.Loop.running = this.running = false;

	    three.trigger({ type: "stop" });
	  } });

/***/ }

/******/ })
});
;