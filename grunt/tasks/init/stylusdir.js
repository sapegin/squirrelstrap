/**
 * Stylus bootstrap template for Grunt
 */

// Basic template description.
exports.description = 'Create a Stylus bootstrap directory.';
exports.warnOn = 'styles';

// The actual init template.
exports.template = function(grunt, init, done) {

	grunt.helper('prompt', {}, [
			{
				name: 'maxwidth',
				message: 'Page max width',
				default: '1000px',
				warning: "CSS size or 'none'"
			},
			{
				name: 'footer',
				message: 'Sticky footer height',
				default: 'none',
				warning: "CSS size or 'none'"
			},
			{
				name: 'linkDecor',
				message: 'Link decoration',
				default: 'underline',
				warning: 'underline or border'
			},
			{
				name: 'gridCols',
				message: 'Grid: number of columns',
				default: '12',
				warning: "Number or 'none'"
			},
			{
				name: 'gridGutter',
				message: 'Grid: gutter width',
				default: '5',
				warning: '0—19'
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
