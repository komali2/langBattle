angular.module('langBattle')
  .factory('materialFactory', function(){
    var api = {};

    api.openModal = function(id){
      console.log('function ran');
      $(id).openModal();
    }
    api.closeModal = function(id){
      $(id).closeModal();
    }

    return api;
  });
