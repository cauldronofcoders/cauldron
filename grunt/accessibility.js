module.exports = {
  page: {
    src: ['app/*{,*/*}.html', '!app/scripts/*{,*/*}.html'],
    options: {
      force: true,
      accessibilityLevel: 'WCAG2AA',
      reportType: 'json',
      reportLocation: '.tmp/reports',
      ignore: [
        'WCAG2AA.Principle1.Guideline1_4.1_4_6.G18.Fail',
        'WCAG2AA.Principle1.Guideline1_4.1_4_6.G17.Fail',
        'WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.1.NoTitleEl',
        'WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.Fail'
      ]
    }
  },
  template: {
    src: [
      'app/scripts/*{,*/*}.html',
      '!app/scripts/manage-account-module/lookup-module/care-retail/views/lookup.html',
      '!app/scripts/manage-account-module/cancel-account-module/views/cancel.html'
    ],
    options: {
      force: true,
      reportLevels: {
        notice: false,
        warning: false,
        error: true
      },
      accessibilityLevel: 'WCAG2AA',
      reportType: 'json',
      reportLocation: '.tmp/reports',
      ignore: [
        'WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.1.NoTitleEl', //Title Included
        'WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2', //Lang Specified
        'WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.Placeholder', //No href
        'WCAG2AA.Principle1.Guideline1_3.1_3_1.F68', // ARIA Labels (handled by ngAria)
        'WCAG2AA.Principle1.Guideline1_3.1_3_1.H42.2', //Empty Heading, generally due to ng-bind attribute directive
        'WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.Fail' //Contrast Levels for Spans CSS Not Injected, Ignoring
      ]
    }
  }
};

//Below is a hack to work around an existing bug with Access Sniff by surrounding the issue with a try catch.
var Accessibility = require('../node_modules/grunt-accessibility/node_modules/access-sniff/src/accessSniff.js');
Accessibility.prototype.getElementPosition = function (htmlString) {

  var position = {};
  var htmlArray = this.fileContents.split('\n');

  htmlArray.every(function (element, lineNumber) {
    try { //Inserted
      if (!element.match(htmlString)) {
        return true;
      }
    } //Inserted Start
    catch (e) {

    } //Inserted End

    var columnNumber = 0;
    var colIndex = 0;
    var pattern = /(\s|\t)/g;

    while (element.charAt(colIndex).match(pattern)) {
      columnNumber++;
      colIndex++;
    }

    position.lineNumber = lineNumber;
    position.columnNumber = columnNumber;

    return false;

  });

  return position;

};
