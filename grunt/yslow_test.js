var yslowTest = module.exports = {};
var fs = require('fs');

yslowTest.createYSlowTask = function (grunt) {
  var app = grunt.option('a') || grunt.option('app');
  var folder = 'report/yslow/';
  if (app) {
    folder += app + '/';
  }
  var states = require('../.tmp/states.json');
  var urls = [];
  var reports = [];
  states.forEach(function (state) {
    urls.push('\'http://localhost:9002' + state.href + '\'');
    reports.push(folder + state.name + '.txt');
  });
  grunt.config.data.yslow_test.generated = {
    options: {
      info: 'all',
      format: 'tap',
      urls: urls,
      reports: reports
    }
  };
};
