/**
 * @description creating a module extending myMPCSApp
 * @requires commonUtils
 */

angular.module('myMPCSApp.urlUtils', [])
  .service('urlUtils', function (commonUtils) {

    var self = this;
    self.url = undefined;

    /**
     * @ngdoc method
     * @name prepareUrl
     * @methodOf TestApp.services:urlUtils
     * @description basic url appender
     * @param {string}
     *            partial url param
     * @param {string}
     *            rest endpoint
     *            
     * @return {string} url
     */
    self.prepareUrl = function (rootUrl, fileName) {
      if (rootUrl === null || fileName === null) {
        throw 'Configuration Exception while setting Service URL';
      }
      var url = rootUrl.replace(/\/?$/, '/')
        .concat(fileName);
      return url;
    };

    /**
     * @ngdoc method
     * @name prepareUrlQueryString
     * @methodOf TestApp.services:urlUtils
     * @param {Object} queryParams TODO
     * @param {String} endPoint TODO
     * @description Function to prepare URL string by appending query parameters.
     */
    self.prepareUrlQueryString = function (endPoint, queryParams) {
      var appendToEndPoint = (endPoint && endPoint.indexOf('?') >= 0) ? '&' : '?';
      if (commonUtils.nullable(queryParams)) {
        angular.forEach(queryParams, function (val, key) {
          appendToEndPoint = appendToEndPoint.concat(encodeURIComponent(key))
            .concat('=')
            .concat(encodeURIComponent(val));
          appendToEndPoint = appendToEndPoint.concat('&');
        });
      }
      return endPoint.concat(appendToEndPoint.substring(0, appendToEndPoint.length - 1));
    };

    /**
     * @ngdoc method
     * @name replaceParams
     * @methodOf TestApp.services:urlUtils
     * @description replaces params with actual values
     * @param {string} endPoint TODO
     * @param {object} params TODO
     * @return {string} endpoint with replaced params 
     */
    self.replaceParams = function (endPoint, params) {
      if (angular.isString(endPoint)) {
        if (commonUtils.nullable(params)) {
          angular.forEach(params, function (val, key) {
            endPoint = endPoint.replace('[' + key + ']', val); //First look for optional params
            endPoint = endPoint.replace('{' + key + '}', val);
          });
        }

        endPoint = endPoint.replace(/(\[[^\[]*\])/g, ''); //Replace undefined optional param holders
        endPoint = endPoint.replace(/\/\//, '/'); //Replace '//' if any with '/'
        endPoint = endPoint.replace(/(\/)$/, ''); //Remove trailing '/'  
      }

      return endPoint;
    };

  });
