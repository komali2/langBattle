describe('battle', function(){
  beforeEach(module('langBattle'));
  beforeEach(module('templates'));

  var $compile, $rootScope;

  beforeEach(inject(function(_$compile_, _$rootScope_){

    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

      it('should work', function(){

        var element = $compile("<battle-directive></battle-directive>")($rootScope);
        $rootScope.$apply();

        expect(element.find('div').length).toEqual(10);
      })
    });
