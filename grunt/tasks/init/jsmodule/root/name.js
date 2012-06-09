/* Author: {%= author_name %}, {%= author_url %}, {%= grunt.template.today('yyyy') %} */

/*global define:false*/
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