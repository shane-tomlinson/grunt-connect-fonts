# grunt-connect-fonts

> Grunt plugin to generate CSS files for connect-fonts compatible font packs.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-connect-fonts --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-connect-fonts');
```

## The "connect_fonts" task

### Overview
The `connect_font` task generates locale specific CSS files. In your project's Gruntfile, add a section named `connect_fonts` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  connect_fonts: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific options go here.
    },
  },
});
```

### Options

#### options.fontPacks
Type: `Array`
Default value: `[]`

Array of strings. Each value is the name of the npm module for the font-pack. Font packs must be installed via `npm install` before use.

Example:
```
fontPacks: [ 'connect-fonts-firasans', 'connect-fonts-opensans' ]
```

#### options.fontNames
Type: `Array`
Default value: `[]`

Array of strings. Each value is the name of the font to be included.

Example:
```
fontNames: [ 'firasans-bold', 'firasans-light' ]
```
#### options.languages
Type: `Array`
Default value: `[]`

Array of strings. Each value is the l10n name for the languages to generate CSS for.

Example:
```
languages: [ 'en', 'de', 'es_MX', 'es_AR' ]
```

#### options.dest
Type: `String`
Default value: `'tmp/css'`

Where to place the CSS files.

Example:
```
dest: '.tmp/css'
```

#### options.destFileName
Type: `function`
Default value: `function (root, language) { return root + language + '.css'; }`

Function used to modify the default destination filename.

Example:
```
destFileName: function (root, language) {
  // place the CSS into the `fonts.css` file in the `language` subdirectory.
  return root + language + '/fonts.css';
}
```

#### options.userAgent
Type: `String`
Default value: `'all'`

User agent to generate strings for. See https://github.com/shane-tomlinson/connect-fonts for how this can be used. Usually best to leave at `all`.

### Usage Examples

#### Write {{ locale name }}.css files to the `static/css` directory

In the following example, four files are created in the `static/css` directory: `en.css`, `de.css`, `es.css`, `es_MX.css`. Each file contains `@font-face` CSS declarations for `firasans-bold` and `firasans-regular` that are tailored to that locale.

```js

grunt.initConfig({
  connect_fonts: {
    options: {
      fontPacks: [ 'connect-fonts-firasans' ],
      fontNames: [ 'firasans-bold', 'firasans-regular' ],
      languages: [ 'en', 'de', 'es', 'es_MS' ],
      dest: 'static/css'
    }
  },
});
```

## The "connect_fonts_copy" task

### Overview
The `connect_font_copy` task copies web fonts from an npm package to a target directory. In your project's Gruntfile, add a section named `connect_fonts_copy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  connect_fonts_copy: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific options go here.
    },
  },
});
```

### Options

#### options.fontPacks
Type: `Array`
Default value: `[]`

Array of strings. Each value is the name of the npm module for the font-pack. Font packs must be installed via `npm install` before use.

Example:
```
fontPacks: [ 'connect-fonts-firasans', 'connect-fonts-opensans' ]
```


#### options.dest
Type: `String`
Default value: `'tmp/fonts'`

Where to place the font files.

Example:
```
dest: 'static/fonts'
```

### Usage Examples

#### Copy web fonts to the `static/fonts` directory

In the following example, the web fonts available in the `connect-fonts-firasans` font pack are copied to the `static/fonts` directory.

```js

grunt.initConfig({
  connect_fonts_copy: {
    options: {
      fontPacks: [ 'connect-fonts-firasans' ],
      dest: 'static/fonts'
    }
  },
});
```



## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Author:
* Shane Tomlinson
* shane@shanetomlinson.com
* stomlinson@mozilla.com
* set117@yahoo.com
* https://shanetomlinson.com
* https://github.com/shane-tomlinson
* @shane_tomlinson

## Get involved:

Documentation, new features, MOAR FONTS!

## License:
This software is available under version 2.0 of the MPL:

  https://www.mozilla.org/MPL/

## Release History
_(Nothing yet)_
