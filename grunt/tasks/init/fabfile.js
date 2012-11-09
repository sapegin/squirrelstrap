/**
 * Fabfile template for Grunt
 *
 * @author Artem Sapegin, http://sapegin.me
 */

exports.description = 'Create a Fabfile.';

exports.template = function(grunt, init, done) {

	var utils = require('./_src/utils')(grunt);

	grunt.helper('prompt', {}, [
		{
			name: 'server',
			message: 'Server (~/.ssh/config alias)',
			default: 'locum'
		},
		{
			name: 'grunt',
			message: 'Grunt?',
			default: 'Y/n'
		},
		{
			name: 'bare',
			message: 'Use bare git repo?',
			default: 'Y/n'
		},		
	], function(err, props) {
		grunt.utils._.defaults(props, init.defaults);

		props.name = utils.projectName();
		props.grunt = /y/i.test(props.grunt);
		props.bare = /y/i.test(props.bare);
		props.upgrade = props.grunt;

		// Files to copy (and process).
		var files = init.filesToCopy(props);

		// Actually copy (and process) files.
		init.copyAndProcess(files, props);

		// All done!
		done();
	});

};