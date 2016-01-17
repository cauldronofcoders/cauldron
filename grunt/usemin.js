module.exports = {
  html: ['<%= package.path.tmp %>/{,*/}*.html'],
  css: ['<%= package.path.tmp %>/styles/{,*/}*.css'],
  options: {
    assetsDirs: ['<%= package.path.tmp %>', '<%= package.path.tmp %>/images']
  }
};
