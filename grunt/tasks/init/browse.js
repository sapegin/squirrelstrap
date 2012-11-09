/**
 * Magically opens website in a browser via development servers
 */

exports.description = 'Opens website in a browser (creates dev server if necessary).';

exports.template = function(grunt, init, allDone) {

	var utils = require('./_src/utils')(grunt),
		exec = require('child_process').exec,
		async = grunt.utils.async,
		props = init.defaults;

	var projectName = utils.projectName();


	// Determine project type
	var kind;
	if (utils.isWordpressTheme()) process.chdir('../../..');
	if (utils.isWordpress()) kind = 'wordpress';
	if (!kind) grunt.fatal('Unknown project type.');


	var ops = [];

	switch (kind) {
		case 'wordpress':
			var hostName = projectName;

			// Virtual host
			var vhostsConfPath = '/etc/apache2/extra/httpd-vhosts.conf',
				vhostsConf = grunt.file.read(vhostsConfPath);
			if (vhostsConf.indexOf('ServerName ' + hostName + '\n') === -1) {
				ops.push(
					utils.wlog('Adding virtual host... '),
					utils.wshell(
						'echo "\n\n' +
						'<VirtualHost *:80>\n' +
						'   DocumentRoot ' + process.cwd() + '\n' +
						'   ServerName ' + hostName + '\n' +
						'</VirtualHost>\n' +
						'" | sudo tee -a ' + vhostsConfPath
					),
					utils.wshell('sudo apachectl graceful'),
					utils.wok()
				);
			}
			
			// /etc/hosts
			var hostsFilePath = '/etc/hosts',
				hostsFile = grunt.file.read(hostsFilePath);
			if (hostsFile.indexOf('127.0.0.1 ' + hostName + '\n') === -1) {
				ops.push(
					utils.wlog('Adding host to /etc/hosts... '),
					utils.wshell(
						'echo "\n' +
						'127.0.0.1 ' + hostName + '\n' +
						'" | sudo tee -a ' + hostsFilePath
					),
					utils.wshell('dscacheutil -flushcache'),
					utils.wok()
				);
			}

			// Run servers
			ops.push(
				utils.wlog('Starting server... '),
				function(done) {
					exec('ps ax | grep httpd | wc -l', function(err, result, code) {
						if (result > 2) {  // Apache started
							done();
						}
						else {
							exec('sudo apachectl start', function() { done(); });
						}
					});
				},
				utils.wshell('mysql.server start'),
				utils.wok()
			);

			// Database
			var db = '-u ' + props.mysql_username + ' -p' + props.mysql_password,
				dbName = 'wp_' + projectName;
			ops.push(
				utils.wlog('Checking MySQL database... '),
				function(done) {
					exec("mysql -Bb -e '' " + db + " " + dbName, function(err, result, code) {
						if (!err) {  // Database exists
							done();
						}
						else {
							exec("mysqladmin " + db + " create " + dbName, function() { done(); });
						}
					});
				},
				utils.wok()
			);

			// Starting browsers
			ops.push(
				utils.wshell('open "http://' + hostName)
			);

			break;
	}


	async.waterfall(ops, allDone);

};
