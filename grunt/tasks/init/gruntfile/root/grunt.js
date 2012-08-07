/**
How to build this project?

1. Install Grunt:
  npm install grunt -g{% if (stylus) { %}
  mkdir node_modules
  npm install grunt-stylus{% } %}

2. Build:
  grunt
*/

/*global module:false*/
module.exports = function(grunt) {
	'use strict';

	// Project configuration
	grunt.initConfig({{% if (js) { if (package_json) { %}
		pkg: '<json:package.json>',
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
		},{% } else { %}
		meta: {{% if (library) { %}{% if (!package_json) { %}
			version: '0.0.0',
			{% } %}banner: "/*! {%= library %} v{%= package_json ? '<%= pkg.version %>' : '<%= meta.version %>' %} - " +
					"© {%= author_name %}, {%= author_url %}, <%= grunt.template.today('yyyy') %> - " +
					"Licensed MIT */"{% } else { %}
			banner: "/*! Author: {%= author_name %}, {%= author_url %}, <%= grunt.template.today('yyyy') %> */"{% } %}
		},{% } } %}{% if (js) { %}
		lint: {
			files: [
				'grunt.js',
				'js/*.js',
				'{%= lib_dir %}/**/*.js'
			]
		},
		concat: {
			dist: {
				src: [
					'js/utils.js',
					'js/main.js'
				],
				dest: 'build/{%= file_name %}.js'
			}
		},
		min: {
			dist: {
				src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
				dest: 'build/{%= file_name %}.min.js'
			}
		},{% } %}{% if (stylus) { %}
		stylus: {
			compile: {
				files: {
					'{%= wordpress ? "style.css" : "build/styles.css" %}': 'styles/index.styl'
				},
				options: {
					'compress': true,
					'include css': true,
					'paths': ['styles']
				}
			}
		},{% } %}{% if (stylus) { %}
		watch: {{% if (stylus) { %}
			stylus: {
				files: 'styles/**',
				tasks: 'stylus'
			}{% } %}
		},{% } %}{% if (js) { %}
		jshint: {
			options: {
				browser: true,
				white: false,
				smarttabs: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				undef: true{% if (jquery) { %},
				jquery: true{% } %}
			},
			globals: {
				Modernizr: true{% if (jquery) { %},
				jQuery: true
			{% } %}}
		},
		uglify: {}{% } %}
	});
	{% if (stylus) { %}
	grunt.loadNpmTasks('grunt-stylus');{% } %}

	// Default task
	grunt.registerTask('default', '{%= stylus ? " stylus" : "" %}{%= js ? " lint concat min" : "" %}');

};