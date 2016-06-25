describe('battle', function(){
  beforeEach(module('langBattle'));
  beforeEach(module('templates'));
  beforeEach(module('stateMock'));

  var $compile, $rootScope;

  beforeEach(inject(function(_$compile_, _$rootScope_, $state, _$httpBackend_){
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    state = $state;

    $httpBackend.whenGET(/\.html$/).respond('');
  }));

      it('should work', function(){
        state.expectTransitionTo('home');
        var element = $compile("<battle-directive></battle-directive>")($rootScope);
        $rootScope.$apply();
        console.log(element[0]);

        expect(element.find('div').length).toEqual(10);
      })
    });
