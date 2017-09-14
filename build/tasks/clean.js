let gulp = require('gulp');
let del = require('del');
let vinylPaths = require('vinyl-paths');
let paths = require('../paths');

let clean = () => {
  return gulp.src(paths.output + '*')
    .pipe(vinylPaths(del));
}

module.exports = clean;