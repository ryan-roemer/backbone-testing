describe("Chai errors", function () {
  it("checks `throw` - exception", function () {
    var bad = function () {
      throw new Error("My error message");
    };

    // Updated for Chai v1.9.0. Was:
    //
    //     expect(bad)
    //       .to.throw(Error).and
    //       .to.throw(/message/).and
    //       .not.to.throw("no message match");
    //
    // The main issue is that Chai changed behavior to switch context
    // on `throw()` calls to the Error object, which changed how
    // chaining works. The below is equivalent.
    expect(bad).to.throw(Error);
    expect(bad).to.throw(/message/);
    expect(bad).not.to.throw("no message match");
  });
});
