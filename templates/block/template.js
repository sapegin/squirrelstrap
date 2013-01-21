/**
 * Blocks library installer
 * Usage: grunt-init block:[name]
 *
 * @author Artem Sapegin, http://sapegin.me
 */

exports.description = 'Install common CSS/JS block from blocks library.';

exports.template = function(grunt, init, done) {
	'use strict';

	var path = require('path');

	var blocksFolder = path.join(__dirname, '../_blocks');
	var block = blockName();

	if (!block) {
		printInstalledBlocksList();
		printBlocksList();
		done();
		return;
	}

	if (!grunt.file.exists('styles/index.styl')) {
		grunt.log.writeln();
		grunt.fatal('"styles/index.styl" not found. Run "grunt-init styludir" to initialize it.');
	}

	// Copy files

	var folder = path.join(blocksFolder, block);
	if (!folder) {
		grunt.log.writeln();
		grunt.log.error('Block "' + block + '" not found.');
		printBlocksList();
		done();
		return;
	}

	grunt.log.writeln();

	var blockFiles = grunt.file.expandFiles(path.join(folder, '*'));

	var files = {};
	blockFiles.forEach(function(filepath) {
		files[path.join('blocks', block, path.basename(filepath))] = filepath;
	});

	init.copyAndProcess(files, {});

	grunt.log.writeln('Block "' + block + '" installed.');

	// Update index.styl
	var stylusIndex = grunt.file.read('styles/index.styl');
	if (stylusIndex) {
		var importStr = '@import "' + block + '"';
		if (stylusIndex.indexOf(importStr) === -1) {
			stylusIndex = stylusIndex.replace(/(@import ['"]shugar['"];?)/, '$1\n' + importStr);
			grunt.file.write('styles/index.styl', stylusIndex);
			grunt.log.writeln('File "styles/index.styl" updated.');
		}
	}

	done();


	function blockName() {
		var flags = grunt.util._.keys(init.flags);
		return flags.length && flags[0];
	}

	function printInstalledBlocksList() {
		printList('blocks', 'Installed blocks');
	}

	function printBlocksList() {
		printList(blocksFolder, 'Available blocks');
	}

	function printList(root, title) {
		var dirs = grunt.file.expandDirs(path.join(root, '*'));
		var blocks = dirs.map(function(filepath) { return path.basename(filepath); });

		if (!blocks.length) return;
		grunt.log.subhead(title + ':');
		grunt.log.writeln('- ' + blocks.join('\n- '));
	}

};
