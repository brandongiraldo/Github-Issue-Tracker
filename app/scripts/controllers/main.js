'use strict';

/**
 * @ngdoc function
 * @name vineIssuetrackerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vineIssuetrackerApp
 */
angular.module('vineIssuetrackerApp', [])
  .controller('MainCtrl', ['$scope','$http', '$q', '$routeParams', function($scope, $http, $q, $routeParams) {
  	
  	var defer = $q.defer();
  	// $scope.filteredTodos = [];
  	// $scope.currentPage = 1;
  	// $scope.numPerPage = 9;
  	// $scope.maxSize = 5;

    $http.get("https://api.github.com/repos/npm/npm/issues"). success(function(data) {
    	$scope.data = data;
    	defer.resolve();
    });

    defer.promise.then(function() {
    	
    });
  
  	// $scope.$watch('currentPage + numPerPage', function() {
   //  	var begin = (($scope.currentPage - 1) * $scope.numPerPage);
   //  	var end = begin + $scope.numPerPage;
   //  	$scope.filteredTodos = $scope.todos.slice(begin, end);
  	// });

  }]);
