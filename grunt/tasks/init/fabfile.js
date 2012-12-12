/**
 * Fabfile template for Grunt
 *
 * @author Artem Sapegin, http://sapegin.me
 */

exports.description = 'Create a Fabfile.';
exports.warnOn = 'fabfile.py';

exports.template = function(grunt, init, done) {

	var utils = require('./_src/utils')(grunt);

	grunt.helper('prompt', {}, [
		{
			name: 'name',
			message: 'Project name',
			'default': utils.projectName()
		},
		{
			name: 'server',
			message: 'Server (~/.ssh/config alias)',
			'default': 'locum'
		},
		{
			name: 'grunt',
			message: 'Run Grunt via SSH?',
			'default': 'Y/n'
		},
		{
			name: 'kind',
			message: 'Repo type (bb|gh|bare)?',
			'default': 'bb'
		}
	], function(err, props) {
		grunt.utils._.defaults(props, init.defaults);

		props.grunt = /y/i.test(props.grunt);
		props.upgrade = props.grunt;

		switch (props.kind) {
			case 'bb':
				props.repo = 'git@bitbucket.org:sapegin/' + props.name + '.git';
				break;
			case 'gh':
				props.repo = 'git@github.com:sapegin/' + props.name + '.git';
				break;
			default:  // bare
				props.repo = '~/git/' + props.name + '.git';
		}

		// Files to copy (and process).
		var files = init.filesToCopy(props);

		// Actually copy (and process) files.
		init.copyAndProcess(files, props);

		// All done!
		done();
	});

};