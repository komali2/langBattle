angular.module('langBattle')
  .controller('battleController',
  ['$scope', 'socket', '$http', 'materialFactory', 'cardFactory', 'battleFactory',
  function($scope, socket, $http, materialFactory, cardFactory, battleFactory){
    $scope.battleStatus = 'Waiting for Partner...';
    $scope.currCard = {};
    $scope.currCard.english = 'You will see a word here. Select the Chinese translation!';
    $scope.gameMessage = '';
    $scope.hasPartner = false;
    $scope.waiting = true;
    $scope.battleOngoing = false;
    $scope.exitBattle = function(){
      materialFactory.closeModal('#battleView');
    }


    $scope.submitCard = function(i){
      cardFactory.submitCard(i);
    }

    $scope.getFirstCard = function(){
      socket.emit('getFirstCard', {}, ()=>{
      });
      $scope.battleStarted = true;
      $scope.battleStatus = 'In Battle!'
      $scope.battleOngoing = true;
    }

    $scope.startBattle = function(){
      $scope.waiting = true;
      $scope.battleStatus = 'Waiting for partner to start...'
      socket.emit('startBattle', {}, ()=>{

      });
    }

    $scope.$on('battle:okToStart', (data)=>{
      $scope.getFirstCard();
      $scope.waiting = false;
      $scope.gameMessage = '';
    });

    $scope.$on('battle:partnerStarted', (data)=>{
      $scope.gameMessage = 'Your Partner is Ready!'
    });

    $scope.$on('card:newCard', function(event, data){
      $scope.currCard = data;
      $scope.gameMessage = '';
    });


    $scope.$on('card:wrongCard', (event, data)=>{
      $scope.gameMessage='Wrong Card!';
    });

    $scope.$on('battle:youWin', (data)=>{
      $scope.gameMessage = 'You Win!';
      $scope.battleOngoing = false;
    });

    $scope.$on('battle:youLose', (data)=>{
      $scope.gameMessage = 'You Lose.';
      $scope.battleOngoing = false;

    });

    $scope.$on('battle:hasPartner', (data)=>{
      $scope.hasPartner = true;
      $scope.battleStatus = 'Press Start...';
      $('#startBattle').removeClass('disabled');
    });



  }])
    .directive('battleDirective', function(){
      return {
        templateUrl: '../views/arena.html'
      }
    });
