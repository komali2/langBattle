angular.module('langBattle')
  .controller('arenaController',
    ['$scope', 'socket', '$http', 'materialFactory',
    function($scope, socket, $http, materialFactory){
      $scope.native = 'english';
      $scope.foreign = 'chinese';

      $scope.joinBattle = function(){
        materialFactory.openModal('#battleView');
        socket.emit('joinBattle');
      }
    }]);
