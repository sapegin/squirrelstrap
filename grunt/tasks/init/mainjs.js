/**
 * Main JS file with component initialization template for Grunt
 */

exports.description = 'Create main JS file.';
exports.warnOn = ['main.js', 'js/main.js'];

// The actual init template.
exports.template = function(grunt, init, done) {
	var path = require('path');

	grunt.helper('prompt', {}, [], function(err, props) {

		grunt.utils._.defaults(props, init.defaults);

		// Files to copy (and process).
		var files = init.filesToCopy(props);

		// jQuery
		files['libs/jquery-' + props.jquery_ver + '.min.js'] = 'init/_common/jquery-' + props.jquery_ver + '.min.js';

		// Prepend paths with `js/` if we are in parent directory
		if (path.basename(process.cwd()) !== 'js') {
			var jsFiles = {};
			for (var dest in files) {
				jsFiles['js/' + dest] = files[dest];
			}
			files = jsFiles;
		}

		// Actually copy (and process) files.
		init.copyAndProcess(files, props);

		// All done!
		done();

	});
};