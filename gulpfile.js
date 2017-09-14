let gulp = require('gulp');
let build = require('./build/tasks/build');
let clean = require('./build/tasks/clean');
let test = require('./build/tasks/test');

let watch = process.argv.indexOf("--watch") != -1;

let buildTask = watch ? build.watch : build.run;
let testTask = watch ? test.watch : test.run;

gulp.task('build', gulp.series(clean, buildTask));
gulp.task('test', gulp.series(clean, testTask));