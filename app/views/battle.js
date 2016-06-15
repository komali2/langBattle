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

    $scope.joinBattle = function(){
      $scope.openModal();
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

    socket.on('youWin', (data)=>{
      console.log('you won!!!');
    });

    socket.on('youLose', (data)=>{
      console.log('you lost :( ');
    })



  }]);
