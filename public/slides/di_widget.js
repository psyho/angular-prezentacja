angular.widget('...', function(element) {
  return angular.extend(function(foo, bar, element) {
    // you can only have access to services at link time
  }, {$inject: ['foo', 'bar']});
});
