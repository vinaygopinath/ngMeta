# ngMeta

> Dynamic meta tags in your AngularJS single page application

## Install

via NPM:
```shell
npm install ng-meta --save
```

via Bower:
```shell
bower install ngMeta --save
```

or download the `dist` files.

## Getting started

Add it as a dependency of your module.

```js
angular.module('YourApp',['ngMeta']);
```

Add `meta` objects to your routes
```js
.config(function ($routeProvider, ngMetaProvider) {

  $routeProvider
  .when('/home', {
    templateUrl: 'home-template.html',
    meta: {
      //Sets 'Home Page' as the title when /home is open
      title: 'Home page', 
      description: 'This is the description of the home page!'
    }
  })
  .when('/login', {
    templateUrl: 'login-template.html',
    meta: {
      //Sets 'Login Page' as the title when /login is open
      title: 'Login page',
      description: 'Login to this wonderful website!'
    }
  })
});
```

While you're in the `config` block, you can also set some defaults
or change the configuration.
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

<!-- This meta tag can be set using ngMetaProvider -->
<meta property="og:type" content="{{ngMeta.ogType}}" />
    
<!-- Default locale is en_US -->
<meta property="og:locale" content="{{ngMeta.ogLocale}}" />
    
<!-- This meta tag changes based on the meta object of each route -->
<!-- or when the setDescription function is called -->
<meta name="description" content="{{ngMeta.description}}" />
```

## Route Object modifications

You can specify the meta tags related to a route by adding a `meta` object within the route object in the $routeProvider configuration. This meta object can contain the following properties - `title`, `titleSuffix`, `description` and `ogImgUrl`. 
```html
.when('/login', {
    templateUrl: 'login-template.html',
    meta: {
      //Sets 'Login Page' as the title when /login is open
      title: 'Login page',
      
      //The title suffix for this route. Only used when useTitleSuffix is enabled.
      titleSuffix: 'Funny Cat Pictures',
      
      //The description of this page
      description: 'Login to this wonderful website!',
      
      // og:image URL
      ogImgUrl: 'http://example.com/abc.jpg'
    }
  }
```

If a route is missing any of these properties, `ngMeta` checks if a default has been defined for the missing property. If available, the default value is served. If there is no default, an empty string is served as the meta tag value.

## Configuration

`ngMetaProvider` allows you to set app-wide configuration for `ngMeta` in the config block.

#### Name: `setName()`

Default: `ngMeta`

Changes the name of the variable by which the meta tag information is accessible.
Calling `ngMetaProvider.setName('metaTags');` would allow you to use 
```html
<meta name="description" content="{{metaTags.description}}" />
```

#### Title suffix: `useTitleSuffix()`

Default: `false`

If you'd like to set an optional suffix to the titles of all pages, you can enable it by calling `ngMetaProvider.useTitleSuffix(true);`. This is helpful when you'd like to see a suffix like `Best site on the Internet` after the current page title.

#### Open Graph type: `setOgType()`

Default: `website`

You can set the `og:type` meta tag to a different value like `ngMetaProvider.setOgType('article');` Refer to the [Open Graph Types](http://ogp.me/#types) document for more information.

#### Open Graph site name: `setOgSiteName()`

Default: `` (empty)

You can set `og:site_name` using `ngMetaProvider.setOgSiteName('BuzzFeed');`

#### Open Graph Locale: `setOgLocale()`

Default: `en_US`

You can set a different `og:locale` using `ngMetaProvider.setOgLocale('en_IN');`

## Defaults

App-wide defaults can be defined in the `config` block for title, title suffix, description, and open graph image URL. These functions are self-explanatory. Unlike the configuration functions, note that these defaults can be overriden by providing the equivalent `meta` object properties in the `route` objects. 

#### Title: `setDefaultTitle()`

#### Description: `setDefaultDescription()`

#### Title suffix: `setDefaultTitleSuffix()`

#### Open Graph Image: `setOgImgUrl()`

## Setting meta tags dynamically

To set meta tags from your controller, or on a certain action or event, inject the `ngMeta` service and use one of the following methods:

#### Title: `setTitle(title, [titleSuffix])`
#### Description: `setDescription(description)`
#### Open Graph Image: `setOgImgUrl(url)`

## MIT Licence
*Vinay Gopinath*