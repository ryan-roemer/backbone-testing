describe("Mocha `only`", function () {
  it("doesn't run this test", function () {
    expect(true).to.be.true;
  });

  it("also doesn't run this test", function () {
    expect(true).to.be.true;
  });

  it.only("runs this test", function () {
    expect(false).to.be.false;
  });
});
