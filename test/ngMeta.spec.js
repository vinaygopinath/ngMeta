describe('Service: ngMeta', function () {

    'use strict';

    // instantiate service
    var ngMeta, $rootScope,
        init = function () {
            inject(function (_ngMeta_, _$rootScope_) {
                ngMeta = _ngMeta_;
                $rootScope = _$rootScope_;
            });
        };

    var defaultVarName = 'ngMeta';
    var defaultOgType = 'website';
    var defaultOgSiteName = '';
    var defaultOgLocale = 'en_US';
    var someDefaultTitle = 'Title';
    var someDefaultTitleSuffix = ' | Suffix';

    // load the service's module
    beforeEach(module('ngMeta'));

    it('should create a service', function () {
        init();

        expect(!!ngMeta).toBe(true);
    });

    describe('App-wide one-time configuration', function () {

        describe('Variable name', function () {

            it('should default to the ngMeta variable name', function () {

                init();
                //Simulate route change
                $rootScope.$broadcast('$routeChangeSuccess', {});

                expect($rootScope[defaultVarName]).toBeDefined();
            });

            it('should support changing the variable name', function () {

                var someNewVarName = 'MetaTag';
                module(function (ngMetaProvider) {
                    ngMetaProvider.setName(someNewVarName);
                });

                init();
                //Simulate route change
                $rootScope.$broadcast('$routeChangeSuccess', {});

                expect($rootScope[someNewVarName]).toBeDefined();
            });
        });

        describe('Title suffix', function () {

            it('should default to false on title suffix use', function () {

                module(function (ngMetaProvider) {
                    ngMetaProvider.useTitleSuffix(false);
                    ngMetaProvider.setDefaultTitle(someDefaultTitle);
                    ngMetaProvider.setDefaultTitleSuffix(someDefaultTitleSuffix);
                });

                init();
                //Simulate route change
                $rootScope.$broadcast('$routeChangeSuccess', {});

                expect($rootScope[defaultVarName].title).toEqual(someDefaultTitle);
            });

            it('should use the title suffix when it is enabled', function () {

                module(function (ngMetaProvider) {
                    ngMetaProvider.useTitleSuffix(true);
                    ngMetaProvider.setDefaultTitle(someDefaultTitle);
                    ngMetaProvider.setDefaultTitleSuffix(someDefaultTitleSuffix);
                });

                init();
                //Simulate route change
                $rootScope.$broadcast('$routeChangeSuccess', {});

                expect($rootScope[defaultVarName].title).toEqual(someDefaultTitle + someDefaultTitleSuffix);
            });
        });

        describe('OpenGraph type', function () {

            it('should default to website for og:type', function () {

                init();
                //Simulate route change
                $rootScope.$broadcast('$routeChangeSuccess', {});

                expect($rootScope[defaultVarName].ogType).toEqual(defaultOgType);
            });

            it('should support setting the og:type', function () {

                var someOgType = 'article';
                module(function (ngMetaProvider) {
                    ngMetaProvider.setOgType(someOgType);
                });

                init();
                //Simulate route change
                $rootScope.$broadcast('$routeChangeSuccess', {});

                expect($rootScope[defaultVarName].ogType).toEqual(someOgType);
            });
        });

        describe('OpenGraph site name', function () {

            it('should default to empty string for og:site_name', function () {

                init();
                //Simulate route change
                $rootScope.$broadcast('$routeChangeSuccess', {});

                expect($rootScope[defaultVarName].ogSiteName).toEqual(defaultOgSiteName);
            });

            it('should support setting the og:site_name', function () {

                var someOgSiteName = 'GitHub';
                module(function (ngMetaProvider) {
                    ngMetaProvider.setOgSiteName(someOgSiteName);
                });

                init();
                //Simulate route change
                $rootScope.$broadcast('$routeChangeSuccess', {});

                expect($rootScope[defaultVarName].ogSiteName).toEqual(someOgSiteName);
            });
        });

        describe('OpenGraph locale', function () {

            it('should default to en_US for og:locale', function () {

                init();
                //Simulate route change
                $rootScope.$broadcast('$routeChangeSuccess', {});

                expect($rootScope[defaultVarName].ogLocale).toEqual(defaultOgLocale);
            });

            it('should support setting the og:locale', function () {

                var someOgLocale = 'en_IN';
                module(function (ngMetaProvider) {
                    ngMetaProvider.setOgLocale(someOgLocale);
                });

                init();
                //Simulate route change
                $rootScope.$broadcast('$routeChangeSuccess', {});

                expect($rootScope[defaultVarName].ogLocale).toEqual(someOgLocale);
            });
        });

    });

    describe('Defaults configuration', function () {

        it('should support setting a default title', function () {

            var someDefaultTitle = 'Lorem Ipsum';
            module(function (ngMetaProvider) {
                ngMetaProvider.setDefaultTitle(someDefaultTitle);
            });

            init();
            //Simulate route change
            $rootScope.$broadcast('$routeChangeSuccess', {});

            expect($rootScope.ngMeta.title).toEqual(someDefaultTitle);
        });

        it('should support setting a default title suffix', function () {

            module(function (ngMetaProvider) {
                ngMetaProvider.setDefaultTitle(someDefaultTitle);
                ngMetaProvider.setDefaultTitleSuffix(someDefaultTitleSuffix);
                ngMetaProvider.useTitleSuffix(true);
            });

            init();
            //Simulate route change
            $rootScope.$broadcast('$routeChangeSuccess', {});

            expect($rootScope.ngMeta.title).toEqual(someDefaultTitle + someDefaultTitleSuffix);
        });

        it('should support setting a default description', function () {

            var someDescription = 'This is a description';
            module(function (ngMetaProvider) {
                ngMetaProvider.setDefaultDescription(someDescription);
            });

            init();
            //Simulate route change
            $rootScope.$broadcast('$routeChangeSuccess', {});

            expect($rootScope[defaultVarName].description).toEqual(someDescription);
        });

        it('should support setting a default og:image', function () {

            var someOgImgUrl = 'http://example.com/abc.jpg';
            module(function (ngMetaProvider) {
                ngMetaProvider.setDefaultOgImgUrl(someOgImgUrl);
            });

            init();
            //Simulate route change
            $rootScope.$broadcast('$routeChangeSuccess', {});

            expect($rootScope[defaultVarName].ogImgUrl).toEqual(someOgImgUrl);
        });
    });

    describe('Runtime functions', function () {

        it('should support setting a title dynamically', function () {

            var someTitle = 'ABCD';

            ngMeta.setTitle(someTitle);

            expect($rootScope[defaultVarName].title).toEqual(someTitle);
        });

        it('should support setting a description dynamically', function () {

            var someDescription = 'Some description here';

            ngMeta.setDescription(someDescription);

            expect($rootScope[defaultVarName].description).toEqual(someDescription);
        });

        it('should support setting an og:image dynamically', function () {

            var someOgImgUrl = 'http://example.com/123.jpg';

            ngMeta.setOgImgUrl(someOgImgUrl);

            expect($rootScope[defaultVarName].ogImgUrl).toEqual(someOgImgUrl);
        });
    });

    describe('Route navigation meta changes', function () {

        it('should update meta tags with new meta object when the route changes', function () {

            var firstRouteMeta = {
                title: 'First title',
                description: 'First description'
            };
            var secondRouteMeta = {
                title: 'Second title',
                description: 'Second description'
            };
            var firstRouteMock = {
                meta: firstRouteMeta
            };
            var secondRouteMock = {
                meta: secondRouteMeta
            };

            init();
            //Simulate route change
            $rootScope.$broadcast('$routeChangeSuccess', firstRouteMock);
            $rootScope.$broadcast('$routeChangeSuccess', secondRouteMock);

            expect($rootScope[defaultVarName].title).toEqual(secondRouteMeta.title);
            expect($rootScope[defaultVarName].description).toEqual(secondRouteMeta.description);
        });
    });
});