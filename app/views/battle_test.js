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
    templateHtml = $templateCache.get('views/battle.html');
    if(!templateHtml) {
        templateHtml = $.ajax('views/battle.html', {async: false}).responseText;
        $templateCache.put('views/battle.html', templateHtml)
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
          console.log(formElement);
          expect(formElement.find('#battleView').length).toBe(1);
        });
  });
});
