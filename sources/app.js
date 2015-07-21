(function() {
  'use strict';

  var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngMaterial']);

  app.config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function($routeProvider, $locationProvider, $mdThemingProvider) {
    $routeProvider
      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'partials/login',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }]);
})();