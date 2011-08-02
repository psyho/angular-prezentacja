* Accomplished by function currying
* Unfortunately not every "building block" supports it, but all of the important ones do
* In an Angular app, there is no need of global variables of any kind other than a namespace (which is *great for testability*)
* In tests, some services are already replaced in angular.mocks ($browser, $xhr, $defer)
* Others you can replace easily yourself for all tests, or for just a single one (see snippets later)
