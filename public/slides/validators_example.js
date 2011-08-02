angular.validator('foobar', function(input) {
  if(input !== 'foo' && input !== 'bar') {
    return "Input must be equal foo or bar";
  }
});
