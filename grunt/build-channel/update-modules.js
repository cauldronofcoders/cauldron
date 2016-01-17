/**
 * This task is responsible for two things:
 *  - Remove any undefined modules throughout the application.
 *  - Add any unusued modules that are defined in the application to app.js.
 *  - Perform multi
 * This functionality will run in the temporary directory through the run function.
 **/
var updateModules = module.exports = {};

var glob = require('glob');
//var fs = require('fs');
var fs = require('graceful-fs');
var async = require('async');

/**
 * Wrapping function to readFile that passes the utf8 parameter.
 * Made specifically for map within the getModuleDefinitions function.
 **/
var readFileUtf8 = function (file, cb) {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      err = null;
      data = '';
    }
    cb(err, data);
  });
};

var readFileUtf8WithFilename = function (file, cb) {
  readFileUtf8(file, function (err, data) {
    cb(err, {
      contents: data,
      filename: file
    });
  });
};
/**
 * Collect all the lines with module definitions in them.
 * Do a little bit of content cleansing, such as remove whitespace.
 **/
var getModuleDefinitions = function (pattern, cb) {
  glob(pattern, function (err, files) {
    if (err) {
      throw err;
    }
    async.map(files, readFileUtf8, function (err, data) {
      if (err) {
        throw err;
      }
      var definedModuleDefinitions = [];
      data.forEach(function (scriptsFileData) {
        scriptsFileData = scriptsFileData.replace(/[\n\r\s]/g, '').replace(/"/g, '\'');
        scriptsFileData = scriptsFileData.replace(/(\.module\([^\)]*?,.*?\))/g, '\n$1').split('\n');
        scriptsFileData.forEach(function (line) {
          if (line.indexOf('.module') == 0) {
            definedModuleDefinitions.push(line);
          }
        });
      });

      cb(definedModuleDefinitions);
    });
  });
};

/**
 * Find all module definitions throughout the application.
 * This will search the pattern.
 * Invokes the callback when completed.
 **/
var findDefinedModules = function (pattern, cb) {
  getModuleDefinitions(pattern, function (definedModuleDefinitions) {
    var definedModules = [];
    definedModuleDefinitions.forEach(function (moduleDefinition) {
      var moduleName = moduleDefinition.split("'")[1];
      definedModules.push(moduleName);
    });
    cb(definedModules);
  });
};

/**
 * Find all referenced modules (used as a dependency in a module definition).
 * This will search only the .tmp folder, as we only care about what we define.
 * Invokes the callback when completed.
 **/

