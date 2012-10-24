/**
 * Installs latest version of Wordpress
 */

exports.description = 'Installs Wordpress.';

exports.template = function(grunt, init, allDone) {

	var wpDownloadUrl = 'http://wordpress.org/latest.zip';

	var path = require('path'),
		fs = require('fs'),
		exec = require('child_process').exec,
		async = grunt.utils.async,
		props = init.defaults;

	// Check if Wordpress already installed
	if (fs.existsSync('wp-config.php') ||
			(fs.existsSync('header.php') && fs.existsSync('footer.php') && fs.existsSync('functions.php'))
		) {
		grunt.log.writeln('Wordpress already installed.');
		allDone();
	}

	var projectName = path.basename(process.cwd()),
		mysqlDatabase = 'wp_' + projectName;

	async.waterfall([

		function(done) {
			// Download Wordpress
			grunt.log.write('Downloading Wordpress... ');
			var archive = download(wpDownloadUrl);
			archive.on('end', function() { grunt.log.ok(); grunt.log.write('Extracting Wordpress... '); });

			// Extract Wordpress
			var extractor = extract(archive, '.');
			extractor.on('end', done);
		},

		// Move all files outside `wordpress` directory
		shell('mv wordpress/* . && rm -rf wordpress'),

		// Remove unnecessary stuff
		shell('unlink wp-config-sample.php'),
		shell('unlink readme.html'),
		shell('unlink wp-content/plugins/hello.php'),
		shell('rm -rf wp-content/themes/twentyeleven'),
		shell('rm -rf wp-content/themes/twentyten'),

		// Create theme folder
		shell('mkdir -p wp-content/themes/' + projectName),

		ok(),

		// Create database
		log('Creating MySQL database... '),
		shell('mysql.server start'),
		shell('mysqladmin -u ' + props.mysql_username + ' -p' + props.mysql_password + ' create ' + mysqlDatabase),
		ok(),

		function(done) {
			// Creating config file
			var files = init.filesToCopy();
			props.mysql_database = mysqlDatabase;
			props.keys = randomTokens(8);
			init.copyAndProcess(files, props);
			done();
		}

		// @todo open setup page via `browse` script (wp-admin/install.php)

	], allDone);


	function download(url) {
		var request = require('request');

		return request({ encoding: null, url: url }, function(err, response, body) {
			if (err || response.statusCode !== 200) {
				grunt.fatal('Cannot download ' + url + '.\n' + err);
			}
		});
	}

	function extract(response, to, callback) {
		var unzip = require('unzip');

		var extractor = unzip.Extract({ path: to });
		extractor.on('error', function(err) {
			grunt.fatal('Cannot extract archive.\n' + err);
		});
		response.pipe(extractor);
		return extractor;
	}

	function log(message) {
		return function(callback) {
			grunt.log.write(message);
			callback();
		};
	}

	function ok() {
		return function(callback) {
			grunt.log.ok();
			callback();
		};
	}

	function shell(cmd) {
		return function(callback) {
			exec(cmd, function(err, result, code) {
				if (err) {
					grunt.fatal('Cannot do ' + cmd + '.\n' + err);
				}
				callback();
			});
		};
	}

	function randomTokens(count) {
		var crypto = require('crypto');

		var tokens = [];
		for (var tokenIdx = 0; tokenIdx < count; tokenIdx++) {
			tokens.push(randomString(64));
		}
		return tokens;
	}

	var randomStringAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!@#$%^&*()_+?<>{}~[]/.,';
	function randomString(length) {
		var string = '';
		for (var charIdx = 0; charIdx < length; charIdx++) {
			var randomNumber = Math.floor(Math.random() * randomStringAlphabet.length);
			string += randomStringAlphabet.charAt(randomNumber);
		}
		return string;
	}


};
