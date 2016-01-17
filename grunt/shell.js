var fs = require('fs');
var path = require('path');
var phantomJSExePath = function () {
  var phantomSource = require('phantomjs').path;
  if (path.extname(phantomSource).toLowerCase() === '.cmd') {
    return path.join(path.dirname(phantomSource), '//node_modules//phantomjs//lib//phantom//phantomjs.exe');
  }
  return phantomSource;
};

var DEFAULT_CMD = {
  linux: require('phantomjs').path,
  darwin: require('phantomjs').path,
  win32: phantomJSExePath()
};

var phantomCommand = DEFAULT_CMD[process.platform];


var getChannels = function () {
  var channels = [];
  var appConfigFiles = fs.readdirSync('./app-configurations');
  appConfigFiles.forEach(function (appConfigFile) {
    if (appConfigFile.endsWith('.json')) {
      channels.push(appConfigFile.substring(0, appConfigFile.length - 5));
    }
  });
  return channels;
};

var createBuildChannelCommands = function () {
  var channels = getChannels();
  shell.commands = [];
  channels.forEach(function (channel) {
    var commandName = 'build_' + channel;
    shell.commands.push('shell:' + commandName);
    shell[commandName] = {
      command: 'grunt build -a ' + channel + ' && grunt copy:channel -a ' + channel,
      options: {
        execOptions: {
          maxBuffer: Infinity
        }
      }
    }
  });
};

var shell = module.exports = {
  install_or_update_selenium: {
    command: 'node ./node_modules/protractor/bin/webdriver-manager update',
    options: {
      stdout: true
    }
  },
  start_selenium: {
    command: 'webdriver-manager start'
  },
  phantom_state_information: {
    command: phantomCommand + ' ./grunt/accessibility-report/phantom-state-information.js'
  }
};

createBuildChannelCommands();