var findReferencedModules = function (cb) {
  getModuleDefinitions('.tmp/**/*.js', function (definedModuleDefinitions) {
    var referencedModules = [];
    definedModuleDefinitions.forEach(function (moduleDefinition) {
      var curReferencedModules = moduleDefinition.split('[')[1].split(']')[0];
      curReferencedModules = curReferencedModules.replace(/'/g, '').split(',');
      curReferencedModules.forEach(function (curReferencedModule) {
        if (curReferencedModule && referencedModules.indexOf(curReferencedModule) === -1) {
          referencedModules.push(curReferencedModule);
        }
      });
    });
    cb(referencedModules);
  });
};

/**
 * Asynchronously read app.js.
 **/
var readAppJs = function (cb) {
  readFileUtf8('app/scripts/app.js', function (err, data) {
    if (err) {
      throw err;
    }
    cb(data);
  });
};

/**
 * Build a list of all defined but not referenced modules.
 **/
var findUnusedModules = function (definedModules, referencedModules) {
  var unusedModules = [];
  definedModules.forEach(function (definedModule) {
    if (definedModule && referencedModules.indexOf(definedModule) === -1) {
      unusedModules.push(definedModule);
    }
  });

  return unusedModules;
};

/**
 * Build a list of all referenced but not defined modules.
 **/
var findUndefinedModules = function (definedModules, referencedModules) {
  var undefinedModules = [];
  referencedModules.forEach(function (referencedModule) {
    if (definedModules.indexOf(referencedModule) === -1) {
      undefinedModules.push(referencedModule)
    }
  });
  return undefinedModules;
};

/**
 * Add all unused modules to app.js as dependencies to the main application.
 * This is what "injects" the modules into the application.
 **/
var addUnusedModulesSync = function (unusedModules, grunt, appJsData) {
  //Remove one line comments
  var moduleArray = appJsData.replace(/\/\/.*/g, '');
  //Remove all characters that we don't care about.
  moduleArray = moduleArray.replace(/[\n\r\s\'\"]/g, '')
    //Pull out the dependency array. This is assuming that it is the first array in the file.
  moduleArray = moduleArray.split('[')[1].split(']')[0]
    //Remove long comments and create the array.
  moduleArray = moduleArray.replace(/\/\*[\s\S]*?\*\//g, '').split(',');

  unusedModules.forEach(function (unusuedModule) {
    grunt.log.writeln('Injecting ' + unusuedModule + ' into app.js');
  });

  moduleArray = moduleArray.concat(unusedModules);
  moduleArray.forEach(function (module) {
    module = '\'' + module + '\'';
  });
  var dependencies = '';
  if (moduleArray.length > 0) {
    dependencies = '[\'' + moduleArray.join('\',\'') + '\']';
  }
  appJsData = appJsData.replace(/\[[\s\S]*?\]/, dependencies);

  if (!fs.existsSync('.tmp/scripts')) {
    fs.mkdirSync('.tmp/scripts');
  }
  fs.writeFileSync('.tmp/scripts/app.js', appJsData);
};

/**
 * Remove any modules that are never defined but are referenced
 * (i.e. They were channel specific and removed from the build)
 **/
var removeUndefinedModules = function (undefinedModules, cb) {
  var errorMessages = [];
  glob('.tmp/**/*.js', function (err, files) {
    if (err) {
      throw err;
    }
    async.map(files, readFileUtf8WithFilename, function (err, files) {
      if (err) {
        throw err;
      }
      files.forEach(function (file) {
        //Check to see if any file needs to be updated.
        var data = file.contents;
        var filename = file.filename;

        var foundReplacement = false;
        var after = data;
        undefinedModules.forEach(function (undefinedModule) {
          if (data.indexOf(undefinedModule) !== -1) {
            foundReplacement = true;
            var s = '[\\n\\r\\s]*?'; //possible whitespace between
            var modWithQuotes = "'" + s + undefinedModule + s + "'";
            var commaBefore = new RegExp(',' + s + modWithQuotes, 'g');
            var commaAfter = new RegExp(modWithQuotes + s + ',', 'g');
            var noComma = new RegExp(modWithQuotes, 'g'); //Match module as dependency by itself

            after = after.replace(commaBefore, '');
            after = after.replace(commaAfter, '');
            after = after.replace(noComma, '');
            if (after.indexOf(undefinedModule) !== -1) {
              console.log('The module ' + undefinedModule + ' is undefined for this channel, but it is still referenced.\n' + filename);
              errorMessages.push('The module ' + undefinedModule + ' is undefined for this channel, but it is still referenced.\n' + filename);
            }
          }
        });
        //Only rewrite the file and do I/O if the contents was changed.
        //Doing this synchronously as this is uncommon and cleans up the code for now...
        if (foundReplacement) {
          //console.log('Replacing contents in file ' + filename);
          fs.writeFileSync(filename, after);
        }
      });
      if (errorMessages.length) {
        var err = errorMessages.join('\n');
        throw err;
      }
      cb();
    });
  });
};

/**
 * Add all the exported functions.
 **/

/**
 * Inject modules and remove undefined modules.
 **/
updateModules.run = function (grunt) {
  var done = grunt.task.current.async();
  async.parallel([
    function (cb) {
      findDefinedModules('{.tmp,bower_components}/**/*.js', function (definedModules) {
        cb(null, definedModules);
      });
    },
    function (cb) {
      findDefinedModules('.tmp/**/*.js', function (definedModules) {
        cb(null, definedModules);
      });
    },
    function (cb) {
      findReferencedModules(function (referencedModules) {
        cb(null, referencedModules);
      });
    },
    function (cb) {
      readAppJs(function (data) {
        cb(null, data);
      });
    }
  ], function (err, results) {
    if (err) {
      throw err;
    }
    var allDefinedModules = results[0];
    var applicationDefinedModules = results[1];
    var referencedModules = results[2];
    var appJsData = results[3];
    var unusedModules = findUnusedModules(applicationDefinedModules, referencedModules);
    var undefinedModules = findUndefinedModules(allDefinedModules, referencedModules);
    //console.log('Defined Modules: ', applicationDefinedModules);
    //console.log('referenced Modules: ', referencedModules);
    //console.log('Unused Modules: ', unusedModules);
    //console.log('Undefined Modules: ', undefinedModules);
    addUnusedModulesSync(unusedModules, grunt, appJsData);
    removeUndefinedModules(undefinedModules, function () {
      done();
    });
  });
};
