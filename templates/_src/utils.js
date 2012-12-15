//

module.exports.init = function(grunt, init) {
	'use strict';

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
		},

		/**
		 */
		preferDir: function(preferred) {
			for (var i = 0; i < preferred.length; i++) {
				if (path.existsSync(preferred[i])) {
					return preferred[i];
				}
			}
			return null;
		},

		removeFromArray: function(arr, value) {
			var pos = arr.indexOf(value);
			if (pos === -1) return;
			arr.splice(pos, 1);
		},

		arrayToString: function(array) {
			return '["' + array.join('", "') + '"]';
		},

		/**
		 * Print JS object like JSON but without unnecessary quotes, etc.
		 *
		 * @param {Object}
		 * @return {String}
		 */
		jsToString: _jsToString,

		/**
		 * Print JS object like JSON but without unnecessary quotes, etc.
		 * CoffeScript syntax.
		 *
		 * @param {Object} js
		 * @param {Number} [level] Start level of indentation
		 * @return {String}
		 */
		jsToCoffeString: function(js, level, first) {
			return _jsToString(js, level, first, true);
		},

		JS: function(code) {
			return {
				__JS__: code
			};
		},

		writeJsHintRc: function() {
			if (!grunt.file.exists('.jshintrc')) {
				init.copyAndProcess({
					'.jshintrc': '_common/.jshintrc'
				});
			}
		},

		writeEditorConfig: function() {
			if (!grunt.file.exists('.editorconfig')) {
				init.copyAndProcess({
					'.editorconfig': '_common/.editorconfig'
				});
			}
		}
	};

	function _jsToString(js, level, first, coffee) {
		if (!level) level = 1;
		if (first === undefined) first = true;
		var array = js.length !== undefined;
		var has = false;
		var hasComma = false;
		var s = array ? '[\n' : (coffee ? (first ? '' : '\n') : '{\n');
		var quote = coffee ? '"' : "'";

		for (var key in js) {
			var value = js[key];
			var type = typeof value;

			if (!/^[a-z0-9_]+$/i.test(key)) key = quote + key + quote;

			s += _stringCopy('\t', level);
			if (!array) s += key + ': ';
			if (type === 'object') {
				if (value.__JS__) type = 'js';
			}
			switch (type) {
				case 'number':
					s += value;
					break;
				case 'boolean':
					s += value ? 'true' : 'false';
					break;
				case 'string':
					if (coffee)
						value = value.replace(/"/g, '\\\"');
					else
						value = value.replace(/'/g, '\\\'');
					s += quote + value + quote;
					break;
				case 'array':
				case 'object':
					s += _jsToString(value, level + 1, false, coffee);
					break;
				case 'js':
					s += value.__JS__;
					break;
				default:
					console.log('jsToString: unknown type: ', type);
			}
			if (type !== 'array' && type !== 'object') {
				s += ',\n';
				hasComma = true;
			}
			has = true;
		}

		if (hasComma) {
			s = s.replace(/,\n$/, '\n');
		}
		if (!has) {
			return (array ? '[]' : '{}') + (first ? '' : ',\n');
		}

		if (coffee) {
			if (array) {
				s += _stringCopy('\t', level - 1) + ']' + (first ? '' : '\n');
			}
		}
		else {
			s += _stringCopy('\t', level - 1) + (array ? ']' : '}') + (first ? '' : ',\n');
		}

		return s.replace(/\n\t*\n/g, '\n');
	}

	function _stringCopy(s, num) {
		var ss = '';
		for (var i = 0; i < num; i++) {
			ss += s;
		}
		return ss;
	}

};
