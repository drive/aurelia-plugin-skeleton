SystemJS.config({
  map: {
    'systemjs': 'node_modules/systemjs/dist/system.src.js',
    'aurelia-framework': 'node_modules/aurelia-framework/dist/amd/aurelia-framework',
  },
  packages: {
    'dist/test': {
      defaultExtension: 'js'
    },
    'node_modules': {
      defaultExtension: 'js'
    }
  }
});