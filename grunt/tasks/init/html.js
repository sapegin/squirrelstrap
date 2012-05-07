/**
 * Simple HTML template for Grunt
 */

exports.description = 'Create a simple HTML5 file.';

exports.template = function(grunt, init, done) {

	grunt.helper('prompt', {}, [
		grunt.helper('prompt_for', 'name', 'index'),
		{
			name: 'lang',
			message: 'Document language',
			default: 'en'
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