var modRewrite = require('connect-modrewrite');
var supportHtml5Mode = modRewrite(['^[^\\.]*$ ./ [L]']);
module.exports = function (grunt) {
  'use strict';
  return {
    options: {
      port: 9000,
      // Change this to '0.0.0.0' to access the server from outside.
      hostname: 'localhost',
      livereload: 35729
    },
    livereload: {
      options: {
        open: true,
        middleware: function (connect) {
          return [
            supportHtml5Mode,
            connect.static(grunt.config.data.package.path.tmp),
            connect().use(
              '/bower_components',
              connect.static('./bower_components')
            ),
            connect().use(
              '/node_modules',
              connect.static('./node_modules')
            )
          ];
        }
      }
    },
    test: {
      options: {
        port: process.env['PROTRACTOR_RUNNER_PORT'] || 9002,
        middleware: function (connect) {
          return [
            supportHtml5Mode,
            connect().use(
              '/bower_components',
              connect.static('./bower_components')
            ),
            connect.static(grunt.config.data.package.path.tmp),
            connect.static('test'),
            connect.static(grunt.config.data.package.path.app)
          ];
        }
      }
    },
    dist: {
      options: {
        open: true,
        base: '<%= package.path.dist %>',
        middleware: function (connect) {
          return [
            supportHtml5Mode,
            connect.static('dist')
          ];
        }
      }
    },
    distclosed: {
      options: {
        port: 9002,
        useAvailablePort: true,
        base: '<%= package.path.dist %>',
        middleware: function (connect) {
          return [
            supportHtml5Mode,
            connect.static('dist')
          ];
        }
      }
    }
  };
};
