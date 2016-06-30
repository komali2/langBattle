angular.module('langBattle')
  .factory('cardFactory', function($http, socket, $rootScope){
    var objOut = {};

    objOut.submitCard = function(id){
      socket.emit('submitCard', {id: id});
    }

    socket.on('newCard', (data)=>{
      $rootScope.$broadcast('card:newCard', data);
    });

    return objOut;
  });
