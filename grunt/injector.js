var package = require('../package.json');
var src = package.path.tmp + '/';
var app = package.path.app + '/';
var dest = package.path.tmp + '/';
var index = dest + 'index.html';
var injectorCssTag = '<!-- injector:css -->';
var injectorJsTag = '<!-- injector:js -->';
var injectorVendorJsTag = '<!-- injector:vendorjs -->';
var transformLink = function (replacement) {
  return function (filePath) {
    filePath = filePath.replace(replacement, '');
    return '<link rel="stylesheet" href="' + filePath + '">';
  };
};
var transformScript = function (replacement) {
  return function (filePath) {
    filePath = filePath.replace(replacement, '');
    return '<script src="' + filePath + '"></script>';
  };
};
var grunt = require('grunt');
var modulesArr = [];
/**
 * @params:module Name passes on command line
 * @Description: This fucntion will inject below list of modules plus the list of modules passed as command line paramareter
 * */
var injectModules = function (modules) {
  var moduleName = grunt.option('moduleName') !== undefined ? grunt.option('moduleName') : '';
  var minimalModules = [];
  minimalModules.push(src + 'scripts/angular-seo.js');
  minimalModules.push(src + 'scripts/app.js');
  minimalModules.push(src + 'scripts/config.js');
  minimalModules.push(src + 'scripts/route-config.js');
  minimalModules.push(src + 'scripts/app-bootstrap.js');
  minimalModules.push(src + 'scripts/exception-handler.js');
  minimalModules.push(src + 'scripts/facade-api-endpoints.js');
  minimalModules.push(src + 'scripts/session-config.js');
  minimalModules.push(src + 'scripts/**/*-config.js');
  minimalModules.push(src + 'scripts/common-module/**/*.js');
  minimalModules.push(src + 'scripts/channel-config-module/**/*.js');
  minimalModules.push(src + 'scripts/shop-module/shopping-cart-module/**/*.js');
  minimalModules.push(src + 'scripts/shop-module/credit-tool-module/**/*.js');
  minimalModules.push(src + 'scripts/manage-account-module/login-module/**/*.js');

  modulesArr = moduleName.split(',');
  for (var i = 0; i < modulesArr.length; i++) {
    minimalModules.push(src + 'scripts/' + modulesArr[i] + '/**/*.js');
  }
  minimalModules.push('!' + src + 'scripts/vendor/**/*');
  var files = {
    '<%= package.path.tmp %>/index.html': minimalModules
  }
  return files;
};


module.exports = {
  //Serve Commands
  serveminimaljs: {
    options: {
      starttag: injectorJsTag,
      transform: transformScript('/.tmp/'),
      template: index
    },
    files: injectModules()
  },
  //Build Commands
  css: {
    options: {
      starttag: injectorCssTag,
      transform: transformLink('/.tmp/'),
      template: index
    },
    files: {
      '<%= package.path.tmp %>/index.html': [
        src + 'styles/**/*.css',
        '!' + src + '/styles/vendor.css',
        '!' + src + '/styles/common.css',
        '!' + src + '/styles/common/**/*.css',
        '!' + src + '/styles/lazy-load/**/*.css'
      ]
    }
  },
  js: {
    options: {
      starttag: injectorJsTag,
      transform: transformScript('/.tmp/'),
      template: index
    },
    files: {
      '<%= package.path.tmp %>/index.html': [
        src + 'scripts/app.js',
        src + 'scripts/route-config.js',
        src + 'scripts/**/*-config.js',
        src + 'scripts/**/*.js',
        '!' + src + 'scripts/common-module/boomerang-module/boomerang-header.js',
        '!' + src + 'scripts/vendor/**/*'
      ]
    }
  },
  vendorjs: {
    options: {
      starttag: injectorVendorJsTag,
      transform: transformScript('/.tmp/'),
      template: index
    },
    files: {
      '<%= package.path.tmp %>/index.html': [
        src + 'scripts/vendor/*{,*/*}.js'
      ]
    }
  }
};
