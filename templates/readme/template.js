/**
 * Readme template for Grunt
 */

exports.description = 'Create readme and license files.';
exports.warnOn = ['Readme.md', 'License.md'];

// The actual init template.
exports.template = function(grunt, init, done) {

	init.process({}, [], function(err, props) {
		grunt.util._.defaults(props, init.defaults);

		// Files to copy (and process).
		var files = init.filesToCopy(props);

		// Add license file.
		files['License.md'] = 'init/license/root/License.md';

		// Actually copy (and process) files.
		init.copyAndProcess(files, props);

		// All done!
		done();
	});

};
