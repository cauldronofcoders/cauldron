module.exports = {
  dist: {
    src: [
      '<%= package.path.dist %>/scripts/{,*/}*.js',
      '<%= package.path.dist %>/styles/{,*/}*.css',
      //'<%= package.path.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
      '<%= package.path.dist %>/styles/fonts/*'
    ]
  }
};
