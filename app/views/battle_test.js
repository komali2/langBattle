describe('battle', function(){
  beforeEach(module('langBattle'));

  describe('battleController', function(){
    it('should exist', inject(function($controller, $rootScope){
      var scope = $rootScope.$new();
      var battleController = $controller('battleController', {$scope:scope});
      expect(battleController).toBeDefined();
    }));

  });

  beforeEach(inject(function($templateCache) {
    templateHtml = $templateCache.get('#/home/views/battle.html');
    if(!templateHtml) {
        templateHtml = $.ajax('#/home/views/battle.html', {async: false}).responseText;
        $templateCache.put('#/home/views/battle.html', templateHtml)
        console.log(templateHtml);
    }
  }));

  describe('battleview', function(){
    var $compile, $rootScope, formElement;

        beforeEach(inject(function(_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $rootScope.isOn = false;
            formElement = angular.element(templateHtml);
            var element = $compile(formElement)($rootScope);
            $rootScope.$digest();
        }));

        it('should find divs', function(){
          expect(formElement.find('#battleView').length).toBe(1);
        });
  });
});
