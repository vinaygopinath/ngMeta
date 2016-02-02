# ngMeta

> Dynamic meta tags in your AngularJS single page application

* [Demo](#demo)
* [Introduction](#introduction)
* [Install](#install)
* [Getting Started](#getting-started)
* [Meta tags](#meta-tags)
* [Options](#options)
	* [General options](#general-options)
* [Defaults](#defaults)
* [Setting meta tags dynamically](#setting-meta-tags-dynamically)
* [Support For Other Crawlers](#support-for-other-crawlers)
* [Debugging](#debugging)
* [Licence](#mit-licence)

## Demo
Visit [vinaygopinath.github.io/ngMeta](http://vinaygopinath.github.io/ngMeta)

## Introduction

Google [announced in 2014](http://googlewebmastercentral.blogspot.com/2014/05/understanding-web-pages-better.html) that sites using Javascript are rendered the way users see it, and indeed, Webmaster Tool's [Fetch as Google](https://www.google.com/webmasters/tools/googlebot-fetch) can confirm that.

However, articles on SEO in AngularJS single page applications (SPA) continue to recommend the use of the `escaped_fragment` technique and redirection of crawler bot requests to prerendering services.

Pascal Floride's article, [AngularJS & SEO](https://weluse.de/blog/angularjs-seo-finally-a-piece-of-cake.html) describes a simple Angular service-based technique to dynamically update the meta tags of a site based on the route.

Built on this idea, ngMeta lets Angular SPAs set common tags like title and description as well as [Open Graph](http://ogp.me/) tags, both on ui-router and ngRoute.

## Install

via NPM:
```shell
npm install ng-meta --save
```

via Bower:
```shell
bower install ngMeta --save
```

or download the file from [dist](https://github.com/vinaygopinath/ngMeta/tree/master/dist).

## Getting started

Add it as a dependency of your module.

```js
angular.module('YourApp',['ngMeta']);
```

ngMeta supports ui-router and ngRoute. Add `meta` objects to your routes (ngRoute) or states (ui-router) and specify the meta tags appropriate to each view.

```js
.config(function ($routeProvider, ngMetaProvider) {

  $routeProvider
  .when('/home', {
    templateUrl: 'home-template.html',
    meta: {
      //Sets 'Home Page' as the title when /home is open
      'title': 'Home page', 
      'description': 'This is the description shown in Google search results'
    }
  })
  .when('/login', {
    templateUrl: 'login-template.html',
    meta: {
      'title': 'Login page',
      'description': 'Login to the site'
    }
  });
  ...
});
```

Set the default values of meta tags or change ngMeta options during Angular's configuration phase.
```js
//Add a suffix to all page titles
ngMetaProvider.useTitleSuffix(true);

// On /home, the title would change to 
// 'Home Page | Best Website on the Internet!'
ngMetaProvider.setDefaultTitleSuffix(' | Best Website on the Internet!');

//Set defaults for arbitrary tags
// Default author name
ngMetaProvider.setDefaultTag('author', 'John Smith');
```

Let `ngMeta` initialize by calling the `init()` function in the app.js `run` block
```js
angular.module('YourApp', ['ngRoute', 'ngMeta'])
.config(function($routeProvider, ngMetaProvider) {
  ....
})
.run(function(ngMeta) {
  ngMeta.init();
});
```

Don't forget to set the meta tags in index.html
```html
<title ng-bind="ngMeta.title"></title>
<!-- OR <title>{{ngMeta.title}}</title> -->    

<!-- Arbitrary tags -->
<meta property="og:type" content="{{ngMeta['og:type']}}" />
<meta property="og:locale" content="{{ngMeta['og:locale']}}" />
<meta name="author" content="{{ngMeta['author']}}" />
<!-- OR <meta name="author" content="{{ngMeta.author}}" /> -->
<meta name="description" content="{{ngMeta.description}}" />

```

## Meta tags

Add a `meta` object within a route/state in the $routeProvider/$stateProvider. This meta object can contain arbitrary properties.
```javascript
.when('/login', {
    templateUrl: 'login-template.html',
    meta: {
      //Sets 'Login Page' as the title when /login is open
      //Overrides the default title (if it is defined)
      title: 'Login page',
      
      //The title suffix for this route. Used only when useTitleSuffix is enabled. Overrides the default titleSuffix (if it is defined)
      titleSuffix: 'Funny Cat Pictures',
      
      //The description of this page
      description: 'Login to this wonderful website!',
      
      // og:image URL
      'og:image': 'http://example.com/abc.jpg',
      
      //Author tag
      'author': 'Placeholder Name'
    }
  }
```

If a route is missing any of these properties, `ngMeta` checks if a default has been defined for the missing property. If available, the default value is served.

## Options

Change ngMeta options using these functions of `ngMetaProvider`

### General options

#### Title Suffix

Default: `false`
Example: 
```javascript
ngMetaProvider.useTitleSuffix(true);
```

Toggle the use of a title suffix. Setting it to true enables the use of an optional title suffix for all pages

## Defaults

Set app-wide defaults for meta tags during Angular's configuration phase. These defaults can be overridden by defining equivalent properties in the route/state `meta` object

#### Title

Example: 
```javascript
ngMetaProvider.setDefaultTitle('Playlist')
```

The default title is used when the title of a page is not specified.

#### Title suffix

Example: 
```javascript
ngMetaProvider.setDefaultTitleSuffix('Free unlimited ad-free radio')
```

The default title suffix is used when `useTitleSuffix` option is enabled and the title suffix of a page is not specified.

#### Other tag defaults

Example:
```javascript
ngMetaProvider.setDefaultTag('description', 'Default description text');
ngMetaProvider.setDefaultTag('og:url', 'http://example.com');
ngMetaProvider.setDefaultTag('author', 'John Smith');
```

## Setting meta tags dynamically

To change meta tags dynamically (on a certain action or event), inject the `ngMeta` service into your controller and use one of the following functions:

Note: Please use `setTitle` to modify the title and/or titleSuffix and `setTag` for all other tags.

```js
//uses default title suffix, if useTitleSuffix enabled
ngMeta.setTitle('Page title');

//results in the title 'Page Title | Example Suffix'
ngMeta.setTitle('Page title', ' | Example Suffix');

//changes the description
ngMeta.setTag('description', 'Song A by SingerXYZ from the 2009 album ABC');

//changes the open graph image
ngMeta.setTag('og:image', 'http://example.com/large_image.png');
```

## Support For Other Crawlers

While Google is capable of rendering Angular sites, other search engines (?) and crawler bots used by social media platforms do not execute Javascript. This affects the site snippets generated by sites like Facebook and Twitter. They may show a snippet like this one:

![Facebook site snippet](http://i.imgur.com/wSNMYNF.png)

You can use prerendering services to avoid this issue altogether, or update the server config to generate and serve a simplified page with just the open graph meta data needed for the bots to create snippets. Michael Bromley's article, [Enable Rich Sharing In Your AngularJS App](http://www.michaelbromley.co.uk/blog/171/enable-rich-social-sharing-in-your-angularjs-app) has more information on how to do that.

You can use Facebook's [Open Graph Object Debugger](https://developers.facebook.com/tools/debug/og/object/) to see detailed information about your site's meta tags as well as a preview of the snippet shown when your site is shared.

## Debugging
To check out the tags set by ngMeta when a state/route is open, you can use the [ng-inspector Chrome extension](https://chrome.google.com/webstore/detail/ng-inspector-for-angularj/aadgmnobpdmgmigaicncghmmoeflnamj)

![ng-inspector running on an Angular SPA with ngMeta](http://i.imgur.com/3ltyKC4.png)


## MIT Licence
*Vinay Gopinath*