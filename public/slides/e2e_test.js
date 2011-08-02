describe('TODO Form', function() {
  beforeEach(function() {
    browser().navigateTo('/');
    element("a:contains('TODO')").click();
    // or rather clickNavigationElement('TODO')
  });

  it('adds a new TODO item', function() {
    input('newItem').enter('hello world');
    element("button:contains('Add')").click();

    expect(element('ul.todos li').count()).toEqual(1);
  });
});
