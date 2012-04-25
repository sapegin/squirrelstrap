/**
 * Simple HTML template for Grunt
 */

// Basic template description.
exports.description = 'Create a simple HTML5 file.';

// The actual init template.
exports.template = function(grunt, init, done) {

	grunt.helper('prompt', {}, [
		grunt.helper('prompt_for', 'name', 'index'),
		{
			name: 'lang',
			message: 'Document language',
			default: 'en',
			warning: ''
		},
	], function(err, props) {
		// Files to copy (and process).
		var files = init.filesToCopy(props);

		// Actually copy (and process) files.
		init.copyAndProcess(files, props);

		// All done!
		done();
	});

};