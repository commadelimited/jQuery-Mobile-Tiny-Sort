/*
 * jquery.jqmts
 * https://github.com/commadelimited/jquery.jqmts.js
 *
 * Copyright (c) 2012 andy matthews
 * Licensed under the MIT license.
 */

(function($) {

	// Collection method.
	$.fn.awesome = function() {
		return this.each(function() {
			$(this).html('awesome');
		});
	};

	// Static method.
	$.awesome = function() {
		return 'awesome';
	};

	// Custom selector.
	$.expr[':'].awesome = function(elem) {
		return elem.textContent.indexOf('awesome') >= 0;
	};

}(jQuery));
