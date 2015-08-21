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

## Configuration

## MIT Licence
*Vinay Gopinath*