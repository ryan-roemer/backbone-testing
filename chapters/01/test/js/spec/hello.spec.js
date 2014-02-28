/*global hello */

// A simple function to test.
window.hello = function () {
  return "Hello World";
};

describe("Trying out the test libraries", function () {
  describe("Chai", function () {
    it("should be equal using 'expect'", function () {
      expect(hello()).to.equal("Hello World");
    });
  });

  describe("Sinon.JS", function () {
    it("should report spy called", function () {
      var helloSpy = sinon.spy(window, 'hello');

      expect(helloSpy.called).to.be.false;
      hello();
      expect(helloSpy.called).to.be.true;
      hello.restore();
    });
  });
});
