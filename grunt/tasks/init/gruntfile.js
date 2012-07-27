/*
 * grunt
 * https://github.com/cowboy/grunt
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 */

// Basic template description.
exports.description = 'Create a basic grunt.js gruntfile.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'This template tries to guess file and directory paths, but ' +
	'you will most likely need to edit the generated grunt.js file before ' +
	'running grunt. _If you run grunt after generating grunt.js, and grunt ' +
	'exits with errors, edit the grunt.js file!_';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = 'grunt.js';

// The actual init template.
exports.template = function(grunt, init, done) {
	var fs = require('fs');

	grunt.helper('prompt', {}, [
		// Prompt for these values.
		{
			name: 'min_concat',
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
			name: 'library',
			message: 'Library name?',
			default: 'none',
			warning: 'Name: creates big library banner. None: small copyright banner.'
		}
	], function(err, props) {
		grunt.utils._.defaults(props, init.defaults);

		props.min_concat = /y/i.test(props.min_concat);
		props.stylus = /y/i.test(props.stylus);
		props.package_json = fs.existsSync('package.json');
		props.wordpress = fs.existsSync('header.php') && fs.existsSync('footer.php') && fs.existsSync('functions.php');
		props.test_task = props.dom ? 'qunit' : 'test';
		props.file_name = props.package_json ? '<%= pkg.name %>' : 'scripts';

		// Find the first `preferred` item existing in `arr`.
		function prefer(arr, preferred) {
			for (var i = 0; i < preferred.length; i++) {
				if (arr.indexOf(preferred[i]) !== -1) {
					return preferred[i];
				}
			}
			return preferred[0];
		}

		// Guess at some directories, if they exist.
		var dirs = grunt.file.expandDirs('*').map(function(d) { return d.slice(0, -1); });
		props.lib_dir = prefer(dirs, ['js/mylibs', 'lib', 'src']);
		props.test_dir = prefer(dirs, ['test', 'tests', 'unit', 'spec']);

		// Maybe this should be extended to support more libraries. Patches welcome!
		props.jquery = grunt.file.expandFiles('**/jquery*.js').length > 0;

		// Files to copy (and process).
		var files = init.filesToCopy(props);

		// Actually copy (and process) files.
		init.copyAndProcess(files, props);

		// All done!
		done();
	});

};
