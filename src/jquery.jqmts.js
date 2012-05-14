/*
 * jquery.jqmts
 * https://github.com/commadelimited/jquery.jqmts.js
 *
 * Copyright (c) 2012 andy matthews
 * Licensed under the MIT license.
 */
(function($) {

	"use strict";

	var defaults = {
		useNativeMenu: false,
		attributes: {}
	},
	buildMenu = function($el, options) {
		// build out the select menu
		var $select = 	$('<li></li>').addClass('jqmts')
						.prepend(
							$('<select></select>').attr(
								{'id': $el.attr('id') + '-sort'}
							).html(function(){
								var str = [];
								for (var o in options.attributes) {
									str.push('<option value="' + o + '">' + options.attributes[o] + '</option>');
								}
								return str.join('');
							}).on('change', function(e){
								console.log(e.currentTarget.value);
								$('li:not(.jqmts)',$el).tsort({data: 'sort-' + e.currentTarget.value});
							})
						);
		// insert it
		$el.prepend( $select ).trigger('create');
	},
	compileKeys = function($el, options) {
		var $list = $('li:not(.jqmts)',$el);
		var $dropdown = $('#' + $el.attr('id') + '-sort');

		// populate counts for the sort dropdown
		$list.each(function(i,el){
			var $li = $(this);
			for (var d in $li.data()) {
				// we only want items prepended with "sort"
				if (d.indexOf('sort') >= 0) {
					// make sure the item doesn't already exist
					if (!window[d]) {
						// if it doesn't, then create it
						window[d] = {};
						// make sure that the sortKeys variable exists
						if (typeof window.sortKeys == "undefined") window.sortKeys = {};
						// then populate it
						window.sortKeys[d] = d;
					} else {
						// if it does then populate it
						window[d][$li.data(d)] = $li.data(d);
					}
				}
			}
		});

		// if there are no stream items then sortKeys is undefined
		if (typeof window.sortKeys != "undefined") {
			for(var s in window.sortKeys) {
				var prep = s.toLowerCase().replace('sort','');
				$('option[value=' + prep + ']',$dropdown).text(function(i,old){
					console.log(' (' + Object.keys(window[s]).length + ')');
					var value = $(this).val();
					return old + ' (' + Object.keys(window[s]).length + ')';
				});
			}
			$dropdown.selectmenu('refresh');
		}
	},
	methods = {
		init: function(options) {
			this.jqmData("jqmts", $.extend({}, defaults, options));
			buildMenu(this,this.jqmData("jqmts"));
			compileKeys(this,this.jqmData("jqmts"));
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
			console.log('update method called');
		}
	};

	$.fn.jqmts = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods['init'].apply(this, arguments);
		}
	};

})(jQuery);
