(function ($) {
  module(':fixedContent selector', {
    setup: function () {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is fixedContent', function () {
    expect(1);
    deepEqual(this.elems.filter(':fixedContent').get(), this.elems.last().get());
  });
}(jQuery));
