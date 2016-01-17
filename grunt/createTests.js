var fs = require('fs');
var _ = require('lodash');

module.exports = function (grunt) {
  grunt.task.registerTask('create_tests', function () {
    //var data = fs.readFileSync('.tmp/url.txt');
    var states = JSON.parse(fs.readFileSync('test/e2e/states.json'));

    if (fs.existsSync('.tmp/test') === false) {
      fs.mkdirSync('.tmp/test');
    }
    if (fs.existsSync('.tmp/test/e2e') === false) {
      fs.mkdirSync('.tmp/test/e2e');
    }
    var test_tmpl = fs.readFileSync('test/e2e/test-template.txt', {encoding: 'utf8'});

    _.forOwn(states, function (state) {
      var test = _.template("it('${state_name}', function () {page('${state_name}','${url}');});\n");
      test_tmpl = test_tmpl + test({'state_name':state.stateName, 'url':state.url});;
    });

    test_tmpl = test_tmpl + '});'; // close describe
    fs.writeFileSync('.tmp/test/e2e/states.spec.js', test_tmpl);

  });
};
