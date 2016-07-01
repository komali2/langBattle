angular.module('langBattle')
  .factory('cardFactory', function($http, socket, $rootScope){
    var objOut = {};
    var cardArray = [];

    objOut.submitCard = function(i){
      var id = cardArray[i].id;
      socket.emit('submitCard', {id: id});
    }

    objOut.getFirstCard = function(){
      socket.emit('getFirstCard', {}, ()=>{
      });
    }

    socket.on('newCard', (data)=>{
      cardArray = data.choiceArray;
      $rootScope.$broadcast('card:newCard', data);
    });

    socket.on('wrongCard', (data)=>{
      $rootScope.$broadcast('card:wrongCard', data);
    });



    return objOut;
  });
