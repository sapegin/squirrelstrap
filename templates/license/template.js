/**
 * License template for Grunt
 */

exports.description = 'Create license file.';
exports.warnOn = 'License.md';

// The actual init template.
exports.template = function(grunt, init, done) {

	init.process({}, [], function(err, props) {
		grunt.util._.defaults(props, init.defaults);

		// Files to copy (and process).
		var files = init.filesToCopy(props);

		// Actually copy (and process) files.
		init.copyAndProcess(files, props);

		// All done!
		done();
	});

};
