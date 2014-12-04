(function(){
  'use strict';

  angular.module('hapi-auth')
    .controller('NotesCtrl', ['$rootScope', '$scope', '$state', 'Notes', function($rootScope, $scope, $state, Notes){
      $scope.mode = $state.current.name;

      $scope.submit = function(){
        Notes.create($scope.note).then(function(response){
          debugger;
        }, function(response){
          debugger;
        });
      };

    }]);
})();
