function reverse(text) {
  var reversed = [];
  for (var i = 0; i < text.length; i++) {
    reversed.unshift(text.charAt(i));
  }
  return reversed.join('');
}

angular.formatter('reverse', {
  parse: function(value){
    return reverse(value||'').toUpperCase();
  },
  format: function(value){
    return reverse(value||'').toLowerCase();
  }
});
