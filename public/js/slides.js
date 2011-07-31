function NoopController() {
}

function SlidesController($route, $location, $xhr) {
  this.$location = $location;

  this.presentation = {
    title: "Tworzenie testowalnych aplikacji internetowych w AngularJS",
    author: "Adam Pohorecki"
  };

  function slide(title, subtitle, contentSrc) {
    var thisSlide = {
      layout: 'slide',
      title: title,
      subtitle: subtitle,
      content: '',
      load: function() {
        $xhr('GET', '/slides/'+contentSrc, function(code, response) {
          thisSlide.content = response;
        });
      }
    };

    return thisSlide;
  }

  this.slides = [
    {layout: 'title'},
    slide('Slide title 1', 'Slide sub', 'test.html'),
    slide('Slide title 2', 'Slide sub', 'test.html'),
    slide('Slide title 3', 'Slide sub', 'test.html'),
    slide('Slide title 4', 'Slide sub', 'test.html')
  ];

  $route.when('/slide/:slideIdx', {template: '/slides/slide.html'});
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
      });
    };
  };
}

angular.directive('my:left', onKeyDown(37));
angular.directive('my:right', onKeyDown(39));
