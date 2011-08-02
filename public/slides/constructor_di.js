function SomeClass(foo, bar, baz) {
}
SomeClass.$inject = ['foo', 'bar'];

var scope = angular.scope();
var newInstance = scope.$new(SomeClass, 'baz value');
