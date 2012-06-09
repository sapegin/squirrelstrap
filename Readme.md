# Squirrelstrap

Set of [Grunt](https://github.com/cowboy/grunt) templates for faster front-end web development. You can use them as example or as a base for your own templates.


## Installation

1. Install [Grunt](https://github.com/cowboy/grunt) via `npm install -g grunt`.

1. Place templates into `~/.grunt/tasks/init` or `%USERPROFILE%\.grunt\tasks\init\` folder.

1. Edit `defaults.json`.

Now you can type something like this:

```bash
grunt init:templatename
```

In example `grunt init:readme` will make `Readme.md` and `License.md` files with your copyright information in current folder.


## Tips & Tricks

### Bash alias

You can create bash alias to invoke templates even faster. Add to your `~/.bashrc`:

```bash
ginit() { grunt init:$@ ;}
```

Then run `source ~/.bashrc`. Now you can invoke templates as easy as:

```bash
ginit templatename
```


---

## License

The MIT License, see the included `License.md` file.