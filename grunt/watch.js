var grunt = require('grunt');
/**
 * @params:module Name passes on command line
 * @Description: To run specific modules if servemodule is used as grunt task during development
 */

var getTasksList = function() {
  var tasks = [];
  if (grunt.option('moduleName') !== undefined) {
    tasks = ['newer:jshint:all','copy:jsReload','updateModules','injector:serveminimaljs', 'injector:servevendorjs'];
  } else if (grunt.option('fast') !== undefined) {
    tasks = ['newer:copy:jsReload', 'newer:jshint:allReload'];
  }else {
    tasks = ['newer:copy:jsReload', 'updateModules','injector:js', 'injector:vendorjs', 'newer:jshint:allReload'];
  }
  return tasks;
};

var lessTask = 'less:app';
if (grunt.option('a') && (grunt.option('a') === 'redesk' || grunt.option('a') === 'care')) {
  lessTask = 'less:appRep';
} else if (grunt.option('a') && grunt.option('a') === 'remo') {
  lessTask = 'less:appRemo';
}

module.exports = {
  bower: {
    files: ['bower.json'],
    tasks: ['wiredep'],
    options: {
      livereload: true
    }
  },
  html: {
    files: '<%= appConfiguration.apphtml %>',
    tasks: ['newer:copy:htmlReload'],
    options: {
      livereload: true
    }
  },
  css: {
    files: ['<%= package.path.app %>/styles/**/*.css'],
    tasks: ['copy:cssReload', 'injector:css'],
    options: {
      livereload: true
    }
  },
  images: {
    files: ['<%= package.path.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'],
    tasks: ['newer:copy:imageReload'],
    options: {
      livereload: true
    }
  },
  js: {
    files: '<%= appConfiguration.appjs %>',
    tasks: getTasksList(),
    options: {
      livereload: true
    }
  },
  less: {
    files: '<%= appConfiguration.appless %>',
    tasks: [lessTask, 'autoprefixer', 'injector:css'],
    options: {
      livereload: true
    }
  }
};
