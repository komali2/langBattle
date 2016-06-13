angular.module('langBattle')
  .controller('arenaController',
    ['$scope', 'socket', '$http',
    function($scope, socket, $http){

      $scope.submitChat = function(){
        socket.emit('chat', 'test');
      }

      $scope.getCards = function(num){
        return $http.get('/arena/cards', {
          params: {
            num: num
          }
        });
      }
    }]);
