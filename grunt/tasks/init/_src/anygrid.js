/**
 * AnyGrid. Fluid CSS grid framework. http://anygrid.net
 * Node.js wrapper
 *
 * @author Vasiliy Aksyonov
 * @author Artem Sapegin
 * @copyright 2012 Vasiliy Aksyonov (http://twitter.com/outring)
 * @copyright 2012 Artem Sapegin (http://sapegin.me)
 * @license MIT
 */

var style = {
	indent: "",
	afterColon: "",
	afterBlockStart: " ",
	beforeBlockEnd: " ",
	propertiesSeparator: " ",
	rulesSeparator: "\n"
};


/**
 * Generates Any Grid CSS rules
 *
 * @param cols Number of columns
 * @param gutter Gutter width, %
 */
function generate(cols, gutter) {
	var descriptor = new AnyGridDescriptor(),
		grid = descriptor.getGrid(cols, gutter),
		generator = new CssGenerator(grid, { prefix: "g-" });
	return generator.getCode();
}

/**
 * Sets CSS code style
 */
function setStyle(params) {
	for (var key in params) {
		style[key] = params;
	}
}

exports.generate = generate;
exports.setStyle = setStyle;


/* Any Grid */

function CssStylesheet() {
    this.__rules = [];
}

CssStylesheet.prototype = {
    addRule: function (selectors) {
        if (typeof selectors === "string")
            selectors = Array.prototype.slice.call(arguments);
        var rule = new CssRule(selectors.join(", "));
        this.__rules.push(rule);
        return rule;
    },
    toString: function () {
        return this.__rules.join(style.rulesSeparator);
    }
}

function CssRule(selector) {
    this.__properties = [];
    this.__selector = selector;
}

CssRule.prototype = {
    addProperty: function (name, value) {
        this.__properties.push(new CssProperty(name, value));
        return this;
    },
    toString: function () {
        return [
            this.__selector + " {" + style.afterBlockStart,
            this.__properties.join(style.propertiesSeparator),
            style.beforeBlockEnd + "}"
        ].join("");
    }
}

function CssProperty(name, value) {
    this.__name = name;
    this.__value = value;
}

CssProperty.prototype = {
    toString: function() {
        return style.indent + this.__name + ":" + style.afterColon + this.__value + ";"
    }
}

function AnyGrid(containerCols, gridCols, gutterWidth) {
    if (gridCols < containerCols)
        throw new Error("Container cols number can't be less than grid cols");
    if (gridCols === containerCols && gutterWidth > 0)
        throw new Error("Container cols number can't be less than grid cols");
    this.__containerCols = containerCols;
    this.gridCols = gridCols;
    this.__maxColWidth = 100 / containerCols;
    this.__gutterWidth = gutterWidth;
    if (this.__gutterWidth >= this.__maxColWidth)
        throw new Error("Gutter width can't be greater than col width")
}

AnyGrid.prototype = {
    getContainerWidth: function () {
        var width = this.__getGutterlessContainerWidth();
        width += (width * this.__gutterWidth / this.__maxColWidth) / this.gridCols;
        return Math.round(width * 100) / 100;
    },
    __getGutterlessContainerWidth: function () {
        return this.__containerCols / this.gridCols * 100;
    },
    getBlockWidth: function (blockNum) {
        return this.__maxColWidth * (blockNum - 1) + this.__maxColWidth - this.__gutterWidth;
    },
    getBlockOffset: function (blockNum) {
        return this.__maxColWidth * (blockNum - 1);
    }
};

function AnyGridDescriptor(containerCols) {
    this.__containerCols = containerCols || 5;
    if (100 % this.__containerCols !== 0)
        throw new Error("Wrong cols count");
}

AnyGridDescriptor.prototype = {
    getMaxColWidth: function() {
        return 100 / this.__containerCols;
    },
    getGrid: function(gridCols, gutterWidth) {
        return new AnyGrid(this.__containerCols, gridCols, gutterWidth)
    }
};

function CssGenerator(grid, options) {
    this.__grid = grid;
    this.__options = options;
}

CssGenerator.prototype = {
    getCode: function () {
        var g = this.__grid;
        var s = new CssStylesheet();

        var gridCols = g.gridCols

        var prefix = "." + this.__options.prefix;
        var contClass = prefix + gridCols;
        var rowClass = prefix + "row";

        var containerPressing = 100 - g.getContainerWidth() + "%";

        s.addRule(contClass)
            .addProperty("padding-right", containerPressing)
            .addProperty("position", "relative")
            .addProperty("*padding-right", 0)
            .addProperty("*margin-right", containerPressing);

        s.addRule(contClass, rowClass)
            .addProperty("zoom", 1);

        s.addRule(contClass + ":before", contClass + ":after", rowClass + ":before", rowClass + ":after")
            .addProperty("clear", "both")
            .addProperty("content", "''")
            .addProperty("display", "block");

        s.addRule(prefix + "first")
            .addProperty("clear", "left");

        s.addRule(this.__getSpanClasses())
            .addProperty("display", "inline")
            .addProperty("float", "left")
            .addProperty("position", "relative");

        for (var i = 1; i <= gridCols; i++)
            s.addRule(this.__getSpanClass(i))
                .addProperty("margin-right", -g.getBlockWidth(i) + "%")
                .addProperty("width", g.getBlockWidth(i) + "%");

        for (var i = 1; i <= gridCols; i++)
            s.addRule(this.__getColClass(i))
                .addProperty("left", g.getBlockOffset(i) + "%");

        return s.toString();
    },
    __getSpanClasses: function () {
        var classes = [];
        for (var i = 1; i <= this.__grid.gridCols; i++)
            classes.push(this.__getSpanClass(i));
        return classes;
    },
    __getSpanClass: function (width) {
        return "." + this.__options.prefix + "span-" + width;
    },
    __getColClass: function (offset) {
        return "." + this.__options.prefix + "col-" + offset;
    }
};
