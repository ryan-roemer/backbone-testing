/*global suite, suiteSetup, suiteTeardown, test, assert */

suite("TDD example", function () {
  // Runs once before all tests start.
  suiteSetup(function () {
    // Add a local function.
    this.hello = function () {
      return "Hello world!";
    };
  });

  // Runs once when all tests finish.
  suiteTeardown(function () {
    // Remove local function.
    this.hello = null;
  });

  test("expected string result", function () {
    // Chai TDD-style assertion.
    assert.isString(this.hello());
    assert.strictEqual(this.hello(), "Hello world!");
  });
});
