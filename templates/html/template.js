/**
 * Simple HTML template for Grunt
 */

exports.description = 'Create a simple HTML5 file.';

exports.template = function(grunt, init, done) {

	init.process({}, [
		init.prompt('name', 'index'),
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
