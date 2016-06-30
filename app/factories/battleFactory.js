angular.module('langBattle')
  .factory('battleFactory', function($rootScope, socket, $http){
    var objOut = {};

    socket.on('okToStart', (data)=>{
      $rootScope.$broadcast('battle:okToStart', data);
    });
    socket.on('partnerStarted', (data)=>{
      $rootScope.$broadcast('battle:partnerStarted', data);
    });

    socket.on('youWin', (data)=>{
      $rootScope.$broadcast('battle:youWin', data);
    });

    socket.on('youLose', (data)=>{
      $rootScope.$broadcast('battle:youLose', data);
    });

    socket.on('hasPartner', (data)=>{
      $rootScope.$broadcast('battle:hasPartner', data);
    });

    return objOut;
  });
