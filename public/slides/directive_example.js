angular.directive('my:color', function(expression, element) {
  return function(element) {
    var scope = this;

    scope.$watch(expression, function() {
      var newColor = scope.$eval(expression);
      element.css('background-color', newColor);
    });
  };
});
