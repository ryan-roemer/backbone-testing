describe("BDD example", function () {
  // Runs once before all tests start.
  before(function () {
    // Add a local function.
    this.hello = function () {
      return "Hello world!";
    };
  });

  // Runs once when all tests finish.
  after(function () {
    // Remove local function.
    this.hello = null;
  });

  it("should return expected string result", function () {
    // Chai BDD-style assertion.
    expect(this.hello()).to
      .be.a("string").and
      .equal("Hello world!");
  });
});
