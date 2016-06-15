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


    $scope.submitCard = function(english, chinese){
      socket.emit('submitCard', {english: english, chinese: chinese}, ()=>{
      });
    }

    $scope.getFirstCard = function(){
      socket.emit('getFirstCard', {}, ()=>{
      })
      $scope.battleStarted = true;
    }

    socket.on('newCard', (data)=>{
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
