/**
How to build this project?

1. Install Grunt:
  npm install grunt -g{% if (npms) { %}
  mkdir node_modules
  npm install {%= npms %}{% } %}

2. Build:
  grunt
*/

/*global module:false*/
module.exports = function(grunt) {
	'use strict';

	// Project configuration
	grunt.initConfig({%= config %});
	{% if (stylus) { %}
	grunt.loadNpmTasks('grunt-stylus');{% } %}{% if (sweet) { %}
	grunt.loadNpmTasks('grunt-sweet');{% } %}

	// Default task
	grunt.registerTask('default', '{%= defaults %}');{% if (sweet) { %}
	grunt.registerTask('serve', 'server watch');{% } %}
};
