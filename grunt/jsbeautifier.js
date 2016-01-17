module.exports = function (grunt, data) {
  'use strict';
  var parts = String(grunt.cli.tasks[0]).split(':');

  if (parts && parts[0] && parts[0] === 'format') {
    var moduleName = (parts.length > 0) ? parts[1] : undefined;
    var fileList = [];

    if (moduleName === undefined) {
      grunt.fail.warn('No moduleName was specified. Use `grunt format:all` or `grunt format:module-name` where `module-name` is the name of the module you wish to format.');
    } else {
      var app = data.package.path.app;

      if (moduleName === 'all' || grunt.file.exists(app + '/scripts/' + ((moduleName === 'all') ? '' : moduleName + '/'))) {
        if (moduleName === 'all') {
          fileList.push(
            app + '/scripts/**/*.js'
          );
        } else {
          fileList.push(app + '/scripts/' + moduleName + '/**/*');
        }

        fileList.push('!' + app + '/scripts/vendor/**/*.js');

        return {
          files: fileList,
          options: {
            html: {
              fileTypes: ['.html'],
              braceStyle: 'collapse',
              indentScripts: 'keep',
              indentWithTabs: true,
              preserveNewlines: false,
              wrapLineLength: 0
            },
            css: {
              fileTypes: ['.less'],
              indentWithTabs: true
            },
            js: {
              fileTypes: ['.js'],
              braceStyle: 'collapse',
              breakChainedMethods: true,
              e4x: false,
              evalCode: false,
              indentSize: 2,
              indentChar: ' ',
              indentLevel: 0,
              indentWithTabs: false,
              jslintHappy: true,
              keepArrayIndentation: false,
              keepFunctionIndentation: false,
              maxPreserveNewlines: 2,
              preserveNewlines: true,
              spaceBeforeConditional: true,
              spaceInParen: false,
              unescapeStrings: false,
              wrapLineLength: 120
            }
          }
        };
      } else {
        grunt.fail.warn('The module `' + moduleName + '` does not exist.');
      }
    }
  }
};
