module.exports = {
  options: {
    configFile: "test/protractor-init.conf.js"
  },
  pdl: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
    options: {
      configFile: "test/protractor_config.js",
      args: {
        specs: ['test/e2e/pdl/*.js']
      }
    }
  },
  states: {
    options: {
      configFile: "test/protractor_config.js",
      args: {
        specs: ['.tmp/test/e2e/states.spec.js']
      }
    }
  }
};
