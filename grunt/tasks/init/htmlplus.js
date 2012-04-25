/**
 * Extended HTML template for Grunt
 */
exports.description = 'Create a extended HTML5 file.';

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
		{
			name: 'mobile',
			message: 'Mobile version (no)',
			default: false,
			warning: ''
		},
	], function(err, props) {
		grunt.utils._.defaults(props, init.defaults);

		// Files to copy (and process).
		var files = init.filesToCopy(props);

		// Actually copy (and process) files.
		init.copyAndProcess(files, props);

		// All done!
		done();
	});

};