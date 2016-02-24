'use strict';

/**
 * @ngdoc function
 * @name vineIssuetrackerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vineIssuetrackerApp
 */
angular.module('vineIssuetrackerApp')
  .controller('MainCtrl', ['$scope','$http', '$q', '$routeParams', function($scope, $http, $q, $routeParams) {
  	var defer = $q.defer();
    $http.get("https://api.github.com/repos/npm/npm/issues"). success(function(data) {
    	$scope.data = data;
    	defer.resolve();
    });
  }]);
