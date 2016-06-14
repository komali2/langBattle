angular.module('langBattle')
  .controller('arenaController',
    ['$scope', 'socket', '$http', 'materialFactory',
    function($scope, socket, $http, materialFactory){

      $scope.joinBattle = function(){
        materialFactory.openModal('#battleView');
      }
    }]);
