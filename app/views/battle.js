angular.module('langBattle')
  .controller('battleController',
  ['$scope', 'socket', '$http', 'materialFactory',
  function($scope, socket, $http, materialFactory){
    $scope.battleStatus = 'Waiting for Battle...';
    $scope.currCard = {};
    $scope.currCard.english = 'You will see a word here. Select the Chinese translation!';
    $scope.gameMessage = '';
    $scope.hasPartner = false;
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
      $scope.battleStatus = 'In Battle!'
    }

    socket.on('newCard', (data)=>{
      $scope.currCard = data;
    });

    socket.on('wrongCard', (data)=>{
      $scope.gameMessage='Wrong Card!';
      $scope.serverMessage = data;
    })

    socket.on('youWin', (data)=>{
      $scope.gameMessage = 'You Win!';
    });

    socket.on('youLose', (data)=>{
      $scope.gameMessage = 'You Lose.';
    });

    socket.on('hasPartner', (data)=>{
      $scope.hasPartner = true;
    });



  }]);
