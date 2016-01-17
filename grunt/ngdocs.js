module.exports = {
  options:{
    dest : 'dist/ngDocs',
    html5Mode: false,
    scripts:['bower_components/angular/angular.js', 'bower_components/angular-animate/angular-animate.js'],
    title: 'Angular Documentation'
  },
  api: {
    src: ['<%= package.path.app %>/scripts/accessories-module/**/*.js'],
    //  src: ['<%= package.path.app %>/scripts/**/*.js'],
    title: 'API Documentation'
  }
}
