'use strict';

// # Config/Tasks
// Added test comments to test jenkins plungin
// All Grunt tasks are now stored in /grunt.
// registerTask has been replaced by /grunt/aliases.js
//
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
var replaceBuildChannel = require('./grunt/build-channel/replace-build-channel');

module.exports = function (grunt) {

  grunt.option('force', false);
  grunt.defaultApp = 'app1';

  var app = grunt.option('a') || grunt.option('app') || grunt.defaultApp;
  replaceBuildChannel.init(app);
  require('time-grunt')(grunt);
  require('load-grunt-config')(grunt, {
    data: {
      env: grunt.option('env') || 'local',
      appConfiguration: loadAppConfiguration('./app-configurations/' + app + '.json', grunt)
    },
    jitGrunt: {
      staticMappings: {
        removelogging: 'grunt-remove-logging',
        useminPrepare: 'grunt-usemin',
        ngtemplates: 'grunt-angular-templates',
        protractor: 'grunt-protractor-runner'
      }
    }
  });
};

/**
 * Add a prefix to every item in the list, taking in account the possible negation ("!").
 **/
var addPrefixToPath = function (list, prefix) {
  var newList = [];
  list.forEach(function (item) {
    if (item.startsWith('!')) {
      newList.push('!' + prefix + item.substring(1));
    } else {
      newList.push(prefix + item);
    }
  });
  return newList;
};

/**
 * If the channel configuration isn't specified or doesn't exist, load everything.
 **/
var loadAppConfiguration = function (dep, grunt) {
  var appConfiguration;
  if (grunt.cli.tasks.toString().indexOf('unit') !== -1) {
    appConfiguration = loadFullConfiguration(grunt);
  } else {
    try {
      appConfiguration = require(dep);
    } catch (e) {
      appConfiguration = loadFullConfiguration(grunt);
    }
  }
  appConfiguration.appjs = addPrefixToPath(appConfiguration.js, 'app/');
  appConfiguration.appless = addPrefixToPath(appConfiguration.less, 'app/');
  appConfiguration.apphtml = addPrefixToPath(appConfiguration.html, 'app/');
  return appConfiguration;
};

var loadFullConfiguration = function (grunt) {
  grunt.log.warn('Loading full configuration.');
  return {
    js: ['scripts/**/*.js'],
    less: ['**/*.less'],
    html: ['**/*.html'],
  };
};

//Grunt utility
String.prototype.startsWith = function (prefix) {
  return this.indexOf(prefix) === 0;
};

String.prototype.endsWith = function (suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.contains = function (content) {
  return this.indexOf(content) !== -1;
};
