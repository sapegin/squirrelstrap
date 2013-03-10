# gruntjs.com

module.exports = (grunt) ->
	"use strict"

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks)

	{% if (js || stylus) { %}debug = !!grunt.option("debug")
	{% } %}
	# Project configuration
	grunt.initConfig
{%= config %}

	# Project tasks
	grunt.registerTask "default", {%= defaults %}
	grunt.registerTask "deploy", {%= deploy %}{% if (sweet) { %}
	grunt.registerTask "serve", ["connect", "watch"]{% } %}
