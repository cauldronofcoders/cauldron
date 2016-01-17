'use strict';

var fs = require('fs');
module.exports = function (grunt) {
  return {
    'serve': function (options) {
      var configSetupSuccess = require('./build-channel')(grunt);
      if (!configSetupSuccess) {
        return;
      }
      if (options === 'dist') {
        return grunt.task.run(['build', 'connect:dist:keepalive']);
      }

      grunt.task.run([
        'clean:server', //Clean out .tmp
        'concurrent:validateAndCopyFilesToTemp', //jshint, jscs, copy to tmp, compile less
        'updateModules', //Inject angular modules into app.js
        'injectDependencies', //Inject bower components, JS, and CSS into index.html
        'autoprefixer', //Add browser prefixes to css properties.
        'connect:livereload',
        //'browserSync:dev', //Load browser with sync across multiple browsers.
        'watch' //Watch for dependency changes
      ]);
    },
    'servemodule': function (options) {
      grunt.task.run([
        //Prepare
        'clean:server',
        //Copy Resources to Temporary Folder
        'less',
        'copy:appToTmp',
        //Inject JS,CSS, and Bower Components
        'updateModules',
        'injector:serveminimaljs',
        'injector:vendorjs',
        'injector:css',
        'wiredep:app',
        //Modify Temporary Resources
        'autoprefixer',
        //'connect:livereload',
        'browserSync:dev',
        'watch'
      ]);
    },
    'test': function (options) {
      grunt.task.run('clean:server', 'copy:appToTmp', 'updateModules', 'injector:js', 'injector:vendorjs');
      switch (options) {
      case 'dev':
        grunt.task.run(
          'karma:dev'
        );
        break;
      case 'unit':
        grunt.task.run(
          'autoprefixer',
          'connect:test',
          'karma:unit'
        );
        break;
      case 'e2e':
        grunt.task.run(
          'protractor'
        );
        break;
      case 'jsload':
        grunt.task.run(
          'protractor:init'
        );
        break;
      case 'coverage':
        grunt.task.run(
          'karma:dev'
        );
        break;
      case 'unitphantom':
        process.env['browser'] = 'PhantomJS';
        process.env['REPORTERS'] = ['progress'];
        var tasks = ['autoprefixer', 'connect:test'];
        var subdirs = fs.readdirSync('test/unit');
        subdirs.forEach(function (subdir) {
          var stats = fs.statSync('test/unit/' + subdir);
          if (stats.isDirectory()) {
            var name = 'phantom-' + subdir;
            tasks.push(name);
            grunt.registerTask(name, function () {
              process.env['subdir'] = subdir;
              console.log(subdir);
              grunt.task.run('karma:unit');
            });
          }
        });
        if (tasks) {
          grunt.task.run(tasks);
        }

        break;
      default:
        grunt.task.run(
          'karma:unit',
          'test:coverage',
          'test:e2e'
        );
      }
    },
    'build-less': [
      'clean:server',
      'less',
      'autoprefixer'
    ],
    'updateModules': function () {
      var updateModules = require('./build-channel/update-modules');
      updateModules.run(grunt);
    },
    injectDependencies: [
      //Tasks for injecting dependencies into index.html
      'injector:js',
      'injector:vendorjs',
      'injector:css',
      'wiredep:app',
    ],
    prepareAssetsInTmp: [
      //Tasks for preparing JS, CSS, and HTML in the .tmp directory for distribution
      'injectDependencies',
      'autoprefixer',
      'removelogging',
      'useminPrepare',
      'ngtemplates',
      'concat:generated',
      'ngAnnotate',
      'cssmin:generated',
      'uglify:generated',
      'usemin',
      //,'imagemin'
    ],
    'build': function (command) {
      if (command === 'all') {
        var shellCommands = require('./shell').commands;
        var commands = ['clean:channels'];
        commands = commands.concat(shellCommands);
        return grunt.task.run(commands);
      }

      grunt.task.run(
        'clean:dist',
        'concurrent:validateAndCopyFilesToTempDist',
        'updateModules',
        'prepareAssetsInTmp',
        'copy:tmpToDist' //,
        //'run_uncss'
      );
    },
    'default': [
      'newer:jshint',
      'test',
      'build'
    ],
    'analyze': function (options) {
      switch (options) {
      case 'full':
        grunt.task.run('jshint:analyze', 'htmlangular', 'lesslint');
        break;
      case 'html':
        grunt.task.run('htmlangular');
        break;
      case 'less':
        grunt.task.run('lesslint');
        break;
      default:
        grunt.task.run('plato', 'jshint:analyze');
      }
    },
    'format': function () {
      grunt.task.run('jsbeautifier');
    },
    'doc': function () {
      grunt.task.run('ngdocs');
    },
    'responsive_image': function () {
      grunt.task.run('responsive_images:all');
    },
    'update_pdl_report': function () {
      grunt.task.run('updateProtactorReport');
    },
    'run_selenium': function () {
      grunt.task.run('shell:install_or_update_selenium', 'shell:start_selenium');
    },
    'team-analysis': function () {
      require('./build-channel/team-analysis')(grunt);
    },
    createYSlowTask: function () {
      require('./yslow_test').createYSlowTask(grunt);
    },
    yslow: function (command) {
      if (command === 'dist-channels') {
        var tasks = ['clean:dist', 'clean:yslowReports', 'connect:distclosed'];
        var channels = require('./build-channel/build-util').getAllChannelNames();
        channels.forEach(function (channel) {
          //Recursively call self with each channel to run below else if statement.
          tasks.push('yslow:' + channel);
        });
        grunt.task.run(tasks);
      } else if (command) {
        var channel = command;
        //Captures each call per channel, copies dist channel to dist folder and runs yslow against it.
        var commandName = 'distChannel' + channel + 'ToDist';
        grunt.config.data.copy[commandName] = {
          expand: true,
          dot: true,
          src: ['**/*.*'],
          dest: '<%= package.path.dist %>',
          cwd: 'dist-channels/' + channel
        };
        grunt.option('a', channel);
        grunt.task.run(
          'copy:' + commandName,
          'shell:phantom_state_information',
          'createYSlowTask',
          'yslow_test:generated'
        );
      } else {
        grunt.task.run(
          'clean:yslowReports',
          'connect:distclosed',
          'shell:phantom_state_information',
          'createYSlowTask',
          'yslow_test:generated'
        );
      }

    },
    reports: ['accessibility-report', 'yslow', 'jscpd-report', 'concurrent:buildMetaTasks'],
    'jscpd-report': function () {
      grunt.registerTask('jscpdreporter', ['grunt-jscpd-reporter']);
      grunt.task.run(
        //perform jscpd
        'exec',
        //Convert xml to html report
        'jscpdreporter'
      );
    },
    'accessibility-report': [
      'shell:phantom_state_information',
      'accessibility',
      'buildAccessibilityReport'
    ],
    buildAccessibilityReport: function () {
      var accessibilityReport = require('./accessibility-report/accessibility-report');
      accessibilityReport.generateReport();
    },
    'run_pdl_state_tests': function () {
      grunt.task.run('create_tests', 'protractor:states');
    },
    createHtmlSnapshotAll: function () {
      require('./htmlSnapshot').createHtmlSnapshotAll(grunt);
    },
    'run_uncss': function () {
      grunt.task.run([
        'connect:distclosed',
        'shell:phantom_state_information',
        'createHtmlSnapshotAll',
        'htmlSnapshot',
        'copy:cssToSnapshots',
        'uncss',
        'cssmin:dist'
      ]);
    }
  };
};
