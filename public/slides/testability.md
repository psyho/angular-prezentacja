* If you play by the rules, pretty much all of the code you have to test is pure JS with no DOM references
* Controllers/services are super easy to test, and the tests are very fast
* Often a widget is just a controller + a bit of HTML, so it's easy to test as well
* Even for the more involved widgets, you can usually write a pretty decent test easily
* Thanks to dependency injection it is trivial to substitute parts of the system that would make unit tests hard (XHR, setTimeout)
