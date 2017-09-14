module.exports = function (config) {
    let files = [
        'node_modules/core-js/client/core.js',
        'node_modules/systemjs/dist/system.src.js',
        'karma.test.shim.js',
        { pattern: 'karma.systemjs.conf.js', included: false, watched: false },
        { pattern: 'dist/test/**/*.js', included: false, watched: true },
        { pattern: 'node_modules/**/*.js', included: false, watched: false },
    ];

    config.set({
        basePath: './',
        frameworks: ['jasmine'],
        files: files,
        exclude: [],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};