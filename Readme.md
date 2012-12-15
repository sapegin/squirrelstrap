# Squirrelstrap

Set of extremely opinionated [grunt-init](https://github.com/gruntjs/grunt-init) templates for faster front-end web development. You can use them as example or as a base for your own templates.


## Installation

1. Install [grunt-init](https://github.com/gruntjs/grunt-init): `npm install grunt-init -g`.

1. Place templates into `~/.grunt-init` folder.

1. Edit `defaults.json`.

Now you can type something like this:

```bash
grunt-init templatename
```

For example `grunt-init readme` will make `Readme.md` and `License.md` files with your copyright information in current folder.


## Templates

**Note**. Some templates can add jQuery, Modernizr or other files when needed.

### [block](https://github.com/sapegin/squirrelstrap/tree/master/templates/block)

Install block from my [block library](https://github.com/sapegin/squirrelstrap/tree/master/templates/_blocks).

### [browse](https://github.com/sapegin/squirrelstrap/tree/master/templates/browse) (**Experimental**)

Magically open website in a browser via development servers. Support Wordpress.

### [fabfile](https://github.com/sapegin/squirrelstrap/tree/master/templates/fabfile)

Create `fabfile.py` for [Fabric](http://fabfile.org/).

### [gruntfile](https://github.com/sapegin/squirrelstrap/tree/master/templates/gruntfile)

Create `Gruntfile.coffee` with concat, uglify, jshint, stylus, sweet, fingerprint, imgo and compress tasks (tasks are optional). With watch and web server if needed. Also add `.jshintrc` and `.editorconfig`.

### [html](https://github.com/sapegin/squirrelstrap/tree/master/templates/html)

Create simple HTML file.

### [htmlplus](https://github.com/sapegin/squirrelstrap/tree/master/templates/htmlplus)

Create HTML file with links to CSS and JS and basic layout.

### [jquerylib](https://github.com/sapegin/squirrelstrap/tree/master/templates/jquerylib)

Create jQuery library (`new Pony()`, not `jquery.fn.pony`) with optional AMD support, default options, etc.

### [jqueryplugin](https://github.com/sapegin/squirrelstrap/tree/master/templates/jqueryplugin)

Create jQuery plugin (`jquery.fn.pony`) with optional AMD support, default options, etc.

### [jsmodule](https://github.com/sapegin/squirrelstrap/tree/master/templates/jsmodule)

Create JavaScript module (it’s just JS file with optional AMD wrapper and copyright).

### [license](https://github.com/sapegin/squirrelstrap/tree/master/templates/license)

Create `License.md` file with MIT license text.

### [mainjs](https://github.com/sapegin/squirrelstrap/tree/master/templates/mainjs)

Add `main.js` and `utils.js` to project. It’s my JavaScript bootstrap.

### [readme](https://github.com/sapegin/squirrelstrap/tree/master/templates/readme)

Create `Readme.md` file.

### [stylusdir](https://github.com/sapegin/squirrelstrap/tree/master/templates/stylusdir)

Create `styles` folder with my Stylus bootstrap files.

### [wordpress](https://github.com/sapegin/squirrelstrap/tree/master/templates/wordpress)

Install Wordpress: download/extract it, creates MySQL database, updates config file, etc.


---

## License

The MIT License, see the included `License.md` file.
