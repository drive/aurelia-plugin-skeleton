Error.stackTraceLimit = 0;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

__karma__.loaded = function () {};

var builtPaths = ['/base/dist'];

function isJsFile(path) {
    return path.slice(-3) == '.js';
  }

function isBuiltFile(path) {
    return isJsFile(path) &&
            builtPaths.reduce(function(keep, bp) {
              return keep || (path.substr(0, bp.length) === bp);
            }, false);
  }

function isSpecFile(path) {
    return /\.spec\.(.*\.)?js$/.test(path);
}

var allSpecFiles = Object.keys(window.__karma__.files)
    .filter(isBuiltFile)
    .filter(isSpecFile);

SystemJS.config({
    baseURL: 'base'
});

System.import('karma.systemjs.conf.js')
    .then(initTesting);

function initTesting() {
    return Promise.all(
            allSpecFiles.map(function (moduleName) {
                return System.import(moduleName);
            })
        )
        .then(__karma__.start, __karma__.error);
}