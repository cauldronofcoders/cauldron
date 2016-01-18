/**
 * @description creating a module extending myMPCSApp
 * @requires $http
 * @requires $q
 * @requires urlUtils
 */

angular.module('myMPCSApp.apiFactory', [])
  .factory('facadeApiFactory',
    function ($http, $q, urlUtils) {
      return ({
        getRequest: getRequest,
        postRequest: postRequest,
        getRequestWithQueryOptions: getRequestWithQueryOptions  
      });

      /**
       * @ngdoc function
       * @name getRequest
       * @methodOf TestApp.factory:facadeApiFactory
       * @description Makes an HTTP GET Request.
       * @param  {String} baseUrl API base url
       * @param  {Object} endPoint API end point
       * @param  {Object} params with actual key/value pairs
       * @returns {Object} API responce
       */
      function getRequest(baseUrl, endPoint, params) {
        var request = $http({
          method: 'get',
          url: urlUtils.prepareUrl(baseUrl, urlUtils.replaceParams(endPoint, params))
        });
        return (request.then(handleSuccess, handleError));
      }
    
      /**
       * @ngdoc method
       * @name getRequestWithQueryOptions
       * @methodOf TestApp.factory:facadeApiFactory
       * @description Makes an HTTP GET Request with query params appended to the request eg:url?family=android&make=samsung
       * @param {String} baseUrl API base url
       * @param {String} endPoint api endpoint with parameters
       * @param {Object} params with actual key/value pairs
       * @param {Object}  query parameters
       * @returns {Object} API responce
       */
      function getRequestWithQueryOptions(baseUrl, endPoint, params, queryParams) {
        var updatedEndPoint = urlUtils.prepareUrlQueryString(endPoint, queryParams);
        return getRequest(baseUrl, updatedEndPoint, params);
      }

       /**
       * @ngdoc function
       * @name postRequest
       * @methodOf TestApp.factory:facadeApiFactory
       * @param  {String} baseUrl API base url
       * @param  {String} endPoint API endpoint with parameters
       * @param  {Object} params params with actual key/value pairs
       * @param  {Object} data POST request payload
       * @returns {Object} API responce
       */
      function postRequest(baseUrl, endPoint, params, data) {
          var request = $http({
            method: 'post',
            url: urlUtils.prepareUrl(baseUrl, urlUtils.replaceParams(endPoint, params)),
            data: data
          });
          return (request.then(handleSuccess, handleError));
        }

      /**
       * @ngdoc function
       * @name handleSuccess
       * @methodOf TestApp.factory:facadeApiFactory
       * @param {Object} response TODO
       * @returns {Object} response TODO
       */
      function handleSuccess(response) {
        return response.data;
      }

      /**
       * @ngdoc function
       * @name handleError
       * @methodOf TestApp.factory:facadeApiFactory
       * @param {Object} error TODO
       * @returns {Object} error promise TODO
       */
      function handleError(errorReponse) {
        return $q.reject("404 File not found");
      }
    }
  );
