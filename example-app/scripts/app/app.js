angular.module('ngMetaDemoApp', ['ngRoute', 'ngMeta'])
  .config(function($routeProvider, ngMetaProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'example-app/views/home.html',
        meta: {
          title: 'ngMeta',
          titleSuffix: ' | Dynamic meta tags for your Angular SPA',
          description: 'Dynamic meta tags for your Angular single page application. Update meta tags based on the current route/state of your app. Supports ui-router and ngRoute'
        }
      })
      .when('/download', {
        templateUrl: 'example-app/views/download.html',
        meta: {
          title: 'Download',
          description: 'ngMeta is available for download on Bower and NPM. You can also download the source/minified JS file from GitHub'
        }
      })
      .when('/example/dynamic-tags', {
        templateUrl: 'example-app/views/dynamic-tags.html',
        controller: 'DynamicTagsCtrl',
        meta: {
          title: 'Example - Dynamic Tags',
          titleSuffix: ' | ngMeta - Customize meta tags from your controllers'
        }
      })
      .otherwise({
        redirectTo: '/home'
      });

    ngMetaProvider.useTitleSuffix(true);
    ngMetaProvider.setDefaultTag('description', 'This is the default description');
    ngMetaProvider.setDefaultTitle('ngMeta');
    ngMetaProvider.setDefaultTitleSuffix(' | ngMeta - Dynamic meta tags for your Angular SPA');
  })
  .run(function(ngMeta) {
    ngMeta.init();
  });