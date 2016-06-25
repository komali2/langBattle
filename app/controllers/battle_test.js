describe('battle view', function(){
  beforeEach(module('langBattle'));
  beforeEach(inject(function(_$rootScope_, _$controller_){
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  describe('battleController', function(){
    it('should exist', function(){
      var scope = $rootScope.$new();
      var battleController = $controller('battleController', {$scope:scope});
      expect(battleController).toBeDefined();


    });
    it('should start the battle', function(){
      var scope = $rootScope.$new();
      var battleController = $controller('battleController', {$scope:scope});
      scope.getFirstCard();
      expect(scope.battleStarted).toBe(true);
    })

  });
});
