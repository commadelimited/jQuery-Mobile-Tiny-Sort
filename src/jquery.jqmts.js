/*
 * jquery.jqmts
 * https://github.com/commadelimited/jquery.jqmts.js
 *
 * Copyright (c) 2012 andy matthews
 * Licensed under the MIT license.
 * Packed with: http://jsutility.pjoneil.net/
 */
(function($, window) {

	"use strict";

	var defaults = {
		useNativeMenu: false,
		attributes: {},
		showCounts: true
	},
	buildMenu = function($el, options) {
		// build out the select menu
		var $select = $('<li></li>').addClass('jqmts')
						.prepend(
							$('<select></select>')
							.attr(
								{'id': $el.attr('id') + '-sort'}
							)
							.data('native-menu',options.useNativeMenu)
							.html(function(){
								var str = [];
								for (var o in options.attributes) {
									str.push('<option value="' + o + '">' + options.attributes[o] + '</option>');
								}
								return str.join('');
							}).on('change', function(e){
								$('li:not(.jqmts)',$el).tsort({data: 'sort-' + e.currentTarget.value});
							})
						);
		// insert it
		$el.prepend( $select ).trigger('create').listview('refresh');
	},
	compileKeys = function($el, options) {
		var $list = $('li:not(.jqmts)',$el);
		var $dropdown = $('#' + $el.attr('id') + '-sort');
		var scope = window;

		// populate counts for the sort dropdown
		$list.each(function(i,el){
			var $li = $(this);
			for (var d in $li.data()) {
				// we only want items prepended with "sort"
				if (d.indexOf('sort') >= 0) {
					// make sure the item doesn't already exist
					if (!scope[d]) {
						// if it doesn't, then create it
						scope[d] = {};
						// make sure that the sortKeys variable exists
						if (typeof scope.sortKeys == "undefined") scope.sortKeys = {};
						// then populate it
						scope.sortKeys[d] = d;
					} else {
						// if it does then populate it
						scope[d][$li.data(d)] = $li.data(d);
					}
				}
			}
		});

		// if there are no stream items then sortKeys is undefined
		if (typeof scope.sortKeys != "undefined") {
			for(var s in scope.sortKeys) {
				var prep = s.toLowerCase().replace('sort','');
				$('option[value=' + prep + ']',$dropdown).text(function(i,old){
					var value = $(this).val();
					return old + ' (' + Object.keys(scope[s]).length + ')';
				});
			}
			$dropdown.selectmenu('refresh');
		}
	},
	methods = {
		init: function(options) {
			// enforce hard dependancy on TinySort
			if (typeof window.jQuery.tinysort != 'object') {
				window.alert('TinySort is not defined.\nhttp://tinysort.sjeiti.com/');
				return;
			}
			this.jqmData("jqmts", $.extend({}, defaults, options));
			buildMenu(this,this.jqmData("jqmts"));
			if (options.showCounts) compileKeys(this,this.jqmData("jqmts"));
			return this;
		},
		// Allow dynamic update of source and link
		update: function(options) {
			/*
			var settings = this.jqmData("jqmts");
			if (settings) {
				this.jqmData("jqmts", $.extend(settings, options));
			}
			return this;
			*/
			// console.log('update method called');
		}
	};

	$.fn.jqmts = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		}
	};

})(jQuery, window);
