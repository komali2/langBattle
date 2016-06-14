angular.module('langBattle')
  .controller('arenaController',
    ['$scope', 'socket', '$http',
    function($scope, socket, $http){
      $scope.cardNum = 0;
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

      $scope.showCards = function(){
        $scope.getCards($scope.cardNum)
          .then((res)=>{
            $scope.currCard = res.data;
            $scope.cardNum += 1;
          }, (res)=>{
            throw new Error('Server error in ShowCards: ' + res.data + " " + res.statusText);
          });
      }
    }]);
