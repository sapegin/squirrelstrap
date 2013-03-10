/**
 * Stylus bootstrap template for Grunt
 */

// Basic template description.
exports.description = 'Create a Stylus bootstrap directory.';
exports.warnOn = 'styles';

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
