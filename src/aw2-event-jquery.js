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
