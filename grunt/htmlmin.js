module.exports = {
  dist: {
    options: {
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeCommentsFromCDATA: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true
    },
    files: [{
      expand: true,
      cwd: '<%= package.path.tmp %>',
      src: ['*{,*/*}.html'],
      dest: '<%= package.path.dist %>'
    }]
  }
};
