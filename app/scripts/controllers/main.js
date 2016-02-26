'use strict';

/**
 * @ngdoc function
 * @name vineIssuetrackerApp.controller:MainCtrl
 * @author Brandon Joel Giraldo
 * @description
 * # MainCtrl
 *
 * Controller of the vineIssuetrackerApp
 * This controller handles pagination and 
 * overview of issues from the GitHub API. 
 */
angular.module('vineIssuetrackerApp')
  .controller('MainCtrl', ['$scope','$http', '$q', '$routeParams', function($scope, $http, $q, $routeParams) {
  	/**
      $scope.data when our request is complete
      defer is for angular's 'promises' library
      when our data is finished processing
      curPage and pageSize is used for the padgination
      directive.
    **/
  	var defer = $q.defer();
  	$scope.curPage = 0;
    $scope.pageSize = 9;
    $scope.query = '';
    $scope.data = '';

    $http.get("https://api.github.com/repos/npm/npm/issues").success(function(data) {
    	$scope.data = data;
    	defer.resolve();
    });
    /**
      numberOfPages will calculated the number of pages remaning given the length
      of the data and the pagesize (number of elements per page).
    **/
    $scope.numberOfPages = function() {
      return Math.ceil($scope.data.length / $scope.pageSize);
    };

    /**
      After the data is finished procressing, just bind and event listener to setpage to
      1 when searching for an item
    **/
    defer.promise.then(function() {
      $scope.$watch("query", function() {
        if ($scope.query.length > 0) {
          /**
            Theres a problem here where the page is back to 1, but
            that doesnt change the amount of pages of search results.
            Page 1 of X, where x is static still.
          **/
          $scope.curPage = 0;
        }
      });
    });
  }]);
/**
  filter module for pagination, this was not created by me.
  Please view credits in README.md for more info.
**/
angular.module('vineIssuetrackerApp').filter('pagination', function(){
  return function(input, start) {
    if (!input || !input.length) { 
      return; 
    }
    start=+start;
    return input.slice(start);
  };
});