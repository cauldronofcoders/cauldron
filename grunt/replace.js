module.exports = {
  distCss: {
    options: {
      patterns: [
        {
          match: /\([^'^\)^(^"]*?fonts\//g,
          replacement: '(../fonts/'
        },
        {
          match: /\.\.\/bower_components\/bootstrap\/fonts\//g,
          replacement: '../fonts/'
        },
        {
          match: /\(['"]fonts\/([^'^"^\)^\(]*?)['"]\)/g,
          replacement: '(fonts/$1)'
        }
      ]
    },
    files: [{
      expand: true,
      cwd: '<%= package.path.tmp %>',
      src: ['styles/**.css','**/*.css'],
      dest: '<%= package.path.tmp %>'
    }]
  },
  distIndex: {
    options: {
      patterns: [
        {
          match: /[\r\n]+/g,
          replacement: '\r\n'
        },
        {
          match: /,app/g,
          replacement: ''
        }
      ]
    },
    files: [
      {src: ['<%= package.path.tmp %>/index.html'], dest: '<%= package.path.tmp %>/index.html'}
    ]
  },
  dist: {
    options: {
      patterns: [
        {
          match: /\/?scripts\/([^\.]*?)(\/views)?\/([^\/^'^"]*?).html/g,
          replacement: 'views/$1/$3.html'
        }
      ]
    },
    files: [{
      expand: true,
      cwd: '<%= package.path.tmp %>',
      src: ['**/*.{js,html,json,css}'],
      dest: '<%= package.path.tmp %>'
    }]
  }
};
