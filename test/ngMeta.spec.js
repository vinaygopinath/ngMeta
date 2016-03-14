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

  var ngMeta, $rootScope;

  // instantiate service
  var injectDependencies = function() {
    inject(function(_ngMeta_, _$rootScope_) {
      ngMeta = _ngMeta_;
      $rootScope = _$rootScope_;
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

    //ui-router support
    it('should set up a broadcast listener for $stateChangeSuccess', function() {
      spyOn($rootScope, '$on');
      ngMeta.init();
      expect($rootScope.$on).toHaveBeenCalledWith('$stateChangeSuccess', jasmine.any(Function));
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

});