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