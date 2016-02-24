'use strict';

/**
 * @ngdoc overview
 * @name vineIssuetrackerApp
 * @description
 * # vineIssuetrackerApp
 *
 * Main module of the application.
 */
angular
  .module('vineIssuetrackerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
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
      .otherwise({
        redirectTo: '/'
      });
      // Gruntfile.js needs connect-modrewrite npm package
      // Also rewrite Gruntfile.js with, modRewrite(['^[^\\.]*$ /index.html [L]']),
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
});
