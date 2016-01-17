module.exports = {
  dist: {
    siteRoot: './dist',
    homepage: 'http://localhost:9000/#!/',
    pattern: ['app/**/*.html', '!node_modules/**/*.html', '!bower_components/**/*.html'], // this will exclude 'google*.html'
    changefreq: 'weekly',
    lastMod: '2014-10-18T09:54:31.000Z',
    priority: '1.0',
  }
};
