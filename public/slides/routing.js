function MainController($route) {
  $route.parent(this);
  $route.when('/todo', {controller: ToDoController,
    template: '/views/todo.html'});
  $route.when('/foo', {controller: FooController,
    template: '/views/foo.html'});
  $route.otherwise({redirectTo: '/todo'});
}
MainController.$inject = ['$route'];
