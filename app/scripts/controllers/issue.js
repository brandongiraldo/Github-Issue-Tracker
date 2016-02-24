'use strict';

/**
 * @ngdoc function
 * @name vineIssuetrackerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vineIssuetrackerApp
 */
angular.module('vineIssuetrackerApp')
  .controller('IssueCtrl', ['$scope','$http', '$q', '$routeParams', function($scope, $http, $q, $routeParams) {
  	var defer = $q.defer();
    var table = [];
    $http.get("https://api.github.com/repos/npm/npm/issues"). success(function(data) {
    	$scope.data = data;
      for(var i =0; i< $scope.data.length; i++) {
        console.log($scope.data[i].id);
      }
    	defer.resolve();
    });
    defer.promise.then(function() {
    	
    });
  }]);
