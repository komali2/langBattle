angular.module('langBattle')
.controller('arenaController', ['$scope', 'socket', function($scope, socket){
  $scope.submitChat = function(){
    socket.emit('chat', 'test');
  }
}]);
