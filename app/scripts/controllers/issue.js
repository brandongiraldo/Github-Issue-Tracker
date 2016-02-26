'use strict';

/**
 * @ngdoc function
 * @name vineIssuetrackerApp.controller:MainCtrl
 * @author Brandon Joel Giraldo 
 * @description
 * # MainCtrl
 *
 * Controller of the vineIssuetrackerApp
 * This controller handles specific issues
 * it will hit the GitHub API and 
 * parse the data to return the specific result.
 *
 */
angular.module('vineIssuetrackerApp')
  .controller('IssueCtrl', ['$scope','$http', '$q', '$routeParams', '$filter', '$location', function($scope, $http, $q, $routeParams, $filter, $location) {
    /**
      $scope.data when our request is complete
      defer is for angular's 'promises' library
      when our data is finished processing
    **/
  	var defer = $q.defer();
    //
    $scope.comments_dups = [];
    $scope.comments = "";
    $scope.commentdata = "";
    // $http request and promise callback
    $http.get("https://api.github.com/repos/npm/npm/issues").then(function(data) {
      $http.get("https://api.github.com/repos/npm/npm/issues/"+$routeParams.itemId+"/comments").then(function(comments) {
         // Whole JSON for issues id and issues in general.        
         $scope.commentdata = comments.data; 
         $scope.issuedata = data.data;
    	   defer.resolve();
      });
    });

    // Promise callback when data is finished processing
    defer.promise.then(function() {
      /**
        Get the object by its number id.
        Use filter as a means of looping though the data,
        in a perfect world we wouldnt need to loop
        we would just have a hashtable on our server that
        we could look up number index.

        I noticed also that you can append the number to 
        a similar GitHub API url, but that number may change
        in the original API call, hence it might not exsist
        anymore.
      **/
      var id = $filter('filter')($scope.issuedata, function (d) {
        if(d.number == $routeParams.itemId) {
          $scope.data = d;
          return d;
        }
      });
      // Won't go to issues that arent in this API.
      if(id==false) {
        $location.path('/');
      }
      // Self executing function to add the url to name.
      (function (){
        for (var i=0; i < $scope.commentdata.length; i++) {
          var oldString = $scope.commentdata[i].body.split(" ");
          oldString.unshift("<div class=\"text_comment\">");
          for (var j=0; j < oldString.length; j++) {
            if(oldString[j].indexOf("@") > -1) {
              oldString[j] = "<a class=\"name\" href=\"https://github.com/"+oldString[j].slice(1)+"\">"+oldString[j].slice(1)+"</a> :"; 
            } else {
              oldString[j] = oldString[j];
            }
          }
          oldString.push("</div><br>");
          $scope.comments_dups.push(oldString.join(" "));
        }
      })();
      // Remove duplicates from comments array,
      // Not honestly sure why there are dups.
      (function (){
        var temp = [];
        $scope.comments_dups.forEach(function(item) {
          if(!(item in temp)) {
            temp.push(item);
          }
        });
        $scope.comments = temp;
      })();
      // Concat fixed comments to commentdata.
      (function() {
        $scope.commentdata.push($scope.comments);
      })();

    }); //This directive is not created by me. its a substitute rather for HTML Injection
  }]).directive('bindHtmlUnsafe', function( $compile ) {
    return function( $scope, $element, $attrs ) {

        var compile = function( newHTML ) { // Create re-useable compile function
            newHTML = $compile(newHTML)($scope); // Compile html
            $element.html('').append(newHTML); // Clear and append it
        };
        var htmlName = $attrs.bindHtmlUnsafe; // Get the name of the variable 
                                              // Where the HTML is stored
        $scope.$watch(htmlName, function( newHTML ) { // Watch for changes to 
                                                      // the HTML
            if(!newHTML) return;
            compile(newHTML);   // Compile it
        });

    };
});
