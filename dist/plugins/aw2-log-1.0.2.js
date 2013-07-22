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

/**
*
* aw2 library
* server log plugin
*
* @module aw2.log.server
**/
(function() {
	if(typeof(aw2) == "undefined") {
		console.log("aw2.log.server[error]: requires aw2 core library!");
		return false;
	}

	if(typeof(aw2.log) == "undefined") {
		console.log("aw2.log.server[error]: requires aw2.log plugin!");
		return false;
	}

	/**
	* object providing Logging to a remote resource
	*
	* @class ServerLog
	* @constructor
	**/
	function ServerLog() {
		var self = this;
		var host = "";

		/**
		* sets the host url to your logging end point
		*
		* @method setHost
		* @param {String} _host set a logging server url
		* @return {undefined}
		**/
		this.setHost = function(_host) {
			host = _host;
		};

		/**
		* the basic server log function which will perform logging of inputs
		*
		* @method server
		* @param {Object} data* data to be logged
		* @return {undefined}
		*
		* @example
		*		$aw2.log.server({ key : 'Value'});
		**/
		var server = function() {
			var logData = (arguments.length == 1) ? arguments[0] : arguments;
			var browserSize = window.innerWidth ? window.innerWidth + 'x' + window.innerHeight : false;
			var screenSize = screen.width ? screen.width + 'x' + screen.height : false;

			logData.client = {
				userAgent : navigator.userAgent,
				dateTime : new Date(),
				browserSize : browserSize,
				screenSize: screenSize,
				location : window.location.href
			}

			aw2.callJSON.apply(this, [host, logData]);
		};

		return aw2.extend(server, this);
	}

	/**
	* Container for ServerLog plugin functions to be made available.
	*
	* @property $aw2.log.server
	* @type {Object}
	**/
	aw2.log.server = new ServerLog();
})();
