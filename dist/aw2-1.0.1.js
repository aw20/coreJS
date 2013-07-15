/**
*
* aw2 library
* core
*
* @module aw2
* @class AW2
**/
(function(window, undefined) {
	/**
	* current library version
	*
	* @private
	* @property version
	* @type {String}
	**/
	var version = "1.0";

	/**
	* internal document tracker
	*
	* @private
	* @property document
	* @type {Object}
	**/
	var document = window.document;

	/**
	* internal location tracker
	*
	* @private
	* @property location
	* @type {Object}
	**/
	var location = window.location;

	/**
	* clone any previous aw2 variable in case of overwrite
	*
	* @property _aw2
	* @type {Any}
	**/
	var _aw2 = window.aw2;

	/**
	* initialize internal library
	*
	* @private
	* @property aw2
	* @type {Object}
	**/
	var aw2 = function(selector) {
		return new aw2.fn.init(selector);
	};

	/**
	* initialize the library provisions when called as a function
	*
	* @private
	* @property fn
	* @type {Object}
	**/
	aw2.fn = aw2.prototype = {
		aw2: version,
		constructor: aw2,
		selector: "",
		length: 0,
		init: function(_selector) {
			if(!_selector) {
				return this;
			}

			if(typeof(_selector) === "string") {
				var match;

				match = document.querySelectorAll(_selector);

				for(var item in match) {
					this[item] = match[item];
				}
				this.length = match.length;
			} else if(_selector.nodeType) {
				this[0] = _selector;
				this.length = 1;
			}

			this.selector = _selector;
			return this;
		},
		find: function(_selector) {
			var buildSelect = ((this.selector.length) > 0 ? this.selector + " " : "") + _selector;

			return new aw2(buildSelect);
		},
		toArray: function() {
			return [].slice.call(this);
		},
		push: [].push,
		sort: [].sort,
		splice: [].splice,
		first: function() {
			return aw2(this[0]);
		},
		last: function() {
			return aw2(this[this.length - 1]);
		},
		/**
		* check if a given DOM element has a checked or selected status
		*
		* @method isChecked
		* @param {DOMElement} domObj a DOM element
		* @return {Boolean} returns true if provided element is checked
		*
		* @example
		*	<input type="radio" class="checkMe" />
		*
		*	$aw2('.checkMe').isChecked();
		**/
		isChecked: function() {
			var elems = this.toArray();

			for(var el in elems) {
				try {
					if(!(elems[el] && elems[el].checked)) {
						return false;
					}
				} catch(e) {}
			}

			return true;
		}
	};

	aw2.fn.init.prototype = aw2.fn;

	/**
	* enable extension of the library from additional sources
	*
	* @method extend
	* @param {Object} arg* multiple objects to extend core library functionality
	**/
	aw2.extend = aw2.fn.extend = function() {
		var target = arguments[0] || {};
		var copy, name, options;
		var keyMax = arguments.length;
		var key = 1;

		if(key === keyMax) {
			target = this;
			--key;
		}

		for(; key < keyMax; key++) {
			if((options = arguments[key]) !== null) {
				for(name in options) {
					copy = options[name];

					if(target === copy) {
						continue;
					}

					target[name] = copy;
				}
			}
		}

		return target;
	};

	/**
	* initialize the library provisions when called as an object
	**/
	aw2.extend({
		/**
		* check the type of a given object
		*
		* @method type
		* @param {Any} obj an object from which to determine the type
		* @return {String} the type of the object passed in
		**/
		type: function(obj) {
			classTypeMap = {};
			for(var name in ("Boolean Number String Function Array Date RegExp Object Error".split(" "))) {
				classTypeMap["[object " + name + "]"] = name.toLowerCase();
			}

			if(obj === null) {
				return String(obj);
			}
			return (typeof obj === "object" || typeof obj === "function") ? (classTypeMap[classTypeMap.toString.call(obj)] || "object") : typeof obj;
		},

		/**
		* check if array
		*
		* @method isArray
		* @param {Array} array the array to check
		* @return {Boolean} true or false
		*
		* @example
		*	$aw2.isArray([1,2,3]);
		*
		*
		*	$aw2.isArray('string');
		*
		**/
		isArray: function(array) {
			return Array.isArray(array);
		},

		/**
		* test if an element exists in an array starting at the specific index
		*
		* @method arrayContains
		* @param {Array} arr the array to check
		* @param {Any} el the element to look for
		* @param {Number} [start=0] the starting index
		* @return {Number} the index of the found element or -1 if not found
		*
		* @example
		* 	$aw2.arrayContains([1,2,3,4,5,6], 1, 0)
		*
		*	var x = ['Andy','Alan','Matthew','Simon'];
		*	$aw2.arrayContains(x, 'Matthew');
		*
		**/
		arrayContains: function(arr, el, start) {
			if(arr) {
				return arr.indexOf(el);
			}
		},

		/**
		* convert an array to a string list using a given separation character
		*
		* @method arrayToList
		* @param {Array} array the array to convert to a list
		* @param {String} separator="," the character to use for separating the list
		* @return {undefined}
		*
		* @example
		*	$aw2.arrayToList(['Matthew','Jim','Sandy']);
		*
		**/
		arrayToList: function(array, separator) {
			if(typeof(separator) !== "string") {
				separator = ",";
			}

			return [].join.apply(array, [separator]);
		},

		/**
		* convert a string list to an array using a given separation character
		*
		* @method listToArray
		* @param {String} list a string list to convert
		* @param {String} separator="," the character to use for separating the list
		* @return {undefined}
		*
		* @example
		*	$aw2.listToArray('Matthew,Jim,Sandy');
		*
		**/
		listToArray: function(list, separator) {
			if(typeof(separator) != "string") {
				separator = ",";
			}

			return "".split.apply(list, [separator]);
		},

		/**
		* Return the first item in an array
		*
		* @method arrayFirst
		* @param {Array} array the array you wish to return the first item from
		* @return {Any} the first item of the array
		*
		* @example
		*	$aw2.arrayFirst(['Matthew','Jim','Sandy']);
		*
		**/
		arrayFirst: function(array) {

			return array[0] || aw2.isArray(array);
		},

		/**
		* Return the last item in an array
		*
		* @method arrayLast
		* @param {Array} array the array you wish to return the first item from
		* @return {Any} the last item of the array
		*
		* @example
		*	$aw2.arrayLast(['Matthew','Jim','Sandy']);
		*
		**/
		arrayLast: function(array) {
			if(!aw2.isArray(array)) {
				return false;
			}

			return array.splice(array.length-1, 1);
		},

		/**
		* test if an element exists in a structure
		*
		* @method structKeyExists
		* @param {Object} obj the structure object to check
		* @param {String} key the key to find
		* @return {Boolean} true if the object contains the key
		*
		* @example
		*
		*	var s = { name : "Matthew" }
		*
		*	$aw2.structKeyExists(s, 'name') // Returns true
		*
		*	$aw2.structKeyExists(s, 'jobTitle') // Returns false
		*
		**/
		structKeyExists: function(obj, key) {
			return (typeof(obj[key]) !== "undefined");
		},

		/**
		* remove a key from a structure
		*
		* @method structDelete
		* @param {Object} obj the structure object
		* @param {String} key the key to be removed
		* @return {undefined}
		*
		* @example
		*
		*	var s = { name : "Matthew", jobTitle : "Developer" }
		*
		*	$aw2.structDelete(s, 'jobTitle')
		*
		**/
		structDelete: function(obj, key) {
			delete obj[key];
		}
	});

	/**
	* expose library to window
	*
	* @property window.$aw2
	* @type {Object}
	**/
	window.aw2 = window.$aw2 = aw2;
})(window);

