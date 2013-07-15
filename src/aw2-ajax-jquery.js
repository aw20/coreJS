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
