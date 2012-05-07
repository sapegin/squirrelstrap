/**
 * CSS bootstrap template for Grunt
 */

// Basic template description.
exports.description = 'Create a CSS bootstrap directory.';

// The actual init template.
exports.template = function(grunt, init, done) {

	grunt.helper('prompt', {}, [
			{
				name: 'maxwidth',
				message: 'Page max width',
				default: '1000px',
				warning: ''
			},
			{
				name: 'footer',
				message: 'Sticky footer height',
				default: 'no sticky footer',
				warning: ''
			}
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