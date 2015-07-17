(function() {
  'use strict';

  var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngMaterial']);

  app.config([
    '$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          controller: 'HomeController',
          templateUrl: 'templates/home.tpl',
          controllerAs: 'vm'
        })
        .when('/login', {
          controller: 'LoginController',
          templateUrl: 'templates/login.tpl',
          controllerAs: 'vm'
        })
        .otherwise({
          redirectTo: '/login'
        });
    }
  ]);

  app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
    console.log("test");
    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

  }]);

  app.run([
    '$rootScope', '$location', '$cookieStore', '$http',
    function($rootScope, $location, $cookieStore, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};

      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common.Authorization = 'Basic ' + $rootScope.globals.currentUser.authdata;
      }

      $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var locationPath = $location.path();

        // redirect to login page if not logged in and trying to access a restricted page
        var loggedIn = $rootScope.globals.currentUser;

        if (locationPath !== '/login' && !loggedIn) {
          $location.path('/login');
        }
      });
    }
  ]);
})();