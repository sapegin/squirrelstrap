/* Author: {%= author_name %}, {%= author_url %}, {%= grunt.template.today('yyyy') %} */

/*jshint browser:true, jquery:true, white:false, smarttabs:true */
/*global jQuery:false, define:false*/
(function (factory) {  // Try to register as an anonymous AMD module
	if (typeof define === 'function' && define.amd) {
		define([
			'jquery'
		], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {
	'use strict';


}));