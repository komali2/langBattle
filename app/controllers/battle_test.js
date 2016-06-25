describe('battle view', function(){
  beforeEach(module('langBattle'));
  beforeEach(inject(function(_$rootScope_, _$controller_){
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  var scope;
  var battleController;

  describe('battleController', function(){
    beforeEach(function(){
      scope = $rootScope.$new();
      battleController = $controller('battleController', {$scope:scope});
    })

    it('should exist', function(){
      // var scope = $rootScope.$new();
      // var battleController = $controller('battleController', {$scope:scope});
      expect(battleController).toBeDefined();


    });
    it('should start the battle', function(){
      // var scope = $rootScope.$new();
      // var battleController = $controller('battleController', {$scope:scope});
      scope.getFirstCard();
      expect(scope.battleStarted).toBe(true);
    });

    it('should have functional tracking logic', function(){
      expect(scope.hasPartner).toBe(!scope.waiting);
      expect(scope.waiting).toBe(!scope.battleOngoing);
    });

  });
});
