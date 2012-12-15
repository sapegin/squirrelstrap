# gruntjs.com

#jshint node:true
module.exports = (grunt) ->
	"use strict"

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks)

	# Project configuration
	grunt.initConfig
{%= config %}

	# Project tasks
	grunt.registerTask "default", {%= defaults %}
	grunt.registerTask "deploy", {%= deploy %}{% if (sweet) { %}
	grunt.registerTask "serve", ["connect", "watch"]{% } %}
