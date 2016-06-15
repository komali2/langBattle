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
      $scope.battleStarted = false;
    }


    $scope.submitCard = function(){
      console.log("submitcard called");
      socket.emit('submitCard', $scope.currCard, ()=>{
        console.log('emmited submitCard');
      });
    }

    $scope.getFirstCard = function(){
      socket.emit('getFirstCard', {}, ()=>{
        console.log('emmited getfirstcard');
      })
      $scope.battleStarted = true;
    }

    socket.on('newCard', (data)=>{
      console.log('got new card');
      $scope.currCard = data;
    });

    socket.on('wrongCard', (data)=>{
      console.log('wrong card');
      $scope.serverMessage = data;
    })

    socket.on('youWin', (data)=>{
      console.log('you won!!!');
    });

    socket.on('youLose', (data)=>{
      console.log('you lost :( ');
    })



  }]);
