'use strict';

module.exports = function(grunt) {
  var APP_NAME                      = 'rebellion';
  var PLATO_REPORT_JSON             = 'plato_output/' + APP_NAME + '_tag/report.json';
  var GIT_COMMAND                   = 'git log ';
  var GIT_LOG_LATEST_AUTHOR_NAME    = ' | grep Author: | head -1';
  var GIT_LOG_LATEST_DATE           = ' | grep Date: | head -1';
  var GIT_LOG_LATEST_COMMIT_MESSAGE = ' | grep "    " | head -1';
  var REPORT_FOLDER                 = 'coverage-report';
  var CSV_HEADER                    = 'Filename,Maintainability,Complexity,SLOC,Author,Date,ShortDate,Commit Message\n';

  analyze();

  /**
   * Initial method for generating report.
   */
  function analyze() {
    var report;
    var json = getJson(PLATO_REPORT_JSON);
    if (json !== null) {
      report = parseReportJson(CSV_HEADER, json['reports']);
      writeReportToFS(report);
    }
  }

  /**
   * @param {String} file
   * @returns {Object}
   * @throws {Error} Thrown when unable to read file.
   */
  function getJson(file) {
    var fs = require('fs');
    var json;
    try {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (err) {
      throwError('Could not read ' + file + '.', err);
    }
  }

  /**
   * @param {String} csv
   * @param {Array} arr
   * @returns {String}
   */
  function parseReportJson(csv, arr) {
    csv += parseReportItem(arr[0]);
    var remainingList = arr.slice(1);
    if (remainingList.length > 0) {
      return parseReportJson(csv, remainingList);
    } else {
      return csv;
    }
  }

  /**
   * @param {Object} item
   * @returns {String}
   */
  function parseReportItem(item) {
    var childProcess = require('child_process');

    /* convert backslashes to slashes */
    var fileName = item['info']['file'].replace('\\','/');

    var maintainabilityScore = item['complexity']['maintainability'];
    var complexityScore = item['complexity']['aggregate']['complexity']['cyclomatic'];
    var sloc = item['complexity']['aggregate']['complexity']['sloc']['physical'];

    /* update path name */
    var pathFileName = fileName.replace(APP_NAME + '/', '');

    /* print gitLogCommand */
    var authorNameOutput = childProcess.execSync(GIT_COMMAND + pathFileName + GIT_LOG_LATEST_AUTHOR_NAME, { encoding: 'utf8' });

    /* Clean up the string */
    var authorName = removeLastChar(authorNameOutput.replace('Author: ', ''));

    var dateOutput = '';
    var dateOutput = childProcess.execSync(GIT_COMMAND + GIT_LOG_LATEST_DATE, { encoding: 'utf8' });

    /* Clean up the string, remove the newline character at the end */
    var dateModified = removeLastChar(dateOutput.replace('Date:   ', '')) || '';

    /* shortDateModified is for an Excel-friendly date format. Existing date format looks like 'Thu Dec 11 16:23:47 2014 +0530' */
    var dateModifiedSplit = dateModified.split(' ');
    var shortDateModified = (dateModified) ? dateModifiedSplit[1] + ' ' + dateModifiedSplit[2] : '';

    var commitMessageOutput = '';
    var commitMessageOutput = childProcess.execSync(GIT_COMMAND + GIT_LOG_LATEST_COMMIT_MESSAGE, { encoding: 'utf8' });

    /* Clean up the string, remove the newline character at the end */
    var commitMessage = removeLastChar(commitMessageOutput.replace('    ', '')).replace(',', '');

    return fileName + ',' + maintainabilityScore + ',' + complexityScore + ',' + sloc + ',' + authorName + ',' + dateModified + ',' + shortDateModified + ',' + commitMessage + '\n';
  }

  /**
   * @param {String} data
   * @returns {Boolean}
   * @throws {Error} Thrown when unable to write file.
   */
  function writeReportToFS(data) {
    var fs = require('fs');
    var done = grunt.task.current.async();
    createFolder(REPORT_FOLDER);
    fs.writeFile(REPORT_FOLDER + '/team-analysis.csv', data, function(err) {
      done();
      if (err) {
        throwError('Could not write report to file system.', err);
      }

      return true;
    });
  }

  /**
   * @param {String} text
   */
  function removeLastChar(text) {
    var arr = text.split('');
    arr.pop();
    return (arr.length) ? arr.join('') : '';
  }

  /**
   * @param {String} folder
   */
  function createFolder(folder) {
    var fs = require('fs');
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
  }

  /**
   * @param {String} message
   * @param {Object} origError
   */
  function throwError(message, origError) {
    throw grunt.util.error(message, origError)
  }
};
