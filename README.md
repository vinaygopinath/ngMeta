# ngMeta

> Dynamic meta tags in your AngularJS single page application

* [Introduction](#introduction)
* [Install](#install)
* [Getting Started](#getting-started)
* [Meta tags](#meta-tags)
* [Options](#options)
	* [General options](#general-options)
	* [Open Graph options](#open-graph-options)
* [Defaults](#defaults)
* [Setting meta tags dynamically](#setting-meta-tags-dynamically)
* [Support For Other Crawlers](#support-for-other-crawlers)
* [Licence](#mit-licence)

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
      title: 'Home page', 
      description: 'This is the description shown in Google search results'
    }
  })
  .when('/login', {
    templateUrl: 'login-template.html',
    meta: {
      title: 'Login page',
      description: 'Login to the site'
    }
  });
  ...
});
```

Set the default values of the meta tags or change ngMeta options during Angular's configuration phase.
```js
//Add a suffix to all page titles
ngMetaProvider.useTitleSuffix(true);

// On /home, the title would change to 
// 'Home Page | Best Website on the Internet!'
ngMetaProvider.setDefaultTitleSuffix(' | Best Website on the Internet!');
```

Let `ngMeta` initialize by injecting it into the `run` block
```js
angular.module('YourApp', ['ngMeta'])
.run(function(ngMeta) {
...
});
```

Don't forget to set the meta tags in index.html
```html
<title ng-bind="ngMeta.title"></title>
<!-- OR <title>{{ngMeta.title}}</title> -->    

<!-- Set the open graph website type. Defaults to 'website' -->
<meta property="og:type" content="{{ngMeta.ogType}}" />
    
<!-- Set the open graph locale. Default locale is en_US -->
<meta property="og:locale" content="{{ngMeta.ogLocale}}" />
    
<!-- Set the description based on the current route/state -->
<!-- If not available, use the default description or '' -->
<meta name="description" content="{{ngMeta.description}}" />
```

## Meta tags

Add a `meta` object within a route/state in the $routeProvider/$stateProvider. This meta object can contain the following properties - `title`, `titleSuffix`, `description` and `ogImgUrl`. 
```javascript
.when('/login', {
    templateUrl: 'login-template.html',
    meta: {
      //Sets 'Login Page' as the title when /login is open
      title: 'Login page',
      
      //The title suffix for this route. Used only when useTitleSuffix is enabled.
      titleSuffix: 'Funny Cat Pictures',
      
      //The description of this page
      description: 'Login to this wonderful website!',
      
      // og:image URL
      ogImgUrl: 'http://example.com/abc.jpg'
    }
  }
```

If a route is missing any of these properties, `ngMeta` checks if a default has been defined for the missing property. If available, the default value is served. If there is no default, an empty string is served as the meta tag value.

## Options

Change ngMeta options using these functions of `ngMetaProvider`

### General options

#### Name

Default: `ngMeta`
Example: 
```javascript
ngMetaProvider.setName('metaTags')
```

The name of the variable by which the meta tag information is accessible.


The example code would allow you to use 
```html
<meta name="description" content="{{metaTags.description}}" />
```

#### Title Suffix

Default: `false`
Example: 
```javascript
ngMetaProvider.useTitleSuffix(true)
```

Toggle the use of a title suffix. Setting it to true enables the use of an optional title suffix for all pages

### Open Graph Options

#### Type

Default: `website`
Used with: `og:type`
Example: 
```javascript
ngMetaProvider.setOgType('article')
```

Refer to the [Open Graph Types](http://ogp.me/#types) document for more information.

#### Site Name

Default: `''` (empty)
Used with: `og:site_name`
Example: 
```javascript
ngMetaProvider.setOgSiteName('Caravan Magazine')
```

The name of your site. Note that this must be of the form `Caravan Magazine` and not `caravanmagazine.in`

#### Locale

Default: `en_US`
Used with: `og:locale`
Example: 
```javascript
ngMetaProvider.setOgLocale('en_IN')
```

The locale of your site.

## Defaults

Set app-wide defaults for meta tags during Angular's configuration phase. These defaults can be overridden by defining equivalent properties in the route/state `meta` object

#### Title

Example: 
```javascript
ngMetaProvider.setDefaultTitle('Playlist')
```

The default title is used when the title of a page is not specified.

#### Description

The default description is used when the description of a page is not specified.

Example: 
```javascript
ngMetaProvider.setDefaultDescription('Over 5 million songs! All your favourite musicians')
```

#### Title suffix

Example: 
```javascript
ngMetaProvider.setDefaultTitleSuffix('Free unlimited ad-free radio')
```

The default title suffix is used when `useTitleSuffix` option is enabled and the title suffix of a page is not specified.

#### Open Graph Image
Example:
```javascript
ngMetaProvider.setOgImgUrl('http://example.com/path/to/img.jpg')
```

## Setting meta tags dynamically

To change meta tags dynamically (on a certain action or event), inject the `ngMeta` service into your controller and use one of the following functions:

```js
//uses default title suffix, if useTitleSuffix enabled
ngMeta.setTitle('Page title'); 

//results in the title 'Page Title | Example Suffix'
ngMeta.setTile('Page title', ' | Example Suffix');

//changes the description
ngMeta.setDescription('Song A by SingerXYZ from the 2009 album ABC');

//changes the open graph image
ngMeta.setOgImgUrl('http://example.com/large_image.png');
```

## Support For Other Crawlers

While Google is capable of rendering Angular sites, other search engines (?) and crawler bots used by social media platforms do not execute Javascript. This affects the site snippets generated by sites like Facebook and Twitter. They may show a snippet like this one:

![Facebook site snippet](http://i.imgur.com/wSNMYNF.png)

You can use prerendering services to avoid this issue altogether update the server config to generate and serve a simplified page with just the open graph meta data needed for the bots to create snippets. Michael Bromley's article, [Enable Rich Sharing In Your AngularJS App](http://www.michaelbromley.co.uk/blog/171/enable-rich-social-sharing-in-your-angularjs-app) has more information on how to do that.

You can use Facebook's [Open Graph Object Debugger](https://developers.facebook.com/tools/debug/og/object/) to see detailed information about your site's meta tags as well as a preview of the snippet shown when your site is shared.

## MIT Licence
*Vinay Gopinath*