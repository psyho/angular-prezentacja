describe('FooController', function() {
  var ctrl;

  beforeEach(function() {
    var scope = angular.scope();
    ctrl = scope.$new(FooController);
  });

  it('should do something', function() {
    expect(ctrl.add(2, 2)).toEqual(4);
  });
});
