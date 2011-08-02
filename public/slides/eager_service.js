angular.service('foo', function(bar) {
  // gets created at the very beginning of app lifecycle
}, {$inject: ['bar'], $eager: true});
