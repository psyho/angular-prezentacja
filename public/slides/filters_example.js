angular.filter('reverse', function(input, uppercase, color) {
  var out = "";
  for (var i = 0; i < input.length; i++) {
    out = input.charAt(i) + out;
  }

  // conditional based on optional argument
  if (uppercase) {
    out = out.toUpperCase();
  }

  // DOM manipulation using $element
  if (color) {
    this.$element.css('color', color);
  }
  return out;
});
