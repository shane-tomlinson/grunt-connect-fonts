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
In your project's Gruntfile, add a section named `connect_fonts` to the data object passed into `grunt.initConfig()`.

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
   fontPacks: [ 'connect-fonts-firasans', 'connect-fonts-opensans' ]

#### options.fontNames
Type: `Array`
Default value: `[]`

Array of strings. Each value is the name of the font to be included.

Example:
    fontNames: [ 'firasans-bold', 'firasans-light' ]

#### options.languages
Type: `Array`
Default value: `[]`

Array of strings. Each value is the l10n name for the languages to generate CSS for.

Example:
    languages: [ 'en', 'de', 'es_MX', 'es_AR' ]

#### options.userAgent
Type: `String`
Default value: `'all'`

User agent to generate strings for. See https://github.com/shane-tomlinson/connect-fonts for how this can be used. Usually best to leave at `all`.

### options.dest
Type: `String`
Default value: `'tmp'`

Where to place the font files.

### Usage Examples

#### Write fonts.css files to the `./tmp` directory

In the following example, four subdirectories are created under the `/.tmp` directory: `en`, `de`, `es`, `es_MX`. Each subdirectory will contain a fonts.css containing `@font-face` CSS declarations for `firasans-bold` and `firasans-regular`.

```js

grunt.initConfig({
  connect_fonts: {
    options: {
      fontPacks: [ 'connect-fonts-firasans' ],
      fontNames: [ 'firasans-bold', 'firasans-regular' ],
      languages: [ 'en', 'de', 'es', 'es_MS' ]
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
