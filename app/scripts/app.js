'use strict';

/**
 * @ngdoc overview
 * @name vineIssuetrackerApp
 * @author Brandon Joel Giraldo
 * @description
 * # vineIssuetrackerApp
 * 
 *  vineIssuetrackerApp is and application that is designed
 *  to use the GitHub Issues API and represent that information
 *  in a useable manner.
 *
 *  Features include the ability to search, view specific
 *  details, and page through the GitHub Issues.
 *
 * Main module of the application. 
 *
 * This module sets the routes for the application, it also
 * sets the html5mode to true to remove the #
 */
angular
  .module('vineIssuetrackerApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/issue/:itemId', {
        templateUrl: 'views/issue.html',
        controller: 'IssueCtrl',
        controllerAs: 'issue'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
      /**
        Gruntfile.js needs connect-modrewrite npm package
        Also rewrite Gruntfile.js with, modRewrite(['^[^\\.]*$ /index.html [L]']),
        using html5Mode removes the # in the url.
      **/
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
});
