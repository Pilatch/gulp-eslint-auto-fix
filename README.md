# Gulp ESLint Auto-Fix

Makes a gulp task that watches your files for changes, and runs them through ESLint's fix function, then overwrites them if they have been fixed. It's good for productivity, helping your team conform to whatever JS style guide you choose without worrying about text editor plugins or additional setup. Heck, you could have different projects using totally different style guides, and your developers won't care whether they have to write semicolons or not.

## Usage

In your gulpfile.js, create a task by giving it a name, and an array of file globs to watch like so:

    const eslintAutoFix = require('eslint-auto-fix')

    eslintAutoFix('fix-js', [
      'app/**/*.js',
      'test/**/*.js'
    ])

Then you can run that gulp task in your terminal:

    $ gulp fix-js

Next time you save a file with code like this:

    function qux (foo,bar){
    return foo+bar}

It will be automatically converted into code that adheres to your style guide, so it could become this:

    function qux(foo, bar) {
      return foo + bar;
    }

## Defaults

If you don't provide the task's name, it will be called "eslint-auto-fix".

If you don't provide the file globs to watch, it will watch all files ending in '.js' that are not inside node_modules nor bower_components.

## Dependencies

This module has peer dependencies on [Gulp](https://www.npmjs.com/package/gulp), [Gulp-If](https://www.npmjs.com/package/gulp-if), [Gulp-Watch](https://www.npmjs.com/package/gulp-watch) and [ESLint](https://www.npmjs.com/package/gulp-eslint). If you don't already have those installed in your project, add them to your "devDependencies" in package.json. If anything weird is going on, check the version requirements and let me know.

## Configuration

None. This will honor whatever configuration you have already set up for ESLint.

## Limitations

What can be fixed is limited by what ESLint can fix. See their [rules page](https://eslint.org/docs/rules/) for all the fixable rules.

## Known Issues

ESLint parse errors will prevent the task from starting. If your code is really busted, the auto-fixer will not save you! However once you get the task running, but then create a parse error in what was previously good, runnable code, then the auto-fixer will send the error to your console.
