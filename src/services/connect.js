(function() {
  'use strict';

  angular
    .module('app')
    .factory('ConnectService', ConnectService);

  ConnectService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService'];

  function ConnectService($http, $cookieStore, $rootScope, $timeout, UserService) {
    var service = {};

    return service;
  }

})();