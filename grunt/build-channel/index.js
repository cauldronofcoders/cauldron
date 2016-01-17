module.exports = function (grunt) {
  var defaultApp = grunt.defaultApp;
  if (grunt.option('app')) {
    grunt.option('a', grunt.option('app'));
  } else if (!grunt.option('a') && !grunt.option('app')) {
    grunt.log.writeln('Application not defined. Setting application to default: ' + defaultApp);
    grunt.option('a', defaultApp);
  }
  var app = grunt.option('a');

  var configuration;
  try {
    configuration = require('../../app-configurations/' + app + '.json');
    configuration.app = app;
  } catch (e) {
    grunt.fail.warn('There is no application configuration named app-configurations/' + app + '.json that exists or is a valid json file.');
    return null;
  }
  return configuration;
};
