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
			name: 'amd',
			message: 'Use AMD? (yes|no)',
			default: 'yes'
		},
		{
			name: 'mobile',
			message: 'Mobile version (no)',
			default: false,
			warning: ''
		}
	], function(err, props) {
		grunt.utils._.defaults(props, init.defaults);

		// Files to copy (and process).
		var files = init.filesToCopy(props);

		// jQuery
		if (props.lang === 'ru')
			props.jquery_path = 'http://yandex.st/jquery/' + props.jquery_ver + '/jquery.min.js';
		else
			props.jquery_path = 'http://ajax.googleapis.com/ajax/libs/jquery/' + props.jquery_ver + '/jquery.min.js';
		files['js/libs/jquery-' + props.jquery_ver + '.min.js'] = 'init/_common/jquery-' + props.jquery_ver + '.min.js';

		// RequireJS
		if (props.amd === 'yes')
			files['js/libs/require.js'] = 'init/_common/require.js';

		// Modernizr
		files['js/libs/modernizr.js'] = 'init/_common/modernizr.js';

		// Actually copy (and process) files.
		init.copyAndProcess(files, props);

		// All done!
		done();
	});

};