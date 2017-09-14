let gulp = require('gulp');
let replace = require('gulp-replace');
let typescript = require('gulp-typescript');
let sourcemaps = require('gulp-sourcemaps');
let paths = require('../paths');

const destEs2015 = paths.output + 'es2015';
const destAMD = paths.output + 'amd';
const destCJS = paths.output + 'commonjs';
const destSJS = paths.output + 'system';

let transpile = (options, dest) => {
    let project = typescript.createProject('tsconfig.json', options);

    let tsResult = gulp.src(paths.source)
        .pipe(sourcemaps.init())
        .pipe(project())

    return tsResult.js
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest(dest));
}

let html = () => {
    return gulp.src(paths.html)
        .pipe(gulp.dest(destEs2015))
        .pipe(gulp.dest(destAMD))
        .pipe(gulp.dest(destCJS))
        .pipe(gulp.dest(destSJS));
}

let css = () => {
    return gulp.src(paths.css)
        .pipe(gulp.dest(destEs2015))
        .pipe(gulp.dest(destAMD))
        .pipe(gulp.dest(destCJS))
        .pipe(gulp.dest(destSJS));
}

let es2015 = () => transpile({
    module: 'es2015'
}, destEs2015);

let amd = () => transpile({
    module: 'amd'
}, destAMD);

let commonjs = () => transpile({
    module: 'commonjs'
}, destCJS);

let system = () => transpile({
    module: 'system'
}, destSJS);

let timestamp = () => {
    return gulp.src(paths.timestamp)
        .pipe(replace('timestamp', Date.now()))
        .pipe(gulp.dest(destEs2015))
        .pipe(gulp.dest(destAMD))
        .pipe(gulp.dest(destCJS))
        .pipe(gulp.dest(destSJS))
}

let build = gulp.series(
    gulp.parallel(html, css, es2015, amd, commonjs, system),
    timestamp
);

let watchHtml = (done) => {
    gulp.watch(
        paths.html,
        gulp.series(html, timestamp)
    );
    done();
}

let watchCss = (done) => {
    gulp.watch(
        paths.css,
        gulp.series(css, timestamp)
    );
    done();
}

let watchSource = (done) => {
    gulp.watch(
        paths.source,
        gulp.series(
            gulp.parallel(es2015, amd, commonjs, system),
            timestamp)
    );
    done();
}

let watch = gulp.series(
    build,
    gulp.parallel(
        watchHtml,
        watchCss,
        watchSource
    )
);

module.exports = {
    run: build,
    watch: watch
};