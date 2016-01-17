module.exports = {
  exclude: {
    options: {
      jshintrc: '.jshintrc',
      complexity: {
        logicalor: true,
        switchcase: true,
        forin: false,
        trycatch: false,
        newmi: true
      }
    },
    src: ['<%= package.path.app %>/scripts/**/*.js',
        '!<%= package.path.app %>/scripts/vendor/**/*.js'],
    dest: 'dist/plato_reports/report_rebellion'
  }
};
