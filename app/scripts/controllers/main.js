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
      curPage and pageSize is used for the padgination
      directive.
    **/
  	var defer = $q.defer();
  	$scope.curPage = 0;
    $scope.pageSize = 9;
    $scope.query = '';
    $scope.data = '';
    $scope.results = 0; 

    $http.get("https://api.github.com/repos/npm/npm/issues").then(function(data) {
    	$scope.data = data.data;
      $scope.results = data.length;     
    	defer.resolve();
    });

    /**
      After the data is finished procressing, just bind and event listener to setpage to
      1 when searching for an item
    **/
    defer.promise.then(function() {
      /**
        numberOfPages will calculated the number of pages remaning given the length
        of the data and the pagesize (number of elements per page).
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

angular.module('npmIssueTrackerApp').filter('limitChars', function() {
  return function(input, limit) {
    var currentWordCount = 0;
    var inputArray = input.split(" ");
    var outputArray = [];
    // For all input words
    for(var i=0; i < inputArray.length; i++) {
      // If out current count plus another would exceed the limit 
      if(currentWordCount+inputArray[i].length > limit) {
        // Return the final outputArray
        return outputArray.join(" ");
      } else {
        // If we reached the end of the array
        if(i === inputArray.length-1) {
          return outputArray.join(" ");
          // Otherwise lets keep counting and storing
        } else {
          outputArray.push(inputArray[i]); 
          currentWordCount+=inputArray[i].length+1; // +1 for space
        }
      }
    }
  };
});