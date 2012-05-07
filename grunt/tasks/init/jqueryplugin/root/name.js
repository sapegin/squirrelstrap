/**
 * {%= name %}
 *
 * Makes bla bla.
 *
 * @version 0.0.0
 * @requires jQuery
 * @author {%= author_name %}
 * @copyright {%= grunt.template.today('yyyy') %} {%= author_name %}, {%= author_url %}
 * @license MIT
 */

(function (factory) {  // Try to register as an anonymous AMD module
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {

$.fn.{%= method %} = function(options) {
	options = $.extend({}, $.fn.{%= method %}.defaults, options);

	return this.each(function() {
		// var elem = $(this);
		new {%= cls %}($(this), options);
	});
};

$.fn.{%= method %}.defaults = {
};

function {%= cls %}(elem, options) {
	this.elem = elem;
	this.options = options;

	/* Magic begins here */
}

{%= cls %}.prototype = {
};

}));