/**
*
* aw2 library
* ajax (jquery implementation)
*
* @module aw2
* @class AW2.Ajax
**/
(function(window, undefined) {
	aw2.extend({
		/**
		* the core AJAX call to an endpoint offering all options
		*
		* @method ajax
		* @return {Object} ajax request object
		**/
		ajax: function() {
			return jQuery.ajax.apply(this, arguments);
		},

		/**
		* external handler for asynchronous AJAX calls allowing callbacks to be specified at some point after the initial call
		*
		* @method when
		* @param {Object} [args]* one or more ajax request objects
		* @return {Object} returns an object with methods to specify various callbacks for what to do when the passed ajax objects return
		*
		* @example
		* Sample using when and done
		*
		*		var ajaxRequest = $aw2.callJSON("myRequest.cfm");
		*		$aw2.when(ajaxRequest).done(function(response) {
		*			alert("Do something with " + response);
		*		});
		*
		* @example
		* Sample using when, done and fail. `.fail()` is a callback to execute on failed ajax
		*
		*		var ajaxRequest = $aw2.callJSON("myRequest.cfm");
		*		$aw2.when(ajaxRequest).done(function(response) {
		*			alert("Do something with " + response);
		*		}).fail(function() {
		*			alert('Failed');
		* 	});
		**/
		when: function() {
			var argBuild = [];

			for(var arg in arguments) {
				var isAjax = (typeof(arguments[arg]["readyState"]) != "undefined" && typeof(arguments[arg]["promise"]) != "undefined") ? true : false;

				argBuild.push(isAjax ? arguments[arg] : aw2.ajax(arguments[arg]));
			}

			return jQuery.when.apply(this, argBuild);
		},

		/**
		* make an AJAX call to an endpoint returning a specified type
		*
		* @method call
		* @param {String} url the URL of the endpoint
		* @param {Object} [data] an object of arguments for the ajax call
		* @param {Function} [cb] callback function executed on success
		* @param {Function} [error] callback function executed on error
		* @param {String} [type] type of response
		* @return {Object} ajax request object
		*
		* @example
		* Sample with callback
		*
		*		$aw2.call("myRequest.cfm", {a: 1}, function(data) {
		*			alert("do something with " + data);
		*		}, "json");
		*
		* @example
		* Sample with success and error callback
		*
		*		$aw2.call("myRequest.cfm", {a: 1}, function(data) {
		*			alert("do something with " + data);
		*		}, function() {
		*			alert('Error');
		*		}, "json");
		**/
		call: function(url, data, cb, error, type) {
			return aw2.ajax({
				url: url,
				data: data || {},
				type: "post",
				cache: false,
				async: true,
				dataType: type || "json",
				success: cb || null,
				error: error || null
			});
		},

		/**
		* make an AJAX call to an endpoint returning JSON
		*
		* @method callJSON
		* @param {String} url the URL of the endpoint
		* @param {Object} [data] an object of arguments for the ajax call
		* @param {Function} [cb] callback function executed on success
		* @param {Function} [error] callback function executed on error
		* @return {Object} ajax request object
		*
		* @example
		* Sample with success callback
		*
		*		$aw2.callJSON("http://openbd.org/manual/api/?/function/fileread/", '', function(data) {
		*			alert("do something with " + data);
		*		});
		*
		* @example
		* Sample with success and error callback
		*
		*		$aw2.callJSON("http://openbd.org/manual/api/?/function/fileread/", '', function(data) {
		*			alert("do something with " + data);
		*		}, function() {
		*			alert('Error');
		*		});
		**/
		callJSON: function(url, data, cb, error) {
			return aw2.call.apply(this, [url, data, cb, error, "json"]);
		},

		/**
		* make an AJAX call to an endpoint returning JSONP
		*
		* @method callJSONP
		* @param {String} url the URL of the endpoint
		* @param {Object} [data] an object of arguments for the ajax call
		* @param {Function} [cb] callback function executed on success
		* @param {Function} [error] callback function executed on error
		* @return {Object} ajax request object
		*
		* @example
		* Sample with callback
		*
		*		$aw2.callJSONP("myRequest.cfm", {a: 1}, function(data) {
		*			alert("do something with " + data);
		*		});
		*
		* @example
		* Sample with success and error callback
		*
		*		$aw2.callJSONP("myRequest.cfm", {a: 1}, function(data) {
		*			alert("do something with " + data);
		*		}, function() {
		*			alert('Error');
		*		});
		**/
		callJSONP: function(url, data, cb, error) {
			return aw2.call.apply(this, [url, data, cb, error, "jsonp"]);
		},

		/**
		* make an AJAX call to an endpoint returning HTML
		*
		* @method callHTML
		* @param {String} url the URL of the endpoint
		* @param {Object} [data] an object of arguments for the ajax call
		* @param {Function} [cb] callback function executed on success
		* @param {Function} [error] callback function executed on error
		* @return {Object} ajax request object
		*
		* @example
		* Sample with callback
		*
		*		$aw2.callHTML("myRequest.cfm", {a: 1}, function(data) {
		*			alert("do something with " + data);
		*		});
		*
		* @example
		* Sample with success and error callback
		*
		*		$aw2.callHTML("myRequest.cfm", {a: 1}, function(data) {
		*			alert("do something with " + data);
		*		}, function() {
		*			alert('Error');
		*		});
		**/
		callHTML: function(url, data, cb, error) {
			return aw2.call.apply(this, [url, data, cb, error, "html"]);
		}
	});
})(window);

