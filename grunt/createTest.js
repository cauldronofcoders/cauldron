var fs = require('fs');
var _ = require('lodash');

module.exports = function (grunt) {
  grunt.task.registerTask('create_tests', function () {
    var states = JSON.parse(fs.readFileSync('test/e2e/state-configuration.json'));

    if (fs.existsSync('.tmp/test') === false) {
      fs.mkdirSync('.tmp/test');
    }
    if (fs.existsSync('.tmp/test/e2e') === false) {
      fs.mkdirSync('.tmp/test/e2e');
    }
    var test_tmpl = fs.readFileSync('test/e2e/test-template.txt', {encoding: 'utf8'});
    var page_attributes = ['pageName', 'pageID', 'pageType', 'primaryCategory', 'subCategory'];

    _.forOwn(states, function (state) {
      var code = "describe('${state_name}', function() {\n";

      code += "it('visit ${state_name} page', function (){\n" +
        "  var abs_url = base_url + '${url}';\n" +
        "  browser.get(abs_url);\n" +
        "});\n";

      _.each(page_attributes, function (attr) {
        code += "it('" + attr + "', function (){\n" +
          "  pageInfo('${state_name}','" + attr + "');\n" +
          "});\n";
      });

      code += "});\n";

      var tmpl = _.template(code);
      var url = '/' + state.stateName;
      test_tmpl = test_tmpl + tmpl({'state_name': state.stateName, 'url': url});
    });

    test_tmpl = test_tmpl + '});'; // close describe
    fs.writeFileSync('.tmp/test/e2e/states.spec.js', test_tmpl);

  });
};
