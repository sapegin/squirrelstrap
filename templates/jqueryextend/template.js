/**
 * jQuery extensions file template for Grunt
 */

exports.description = 'Create a jQuery extensions file.';

// The actual init template.
exports.template = function(grunt, init, done) {

	init.process({}, [
		init.prompt('name', 'jquery.extend')
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
