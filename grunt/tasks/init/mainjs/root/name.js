/* Author: {%= author_name %}, {%= author_url %}, {%= grunt.template.today('yyyy') %} */

/*jshint browser:true, jquery:true, white:false, smarttabs:true, eqeqeq:true,
         immed:true, latedef:true, newcap:true, undef:true */
{% if (amd === 'yes') { %}/*global jQuery:false, define:false*/
(function (factory) {  // Try to register as an anonymous AMD module
	if (typeof define === 'function' && define.amd) {
		define([
			'jquery',
			'utils'
		], factory);
	} else {
		factory(jQuery, window.utils);
	}
}{% } else { %}
/*global jQuery:false, utils:false */{% } %}(function ($) {
	'use strict';

	utils.initComponents({
		pony: function(elem) {
			// $(elem)
		}
	});

}){% if (amd === 'yes') { %});{% } else {%}(jQuery);{% } %}