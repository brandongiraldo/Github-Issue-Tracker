'use strict';

/**
 * @ngdoc function
 * @name npmIssueTrackerApp.controller:MainCtrl
 * @author Brandon Joel Giraldo
 * @description
 * # MainCtrl
 *
 * Controller of the npmIssueTrackerApp
 * This controller handles pagination and 
 * overview of issues from the GitHub API. 
 */
angular.module('npmIssueTrackerApp')
  .controller('MainCtrl', ['$scope','$http', '$q', function($scope, $http, $q) {
  	/**
      $scope.data when our request is complete
      defer is for angular's 'promises' library
      when our data is finished processing
      curPage and pageSize is used for the pagination
      directive.
    **/
  	var defer = $q.defer();
  	$scope.curPage = 0;
    $scope.pageSize = 9;
    $scope.query = '';
    $scope.data = '';
    $scope.results = 0;

    // As of Angular 1.6.1, .success has been deprecated.
    $http.get("https://api.github.com/repos/npm/npm/issues").then(function(response) {
      console.log(response);
    	$scope.data = response.data;
      $scope.results = $scope.data.length;     
    	defer.resolve();
    });

    /**
      After the data is finished processing, just bind and event listener to set page to
      1 when searching for an item
    **/
    defer.promise.then(function() {
      /**
        numberOfPages will calculated the number of pages remaining given the length
        of the data and the page size (number of elements per page). Data length can
        change dynamically based on query results
      **/
      $scope.numberOfPages = function() {
        return Math.ceil($scope.results / $scope.pageSize);
      };
      /**
        EventListener for search bar
      **/
      $scope.$watch("query", function() {
        if ($scope.query.length > 0) {
          $scope.curPage = 0;
          // Defined in main.html:10
          if(!$scope.filteredata) {
            $scope.results = 0;
          } else {
            $scope.results = $scope.filteredata.length;
          }
          $scope.numberOfPages();
        } else {
          /** Edge case where user highlights text and deletes at
              once.
          **/
          $scope.curPage = 0;
          $scope.results = $scope.filteredata.length;
        }
      });
    });
  }]);
/**
  filter module for pagination, this was not created by me.
  Please view credits in README.md for more info.
**/
angular.module('npmIssueTrackerApp').filter('pagination', function(){
  return function(input, start) {
    if (!input || !input.length) { 
      return; 
    }
    start=+start;
    return input.slice(start);
  };
});
/**
  Custom limitChars filter, vastly improved from the previous version!
**/
angular.module('npmIssueTrackerApp').filter('limitChars', function() {
  return function(input, limit) {
    if(input.length > limit) {
      input = input.slice(0, limit);
      return input.slice(0, input.lastIndexOf(" "));
    } else {
      return input;
    }
  };
});