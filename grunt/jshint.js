module.exports = {
  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish'),
    ignores: '<%= package.path.app %>/scripts/vendor/**/*.js'
  },
  all: {
    src: [
      '<%= package.path.app %>/scripts/**/*.js',
      '!<%= package.path.app %>/scripts/angular-seo.js'
    ]
  },
  allReload: {
    options: {
      force: true
    },
    src: [
      '<%= package.path.app %>/scripts/**/*.js',
      '!<%= package.path.app %>/scripts/angular-seo.js'
    ]
  },
  test: {
    options: {
      jshintrc: 'test/.jshintrc'
    },
    src: ['test/unit/**/*.js']
  },
  analyze: {
    options: {
      force: true
    },
    src: [
      'Gruntfile.js',
      'grunt/{,*/}**.js',
      '<%= package.path.app %>/scripts/**/*.js',
      'test/unit/**/*.js'
    ]
  }
};
