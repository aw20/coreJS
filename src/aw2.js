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
	var version = "1.0.2";

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
	var aw2 = function( selector ) {
		return new aw2.fn.init( selector );
	};


	/**
	* Set up the the classTypeMap used within the .type() method
	**/
	var classTypeMap = {}
		, types = "Boolean Number String Function Array Date RegExp Object Error".split(" ");

	for ( name in types ) {
		classTypeMap[ "[object " + types[ name ] + "]" ] = types[ name ].toLowerCase();
	}

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
		init: function( _selector ) {
			if ( !_selector ) {
				return this;
			}

			if ( typeof(_selector) === "string" ) {
				var match;

				match = document.querySelectorAll( _selector );

				for ( var item in match ) {
					this[ item ] = match[ item ];
				}
				this.length = match.length;
			} else if ( _selector.nodeType ) {
				this[0] = _selector;
				this.length = 1;
			}

			this.selector = _selector;
			return this;
		},
		find: function( _selector ) {
			var buildSelect = ( (this.selector.length) > 0 ? this.selector + " " : "" ) + _selector;

			return new aw2(buildSelect);
		},
		toArray: function() {
			return [].slice.call(this);
		},
		push: [].push,
		sort: [].sort,
		splice: [].splice,
		first: function() {
			return aw2( this[0] );
		},
		last: function() {
			return aw2( this[ this.length - 1 ] );
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

			for ( var el in elems ) {
				try {
					if ( !(elems[ el ] && elems[ el ].checked) ) {
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

		if ( key === keyMax ) {
			target = this;
			--key;
		}

		for ( ; key < keyMax; key++ ) {
			if ( (options = arguments[ key ]) !== null ) {
				for ( name in options ) {
					copy = options[ name ];

					if ( target === copy ) {
						continue;
					}

					target[ name ] = copy;
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
		type: function( obj ) {
			if ( obj === null ) {
				return String( obj );
			}
			return typeof obj === "object" || typeof obj === "function" ?
				classTypeMap[ classTypeMap.toString.call( obj ) ] || "object" :
				typeof obj;
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
		isArray: function( array ) {
			return Array.isArray( array );
		},

		/**
		* test if an element exists in an array starting at the specific index
		*
		* @method arrayContains
		* @param {Array} arr the array to check
		* @param {Any} el the element to look for
		* @return {Number} the index of the found element or -1 if not found
		*
		* @example
		* 	$aw2.arrayContains([1,2,3,4,5,6], 1)
		*
		*	var x = ['Andy','Alan','Matthew','Simon'];
		*	$aw2.arrayContains(x, 'Matthew');
		*
		**/
		arrayContains: function( arr, el ) {
			if ( this.isArray( arr ) ) {
				return arr.indexOf( el );
			} else {
				return 'Not Array';
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
		arrayToList: function( array, separator ) {
			if ( typeof(separator) !== "string" ) {
				separator = ",";
			}

			return [].join.apply( array, [ separator ] );
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
		listToArray: function( list, separator ) {
			if ( typeof(separator) != "string" ) {
				separator = ",";
			}

			return "".split.apply( list, [ separator ] );
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
		arrayFirst: function( array ) {
			return aw2.isArray( array ) ? array[0] : aw2.isArray( array );
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
		arrayLast: function( array ) {
			if ( !aw2.isArray( array ) ) {
				return false;
			}

			return array.splice( array.length-1, 1 )[ 0 ];
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
		structKeyExists: function( obj, key ) {
			return ( typeof( obj[ key ] ) !== "undefined" );
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
		structDelete: function( obj, key ) {
			delete obj[ key ];
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
