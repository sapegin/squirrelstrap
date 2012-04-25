/**
 * Extended HTML template for Grunt
 */

exports.description = 'Create a extended HTML5 file.';
exports.warnOn = 'License.md';

// The actual init template.
exports.template = function(grunt, init, done) {

	grunt.helper('prompt', {}, [], function(err, props) {
		grunt.utils._.defaults(props, init.defaults);

		// Files to copy (and process).
		var files = init.filesToCopy(props);

		// Actually copy (and process) files.
		init.copyAndProcess(files, props);

		// All done!
		done();
	});

};