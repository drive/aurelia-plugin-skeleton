let sourceRoot = 'src/';
let outputRoot = 'dist/';
let testRoot = 'test/';

module.exports = {
  root: sourceRoot,
  source: [ sourceRoot + '**/*.js', sourceRoot + '**/*.ts' ],
  html: sourceRoot + '**/*.html',
  css: sourceRoot + '**/*.css',
  style: 'styles/**/*.css',
  timestamp: sourceRoot + 'timestamp.txt',
  output: outputRoot,
  test: {
    source: [ testRoot + '**/*.js', testRoot + '**/*.ts'],
    output: outputRoot + 'test/'
  }
 };
