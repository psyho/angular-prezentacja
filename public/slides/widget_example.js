function ExpandableController() {
  this.toggle = function() {
    this.$expanded = !this.$expanded;
    this.$expandedClass = this.$expanded ? 'expanded' : 'collapsed';
  };

  this.toggle();
}

angular.widget('@my:expandable', function(expression, element) {
  var compiler = this;
  var html = element.html();

  var title = $('<div>{{'+expression+'}}</div>');
  var container = $("<div ng:show='$expanded'></div>");
  container.append(html);

  element.html('');
  element.append(title).append(container);

  element.attr('ng:controller', 'ExpandableController');
  title.attr('ng:click', 'toggle()');
  title.attr('ng:class', '$expandedClass');

  compiler.directives(true);
  compiler.descend(true);

  return angular.noop;
});
