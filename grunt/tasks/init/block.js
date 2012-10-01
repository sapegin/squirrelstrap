/**
 * Blocks library installer
 */

exports.description = 'Installs common CSS/JS block.';

exports.template = function(grunt, init, done) {
	var path = require('path'),
		fs = require('fs');

	grunt.helper('prompt', {}, [
		{
			name: 'block',
			message: 'Block name'
		}
	], function(err, props) {
		var block = props.block;

		if (!block) {
			printBlocksList();
			done();
		}

		// Copy files

		var folder = grunt.task.getFile(path.join('init/_blocks', block));
		if (!folder) {
			printBlocksList();
			grunt.fatal('Block "' + block + '" not found.');
		}
		
		var blockFiles = grunt.file.expandFiles(path.join(folder, '*'));

		var files = {};
		blockFiles.forEach(function(filepath) {
			files[path.join('blocks', block, path.basename(filepath))] = filepath;
		});

		init.copyAndProcess(files, props);

		// Update index.styl
		var stylusIndex = grunt.file.read('styles/index.styl');
		if (stylusIndex) {
			stylusIndex = stylusIndex.replace(/(@import ['"]shugar['"];?)/, '$1\n@import "../blocks/' + block + '";');
			grunt.file.write('styles/index.styl', stylusIndex);
			grunt.log.writeln('File "styles/index.styl" updated.');
		}

		done();
	});

	function printBlocksList() {
		var root = grunt.task.getFile('init/_blocks'),
			dirs = grunt.file.expandDirs(path.join(root, '*')),
			blocks = dirs.map(function(filepath) { return path.basename(filepath).slice(0, -1); });

		grunt.log.subhead('Available blocks:');
		grunt.log.writeln(blocks.join('\n'));
		grunt.log.writeln();
	}

};
