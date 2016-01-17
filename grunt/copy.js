var package = require('../package.json');
var replaceBuildChannel = require('./build-channel/replace-build-channel');
var src = package.path.app + '/';
var dest = package.path.tmp + '/';
var processHtmlAndJs = function(content, srcpath) {
  if (srcpath.endsWith('.html')) {
    content = replaceBuildChannel.setupChannelUrl(content);
    return replaceBuildChannel.removeChannelComments(content);
  }
  else if (srcpath.endsWith('.js')) {
    return replaceBuildChannel.setupChannelUrl(content);
  }
  else {
    return content;
  }
};

module.exports = {
  envConfig: {
    files: [{
      src: '<%= package.path.env %>/config.<%= env %>',
      dest: '<%= package.path.tmp %>/scripts/config.js'
    }]
  },
  appToTmp: {
    options: {
      process: processHtmlAndJs,
      noProcess: ['*{,*/*}.*','!*{,*/*}.{js,html}']
    },
    files: [
      {
        expand: true,
        dot: true,
        cwd: src,
        dest: dest,
        src: [
          '*.{ico,png,txt}',
          '**/*.{json,css}',
          '.htaccess',
          'images/{,*/}*.*',
          'index.html'
        ]
      },
      {
        expand: true,
        dot: true,
        cwd: src,
        dest: dest,
        src: '<%= appConfiguration.js %>'
      },
      {
        expand: true,
        dot: true,
        cwd: src,
        dest: dest,
        src: '<%= appConfiguration.html %>'
      },
      {
        expand: true,
        cwd: '.',
        src: [
          'bower_components/bootstrap/fonts/*',
          'bower_components/fontawesome/fonts/*',
          src + 'styles/fonts/*'
        ],
        flatten: true,
        dest: dest + 'styles/fonts'
      },
      {
        expand: true,
        cwd: './redesign',
        src: '**',
        dest: dest + 'redesign/'
      }]
  },
  karma: {
    unit: {
      configFile: 'karma.conf.js',
      singleRun: true
    }
  },
  tmpToDist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= package.path.tmp %>',
      dest: '<%= package.path.dist %>',
      src: [
        '**/*.{ico,png,txt,json}',
        '.htaccess',
        'images/{,*/}*.*',
        'index.html',
        'scripts/config.js'
      ]
    }, {
        expand: true,
        cwd: '.',
        src: '<%= package.path.tmp %>/styles/fonts/*',
        flatten: true,
        dest: '<%= package.path.dist %>/styles/fonts'
    }]
  },
  //The below are used by watch.js for livereloading of resources.
  htmlReload: {
    options: {
      process: processHtmlAndJs
    },
    files: [{
      expand: true,
      dot: true,
      cwd: src,
      dest: dest,
      src: '<%= appConfiguration.html %>',
    }]
  },
  jsReload: {
    options: {
      process: processHtmlAndJs
    },
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= package.path.app %>',
      src: '<%= appConfiguration.js %>',
      dest: '<%= package.path.tmp %>/'
    }]
  },
  imageReload: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= package.path.app %>',
      src: ['**/*.{png,jpg,jpeg,gif,webp,svg}'],
      dest: '<%= package.path.tmp %>/'
    }]
  },
  cssReload: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= package.path.app %>',
      src: ['**/*.css'],
      dest: '<%= package.path.tmp %>/'
    }]
  },
  channel: {
    expand: true,
    dot: true,
    cwd: '<%= package.path.dist %>',
    src: ['**/*.*'],
    dest: 'dist-channels/' + replaceBuildChannel.app
  },
  cssToSnapshots: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= package.path.dist %>',
      src: ['*{,*/*}.css'],
      dest: '<%= package.path.tmp %>/snapshots/'
    },
    {
      expand: true,
      dot: true,
      cwd: '<%= package.path.tmp %>/styles/',
      src: ['*{,*/*}.css'],
      dest: '<%= package.path.tmp %>/snapshots/styles'
    }]
  }
};
