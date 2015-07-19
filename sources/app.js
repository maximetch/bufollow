(function() {
  'use strict';

  var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngMaterial']);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'partials/login',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }]);
})();