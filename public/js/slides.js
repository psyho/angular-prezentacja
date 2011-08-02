function NoopController() {
}

function SlidesController($route, $location, $xhr) {
  this.$location = $location;

  this.presentation = {
    title: "Creating testable JS web applications with AngularJS",
    author: "Adam Pohorecki"
  };

  function center(title, subtitle) {
    return {
      layout: 'center',
      title: title,
      subtitle: subtitle,
      load: angular.noop
    };
  }

  function slide(title, subtitle, contentSrc) {
    var thisSlide = {
      layout: 'slide',
      title: title,
      subtitle: subtitle,
      content: '',
      load: function() {
        $xhr('GET', '/slides/'+contentSrc, function(code, response) {
          if(contentSrc.match(/\.md$/)) {
            thisSlide.content = new Showdown.converter().makeHtml(response);
          } else {
            thisSlide.content = response;
          }
        });
      }
    };

    return thisSlide;
  }

  function code(title, subtitle, name) {
    var thisSlide = {
      layout: 'code',
      title: title,
      subtitle: subtitle,
      htmlCode: '',
      jsCode: '',
      load: function() {
        $xhr('GET', '/slides/'+name+'.js', function(code, response) {
          thisSlide.jsCode = response;
        });
        $xhr('GET', '/slides/'+name+'.html', function(code, response) {
          thisSlide.htmlCode = response;
        });
      }
    };

    return thisSlide;
  }

  this.slides = [
    center(this.presentation.title, this.presentation.author),

    slide('Agenda', '', 'agenda.md'),
    slide('AngularJS', 'What is AngularJS?', 'what_is_angular.md'),
    slide('History', 'What is AngularJS?', 'angular_history.md'),
    code('Basic Hello World', 'Hello World!', 'hello_world'),
    code('Hello Controllers', 'Hello World!', 'hello_controllers'),

    slide('Model View Controller', 'Angular MVC', 'angular_mvc.md'),

    slide('Widgets', 'Building Blocks', 'widgets.md'),
    code('Widget Example', 'Building Blocks', 'widget_example'),

    slide('Directives', 'Building Blocks', 'directives.md'),
    code('Directive Example', 'Building Blocks', 'directive_example'),

    slide('Filters', 'Building Blocks', 'filters.md'),
    code('Filter Example', 'Building Blocks', 'filters_example'),

    slide('Formatters', 'Building Blocks', 'formatters.md'),
    code('Formatter Example', 'Building Blocks', 'formatters_example'),

    slide('Validators', 'Building Blocks', 'validators.md'),
    code('Validator Example', 'Building Blocks', 'validators_example'),

    slide('Services', 'Building Blocks', 'services.md'),
    slide('Dependency Injection', 'Building Blocks', 'di.md'),
    code('Service Example', 'Building Blocks', 'service_example'),

    slide('Testability?', 'Testing', 'testability.md'),
    slide('Unit Testing', 'Testing', 'unit_testing.md'),
    slide('js-test-driver(-rails)', 'Testing', 'jstd.html'),
    slide('Integration Testing', 'Testing', 'integration_testing.md'),

    slide('Summary', 'too long; slept through', 'summary.md'),

    center("Questions?"),
    center("Thank You :)"),

    slide('Next meeting', 'September', 'next_krug.md')
  ];

  $route.parent(this);
  $route.when('/slide/:slideIdx', {template: '/views/main.html'});
  $route.otherwise({redirectTo: '/slide/0'});

  var self = this;
  $route.onChange(function() {
    self.currentSlideIdx = parseInt($route.current.params.slideIdx, 10);
  });

  this.$watch('currentSlideIdx', function() {
    self.currentSlide = self.slides[self.currentSlideIdx || 0] || {};
    (self.currentSlide.load || angular.noop)();
  });
}
SlidesController.$inject = ['$route', '$location', '$xhr.cache'];

SlidesController.prototype = {
  template: function() {
    return '/views/'+this.currentSlide.layout+'.html';
  },
  updateLocation: function() {
    this.$location.update({hash: '/slide/' + this.currentSlideIdx.toString()});
  },
  nextSlide: function() {
    this.currentSlideIdx++;
    if(this.currentSlideIdx >= this.slides.length) {
      this.currentSlideIdx = this.slides.length - 1;
    }
    this.updateLocation();
  },
  previousSlide: function() {
    this.currentSlideIdx--;
    if(this.currentSlideIdx < 0) {
      this.currentSlideIdx = 0;
    }
    this.updateLocation();
  }
};

function onKeyDown(keyCode) {
  return function(expression, element) {
    return function(element) {
      var scope = this;

      element.keydown(function(e) {
        if(e.keyCode === keyCode) {
          scope.$eval(expression);
          scope.$eval();
        }
        e.stopPropagation();
      });
    };
  };
}

angular.directive('my:left', onKeyDown(37));
angular.directive('my:right', onKeyDown(39));

function TabsController() {
  this.activeTab = 'demo';
}

TabsController.prototype = {
  activeClass: function(tab) {
    if(this.isActive(tab)) {
      return 'active';
    }
  },
  isActive: function(tab) {
    return this.activeTab === tab;
  },
  setActive: function(tab) {
    this.activeTab = tab;
  }
};

angular.widget('@my:html', function(expression, element) {
  var compiler = this;

  if (element[0]['ng:compiled']) {
    compiler.descend(true);
    compiler.directives(true);

    return angular.noop;
  } else {
    element[0]['ng:compiled'] = true;
    return function(element) {
      var scope = this;
      this.$watch(expression, function() {
        var html = scope.$eval(expression);
        element.html(html);
        compiler.compile(element)(scope);
      });
    };
  }
});

angular.widget('@my:script', function(expression, element) {
  return function(element) {
    var scope = this;
    this.$watch(expression, function() {
      var js = scope.$eval(expression);
      element.append('<script type="text/javascript">'+js+'</script>');
    });
  };
});

angular.directive('my:code-editor', function(mode, element) {
  var name = element.attr('name');

  return function(element) {
    var scope = this;

    var options = {
      lineNumbers: true,
      onChange: function(editor) {
        scope.$set(name, editor.getValue());
        scope.$eval();
      }
    };

    if(mode === 'js') {
      options.mode = "text/javascript";
      options.matchBrackets = true;
    } else if (mode === 'html') {
      options.mode = "text/html";
      options.tabMode = "indent";
    }

    var editor = CodeMirror.fromTextArea(element[0], options);

    scope.$watch(name, function() {
      var value = scope.$eval(name);
      if(editor.getValue() !== value) {
        editor.setValue(value);
        editor.refresh();
      }
    });
  };
});
