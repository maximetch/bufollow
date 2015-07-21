(function() {
  'use strict';

  var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngMaterial']);

  app.config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function($routeProvider, $locationProvider, $mdThemingProvider) {

    $mdThemingProvider.definePalette('primaryBlue', {
      '50': '12334a',
      '100': '184361',
      '200': '0c2333',
      '300': '12334a',
      '400': '12334a',
      '500': '12334a',
      '600': '12334a',
      '700': '12334a',
      '800': '12334a',
      '900': '12334a',
      'A100': '12334a',
      'A200': '12334a',
      'A400': '12334a',
      'A700': '12334a',
      'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                          // on this palette should be dark or light
      'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
       '200', '300', '400', 'A100'],
      'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });

    $mdThemingProvider.definePalette('secondaryBlue', {
      '50': '28627b',
      '100': '2f7492',
      '200': '204e61',
      '300': '28627b',
      '400': '28627b',
      '500': '28627b',
      '600': '28627b',
      '700': '28627b',
      '800': '28627b',
      '900': '28627b',
      'A100': '28627b',
      'A200': '28627b',
      'A400': '28627b',
      'A700': '28627b',
      'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                          // on this palette should be dark or light
      'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
       '200', '300', '400', 'A100'],
      'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });

    $mdThemingProvider.definePalette('tertiaryBlue', {
      '50': 'BDD8CD',
      '100': 'BDD8CD',
      '200': 'BDD8CD',
      '300': 'BDD8CD',
      '400': 'BDD8CD',
      '500': 'BDD8CD',
      '600': 'BDD8CD',
      '700': 'BDD8CD',
      '800': 'BDD8CD',
      '900': 'BDD8CD',
      'A100': 'BDD8CD',
      'A200': 'BDD8CD',
      'A400': 'BDD8CD',
      'A700': 'BDD8CD',
      'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                          // on this palette should be dark or light
      'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
       '200', '300', '400', 'A100'],
      'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });

    $mdThemingProvider.theme('loginTheme').dark();
    $mdThemingProvider.theme('altTheme')
      .warnPalette('secondaryBlue')
      .primaryPalette('primaryBlue')
      .accentPalette('tertiaryBlue')

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