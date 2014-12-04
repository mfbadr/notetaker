(function(){
  'use strict';

  angular.module('hapi-auth')
    .factory('Notes', ['$rootScope', '$http', function($rootScope, $http){

      function create(note){
        return $http.post('/notes', note);
      }

      return {create:create};
    }]);
})();
