/*
 * jquery.jqmts
 * https://github.com/commadelimited/jQuery-Mobile-Tiny-Sort
 * Version: 0.5
 *
 * Copyright (c) 2014 andy matthews
 * Licensed under the MIT license.
 * Packed with: http://jsutility.pjoneil.net/
 */
(function($, window) {

	"use strict";

	var defaults = {
		useNativeMenu: false,
		attributes: {},
		showCounts: true,
		className: 'jqmts'
	},
	buildMenu = function($el, options) {
		// build out the select menu
		var $select = $('<li></li>').addClass(options.className)
						.prepend(
							$('<select></select>')
							// .data('native-menu',options.useNativeMenu)
							.attr(
								{
									'id': $el.attr('id') + '-sort',
									'name': $el.attr('id') + '-sort',
									'data-native-menu': options.useNativeMenu
								}
							)
							.html(function(){
								var str = [];
								for (var o in options.attributes) {
									str.push('<option value="' + o + '">' + options.attributes[o] + '</option>');
								}
								return str.join('');
							}).on('change', function(e){
								$('li:not(.' + options.className + ')',$el).tsort({data: 'sort-' + e.currentTarget.value});
							})
						);
		// insert it
		$el.prepend( $select ).trigger('create').listview('refresh');
	},
	compileKeys = function($el, options) {
		var $list = $('li:not(.' + options.className + ')',$el);
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
			var addHeader = function(i,old){
					var value = $(this).val();
					return old + ' (' + Object.keys(scope[s]).length + ')';
				};
			for(var s in scope.sortKeys) {
				var prep = s.toLowerCase().replace('sort','');
				$('option[value=' + prep + ']',$dropdown).text(addHeader);
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
		destroy: function(){
			// remove header row
			$(this).find('.' + defaults.className).remove();
		}
	};

	$.fn.jqmts = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		}
	};
})(jQuery, window);;/*
 * jquery.jqmts
 * https://github.com/commadelimited/jQuery-Mobile-Tiny-Sort
 * Version: 0.5
 *
 * Copyright (c) 2012 andy matthews
 * Licensed under the MIT license.
 * Packed with: http://jsutility.pjoneil.net/
 */
