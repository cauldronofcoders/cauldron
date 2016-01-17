module.exports = function (grunt) {
  var target_path;

  if (grunt.option('path')) {
    target_path = grunt.option('path');
  } else {
    target_path = 'app/scripts/**/*.js';
  }

  return {
    options: {
      configFile: 'eslint/eslint.json',
      rulePaths: ['eslint/rules'],
      reset: true,
      ignore: true,
      format: require('eslint-html-reporter'),
      outputFile: 'eslint/report.html'
    },
    target: target_path
  };
};
