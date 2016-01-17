module.exports = {
  css: {
    options: {
      browsers: ['> 5%', 'last 3 versions']
    },
    files: [{
      expand: true,
      cwd: '<%= package.path.tmp %>/styles/',
      src: '{,*/}*.css',
      dest: '<%= package.path.tmp %>/styles/'
    }]
  }
};