(function($,window){"use strict";var defaults={useNativeMenu:false,attributes:{},showCounts:true,className:'jqmts'},buildMenu=function($el,options){var $select=$('<li></li>').addClass(options.className).prepend($('<select></select>').attr({'id':$el.attr('id')+'-sort'}).data('native-menu',options.useNativeMenu).html(function(){var str=[];for(var o in options.attributes){str.push('<option value="'+o+'">'+options.attributes[o]+'</option>')}return str.join('')}).on('change',function(e){$('li:not(.'+options.className+')',$el).tsort({data:'sort-'+e.currentTarget.value})}));$el.prepend($select).trigger('create').listview('refresh')},compileKeys=function($el,options){var $list=$('li:not(.'+options.className+')',$el),$dropdown=$('#'+$el.attr('id')+'-sort'),scope=window;$list.each(function(i,el){var $li=$(this);for(var d in $li.data()){if(d.indexOf('sort')>=0){if(!scope[d]){scope[d]={};if(typeof scope.sortKeys=="undefined")scope.sortKeys={};scope.sortKeys[d]=d}else{scope[d][$li.data(d)]=$li.data(d)}}}});if(typeof scope.sortKeys!="undefined"){for(var s in scope.sortKeys){var prep=s.toLowerCase().replace('sort','');$('option[value='+prep+']',$dropdown).text(function(i,old){var value=$(this).val();return old+' ('+Object.keys(scope[s]).length+')'})}$dropdown.selectmenu('refresh')}},methods={init:function(options){if(typeof window.jQuery.tinysort!='object'){window.alert('TinySort is not defined.\nhttp://tinysort.sjeiti.com/');return}this.jqmData("jqmts",$.extend({},defaults,options));buildMenu(this,this.jqmData("jqmts"));if(options.showCounts)compileKeys(this,this.jqmData("jqmts"));return this}};$.fn.jqmts=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1))}else if(typeof method==='object'||!method){return methods.init.apply(this,arguments)}}})(jQuery,window);;(function(b){var o=!1,d=null,u=parseFloat,j=String.fromCharCode,q=Math.min,l=/(-?\d+\.?\d*)$/g,g,a=[],h,m,t=9472,f={},c;if(!Array.indexOf){Array.prototype.indexOf=function(w){for(var v=0,s=this.length;v<s;v++){if(this[v]==w){return v}}return -1}}for(var p=32,k=j(p),r=255;p<r;p++,k=j(p).toLowerCase()){if(a.indexOf(k)!==-1){a.push(k)}}a.sort();b.tinysort={id:"TinySort",version:"1.3.27",copyright:"Copyright (c) 2008-2012 Ron Valstar",uri:"http://tinysort.sjeiti.com/",licenced:{MIT:"http://www.opensource.org/licenses/mit-license.php",GPL:"http://www.gnu.org/licenses/gpl.html"},defaults:{order:"asc",attr:d,data:d,useVal:o,place:"start",returns:o,cases:o,forceStrings:o,sortFunction:d,charOrder:g}};b.fn.extend({tinysort:function(V,L){if(V&&typeof(V)!="string"){L=V;V=d}var T=b.extend({},b.tinysort.defaults,L),v,Q=this,z=b(this).length,ae={},W=!(!V||V==""),H=!(T.attr===d||T.attr==""),ah=T.data!==d,J=W&&V[0]==":",C=J?Q.filter(V):Q,F=T.sortFunction,s=T.order=="asc"?1:-1,P=[];if(T.charOrder!=g){g=T.charOrder;if(!T.charOrder){m=false;t=9472;f={};c=h=d}else{h=a.slice(0);m=false;for(var S=[],B=function(i,ai){S.push(ai);f[T.cases?i:i.toLowerCase()]=ai},N="",X="z",aa=g.length,ac,Z,ad=0;ad<aa;ad++){var x=g[ad],ab=x.charCodeAt(),I=ab>96&&ab<123;if(!I){if(x=="["){var D=S.length,M=D?S[D-1]:X,w=g.substr(ad+1).match(/[^\]]*/)[0],R=w.match(/{[^}]*}/g);if(R){for(ac=0,Z=R.length;ac<Z;ac++){var O=R[ac];ad+=O.length;w=w.replace(O,"");B(O.replace(/[{}]/g,""),M);m=true}}for(ac=0,Z=w.length;ac<Z;ac++){B(M,w[ac])}ad+=w.length+1}else{if(x=="{"){var G=g.substr(ad+1).match(/[^}]*/)[0];B(G,j(t++));ad+=G.length+1;m=true}else{S.push(x)}}}if(S.length&&(I||ad===aa-1)){var E=S.join("");N+=E;b.each(E,function(i,ai){h.splice(h.indexOf(ai),1)});var A=S.slice(0);A.splice(0,0,h.indexOf(X)+1,0);Array.prototype.splice.apply(h,A);S.length=0}if(ad+1===aa){c=new RegExp("["+N+"]","gi")}else{if(I){X=x}}}}}if(!F){F=T.order=="rand"?function(){return Math.random()<0.5?1:-1}:function(av,at){var au=o,am=!T.cases?n(av.s):av.s,ak=!T.cases?n(at.s):at.s;if(!T.forceStrings){var aj=am&&am.match(l),aw=ak&&ak.match(l);if(aj&&aw){var ar=am.substr(0,am.length-aj[0].length),aq=ak.substr(0,ak.length-aw[0].length);if(ar==aq){au=!o;am=u(aj[0]);ak=u(aw[0])}}}var ai=s*(am<ak?-1:(am>ak?1:0));if(!au&&T.charOrder){if(m){for(var ax in f){var al=f[ax];am=am.replace(ax,al);ak=ak.replace(ax,al)}}if(am.match(c)!==d||ak.match(c)!==d){for(var ap=0,ao=q(am.length,ak.length);ap<ao;ap++){var an=h.indexOf(am[ap]),i=h.indexOf(ak[ap]);if(ai=s*(an<i?-1:(an>i?1:0))){break}}}}return ai}}Q.each(function(ak,al){var am=b(al),ai=W?(J?C.filter(al):am.find(V)):am,an=ah?""+ai.data(T.data):(H?ai.attr(T.attr):(T.useVal?ai.val():ai.text())),aj=am.parent();if(!ae[aj]){ae[aj]={s:[],n:[]}}if(ai.length>0){ae[aj].s.push({s:an,e:am,n:ak})}else{ae[aj].n.push({e:am,n:ak})}});for(v in ae){ae[v].s.sort(F)}for(v in ae){var ag=ae[v],K=[],Y=z,af=[0,0],ad;switch(T.place){case"first":b.each(ag.s,function(ai,aj){Y=q(Y,aj.n)});break;case"org":b.each(ag.s,function(ai,aj){K.push(aj.n)});break;case"end":Y=ag.n.length;break;default:Y=0}for(ad=0;ad<z;ad++){var y=e(K,ad)?!o:ad>=Y&&ad<Y+ag.s.length,U=(y?ag.s:ag.n)[af[y?0:1]].e;U.parent().append(U);if(y||!T.returns){P.push(U.get(0))}af[y?0:1]++}}Q.length=0;Array.prototype.push.apply(Q,P);return Q}});function n(i){return i&&i.toLowerCase?i.toLowerCase():i}function e(v,x){for(var w=0,s=v.length;w<s;w++){if(v[w]==x){return !o}}return o}b.fn.TinySort=b.fn.Tinysort=b.fn.tsort=b.fn.tinysort})(jQuery);