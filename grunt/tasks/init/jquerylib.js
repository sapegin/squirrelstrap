/**
 * jQuery library template for Grunt
 */

exports.description = 'Create a jQuery library file.';

// The actual init template.
exports.template = function(grunt, init, done) {

	grunt.helper('prompt', {}, [
		{
			name: 'name',
			message: 'Library name',
			default: ''
		}
	], function(err, props) {
		grunt.utils._.defaults(props, init.defaults);

		// File name
		props.filename = props.name.replace(/ /g, '').toLowerCase();

		// Class name
		props.cls = camelize(props.name).replace(/[ -]/g, '');

		// Files to copy (and process).
		var files = init.filesToCopy(props);

		// Actually copy (and process) files.
		init.copyAndProcess(files, props);

		// All done!
		done();
	});

	function camelize(string) {
		return string.replace(/([a-z])([a-z]*)/gi, function(m, $1, $2) {
			return $1.toUpperCase() + $2.toLowerCase();
		});
	}

};