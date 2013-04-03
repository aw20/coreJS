/**
*
* aw2 library
* log plugin
*
* @module aw2.log
**/
(function() {
	if(typeof(aw2) == "undefined") {
		console.log("aw2.log[error]: requires aw2 core library!");
		return false;
	}

	/**
	* object providing Log storage and methods
	*
	* @class Log
	* @constructor
	**/
	function Log() {
		var self = this;
		var loggingEnabled = ["console"];
		var internalLog = [];
		var invokeLog = {
			"internal": function() {
				internalLog.push(arguments);
			},
			"console": function() {
				try {
					console.log.apply(console, arguments);
				} catch(e) {
					console.log(arguments);
				}
			},
			"alert": function() {
				alert(arguments);
			}
		};

		/**
		* enables one or more specified logging types.
		*
		* @method enable
		* @param {String} logType* logging type(s)
		* @return {undefined}
		**/
		this.enable = function() {
			for(var arg in arguments) {
				if(aw2.isArray(arguments[arg])) {
					self.enable.apply(this, arguments[arg]);
				} else {
					if(typeof(arguments[arg]) == "string" && typeof(invokeLog[arguments[arg]]) != "undefined") {
						if(aw2.arrayContains(arguments[arg], loggingEnabled) == -1) {
							loggingEnabled.push(arguments[arg]);
						}
					}
				}
			}
		};

		/**
		* disables one or more specified logging types.
		*
		* @method disable
		* @param {String} logType* logging type(s)
		* @return {undefined}
		**/
		this.disable = function() {
			for(var arg in arguments) {
				if(aw2.isArray(arguments[arg])) {
					self.disable.apply(this, arguments[arg]);
				} else {
					if(typeof(arguments[arg]) == "string" && typeof(invokeLog[arguments[arg]]) != "undefined") {
						var findLog = aw2.arrayContains(arguments[arg], loggingEnabled);

						if(findLog >= 0) {
							loggingEnabled.splice(findLog, 1);
						}
					}
				}
			}
		};

		/**
		* returns the types of logging currently being used.
		*
		* @method isLogging
		* @return {undefined}
		**/
		this.isLogging = function() {
			return loggingEnabled;
		};

		/**
		* clears the internal log storage.
		*
		* @method clear
		* @return {undefined}
		**/
		this.clear = function() {
			internalLog.length = 0;
		};

		/**
		* returns the internal logging array.
		*
		* @method get
		* @return {Array} the internal logs currently being stored
		**/
		this.get = function() {
			return internalLog;
		};

		/**
		* the basic log function which will perform logging of inputs
		*
		* @method log
		* @param {any} data* data to be logged
		* @return {undefined}
		**/
		var log = function() {
			for(var thisLog in loggingEnabled) {
				invokeLog[loggingEnabled[thisLog]].apply(this, arguments);
			}
		};

		return aw2.extend(log, this);
	}

	/**
	* Container for Log plugin functions to be made available.
	*
	* @property $aw2.log
	* @type {Object}
	**/
	aw2.extend({
		log: new Log()
	});
})();
