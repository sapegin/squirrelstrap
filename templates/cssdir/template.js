/**
 * CSS bootstrap template for Grunt
 */

// Basic template description.
exports.description = '[Deprecated] Create a CSS bootstrap directory.';
exports.warnOn = 'css';

// The actual init template.
exports.template = function(grunt, init, done) {

	init.process({}, [
			{
				name: 'maxwidth',
				message: 'Page max width',
				default: '1000px'
			},
			{
				name: 'footer',
				message: 'Sticky footer height',
				default: 'no sticky footer'
			},
			{
				name: 'gridCols',
				message: 'Grid: number of columns (or none)',
				default: '12'
			},
			{
				name: 'gridGutter',
				message: 'Grid: gutter width (0—19)',
				default: '5'
			}
		], function(err, props) {
		grunt.utils._.defaults(props, init.defaults);

		// Grid
		if (props.gridCols) {
			var anygrid = require('./_src/anygrid');
			props.gridCss = anygrid.generate(props.gridCols, props.gridGutter);
		}

		// Files to copy (and process).
		var files = init.filesToCopy(props);

		// Actually copy (and process) files.
		init.copyAndProcess(files, props);

		// All done!
		done();
	});

};
