describe("Sinon.JS mocks", function () {

  // Object literal with two methods.
  var obj = {
    multiply: function (a, b) { return a * b; },
    error: function (msg) { throw new Error(msg); }
  };

  it("mocks multiply", function () {
    // Create the mock.
    var mock = sinon.mock(obj);

    // The multiply method is expected to be called:
    mock.expects("multiply")
      .atLeast(2)    // 2+ times,
      .atMost(4)     // no more than 4 times, and
      .withArgs(2);  // 2 was first arg on *all* calls.

    // Make 3 calls to `multiply()`.
    obj.multiply(2, 1);
    obj.multiply(2, 2);
    obj.multiply(2, 3);

    // Verify **all** of the previous expectations.
    mock.verify();

    // Restore the object.
    mock.restore();
  });

});
