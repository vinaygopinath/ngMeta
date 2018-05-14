# ngMeta
> Dynamic meta tags in your AngularJS single page application

[![npm version](https://badge.fury.io/js/ng-meta.svg)](https://badge.fury.io/js/ng-meta) [![Build Status](https://travis-ci.org/vinaygopinath/ngMeta.svg?branch=master)](https://travis-ci.org/vinaygopinath/ngMeta) [![Join the chat at https://gitter.im/ngMeta/Lobby](https://badges.gitter.im/ngMeta/Lobby.svg)](https://gitter.im/ngMeta/Lobby)

This is an Angular 1.x module. Angular2 module is available as [ng2-meta](https://github.com/vinaygopinath/ng2-meta)
* [Demo](#demo)
* [Install](#install)
* [Getting Started](#getting-started)
* [Defaults](#defaults)
* [Dynamic meta tags](#dynamic-meta-tags)
* [Debugging](#debugging)
* [Advanced](#advanced)
  * [Data inheritance in ui-router](#data-inheritance-in-ui-router)
  * [Using custom data resolved by ui-router](#using-custom-data-resolved-by-ui-router)
  * [Support for other crawlers](#support-for-other-crawlers)
* [Websites using ngMeta](#websites-using-ngmeta)
* [Further reading](#further-reading)
* [Licence](#mit-licence)

## Demo
[vinaygopinath.github.io/ngMeta](http://vinaygopinath.github.io/ngMeta)

## Install

via NPM:
```shell
npm install ng-meta --save
```

via Bower:
```shell
bower install ngMeta --save
```
via CDN:
```shell
https://cdnjs.cloudflare.com/ajax/libs/ng-meta/1.0.3/ngMeta.min.js
```

or download the file from [dist](https://github.com/vinaygopinath/ngMeta/tree/master/dist).

## Getting started

1. Add `ngMeta` as a dependency of your module. ngMeta supports ui-router and ngRoute.
    ```js
    angular.module('YourApp',['ngMeta']);
    ```

2. Add `meta` objects to your routes (ngRoute) or states (ui-router) and specify the meta tags appropriate to each view. Other than `title` and `titleSuffix`, which are reserved properties that affect the title of the page, the tag properties can be named as per your choice.
    ```js
    .config(function ($routeProvider, ngMetaProvider) {

      $routeProvider
      .when('/home', {
        templateUrl: 'home-template.html',
        data: {
          meta: {
            'title': 'Home page',
            'description': 'This is the description shown in Google search results'
          }
        }
      })
      .when('/login', {
        templateUrl: 'login-template.html',
        data: {
          meta: {
            'title': 'Login page',
            'titleSuffix': ' | Login to YourSiteName',
            'description': 'Login to the site'
          }
        }
      });
      ...
    });
    ```

3. **[Optional]** Set the default values of meta tags during Angular's configuration phase. If the `meta` object of a route does not contain a specific tag, the default value is used instead.
    ```javascript
    //Add a suffix to all page titles
    ngMetaProvider.useTitleSuffix(true);

    // On /home, the title would change to
    // 'Home Page | Best Website on the Internet!'
    ngMetaProvider.setDefaultTitleSuffix(' | Best Website on the Internet!');

    //Set defaults for arbitrary tags
    // Default author name
    ngMetaProvider.setDefaultTag('author', 'John Smith');
    ```

4. Let `ngMeta` initialize by calling the `init()` function in the app.js `run` block
    ```js
    angular.module('YourApp', ['ngRoute', 'ngMeta'])
    .config(function($routeProvider, ngMetaProvider) {
      ....
    })
    .run(['ngMeta', function(ngMeta) {
      ngMeta.init();
    }]);
    ```

5. Set the meta tags in your HTML file
    ```html
    <title ng-bind="ngMeta.title"></title>

    <!-- Arbitrary tags -->
    <meta property="og:type" content="{{ngMeta['og:type']}}" />
    <meta property="og:locale" content="{{ngMeta['og:locale']}}" />
    <meta name="author" content="{{ngMeta['author']}}" />
    <!-- OR <meta name="author" content="{{ngMeta.author}}" /> -->
    <meta name="description" content="{{ngMeta.description}}" />
    ```

## Defaults

Change app-wide behaviour and set default values to tags using these methods of `ngMetaProvider`. These defaults can be overridden by defining equivalent properties in the route/state `meta` object

```javascript
angular.module('YourApp', [....,'ngMeta'])
.config(function(ngMetaProvider) {

	ngMetaProvider.useTitleSuffix(true);
    ngMetaProvider.setDefaultTitle('Fallback Title');
    ngMetaProvider.setDefaultTitleSuffix(' | YourSite');
    ngMetaProvider.setDefaultTag('author', 'John Smith');
});
```

| Method | Default | Example |
| ------ | ------- | ------- |
| **useTitleSuffix(boolean)**<br/>Toggles the use of a title suffix. When enabled, the title suffix of the route (if available) or the default title suffix is appended to the title of all pages. |  `false` | ngMetaProvider.useTitleSuffix(true);<br/> |
| **setDefaultTitle(String)**<br/>Sets the default title for all routes. This serves as a fallback for routes that don't have a `title` property. Use this to customize titles for a few specific routes, letting other routes use the default title. | `undefined` | ngMetaProvider.setDefaultTitle('Spotify');<br/>ngMetaProvider.setDefaultTitle('Generic Title'); |
| **setDefaultTitleSuffix(String)**<br/>Sets the default title suffix for all routes. This serves as a fallback for routes that don't have a `titleSuffix` property. The default title suffix is relevant only when `useTitleSuffix` is set to true. | `undefined` | ngMetaProvider.setDefaultTitleSuffix(' - Site Name');<br/>ngMetaProvider.setDefaultTitleSuffix(' - YourSite'); |
| **setDefaultTag(String, String)**<br/>Sets the default value of any arbitrary tag. This serves as a fallback for routes that don't have a particular tag. | N/A | ngMetaProvider.setDefaultTag('author', 'John Smith');<br/>ngMetaProvider.setDefaultTag('ogImgUrl', 'http://example.com/img.png'); |

## Dynamic meta tags

To change meta tags dynamically (when an item in a list is clicked, for example), inject the `ngMeta` service into your controller and use one of the following methods:

```js
angular.module('YourApp')
.controller(function(ngMeta) {
  //These examples assume useTitleSuffix is enabled,
  //and default titleSuffix is set to 'Playlist'

  //Custom title and titleSuffix
  ngMeta.setTitle('Eluvium', ' | Spotify'); //Title = Eluvium | Spotify
  //default titleSuffix
  ngMeta.setTitle('Eluvium'); //Title = Eluvium | Playlist
  //Clear the default titleSuffix
  ngMeta.setTitle('Eluvium',''); //Title = Eluvium

  ngMeta.setTag('author', 'Matthew Cooper');
  ngMeta.setTag('image', 'http://placeholder.com/abc.jpg');

  ngMeta.setDefaultTag('author', 'Default author');
  //Set default tags (non-default tags, like author and image above, are NOT cleared)
  ngMeta.resetMeta();
});
```

Note: Please use `setTitle` to modify the title and/or titleSuffix and `setTag` for all other tags.

| Method | Description | Example |
| ------ | ------- | ------- |
| **setTitle(String title, String titleSuffix)** |  Sets the current title based on the given params. When `useTitleSuffix` is enabled and titleSuffix is not provided, it uses the default titleSuffix. | ngMeta.setTitle('Title', ' - TitleSuffix')<br/><br/>ngMeta.setTitle('Title with default titleSuffix')<br/><br/>ngMeta.setTitle('Title with no titleSuffix','') |
| **setTag(String tagName, String value)** | Sets the value of an arbitrary tag, using the default value of the tag when the second param is missing. The value is accessible as {{ngMeta.tagName}} from HTML. Calling setTag with `title` or `titleSuffix` as `tagName` results in an error. Title must be modified using `setTitle` instead.|ngMeta.setTag('author', 'John Smith')<br/><br/>ngMeta.setTag('ogImage', 'http://url.com/image.png')|
| **setDefaultTag(String tagName, String value)** | Sets the default value of an arbitrary tag, overwriting previously set default values, but not the value set dynamically (using `setTitle`/`setTag`) or by the route/state. `title` and `titleSuffix` are accepted values.|ngMeta.setDefaultTag('image', 'http://default-image-url.com');<br/><br/>ngMeta.setDefaultTag('title','Default title');|
| **resetMeta(void)** | Applies the default meta tags. This is relevant when using ui-router and `disableUpdate: true` (Refer [this comment](https://github.com/vinaygopinath/ngMeta/pull/41#issuecomment-387143832)). Custom tags set dynamically (using `setTag` or `setTitle`) are **not** cleared. |ngMeta.resetMeta();|


## Debugging
* [ng-inspector Chrome extension](https://chrome.google.com/webstore/detail/ng-inspector-for-angularj/aadgmnobpdmgmigaicncghmmoeflnamj) shows the tags set by ngMeta when a state/route is open
![ng-inspector running on an Angular SPA with ngMeta](http://i.imgur.com/3ltyKC4.png)

* Facebook's [Open Graph Object Debugger](https://developers.facebook.com/tools/debug/og/object/) shows detailed information about your site's meta tags as well as a preview of the snippet shown when your site is shared. **Note that you need to use server-side rendering or prerendering in combination with ngMeta to see your meta tags in the the debugger**

## Advanced

### Data inheritance in ui-router
If you wish to take advantage of nested views and data inheritence, then you should specify your `meta` config underneath the `data` property like this:

```javascript
$stateProvider
  .state('services', {
    abstract: true,
    url: '/services',
    templateUrl: '/services/base.html',
    controller: 'servicesCtrl',
    data: {
      'meta': {
        'og:image': 'http://www.yourdomain.com/img/facebookimage.jpg',
        'author': 'PawSquad'
      }
    }
  })
  .state('services.vaccinations', {
    url: '/vaccinations',
    templateUrl: '/services/vaccinations.html',
    controller: '',
    data: {
      'meta': {
        'title': 'Pet Vaccinations - All You Need To Know | PawSquad',
        'og:title': 'All You Need To Know About Pet Vaccinations',
        'og:description': 'Useful information about Routine Vaccines and Boosters for dogs and cats,   including start vaccines for puppies and kittens.',
      }
    }
  })
```

Furthermore, you should use the helper function to decorate $stateProvider's `data` function like this
```javascript
.config(['ngMetaProvider', function (ngMetaProvider) {
  $stateProvider.decorator('data', ngMetaProvider.mergeNestedStateData);
}])
```
In this way the metadata for the `/services/vaccinations` URL would be
```javascript
  'meta': {
    'og:image': 'http://www.yourdomain.com/img/facebookimage.jpg',
    'author': 'PawSquad',
    'title': 'Pet Vaccinations - All You Need To Know | PawSquad',
    'og:title': 'All You Need To Know About Pet Vaccinations',
    'og:description': 'Useful information about Routine Vaccines and Boosters for dogs and cats, including start vaccines for puppies and kittens.'
  }
```
### Using custom data resolved by ui-router

If you want to dynamically set your tags using ui-router's [resolve](https://github.com/angular-ui/ui-router/wiki#resolve), this is possible as well:
```
resolve: {
  data: function(..., ngMeta) {
    //Ex: Load data from HTTP endpoint
    ....
    ngMeta.setTitle();
    ngMeta.setTag('description', '....');
    ngMeta.setTag('image', '....');
  }
},
meta: {
  disableUpdate: true
}
```
The property `disableUpdate: true` is required because ui-router will execute the resolve function *before* the $stateChangeSuccess event is fired. Setting `disableUpdate: true` will prevent your tags from getting reset by the $stateChangeSuccess event listener.

### Support for other crawlers

While Google is capable of rendering Angular sites, other search engines (?) and crawler bots used by social media platforms do not execute Javascript. This affects the site snippets generated by sites like Facebook and Twitter. They may show a snippet like this one:

![Facebook site snippet](http://i.imgur.com/wSNMYNF.png)

You can use prerendering services to avoid this issue altogether, or update the server config to generate and serve a simplified page with just the open graph meta data needed for the bots to create snippets. Michael Bromley's article, [Enable Rich Sharing In Your AngularJS App](http://www.michaelbromley.co.uk/blog/171/enable-rich-social-sharing-in-your-angularjs-app) has more information on how to do that.

**TL;DR: ngMeta helps the Google crawler render your Angular site and read the meta tags. For other sites like Facebook/Twitter that can't render Javascript, you need to use pre-renderers or server redirects.**

## Websites using ngMeta
* [acloud.guru](https://acloud.guru) - AWS certification online learning platform

To list your website here, please make a PR (or [edit README.md on GitHub](https://github.com/vinaygopinath/ngMeta/edit/master/README.md)) and add your URL in this section of README.md in this format
```
"Site URL - Short description"
```
## Further reading
* [AngularJS & SEO - finally a piece of cake](https://weluse.de/blog/angularjs-seo-finally-a-piece-of-cake.html)
* [Fetch as Google - Google Webmaster Tools](https://www.google.com/webmasters/tools/googlebot-fetch)
* [Deprecating our AJAX crawling scheme - Google Webmaster Blog](https://webmasters.googleblog.com/2015/10/deprecating-our-ajax-crawling-scheme.html)
* [Open Graph protocol](http://ogp.me/)

## MIT Licence
*Vinay Gopinath*