/**
*
* aw2 library
* event (jquery implementation)
*
* @module aw2
* @class AW2.Event
**/
(function(window, undefined) {
	aw2.extend({
		/**
		* Bind events to an element
		*
		* @method bind
		* @param {String} event event type
		* @param {String} selector the selector you wish your event to be bound to
		* @param {Function} callback the function to happen once the event has been triggered
		* @param {String||Boolean} bind the selector of the element to bind to instead of binding event to the document
		* @return {undefined}
		*
		* @example
		* Simple click event, defaults to the document
		*
		*		$aw2.bind("click", "h3", function() {
		*			console.log('Document Live');
		*		});
		*
		* @example
		* Click event that is static
		*
		*		$aw2.bind("click", "h3", function() {
		*			console.log('Document Live');
		*		}, false);
		*
		* @example
		* Attached click event to all `<p>` inside of the .live element
		*
		*		$aw2.bind("click", "p", function() {
		*			console.log('Document Live');
		*		}, '.live');
		**/
		bind: function(event, selector, callback, live) {
			var argBuild = [event, selector, callback];
			var bindTo = window.jQuery(window.document);

			//check for special bind
			if(typeof(live) !== "undefined") {
				//if bind false
				if(typeof(live) === "boolean" && live === false) {
					//make non-live event
					bindTo = window.jQuery(selector);
					argBuild.splice(1, 1);
				} else {
					//make live event but bind to an alternative element
					bindTo = window.jQuery(live);
				}
			}

			return jQuery.fn.on.apply(bindTo, argBuild);
		},

		/**
		* unbind events from an element
		*
		* @method unbind
		* @param {String} event event type
		* @param {String} selector the selector you wish your event to be bound to
		* @param {String||Boolean} bind the selector of the element to bind to instead of binding event to the document
		* @return {undefined}
		*
		* @example
		* Simple click event, defaults to the document
		*
		*		$aw2.unbind("click", "h3");
		*
		* @example
		* Click event that is static
		*
		*		$aw2.unbind("click", "h3", false);
		*
		* @example
		* Attached click event to all <p> inside of the .live element
		*
		*		$aw2.unbind("click", "p", '.live');
		**/
		unbind: function(event, selector, live) {
			var argBuild = [event, selector];
			var bindTo = window.jQuery(window.document);

			if(typeof(live) !== "undefined") {
				if(typeof(live) === "boolean" && live === false) {
					bindTo = window.jQuery(selector);
					argBuild.splice(1, 1);
				} else {
					bindTo = window.jQuery(live);
				}
			}

			return jQuery.fn.off.apply(bindTo, argBuild);
		}
	});
})(window);
