angular.module('langBattle')
  .controller('battleController',
  ['$scope', 'socket', '$http', 'materialFactory',
  function($scope, socket, $http, materialFactory){
    $scope.battleStatus = 'Waiting for Partner...';
    $scope.currCard = {};
    $scope.currCard.english = 'You will see a word here. Select the Chinese translation!';
    $scope.gameMessage = '';
    $scope.hasPartner = false;
    $scope.waiting = true;
    $scope.exitBattle = function(){
      materialFactory.closeModal('#battleView');
    }

    $scope.cardNum = 0;
    $scope.submitChat = function(){
      socket.emit('chat', 'test');
    }




    $scope.submitCard = function(english, chinese){
      socket.emit('submitCard', {english: english, chinese: chinese}, ()=>{
      });
    }

    $scope.getFirstCard = function(){
      socket.emit('getFirstCard', {}, ()=>{
      });
      $scope.battleStarted = true;
      $scope.battleStatus = 'In Battle!'
    }

    $scope.startBattle = function(){
      $scope.waiting = true;
      $scope.battleStatus = 'Waiting for partner to start...'
      socket.emit('startBattle', {}, ()=>{

      });
    }

    socket.on('okToStart', (data)=>{
      $scope.getFirstCard();
      $scope.waiting = false;
      $scope.gameMessage = '';
    });

    socket.on('partnerStarted', (data)=>{
      $scope.gameMessage = 'Your Partner is Ready!'
    });

    socket.on('newCard', (data)=>{
      $scope.currCard = data;
      $scope.serverMessage = '';
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
      $scope.battleStatus = 'Press Start...';
      $('#startBattle').removeClass('disabled');
    });



  }]);
