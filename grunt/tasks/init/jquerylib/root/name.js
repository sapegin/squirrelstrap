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

/*jshint browser:true, jquery:true, white:false, smarttabs:true, eqeqeq:true,
         immed:true, latedef:false, newcap:true, undef:true */
/*global define:false */
(function(factory) {  // Try to register as an anonymous AMD module
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}(function($) {
	'use strict';

	function {%= cls %}(container, options) {
		options = $.extend({}, {%= cls %}.defaults, options);

		this.container = container;
		this.options = options;

		this.init();
	}

	{%= cls %}.defaults = {
	};

	{%= cls %}.prototype = {
		init: function() {
			/* Magic begins here */
		}
	};

	window.{%= cls %} = {%= cls %};

}));