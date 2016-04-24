#Changelog

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