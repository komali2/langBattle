angular.module('langBattle')
.controller('arenaController', ['$scope', 'socket', function($scope, socket){
  $scope.submitChat = function(){
    console.log('function called');
    socket.emit('chat', 'test');
  }
}]);
