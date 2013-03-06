describe("Mocha `skip`", function () {
  it.skip("doesn't run this test", function () {
    expect(true).to.be.true;
  });

  it.skip("also doesn't run this test", function () {
    expect(true).to.be.true;
  });

  it("runs this test", function () {
    expect(false).to.be.false;
  });
});
