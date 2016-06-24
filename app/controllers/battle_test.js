describe('battle view', function(){
  beforeEach(module('langBattle'));

  describe('battleController', function(){
    it('should exist', inject(function($controller, $rootScope){
      var scope = $rootScope.$new();
      var battleController = $controller('battleController', {$scope:scope});
      expect(battleController).toBeDefined();
    }));

  });
});
