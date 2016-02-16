#Changelog

## [v0.3.3](https://github.com/vinaygopinath/ngMeta/releases/tag/v0.3.3)

##### Features
* An error is shown when `ngMeta.setTitle()` or `ngMeta.setTag()` is used without initializing ngMeta in the run phase using `ngMeta.init()`

## [v0.3.2](https://github.com/vinaygopinath/ngMeta/releases/tag/v0.3.2)

##### Features
* [#5](https://github.com/vinaygopinath/ngMeta/issues/5) - ngMeta now supports AMD and CommonJS

##### Bugfixes
* [#4](https://github.com/vinaygopinath/ngMeta/issues/4) - `ngMeta.setTitle` and route/state `meta` object support empty string ('') as the value of `titleSuffix`