module.exports = {
  app: {
    options: {
      paths: ["styles/less/"],
      cleancss: true,
      modifyVars: "<%= appConfiguration.modifyVars %>"
    },
    files: [{
      expand: true,
      cwd: "<%= package.path.app %>/styles",
      src: "<%= appConfiguration.less %>",
      dest: "<%= package.path.tmp %>/styles",
      ext: ".css"
    }]
  }
};
