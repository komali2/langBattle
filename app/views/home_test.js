describe('home view', function(){
  beforeEach(module('langBattle'));

  describe('home view controller', function(){
    it('should...', inject(function($controller, $rootScope){
      //spec body
      var scope = $rootScope.$new();
      var homeController = $controller('homeController', {$scope:scope});
      expect(homeController).toBeDefined();
    }));

  });
});
