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
        //$rootScope.$digest();
        $rootScope.$apply();
        //element = (element.outerHTML);
        //element = (element.innerHTML);
        console.log(element.html());
        //element = (element[0].outerHTML);
        //element = (element[0].innerHTML);

        expect(element.find('div').length).toEqual(10);
      })
    });
