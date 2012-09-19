/**
 * Extended HTML template for Grunt
 */
exports.description = 'Create an awesome HTML5 file.';

// The actual init template.
exports.template = function(grunt, init, done) {

	grunt.helper('prompt', {}, [
		grunt.helper('prompt_for', 'name', 'index'),
		{
			name: 'lang',
			message: 'Document language (en)',
			default: 'en',
			warning: ''
		},
		{
			name: 'mobile',
			message: 'Mobile version (y/N)',
			default: false,
			warning: ''
		}
	], function(err, props) {
		grunt.utils._.defaults(props, init.defaults);

		props.mobile = !/n/i.test(props.mobile);

		// Files to copy (and process).
		var files = init.filesToCopy(props);

		// jQuery
		if (props.lang === 'ru')
			props.jquery_path = 'http://yandex.st/jquery/' + props.jquery_ver + '/jquery.min.js';
		else
			props.jquery_path = 'http://ajax.googleapis.com/ajax/libs/jquery/' + props.jquery_ver + '/jquery.min.js';
		files['js/libs/jquery-' + props.jquery_ver + '.min.js'] = 'init/_common/jquery-' + props.jquery_ver + '.min.js';

		// Modernizr
		files['js/libs/modernizr.js'] = 'init/_common/modernizr.js';

		// Actually copy (and process) files.
		init.copyAndProcess(files, props);

		// All done!
		done();
	});

};