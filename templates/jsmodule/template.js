/**
 * JS module template for Grunt
 */

// Basic template description.
exports.description = 'Create a JS module file.';

// The actual init template.
exports.template = function(grunt, init, done) {

	init.process({}, [
		init.prompt('name', 'script')
	], function(err, props) {
		grunt.util._.defaults(props, init.defaults);

		// Files to copy (and process).
		var files = init.filesToCopy(props);

		// Actually copy (and process) files.
		init.copyAndProcess(files, props);

		// All done!
		done();
	});

};
