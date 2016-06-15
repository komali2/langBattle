angular.module('langBattle')
  .controller('battleController',
  ['$scope', 'socket', '$http', 'materialFactory',
  function($scope, socket, $http, materialFactory){

    $scope.exitBattle = function(){
      materialFactory.closeModal('#battleView');
    }

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

    $scope.joinBattle = function(){
      $scope.openModal();
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
    $scope.getSocketCard = function(){
      socket.emit('getNewCard', '', ()=>{
        console.log('emmited get new card');
      });

    }
    socket.on('newCard', (data)=>{
      console.log('got new card');
      $scope.currCard = data;
    });



  }]);
