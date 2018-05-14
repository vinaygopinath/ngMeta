var SOME_TITLE = 'Hello';
var SOME_TITLE_SUFFIX = ' | World';
var SOME_DEFAULT_TITLE = 'Title';
var SOME_DEFAULT_TITLE_SUFFIX = ' | Suffix';


var SOME_TAG = 'image';
var SOME_TAG_VALUE = 'http://example.com/image.png';
var SOME_TAG_DEFAULT_VALUE = 'http://placeholder.com/picture.jpg';


describe('Provider: ngMetaProvider', function() {

  describe('Basic checks', function() {

    it('should provide the setDefaultTitle function', function() {
      module(function(ngMetaProvider) {
        expect(ngMetaProvider.setDefaultTitle).toBeDefined();
      });
    });

    it('should provide the setDefaultTitleSuffix function', function() {
      module(function(ngMetaProvider) {
        expect(ngMetaProvider.setDefaultTitleSuffix).toBeDefined();
      });
    });

    it('should provide the setDefaultTag function', function() {
      module(function(ngMetaProvider) {
        expect(ngMetaProvider.setDefaultTag).toBeDefined();
      });
    });
  });
});

describe('Service: ngMeta', function() {

  'use strict';

  var ngMeta, $rootScope, $injector;

  // instantiate service
  var injectDependencies = function() {
    inject(function(_ngMeta_, _$rootScope_, _$injector_) {
      ngMeta = _ngMeta_;
      $rootScope = _$rootScope_;
      $injector = _$injector_;
    });
  };

  // load the service's module
  beforeEach(module('ngMeta'));

  describe('Init: init()', function() {

    //Inject dependencies
    beforeEach(function() {
      injectDependencies();
    });

    it('should provide an init function', function() {
      expect(ngMeta.init).toBeDefined();
    });

    //angular-route support
    it('should set up a broadcast listener for $routeChangeSuccess', function() {
      spyOn($rootScope, '$on');
      ngMeta.init();
      expect($rootScope.$on).toHaveBeenCalledWith('$routeChangeSuccess', jasmine.any(Function));
    });

    //ui-router 0.x support
    it('should set up a broadcast listener for $stateChangeSuccess', function() {
      spyOn($rootScope, '$on');
      ngMeta.init();
      expect($rootScope.$on).toHaveBeenCalledWith('$stateChangeSuccess', jasmine.any(Function));
    });

    //ui-router 1.x support
    describe('ui-router 1.x support', function() {
      var UI_ROUTER_TRANSITION_SERVICE = '$transitions';

      it('should check for the availability of ui-router 1.x\'s $transitions service', function() {
        var requestedServiceName;
        spyOn($injector, 'has').and.callFake(function(serviceName) {
          requestedServiceName = serviceName;
        });

        ngMeta.init();

        expect(requestedServiceName).toEqual(UI_ROUTER_TRANSITION_SERVICE);
      });

      it('should set up a broadcast listener for $transitions.onSuccess (when $transitions is available)', function() {
        var mockTransitionService = {
          onSuccess: jasmine.createSpy()
        };
        spyOn($injector, 'has').and.returnValue(true);
        spyOn($injector, 'get').and.returnValue(mockTransitionService);

        ngMeta.init();

        expect(mockTransitionService.onSuccess).toHaveBeenCalled();
      });
    });
  });

  describe('Title: setTitle()', function() {

    describe('Basic checks', function() {

      //Inject dependencies
      beforeEach(function() {
        injectDependencies();
      });

      it('should provide the setTitle() function', function() {
        expect(ngMeta.setTitle).toBeDefined();
      });

      it('should throw an error when init has not been called', function() {
        expect(ngMeta.setTitle).toThrow();
      });
    });

    describe('Default Functionality', function() {

      beforeEach(function() {
        injectDependencies();
        ngMeta.init();
      });

      it('should update the title', function() {
        ngMeta.setTitle(SOME_TITLE);
        expect($rootScope.ngMeta.title).toBe(SOME_TITLE);
      });

      it('should ignore the titleSuffix param by default', function() {
        ngMeta.setTitle(SOME_TITLE, SOME_TITLE_SUFFIX);
        expect($rootScope.ngMeta.title).toBe(SOME_TITLE);
      });
    });

    describe('Customized Functionality', function() {

      it('should use the titleSuffix param when useTitleSuffix config is enabled', function() {
        module(function(ngMetaProvider) {
          ngMetaProvider.useTitleSuffix(true);
        });
        injectDependencies();
        ngMeta.init();

        ngMeta.setTitle(SOME_TITLE, SOME_TITLE_SUFFIX);

        expect($rootScope.ngMeta.title).toBe(SOME_TITLE + SOME_TITLE_SUFFIX);
      });

      it('should use the default titleSuffix param when useTitleSuffix is enabled and no titleSuffix argument is provided', function() {
        module(function(ngMetaProvider) {
          ngMetaProvider.useTitleSuffix(true);
          ngMetaProvider.setDefaultTitleSuffix(SOME_DEFAULT_TITLE_SUFFIX);
        });
        injectDependencies();
        ngMeta.init();

        ngMeta.setTitle(SOME_TITLE);

        expect($rootScope.ngMeta.title).toBe(SOME_TITLE + SOME_DEFAULT_TITLE_SUFFIX);
      });

      it('should override the default titleSuffix param when useTitleSuffix is enabled and a titleSuffix argument is provided', function() {
        module(function(ngMetaProvider) {
          ngMetaProvider.useTitleSuffix(true);
          ngMetaProvider.setDefaultTitleSuffix(SOME_DEFAULT_TITLE_SUFFIX);
        });
        injectDependencies();
        ngMeta.init();

        ngMeta.setTitle(SOME_TITLE, SOME_TITLE_SUFFIX);

        expect($rootScope.ngMeta.title).toBe(SOME_TITLE + SOME_TITLE_SUFFIX);
      });

      it('should use the default title [and default titleSuffix] when no arguments are provided', function() {
        module(function(ngMetaProvider) {
          ngMetaProvider.useTitleSuffix(true);
          ngMetaProvider.setDefaultTitle(SOME_DEFAULT_TITLE);
          ngMetaProvider.setDefaultTitleSuffix(SOME_DEFAULT_TITLE_SUFFIX);
        });
        injectDependencies();
        ngMeta.init();

        ngMeta.setTitle();

        expect($rootScope.ngMeta.title).toBe(SOME_DEFAULT_TITLE + SOME_DEFAULT_TITLE_SUFFIX);
      });
    });
  });

  describe('Tag: setTag()', function() {

    describe('Basic checks', function() {
      //Inject dependencies
      beforeEach(function() {
        injectDependencies();
      });

      it('should provide the setTag() function', function() {
        expect(ngMeta.setTag).toBeDefined();
      });

      it('should throw an error when init has not been called', function() {
        expect(ngMeta.setTag).toThrow();
      });

      it('should throw an error when the tag name is title', function() {
        ngMeta.init();
        expect(function() {
          ngMeta.setTag('title', SOME_TAG_VALUE);
        }).toThrow();
      });

      it('should throw an error when the tag name is titleSuffix', function() {
        ngMeta.init();
        expect(function() {
          ngMeta.setTag('titleSuffix', SOME_TAG_VALUE);
        }).toThrow();
      });
    });

    describe('Default Functionality', function() {

      beforeEach(function() {
        injectDependencies();
        ngMeta.init();
      });

      it('should set the tag to the given value', function() {
        ngMeta.setTag(SOME_TAG, SOME_TAG_VALUE);
        expect($rootScope.ngMeta[SOME_TAG]).toBe(SOME_TAG_VALUE);
      });
    });

    describe('Customized Functionality', function() {

      beforeEach(function() {
        module(function(ngMetaProvider) {
          ngMetaProvider.setDefaultTag(SOME_TAG, SOME_TAG_DEFAULT_VALUE);
        });
        injectDependencies();
        ngMeta.init();
      });

      it('should use the default tag value when the tag value is not available', function() {
        ngMeta.setTag(SOME_TAG);
        expect($rootScope.ngMeta[SOME_TAG]).toBe(SOME_TAG_DEFAULT_VALUE);
      });

      it('should override the default tag value when the tag value is available', function() {
        ngMeta.setTag(SOME_TAG, SOME_TAG_VALUE);
        expect($rootScope.ngMeta[SOME_TAG]).toBe(SOME_TAG_VALUE);
      });
    });
  });

  describe('Default tag: setDefaultTag()', function() {

    describe('Basic checks', function() {
      //Inject dependencies
      beforeEach(function() {
        injectDependencies();
      });

      it('should provide the setDefaultTag() function', function() {
        expect(ngMeta.setDefaultTag).toBeDefined();
      });

      it('should throw an error when init has not been called', function() {
        expect(ngMeta.setDefaultTag).toThrow();
      });
    });

    describe('Standard Functionality', function() {

      beforeEach(function() {
        injectDependencies();
      });

      it('should set the default tag to the given value', function() {
        ngMeta.init();
        ngMeta.setDefaultTag(SOME_TAG, SOME_TAG_VALUE);
        expect($rootScope.ngMeta[SOME_TAG]).toBe(SOME_TAG_VALUE);
      });

      it('should call setTitle when the default title or default titleSuffix is set', function() {
        spyOn(ngMeta, 'setTitle');
        ngMeta.init();
        ngMeta.setDefaultTag('title', SOME_DEFAULT_TITLE);
        expect(ngMeta.setTitle).toHaveBeenCalled();
      });

      it('should call setTag when any tag other than default title/titleSuffix is set', function() {
        spyOn(ngMeta, 'setTag');
        ngMeta.init();
        ngMeta.setDefaultTag(SOME_TAG, SOME_TAG_DEFAULT_VALUE);
        expect(ngMeta.setTag).toHaveBeenCalled();
      });

      it('should immediately set the current title when title is not set by route/default value', function() {
        ngMeta.init();
        ngMeta.setDefaultTag('title', SOME_DEFAULT_TITLE);
        expect($rootScope.ngMeta.title).toEqual(SOME_DEFAULT_TITLE);
      });

      it('should immediately set the current tag value when tag is not set by route/default value', function() {
        ngMeta.init();
        ngMeta.setDefaultTag(SOME_TAG, SOME_TAG_DEFAULT_VALUE);
        expect($rootScope.ngMeta[SOME_TAG]).toEqual(SOME_TAG_DEFAULT_VALUE);
      });
    });

    describe('Custom functionality', function() {

      beforeEach(function() {
        module(function(ngMetaProvider) {
          ngMetaProvider.setDefaultTag(SOME_TAG, SOME_TAG_DEFAULT_VALUE);
        });
        injectDependencies();
        ngMeta.init();
      });

      it('should overwrite a previous default value', function() {
        ngMeta.setDefaultTag(SOME_TAG, SOME_TAG_VALUE);

        expect($rootScope.ngMeta[SOME_TAG]).not.toEqual(SOME_TAG_DEFAULT_VALUE);
      });

      it('should not overwrite a non-default value', function() {
        ngMeta.setTitle(SOME_TITLE);

        ngMeta.setDefaultTag('title', SOME_DEFAULT_TITLE);

        expect($rootScope.ngMeta.title).toEqual(SOME_TITLE);
      });
    });
  });

  describe('resetMeta: resetMeta()', function() {

    describe('Basic checks', function() {
      //Inject dependencies
      beforeEach(function() {
        injectDependencies();
      });

      it('should provide an resetMeta() function', function() {
        expect(ngMeta.resetMeta).toBeDefined();
      });
    });

    describe('Standard functionality', function() {

      beforeEach(function() {
        module(function(ngMetaProvider) {
          ngMetaProvider.setDefaultTag(SOME_TAG, SOME_TAG_DEFAULT_VALUE);
        });
        injectDependencies();
        ngMeta.init();
      });

      it('should set default values', function() {
        ngMeta.resetMeta();

        //default value available immediately
        expect($rootScope.ngMeta[SOME_TAG]).toEqual(SOME_TAG_DEFAULT_VALUE);
        // default value should still be present after state change
        $rootScope.$broadcast('$stateChangeSuccess', { meta: { disableUpdate: true } });
        expect($rootScope.ngMeta[SOME_TAG]).toEqual(SOME_TAG_DEFAULT_VALUE);        
      });

      it('should overwrite a previous default value', function() {
        ngMeta.resetMeta();
        ngMeta.setTag(SOME_TAG, SOME_TAG_VALUE);

        $rootScope.$broadcast('$stateChangeSuccess', { meta: { disableUpdate: true } });
        expect($rootScope.ngMeta[SOME_TAG]).not.toEqual(SOME_TAG_DEFAULT_VALUE);
      });

      it('should not overwrite a previous default value if state does not include disableUpdate', function() {
        ngMeta.resetMeta();
        ngMeta.setTag(SOME_TAG, SOME_TAG_VALUE);

        $rootScope.$broadcast('$stateChangeSuccess', { meta: { disableUpdate: false } });
        expect($rootScope.ngMeta[SOME_TAG]).toEqual(SOME_TAG_DEFAULT_VALUE);
      });

      it('should overwrite a non-default value', function() {
        ngMeta.resetMeta();
        ngMeta.setTitle(SOME_TITLE);
        $rootScope.$broadcast('$stateChangeSuccess', { meta: { disableUpdate: true } });

        expect($rootScope.ngMeta[SOME_TAG]).toEqual(SOME_TAG_DEFAULT_VALUE);
        expect($rootScope.ngMeta.title).toEqual(SOME_TITLE);   
      });
    });
  });
});