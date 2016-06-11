describe('arena view', function(){
  beforeEach(module('langBattle'));

  describe('arena view controller', function(){
    it('should exist', inject(function($controller, $rootScope){
      var scope = $rootScope.$new();
      var arenaController = $controller('arenaController', {$scope:scope});
      expect(arenaController).toBeDefined();
    }));

  });
});
