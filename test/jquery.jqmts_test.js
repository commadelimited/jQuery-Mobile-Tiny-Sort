/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

    module('jQueryMobileTinySort', {
        setup: function() {
            // pass
        },
        teardown: function() {
            $('#sortlist').jqmts('destroy');
        }
    });

    test('is chainable', function() {
        // test create the thing
        ok($('#sortlist').jqmts({
            useNativeMenu: true,
            showCounts: true,
            attributes: {firstname: 'First Name', lastname: 'Last Name'}
        }).addClass('mySortList'), 'can be chained');
        equal($('#sortlist').hasClass('mySortList'), true, 'class was added correctly from chaining');
    });

    test('header is added', function() {
        // create the thing
        $('#sortlist').jqmts({
            useNativeMenu: true,
            showCounts: true,
            attributes: {firstname: 'First Name', lastname: 'Last Name'}
        });

        equal($('#sortlist').find('.jqmts').length, 1, 'header row is present');
    });

    test('initial sort order is maintained', function() {
        // create the thing
        $('#sortlist').jqmts({
            useNativeMenu: true,
            showCounts: true,
            attributes: {firstname: 'First Name', lastname: 'Last Name'}
        });

        // first li, that is not 'jqmts' is "Alana Midgley"
        equal( $('#sortlist').find('li').not(".jqmts").get(0).innerHTML, "Alana Midgley", 'initial sort order is maintained');
    });

    test('updated sort order lists correct value first', function() {
        // create the thing
        $('#sortlist').jqmts({
            useNativeMenu: true,
            showCounts: true,
            attributes: {firstname: 'First Name', lastname: 'Last Name'}
        });

        // change the value, and the sort order
        $('#sortlist-sort').val('lastname').trigger('change');
        equal( $('#sortlist').find('li').not(".jqmts").get(0).innerHTML, "Sofia Bernett", "updated sort order lists correct value first");
    });

}(jQuery));
