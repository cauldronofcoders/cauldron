module.exports = {
  src: ['<%= package.path.app %>/styles/less/**.less'],
  options: {
    csslint: {
      'known-properties': false
    }
  }
};
