# jQuery Mobile Tiny Sort

A jQuery Mobile implemention of TinySort

## Example
View a simple [demo of jQuery Mobile Tiny Sort](http://andymatthews.net/code/jqm-tinysort/)

## Quick start

Clone the git repo - `git clone git@github.com:commadelimited/jquery.jqmts.js.git` - or [download it](https://github.com/commadelimited/jquery.jqmts.js/zipball/master)

## Usage & Documentation

jQuery Mobile Tiny Sort uses data attributes to sort data in your listviews. Every list item should have the same set of attributes, but the value can be whatever you choose. In the initialization code you provide a list of attributes along with their human readable name. The example uses firstname ("First Name"), and lastname ("Last Name"). The setup for firstname/lastname sorting would look like this.

	$('#sortlist').jqmts({
		useNativeMenu: false, // use standard select menu, or enhanced
		showCounts: true, // shows a count of unique listview values or not
		className: 'jqmts', // allows the addition of an optional classname
		attributes: {firstname: 'First Name', lastname: 'Last Name'}
	});

	<ul data-role="listview" id="sortlist">
		<li data-sort-firstname="alana" data-sort-lastname="Midgley">Alana Midgley</li>
		<li data-sort-firstname="lonnie" data-sort-lastname="Wuest">Jaime Wuest</li>
	</ul>

## Contributing

You are invited to contribute code and suggestions to this project. The more the merrier.

## Project Info

* Source: https://github.com/commadelimited/jquery.jqmts.js
* Twitter: [http://twitter.com/commadelimited](http://twitter.com/commadelimited)

### 3rd party libraries required:

* jQuery: MIT/GPL license
* jQuery Mobile: MIT/GPL license

### Custom bits:

Public domain
