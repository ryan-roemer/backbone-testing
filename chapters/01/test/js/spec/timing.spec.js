describe("Test timing", function () {
  it("should be a fast test", function (done) {
    expect("hi").to.equal("hi");
    done();
  });

  it("should be a medium test", function (done) {
    setTimeout(function () {
      expect("hi").to.equal("hi");
      done();
    }, 40);
  });

  it("should be a slow test", function (done) {
    setTimeout(function () {
      expect("hi").to.equal("hi");
      done();
    }, 100);
  });

  it("should be a timeout failure", function (done) {
    setTimeout(function () {
      expect("hi").to.equal("hi");
      done();
    }, 2001);
  });
});
