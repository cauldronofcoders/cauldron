var fs = require('fs');
var _ = require('lodash');

module.exports = function (grunt) {
  grunt.task.registerTask('updateProtactorReport', function () {

    var test_tmpl = fs.readFileSync('test/screenshots/report.html', {encoding: 'utf8'});

    var firstindex = test_tmpl.indexOf("Test Results");

    var test_tmpl_one = test_tmpl.slice(0, firstindex + 17) ;

    var indexToSlice = test_tmpl.indexOf("Results summary");

    var test_tmpl_third = test_tmpl.slice(firstindex + 17, indexToSlice -7)

    var test_tmpl_second = test_tmpl.slice(indexToSlice - 7, test_tmpl.length);

    test_tmpl =  test_tmpl_one + test_tmpl_second + "</br>" + test_tmpl_third;

    fs.writeFileSync('test/screenshots/modifiedReport.html', test_tmpl);

  });
};
