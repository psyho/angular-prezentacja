angular.service('translations', function() {
  return {
    foo: 'foo translated'
  };
});

angular.service('$t', function(translations) {
  return function(key) {
    var translation = translations[key];
    return translation ? translation : 'Missing translation: '+key;
  };
});

function TranslatedController($t) {
  this.keys = ['foo', 'bar', 'baz'];
  this.$t = $t;
}
TranslatedController.$inject = ['$t'];

