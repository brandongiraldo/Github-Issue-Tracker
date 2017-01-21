'use strict';

/**
 * @ngdoc function
 * @name npmIssueTrackerApp.controller:MainCtrl
 * @author Brandon Joel Giraldo 
 * @description
 * # MainCtrl
 *
 * Controller of the npmIssueTrackerApp
 * This controller handles specific issues
 * it will hit the GitHub API and 
 * parse the data to return the specific result.
 *
 */
angular.module('npmIssueTrackerApp')
  .controller('IssueCtrl', ['$scope','$http', '$q', '$routeParams', '$filter', '$location', function($scope, $http, $q, $routeParams, $filter, $location) {
    /**
      $scope.data when our request is complete
      defer is for angular's 'promises' library
      when our data is finished processing
    **/
  	var defer = $q.defer();
    // Just one scope var for our commentdata
    $scope.commentdata = "";
    // $http request and promise callback
    $http.get("https://api.github.com/repos/npm/npm/issues/"+ $routeParams.itemId).then(function(userdata) {
      $http.get("https://api.github.com/repos/npm/npm/issues/"+$routeParams.itemId+"/comments").then(function(commentdata) {
        // Since the JSON data is split into two, lets just fuse them
        $scope.commentdata = userdata.data; // .data is what we need from the request
        $scope.commentdata.comments = commentdata.data; // Make a new field in our userdata for comments.
    	  defer.resolve();
      });
    });

    // Promise callback when data is finished processing
    defer.promise.then(function() {
      // Self executing function to create URLs out of names.
      // This is kinda a jank solution

      // Its on the list of improvements to be made.
      (function (){
        for (var i=0; i < $scope.commentdata.comments.length; i++) {
          var outputString = $scope.commentdata.comments[i].body.split(" ");
          outputString.unshift("<div class=\"text_comment\">");
          for (var j=0; j < outputString.length; j++) {
            // This assumes every string starting with @ is a name.
            if(outputString[j].charAt(0) === "@") {
              outputString[j] = "<a class=\"name\" href=\"https://github.com/"+outputString[j].slice(1)+"\">"+outputString[j].slice(1)+"</a> - "; 
            }
          }
          outputString.push("</div><br>");
          $scope.commentdata.comments[i].body = outputString.join(" ");
        }
      })();
      console.log($scope.commentdata.comments);
    }); //This directive is not created by me. its a substitute rather for HTML Injection
  }]).directive('html', function() {
    function link(scope, element, attrs) {

        var update = function() {
            element.html(scope.html);
        }

        attrs.$observe('html', function(value) {
            update();
        });
    }

    return {
        link: link,
        scope:  {
            html:   '='
        }
    };
});
