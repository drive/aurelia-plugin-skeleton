let gulp = require('gulp');
let replace = require('gulp-replace');
let typescript = require('gulp-typescript');
let sourcemaps = require('gulp-sourcemaps');
let Karma = require('karma').Server;
let paths = require('../paths');

const transpile = (src, dst) => {
    let project = typescript.createProject('tsconfig.json', {
        module: 'amd'
    });

    let result = gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(project())

    return result.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dst));
}

let buildSrc = () => transpile(paths.source, paths.test.output + 'src');
let buildTests = () => transpile(paths.test.source, paths.test.output + 'test');

let karmaConfigFile = __dirname + '/../../karma.conf.js';

let karma = (done) => new Karma({
    configFile: karmaConfigFile,
    singleRun: true
}, done).start();

let karmad = (done) => new Karma({
    configFile: karmaConfigFile,
    singleRun: false
}, done).start();

let run = gulp.series(
    gulp.parallel(buildSrc, buildTests),
    karma);

let watchSrc = (done) => {
    gulp.watch(
        paths.source,
        buildSrc
    );
    done();
}

let watchTests = (done) => {
    gulp.watch(
        paths.test.source,
        buildTests
    );
    done();
}

let watch = gulp.series(
    gulp.parallel(buildSrc, buildTests),
    gulp.parallel(watchSrc, watchTests),
    karmad);

module.exports = {
    run: run,
    watch: watch
};