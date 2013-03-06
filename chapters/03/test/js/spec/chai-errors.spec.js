describe("Chai errors", function () {
  it("checks `throw` - exception", function () {
    var bad = function () {
      throw new Error("My error message");
    };

    expect(bad)
      .to.throw(Error).and
      .to.throw(/message/).and
      .not.to.throw("no message match");
  });
});
