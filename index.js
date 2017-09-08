var gulp = require('gulp')
var eslint = require('gulp-eslint')
var gulpif = require('gulp-if')
var path = require('path')
var watch = require('gulp-watch')

function handleResult(result) {
  result.messages.forEach(function(message) {
    if (message.fatal) {
      console.error(message.message + ' on line ' + message.line + ' of ' + result.filePath)
    }
  })
}

function fixLintableFile(vinyl) {
  if (vinyl.contents) {
    gulp.src(vinyl.path)
      .on('error', function() {}) // Prevent a crash. Let eslint.result report the error.
      .pipe(eslint({fix: true}))
      .pipe(eslint.result(handleResult))
      .pipe(gulpif(wasFixedByEslint, gulp.dest(path.dirname(vinyl.path))))
  }
}

function wasFixedByEslint(vinyl) {
  return vinyl.eslint && vinyl.eslint.fixed
}

module.exports = function(taskName, globsToWatch) {
  taskName = taskName || 'eslint-auto-fix'
  globsToWatch = globsToWatch || ['**/*.js', '!**/node_modules', '!**/bower_components']

  return gulp.task(taskName, function() {
    return watch(globsToWatch, fixLintableFile)
  })
}
