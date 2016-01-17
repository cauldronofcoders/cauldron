var accessibilityReport = module.exports = {};
var fs = require('fs');
var states = require('../../.tmp/states.json');
var counts = {
  ERROR: 0,
  WARNING: 0,
  NOTICE: 0
};
var filter = [
  'WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.EmptyNoId'
];
/* This task is intended to generate a report after running the accessibility */

var createAccessibilityReportArray = function () {
  var dir = './.tmp/reports/';
  var reports = fs.readdirSync(dir);
  var fileReportMessages = [];
  var tag;
  reports.forEach(function (report) {
    var jsonFileReport = JSON.parse(fs.readFileSync(dir + report, 'utf8'));
    var output = [];
    if (jsonFileReport) {
      jsonFileReport.forEach(function (item) {
        if (filter.indexOf(item.issue) === -1) {
          item.file = report.replace(/json$/, 'html');
          counts[item.heading] = counts[item.heading] + 1;
          var tag = item.element.node.replace(/(\t|\r\n|\n|\r)/gm, '').replace(/>\s+</g, '><');
          if (tag.match(/<[a-zA-Z]+.*?>/)) {
            tag = tag.match(/<[a-zA-Z]+.*?>/);
          }
          item.tag = (typeof tag === 'object') ? tag[0].substr(0, 100) : tag.substr(0, 100);
          addStateInformation(item);
          output.push(item);
        }
      });
      fileReportMessages = fileReportMessages.concat(output);
    }
  });
  return fileReportMessages;
};

var writeReport = function (fileReportMessages) {
  var data = 'this.data = ' + JSON.stringify(fileReportMessages, null, 4) + ';';
  var index = fs.readFileSync('./grunt/accessibility-report/index.template.html', 'utf8');
  var index = index.split('//INJECT');
  index = index[0] + data + index[1];
  fs.writeFileSync('./report/accessibility-report.html', index);
};

var writeReportCSV = function (fileReportMessages) {
  var reportFile = './report/accessibility-report.csv';
  consoleCounts();
  if (fs.existsSync(reportFile)) {
    fs.unlinkSync(reportFile);
  }
  fs.appendFileSync(reportFile, 'File\tURL\tState\tHeading\tIssue\tElement\tDescription\r\n');
  var count = 0;
  var cols = [];
  var tag;
  fileReportMessages.forEach(function (item) {
    if ('states' in item && item.states.length > 0) {
      item.states.forEach(function (state) {
        cols = [];
        cols.push((item.file) ? item.file : '');
        cols.push(state.url);
        cols.push(state.name);
        cols.push((item.heading) ? item.heading : '');
        cols.push((item.issue) ? item.issue : '');
        cols.push(item.tag);
        cols.push((item.description) ? item.description.replace('\t', ', ') : '');
        fs.appendFileSync(reportFile, cols.join('\t') + '\r\n');
      });
    } else {
      cols = [];
      cols.push((item.file) ? item.file : '');
      cols.push('');
      cols.push('');
      cols.push((item.heading) ? item.heading : '');
      cols.push((item.issue) ? item.issue : '');
      cols.push(item.tag);
      cols.push((item.description) ? item.description.replace('\t', ', ') : '');
      fs.appendFileSync(reportFile, cols.join('\t') + '\r\n');
    }
  });
};

var consoleCounts = function () {
  for (var key in counts) {
    console.log(key + ' COUNT:', counts[key]);
  }
}

var addStateInformation = function (reportItem) {
  reportItem.states = [];
  states.forEach(function (state) {
    if (state.templateUrl && state.templateUrl.indexOf(reportItem.file) !== -1) {
      reportItem.states.push({
        url: state.href,
        name: state.name
      });
    }
  });
};

//Collect all the JSON object files and write the report.
accessibilityReport.generateReport = function () {
  var fileReportMessages = createAccessibilityReportArray();
  createReportDirectory();
  writeReportCSV(fileReportMessages);
  writeReport(fileReportMessages);
};
