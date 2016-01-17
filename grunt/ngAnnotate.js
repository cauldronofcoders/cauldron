module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= package.path.tmp %>/concat/scripts',
      src: '*.js',
      dest: '<%= package.path.tmp %>/concat/scripts'
    }]
  }
};
