#Changelog

## [v1.0.3](https://github.com/vinaygopinath/ngMeta/releases/tag/v1.0.3)

#### Features

* [#41](https://github.com/vinaygopinath/ngMeta/pull/41) Added `resetMeta` to apply default tags in the resolve function of ui-router when `disableUpdate` is `true`. Thanks [jacobcsmith](https://github.com/jacobcsmith)

## [v1.0.2](https://github.com/vinaygopinath/ngMeta/releases/tag/v1.0.2)

##### Bugfixes

* [#25](https://github.com/vinaygopinath/ngMeta/issues/25)
* [#36](https://github.com/vinaygopinath/ngMeta/issues/36)

## [v1.0.1](https://github.com/vinaygopinath/ngMeta/releases/tag/v1.0.1)

##### Bugfixes

* [#27](https://github.com/vinaygopinath/ngMeta/issues/27) Added support for Webpack. Thanks [@mcgilly17](https://github.com/mcgilly17)

## [v1.0.0](https://github.com/vinaygopinath/ngMeta/releases/tag/v1.0.0)

##### Features

* [#14](https://github.com/vinaygopinath/ngMeta/issues/14) Inherited meta data in child states of ui-router. Thanks [@martyzz1](https://github.com/martyzz1)

## [v0.3.10](https://github.com/vinaygopinath/ngMeta/releases/tag/v0.3.10)

##### Features

* [#15](https://github.com/vinaygopinath/ngMeta/issues/15) New 'setDefaultTag` function to dynamically update default values (Thanks [@xon88](https://github.com/xon88))

## [v0.3.9](https://github.com/vinaygopinath/ngMeta/releases/tag/v0.3.9)

##### Bugfixes

* [#11](https://github.com/vinaygopinath/ngMeta/issues/11) Changed bower.json `main` path from `src/ngMeta.js` to `dist/ngMeta.js` since src is excluded from the Bower release as of v0.3.8

## [v0.3.8](https://github.com/vinaygopinath/ngMeta/releases/tag/v0.3.8)

##### Features

* [#10](https://github.com/vinaygopinath/ngMeta/issues/10) `disableUpdate` option to disable $stateChangeSuccess updates for particular states (to be used in conjuction with state resolve functions)

## [v0.3.7](https://github.com/vinaygopinath/ngMeta/releases/tag/v0.3.7)

##### Features
* Method chaining for ngMeta and ngMetaProvider
  ```javascript
  ngMetaProvider
            .setDefaultTag('ogImage', 'http://url.com/picture.jpg')
            .setDefaultTag('ogSiteName', 'Site Name')
            .useTitleSuffix(true)
            .setDefaultTitleSuffix(' - Demcoach');
  ```
* Improved method documentation

## [v0.3.6](https://github.com/vinaygopinath/ngMeta/releases/tag/v0.3.6)

##### Features
* An error is thrown when `ngMeta.setTag()` is called with `title` or `titleSuffix`. This is to force the use of `ngMeta.setTitle()` for modifications of the title.
* [#6](https://github.com/vinaygopinath/ngMeta/issues/6) Improved structure and examples in README
* [#7](https://github.com/vinaygopinath/ngMeta/issues/7) Unit tests are now in sync with the latest code
* Travis CI integration

##### Bugfixes
* Problems updating package versions on both Bower and npm are fixed.

## [v0.3.3](https://github.com/vinaygopinath/ngMeta/releases/tag/v0.3.3)

##### Features
* An error is thrown when `ngMeta.setTitle()` or `ngMeta.setTag()` is used without initializing ngMeta in the run phase using `ngMeta.init()`

## [v0.3.2](https://github.com/vinaygopinath/ngMeta/releases/tag/v0.3.2)

##### Features
* [#5](https://github.com/vinaygopinath/ngMeta/issues/5) - ngMeta now supports AMD and CommonJS

##### Bugfixes
* [#4](https://github.com/vinaygopinath/ngMeta/issues/4) - `ngMeta.setTitle` and route/state `meta` object support empty string ('') as the value of `titleSuffix`