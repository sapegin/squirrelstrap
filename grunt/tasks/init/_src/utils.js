//

module.exports = function(grunt) {
	var path = require('path'),
		fs = require('fs'),
		exec = require('child_process').exec;

	return {

		cdToProjectRoot: function() {
			var tries = 20;
			while (tries && !fs.existsSync('.git')) {
				process.chdir('..');
				tries -= 1;
			}
			if (!tries) grunt.fatal('Cannot find project root.');
		},

		projectName: function() {
			return path.basename(process.cwd());
		}, 

		isWordpress: function() {
			return fs.existsSync('wp-config.php');
		},

		isWordpressTheme: function() {
			return fs.existsSync('header.php') && fs.existsSync('footer.php') && fs.existsSync('functions.php');
		},

		// async.waterfall functions

		wlog: function(message) {
			return function(callback) {
				grunt.log.write(message);
				callback();
			};
		},

		wok: function() {
			return function(callback) {
				grunt.log.ok();
				callback();
			};
		},

		wshell: function(cmd) {
			return function(callback) {
				exec(cmd, function(err, result, code) {
					if (err) {
						grunt.fatal('Cannot do "' + cmd + '".\n' + err);
					}
					callback();
				});
			};
		}


	}
};