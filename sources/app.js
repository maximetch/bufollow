(function() {
  'use strict';

  var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngMaterial']);

  app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'partials/login',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/login'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }]);
})();