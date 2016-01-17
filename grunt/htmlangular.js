module.exports = {
  options: {
    tmplext: '.html',
    reportpath: null,
    relaxerror: [
      'not allowed on element',
      '{{',
      'Element img is missing required attribute src.',
      'Empty heading.',
      'capture=camera'
    ],
    customtags: ['*']
  },
  files: {
    src: ['<%= package.path.app %>/scripts/**/*.html'],
  }
};
