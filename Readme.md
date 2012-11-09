# Squirrelstrap

Set of [Grunt](https://github.com/gruntjs/grunt) (`grunt init`) templates for faster front-end web development. You can use them as example or as a base for your own templates.


## Installation

1. Install [Grunt](https://github.com/gruntjs/grunt) via `npm install grunt -g`.

1. Place templates into `~/.grunt/tasks/init` folder.

1. Edit `defaults.json`.

Now you can type something like this:

```bash
grunt init:templatename
```

In example `grunt init:readme` will make `Readme.md` and `License.md` files with your copyright information in current folder.


## Templates

**Note**. Some templates can add jQuery, Modernizr or other libraries when needed.

### block

Installs block from my [block library](https://github.com/sapegin/squirrelstrap/tree/master/grunt/tasks/init/_blocks).

### fabfile

Creates `fabfile.py` for Fabric.

### gruntfile

Creates `grunt.js` with concat, min, jshint, stylus, sweet, fingerprint, imgo tasks (tasks are optional). With watch and server if needed.

### html

Creates simple HTML file.

### htmlplus

Creates HTML file with links to CSS and JS and basic layout.

### jquerylib

Creates jQuery library (`new Bla()`, not `jquery.fn`) with optional AMD support, default options, etc.

### jqueryplugin

Creates jQuery plugin (`jquery.fn.blabla`) with optional AMD support, default options, etc.

### jsmodule

Creates JavaScript module (it’s just JS file with optional AMD wrapper and copyright).

### license

Creates `License.md` file with MIT license text.

### mainjs

Adds `main.js` and `utils.js` to project. It’s my JavaScript bootstrap.

### readme

Creates `Readme.md` file.

### stylusdir

Creates `styles` folder with my Stylus bootstrap files.

### wordpress

Installs Wordpress: download/extract it, creates MySQL database, updates config file, etc.


## Tips & Tricks

### Bash alias

You can create bash alias to invoke templates even faster. Add to your `~/.bash_profile`:

```bash
gi() { grunt init:$@ ;}
```

Then run `source ~/.bash_profile`. Now you can invoke templates as easy as:

```bash
gi templatename
```


---

## License

The MIT License, see the included `License.md` file.