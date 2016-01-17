var package = require('../package.json');
var src = package.path.tmp + '/';

module.exports = {
  app: {
    src: ['<%= package.path.tmp %>/index.html'],
    ignorePath:  /\.\.\//,
    exclude: ['es5-shim', 'json3', 'bootstrap.css']
  }
};
