/**
How to build this project?

1. Install prerequisites:
   npm install grunt -g{% if (npms) { %}; npm install {%= npms %}{% } %}

2. Build:
   grunt
*/

/*jshint node:true*/
module.exports = function(grunt) {
	'use strict';

	// Project configuration
	grunt.initConfig({%= config %});
	{% if (stylus) { %}
	grunt.loadNpmTasks('grunt-stylus');{% } %}{% if (sweet) { %}
	grunt.loadNpmTasks('grunt-sweet');{% } %}{% if (fingerprint) { %}
	grunt.loadNpmTasks('grunt-fingerprint');{% } %}{% if (imgo) { %}
	grunt.loadNpmTasks('grunt-imgo');{% } %}

	// Project tasks
	grunt.registerTask('default', '{%= defaults %}');
	grunt.registerTask('deploy', '{%= deploy %}');{% if (sweet) { %}
	grunt.registerTask('serve', 'server watch');{% } %}
};
