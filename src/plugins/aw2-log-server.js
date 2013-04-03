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
