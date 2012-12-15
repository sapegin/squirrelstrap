/**
 * Gruntfile template for Grunt
 *
 * @author Artem Sapegin, http://sapegin.me
 */

exports.description = 'Creates a Gruntfile.coffee gruntfile.';
exports.warnOn = ['grunt.js', 'Gruntfile.js', 'Gruntfile.coffee'];

exports.template = function(grunt, init, done) {
	'use strict';

	var fs = require('fs');
	var utils = require('../_src/utils').init(grunt, init);

	init.process({}, [
		// Prompt for these values
		{
			name: 'js',
			message: 'JavaScript?',
			'default': 'Y/n',
			warning: 'Yes: uglify + concat tasks. No: nothing to see here.'
		},
		{
			name: 'stylus',
			message: 'Stylus?',
			'default': 'Y/n',
			warning: 'Yes: stylus task. No: nothing to see here.'
		},
		{
			name: 'sweet',
			message: 'Sweet?',
			'default': 'y/N',
			warning: 'Yes: sweet task. No: nothing to see here.'
		},
		{
			name: 'fingerprint',
			message: 'Fingerprint?',
			'default': 'y/N',
			warning: 'Yes: fingerprint task. No: nothing to see here.'
		},
		{
			name: 'imgo',
			message: 'Optimize images?',
			'default': 'y/N',
			warning: 'Yes: imgo task. No: nothing to see here.'
		},
		{
			name: 'compress',
			message: 'Archive task?',
			'default': 'y/N',
			warning: 'Yes: compress task. No: nothing to see here.'
		},
		{
			name: 'library',
			message: 'Library name?',
			'default': 'none',
			warning: 'Name: creates big library banner. None: small copyright banner.'
		}
	], function(err, props) {
		grunt.util._.defaults(props, init.defaults);

		var library = props.library;
		var project_name = library || utils.projectName();
		var stylus = props.stylus = /y/i.test(props.stylus);
		var sweet = props.sweet = !/n/i.test(props.sweet);
		var fingerprint = props.fingerprint = !/n/i.test(props.fingerprint);
		var imgo = props.imgo = !/n/i.test(props.imgo);
		var compress = props.compress = !/n/i.test(props.compress);
		var js = /y/i.test(props.js);
		var package_json = fs.existsSync('package.json') && grunt.file.readJSON('package.json');
		var wordpress = utils.isWordpressTheme();
		var js_script = package_json ? '<%= pkg.name %>' : 'scripts';

		// Guess at some directories, if they exist
		var htdocs_dir = utils.preferDir(['htdocs', 'www']);
		var htdocs_prefix = htdocs_dir ? htdocs_dir + '/' : '';
		var lib_dir = utils.preferDir([htdocs_prefix + 'js/mylibs', htdocs_prefix + 'lib', htdocs_prefix + 'src']);
		var images_dir = utils.preferDir(['images', 'img', 'i']);

		// JS libraries
		props.jquery = grunt.file.expandFiles('**/jquery*.js').length > 0;

		// Config
		var cfg = {};

		if (js) {
			if (library) {
				if (package_json) {
					cfg.pkg = utils.JS('grunt.file.readJSON("package.json")');
					cfg.banner = utils.JS([
						'"/*! <%= pkg.title || pkg.name %> v<%= pkg.version %>"\n',
						'" * © <%= pkg.author.name %>, <%= pkg.homepage ? pkg.homepage : "" %>, "',
							'"<%= grunt.template.today(\'yyyy\') %> - "',
							'" Licensed <%= _.pluck(pkg.licenses, \'type\').join(\', \') %> */"'
					].join(',\n'));
				}
				else {
					cfg.version = '0.0.0';
					cfg.banner = utils.JS([
						'"/*! ' + library + ' v<%= version %>' + '"\n',
						'" * © ' + props.author_name + ', ' + props.author_url + ', <%= grunt.template.today(\'yyyy\') %> - ' +
							'Licensed MIT */"'
					].join(',\n'));
				}
			}
			else {
				cfg.banner = '/*! Author: ' + props.author_name + ', ' + props.author_url + ', ' +
					"<%= grunt.template.today('yyyy') %> */";
			}

			cfg.jshint = {
				options: {
					jshintrc: '.jshintrc'
				},
				files: []
			};
			if (library) {
				cfg.jshint.files.push(lib_dir + '/*.js');
			}
			else {
				cfg.jshint.files.push('js/mylibs/*.js', htdocs_prefix + 'js/main.js');
			}

			cfg.concat = {
				main: {
					src: [
						htdocs_prefix + 'js/utils.js',
						htdocs_prefix + 'blocks/*/*.js',
						htdocs_prefix + 'js/main.js'
					],
					dest: htdocs_prefix + 'build/' + js_script + '.js'
				}
			};

			cfg.uglify = {
				main: {
					files: {
						'<%= concat.main.dest %>': '<%= concat.main.dest %>'
					}
				}
			};
		}

		if (stylus) {
			cfg.stylus = {
				compile: {
					files: {},
					options: {
						'include css': true,
						'paths': ['blocks']
					}
				}
			};

			cfg.stylus.compile.files[wordpress ? 'style.css' : htdocs_prefix + 'build/styles.css'] = 'styles/index.styl';
		}

		if (sweet) {
			cfg.sweet = {
				content_dir: 'content',
				publish_dir: htdocs_dir || 'htdocs',
				templates_dir: 'templates',
				default_template_id: 'template',
				langs: ['ru', 'en'],
				url_prefixes: {
					ru: '/ru/',
					en: '/'
				},
				uri_prefixes: {
					ru: '/ru/',
					en: '/'
				},
				files: {
					css: {
						path: htdocs_prefix + 'build/styles.css',
						href: '/build/styles.css?{version}'
					},
					js: {
						path: htdocs_prefix + 'build/scripts.js',
						href: '/build/scripts.js?{version}'
					}
				}
			};
		}

		if (fingerprint) {
			cfg.fingerprint = {
				assets: {
					files: [
						'build/*.js',
						'build/*.css'
					],
					filename: 'build/fingerprint.txt'
				}
			};

			if (wordpress) {
				cfg.fingerprint.assets.filename = 'fingerprint.php';
				cfg.fingerprint.assets.template = "<?php define('V', '<%= fingerprint %>'); ?>";
			}
		}

		if (imgo) {
			cfg.imgo = {
				images: {
					files: htdocs_prefix + (images_dir ? images_dir : 'images') + '/*',
					skip: utils.JS('require("os").platform() == "win32"')
				}
			};
		}

		if (compress) {
			cfg.compress = {
				pack: {
					files: {}
				}
			};
			cfg.compress.pack.files['.zip'] = [
				'{styles,js,images,media,build}/**/*',
				'*.{html,coffee}'
			];
		}

		if (stylus || sweet || js) {
			cfg.watch = {};
			if (js) {
				cfg.watch.concat = {
					files: '<%= concat.main.src %>',
					tasks: 'concat'
				};
			}
			if (stylus) {
				cfg.watch.stylus = {
					files: 'styles/**',
					tasks: 'stylus'
				};
			}
			if (sweet) {
				cfg.watch.sweet = {
					files: [
						'<%= sweet.content_dir %>/**',
						'<%= sweet.templates_dir %>/**'
					],
					tasks: 'sweet'
				};
			}
		}

		if (sweet) {
			cfg.connect = {
				port: 8000,
				base: '<%= sweet.publish_dir %>'
			};
		}

		props.config = utils.jsToCoffeString(cfg, 2);

		// Default task
		var defaults = [];
		if (imgo) defaults.push('imgo');
		if (stylus) defaults.push('stylus');
		if (js) defaults.push('jshint', 'concat', 'uglify');
		if (sweet) defaults.push('sweet');
		if (fingerprint) defaults.push('fingerprint');
		props.defaults = utils.arrayToString(defaults);

		// Deploy task
		utils.removeFromArray(defaults, 'jshint');
		utils.removeFromArray(defaults, 'imgo');
		props.deploy = utils.arrayToString(defaults);

		// Files to copy (and process).
		var files = init.filesToCopy(props);
		delete files['Gruntfile.js'];

		// Actually copy (and process) files
		init.copyAndProcess(files, props);

		utils.writeEditorConfig();
		if (js) utils.writeJsHintRc();

		// package.json
		if (!package_json) package_json = {};
		if (!package_json.name) package_json.name = project_name;
		if (!package_json.version) package_json.version = '0.0.0';
		if (!package_json.devDependencies) package_json.devDependencies = {};
		init.writePackageJSON('package.json', package_json);

		// Install NPM packages
		var npms = ['grunt'];
		if (js) npms.push('grunt-contrib-concat', 'grunt-contrib-uglify', 'grunt-contrib-jshint');
		if (stylus || sweet || js) npms.push('grunt-contrib-watch');
		if (stylus) npms.push('grunt-contrib-stylus');
		if (sweet) npms.push('grunt-contrib-connect', 'grunt-sweet');
		if (imgo) npms.push('grunt-contrib-connect', 'grunt-sweet');

		var args = ['install'];
		Array.prototype.push.apply(args, npms);
		args.push('--save-dev');
		grunt.log.writeln();
		grunt.log.write('Installing NPM packages...');
		grunt.util.spawn({
			cmd: 'npm',
			args: args
		}, function(err, result, code) {
			if (err) {
				grunt.log.writeln();
				grunt.fail.warn(result.stderr);
			}
			grunt.log.ok();
			done();
		});

	});

};
