/**
 * Gruntfile template for Grunt
 */

exports.description = 'Creates a grunt.js gruntfile.';
exports.warnOn = 'grunt.js';

// The actual init template.
/*jshint node:true, white:false, smarttabs:true, strict:false */
exports.template = function(grunt, init, done) {
	'use strict';

	var fs = require('fs');

	grunt.helper('prompt', {}, [
		// Prompt for these values
		{
			name: 'js',
			message: 'JavaScript?',
			default: 'Y/n',
			warning: 'Yes: min + concat tasks. No: nothing to see here.'
		},
		{
			name: 'stylus',
			message: 'Stylus?',
			default: 'Y/n',
			warning: 'Yes: stylus task. No: nothing to see here.'
		},
		{
			name: 'sweet',
			message: 'Sweet?',
			default: 'y/N',
			warning: 'Yes: sweet task. No: nothing to see here.'
		},
		{
			name: 'fingerprint',
			message: 'Fingerprint?',
			default: 'y/N',
			warning: 'Yes: fingerprint task. No: nothing to see here.'
		},
		{
			name: 'imgo',
			message: 'Optimize images?',
			default: 'y/N',
			warning: 'Yes: imgo task. No: nothing to see here.'
		},
		{
			name: 'library',
			message: 'Library name?',
			default: 'none',
			warning: 'Name: creates big library banner. None: small copyright banner.'
		}
	], function(err, props) {
		grunt.utils._.defaults(props, init.defaults);

		var stylus = props.stylus = /y/i.test(props.stylus);
		var sweet = props.sweet = !/n/i.test(props.sweet);
		var fingerprint = props.fingerprint = !/n/i.test(props.fingerprint);
		var imgo = props.imgo = !/n/i.test(props.imgo);
		var library = props.library;
		var js = /y/i.test(props.js);
		var package_json = fs.existsSync('package.json');
		var wordpress = fs.existsSync('header.php') && fs.existsSync('footer.php') && fs.existsSync('functions.php');
		var js_script = package_json ? '<%= pkg.name %>' : 'scripts';

		// Guess at some directories, if they exist
		var htdocs_dir = preferDir(['htdocs', 'www']);
		var htdocs_prefix = htdocs_dir ? htdocs_dir + '/' : '';
		var lib_dir = preferDir([htdocs_prefix + 'js/mylibs', htdocs_prefix + 'lib', htdocs_prefix + 'src']);
		var images_dir = preferDir(['images', 'img', 'i']);

		// JS libraries
		props.jquery = grunt.file.expandFiles('**/jquery*.js').length > 0;

		// Config
		var cfg = {};

		if (js) {
			if (package_json) {
				cfg.pkg = '<json:package.json>';
				cfg.meta = {
					banner: [
						'/*! <%= pkg.title || pkg.name %> v<%= pkg.version %>\n',
						' * © <%= pkg.author.name %>, <%= pkg.homepage ? pkg.homepage : "" %>, ',
							'<%= grunt.template.today("yyyy") %> - ',
							' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
					].join('')
				};
			}
			else {
				cfg.meta = {};
				if (library) {
					if (!package_json) {
						cfg.meta.version = '0.0.0';
					}
					cfg.meta.banner = [
						'/*! ', library, ' v' , (package_json ? '<%= pkg.version %>' : '<%= meta.version %>'), '\n',
						' * © ', props.author_name, ', ', props.author_url, ', <%= grunt.template.today("yyyy") %> - ',
							'Licensed MIT */'
					].join('');
				}
				else {
					cfg.meta.banner = [
						'/*! Author: ', props.author_name, ', ', props.author_url, ', ',
							'<%= grunt.template.today("yyyy") %> */'
					].join('');
				}
			}

			cfg.lint = {
				files: [
					'grunt.js'
				]
			};
			if (library) {
				cfg.lint.files.push(lib_dir + '/*.js');
			}
			else {
				cfg.lint.files.push('js/mylibs/*.js', htdocs_prefix + 'js/main.js');
			}

			cfg.concat = {
				dist: {
					src: [
						htdocs_prefix + 'js/utils.js',
						htdocs_prefix + 'blocks/*/*.js',
						htdocs_prefix + 'js/main.js'
					],
					dest: htdocs_prefix + 'build/' + js_script + '.js'
				}
			};

			cfg.min = {
				dist: {
					src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
					dest: htdocs_prefix + 'build/' + js_script + '.min.js'
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
						path: htdocs_prefix + 'build/scripts.min.js',
						href: '/build/scripts.min.js?{version}'
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
					skip: JS("require('os').platform() === 'win32'")
				}
			};
		}

		if (stylus || sweet || js) {
			cfg.watch = {};
			if (js) {
				cfg.watch.concat = {
					files: '<config:concat.dist.src>',
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
			cfg.server = {
				port: 8000,
				base: '<config:sweet.publish_dir>'
			};
		}

		if (js) {
			cfg.jshint = {
				options: {
					browser: true,
					white: false,
					smarttabs: true,
					eqeqeq: true,
					immed: true,
					latedef: true,
					newcap: true,
					undef: true
				},
				globals: {
					Modernizr: true
				}
			};
			if (props.jquery) {
				cfg.jshint.options.jquery = true;
				cfg.jshint.globals.jQuery = true;
			}

			cfg.uglify = {};
		}

		props.config = jsToString(cfg, 2);

		// Default task
		var defaults = [];
		if (imgo) defaults.push('imgo');
		if (stylus) defaults.push('stylus');
		if (js) defaults.push('lint', 'concat', 'min');
		if (sweet) defaults.push('sweet');
		if (fingerprint) defaults.push('fingerprint');
		props.defaults = defaults.join(' ');

		// Deploy task
		removeFromArray(defaults, 'lint');
		removeFromArray(defaults, 'imgo');
		props.deploy = defaults.join(' ');

		// NPM tasks
		var npms = [];
		if (stylus) npms.push('grunt-stylus');
		if (sweet) npms.push('grunt-sweet');
		if (imgo) npms.push('grunt-imgo');
		if (fingerprint) npms.push('grunt-fingerprint');
		props.npms = npms.join(' ');

		// Files to copy (and process).
		var files = init.filesToCopy(props);

		// Actually copy (and process) files.
		init.copyAndProcess(files, props);

		// All done!
		done();
	});

};


/* Utils */

var path = require('path');

// Find the first `preferred` existing directory
function preferDir(preferred) {
	for (var i = 0; i < preferred.length; i++) {
		if (path.existsSync(preferred[i])) {
			return preferred[i];
		}
	}
	return null;
}

function removeFromArray(arr, value) {
	var pos = arr.indexOf(value);
	if (pos === -1) return;
	arr.splice(pos, 1);
}

function jsToString(js, level, first) {
	if (!level) level = 1;
	if (first === undefined) first = true;
	var array = (js.length !== undefined),
		has = false,
		s = array ? '[\n' : '{\n';

	for (var key in js) {
		var value = js[key],
			type = typeof value;

		if (!/^[a-z0-9_]+$/i.test(key)) key = "'" + key + "'";

		s += stringCopy('\t', level);
		if (!array) s += key + ': ';
		if (type === 'object') {
			if (value instanceof JS) type = 'js';
		}
		switch (type) {
			case 'number':
				s += value;
				break;
			case 'boolean':
				s += value ? 'true' : 'false';
				break;
			case 'string':
				s += "'" + value.replace(/'/g, '\\\'') + "'";
				break;
			case 'array':
			case 'object':
				s += jsToString(value, level + 1, false);
				break;
			case 'js':
				s += value.toString();
				break;
			default:
				console.log('jsToString: unknown type: ', type);
		}
		if (type !== 'array' && type !== 'object') s += ',\n';
		has = true;
	}

	if (has) {
		s = s.slice(0, -2) + '\n';
	}
	else {
		return (array ? '[]' : '{}') + (first ? '' : ',\n');
	}

	return s + stringCopy('\t', level - 1) + (array ? ']' : '}') + (first ? '' : ',\n');
}

function stringCopy(s, num) {
	var ss = '';
	for (var i = 0; i < num; i++) {
		ss += s;
	}
	return ss;
}

function JS(code) {
	if (!(this instanceof JS)) return new JS(code);
	this.code = code;
}
JS.prototype.toString = function() {
	return this.code;
};
