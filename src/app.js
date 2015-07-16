(function() {
  'use strict';

  var app = angular.module('app', ['ngRoute', 'ngCookies'])
    .config([
      '$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
        $routeProvider
          .when('/', {
            controller: 'HomeController',
            templateUrl: '/views/home.html',
            controllerAs: 'vm'
          })
          .when('/login', {
            controller: 'LoginController',
            templateUrl: '/views/login.html',
            controllerAs: 'vm'
          })
          .when('/register', {
            controller: 'RegisterController',
            templateUrl: '/views/register.html',
            controllerAs: 'vm'
          })
          .otherwise({
            redirectTo: '/login'
          });
      }
    ])
    .run([
      '$rootScope', '$location', '$cookieStore', '$http',
      function($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};

        if ($rootScope.globals.currentUser) {
          $http.defaults.headers.common.Authorization = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
          var i, path, restrictedPage;
          var locationPath = $location.path();

          for (i = 0; i < locationPath.length; i += 1) {
            path = locationPath[i];

            if (path !== '/login' && path !== '/register') {
              restrictedPage = true;
              break;
            }
          }

          // redirect to login page if not logged in and trying to access a restricted page
          var loggedIn = $rootScope.globals.currentUser;
          if (restrictedPage && !loggedIn) {
            $location.path('/login');
          }
        });
      }
    ]);
})();