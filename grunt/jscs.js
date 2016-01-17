module.exports = {
  options: {
    config: '.jscsrc',
    'excludeFiles': [
      //Igonore Constant files in app-core folder & Vendor
      '<%= package.path.app %>/scripts/vendor/**',
      '<%= package.path.app %>/scripts/app-core/**'

    ]
  },
  all: {
    src: [
      '<%= package.path.app %>/scripts/**/*.js'
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
